"""
graph_engine.py
-----------------
This is the "graph brain" of the agent.

For the hackathon demo it uses networkx so you can run everything locally
with zero setup. Each function here is written to mirror a GSQL query you'd
run on real TigerGraph — see gsql_queries.gsql for the TigerGraph version of
every one of these. If you get real TigerGraph access, you swap this file's
internals for calls to the TigerGraph REST++ API / pyTigerGraph, but the
function signatures and what they return can stay the same, so agent.py
doesn't need to change.
"""

import csv
import networkx as nx
from collections import defaultdict


class FraudGraph:
    def __init__(self, accounts_csv, transactions_csv, devices_csv):
        self.G = nx.DiGraph()
        self.account_device = defaultdict(list)  # account_id -> [device_ids]
        self.device_accounts = defaultdict(list)  # device_id -> [account_ids]
        self._load(accounts_csv, transactions_csv, devices_csv)

    def _load(self, accounts_csv, transactions_csv, devices_csv):
        with open(accounts_csv) as f:
            for row in csv.DictReader(f):
                self.G.add_node(row["account_id"], type="account", **row)

        with open(devices_csv) as f:
            for row in csv.DictReader(f):
                self.account_device[row["account_id"]].append(row["device_id"])
                self.device_accounts[row["device_id"]].append(row["account_id"])

        with open(transactions_csv) as f:
            for row in csv.DictReader(f):
                self.G.add_edge(
                    row["src_account"],
                    row["dst_account"],
                    txn_id=row["txn_id"],
                    amount=float(row["amount"]),
                    timestamp=row["timestamp"],
                )

    # --- Query 1: find circular money flows (A->B->C->A style laundering) --
    def find_cycles(self, account_id, max_len=4, max_span_hours=6, amount_tolerance=0.15):
        """Mirrors GSQL: FindCycles.gsql — multi-hop traversal back to start.

        Real laundering rings move money in a tight time window and pass
        roughly the same amount along each hop (minus a small cut). A cycle
        that exists only because of coincidental unrelated transactions
        spread across weeks is NOT flagged — this keeps the false-positive
        rate down, which matters a lot for a "recommend the next action"
        system (nobody wants an agent that cries wolf constantly).
        """
        from datetime import datetime

        raw_cycles = []
        try:
            for cycle in nx.simple_cycles(self.G, length_bound=max_len):
                if account_id in cycle:
                    raw_cycles.append(cycle)
        except TypeError:
            for cycle in nx.simple_cycles(self.G):
                if account_id in cycle and len(cycle) <= max_len:
                    raw_cycles.append(cycle)

        tight_cycles = []
        for cycle in raw_cycles:
            edges = []
            ok = True
            for i in range(len(cycle)):
                u, v = cycle[i], cycle[(i + 1) % len(cycle)]
                if not self.G.has_edge(u, v):
                    ok = False
                    break
                edges.append(self.G[u][v])
            if not ok or not edges:
                continue

            times = [datetime.fromisoformat(e["timestamp"]) for e in edges]
            span_hours = (max(times) - min(times)).total_seconds() / 3600
            amounts = [e["amount"] for e in edges]
            avg_amt = sum(amounts) / len(amounts)
            amt_ok = all(abs(a - avg_amt) / avg_amt <= amount_tolerance for a in amounts)

            if span_hours <= max_span_hours and amt_ok:
                tight_cycles.append(cycle)

        return tight_cycles

    # --- Query 2: find accounts sharing a device with this account ---------
    def shared_device_accounts(self, account_id):
        """Mirrors GSQL: SharedDeviceRing.gsql — 2-hop Account-Device-Account."""
        related = set()
        for dev in self.account_device.get(account_id, []):
            for acc in self.device_accounts.get(dev, []):
                if acc != account_id:
                    related.add(acc)
        return sorted(related)

    # --- Query 3: detect smurfing (many small txns just under a threshold) -
    def detect_smurfing(self, account_id, threshold=10000, window_txns=5):
        """Mirrors GSQL: SmurfingDetector.gsql — outgoing edges near threshold."""
        out_edges = [
            (v, d["amount"], d["timestamp"])
            for u, v, d in self.G.out_edges(account_id, data=True)
        ]
        near_threshold = [e for e in out_edges if threshold * 0.9 <= e[1] < threshold]
        is_smurfing = len(near_threshold) >= window_txns
        return {
            "is_smurfing": is_smurfing,
            "num_near_threshold_txns": len(near_threshold),
            "targets": [e[0] for e in near_threshold],
        }

    # --- Query 4: neighborhood snapshot for the LLM to reason over ----------
    def get_subgraph_summary(self, account_id, hops=2):
        """Pulls a small neighborhood around an account so the agent has
        concrete evidence to reason over, instead of the whole graph."""
        nodes = {account_id}
        frontier = {account_id}
        for _ in range(hops):
            next_frontier = set()
            for n in frontier:
                next_frontier |= set(self.G.predecessors(n)) | set(self.G.successors(n))
            nodes |= next_frontier
            frontier = next_frontier

        sub = self.G.subgraph(nodes)
        edges = [
            {"src": u, "dst": v, "amount": d["amount"], "timestamp": d["timestamp"]}
            for u, v, d in sub.edges(data=True)
        ]
        return {
            "account_id": account_id,
            "num_related_accounts": len(nodes) - 1,
            "edges": edges,
            "shared_device_accounts": self.shared_device_accounts(account_id),
            "cycles_found": self.find_cycles(account_id),
            "smurfing": self.detect_smurfing(account_id),
        }
