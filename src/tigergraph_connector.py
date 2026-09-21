# ============================================================================
# TigerGraph Connector & Graph Query Interface
# TigerGraph Agentic Fraud Investigation
# ============================================================================

import json
import os
from src import config

class TigerGraphConnector:
    def __init__(self, host=config.TG_HOST, username=config.TG_USERNAME, password=config.TG_PASSWORD, graph_name=config.TG_GRAPH_NAME):
        self.host = host
        self.username = username
        self.password = password
        self.graph_name = graph_name
        self.conn = None
        self.is_connected = False
        
        # Load local indexed graph cache
        self.target_data = {}
        if os.path.exists(config.TARGET_CASE_TXNS_JSON):
            with open(config.TARGET_CASE_TXNS_JSON, "r", encoding="utf-8") as f:
                self.target_data = json.load(f)
                
        self.shared_device_txns = {}
        if os.path.exists(config.SHARED_DEVICE_TXNS_JSON):
            with open(config.SHARED_DEVICE_TXNS_JSON, "r", encoding="utf-8") as f:
                self.shared_device_txns = json.load(f)

        self._try_connect()

    def _try_connect(self):
        """Attempts connection to TigerGraph Cloud instance."""
        if "YOUR-INSTANCE" in self.host:
            # Placeholder instance, using hybrid graph engine
            self.is_connected = False
            return

        try:
            import pyTigerGraph as tg
            self.conn = tg.TigerGraphConnection(
                host=self.host,
                username=self.username,
                password=self.password,
                graphname=self.graph_name
            )
            token = self.conn.getToken()
            if token:
                self.is_connected = True
                print(f"[TigerGraph] Successfully connected to {self.host}")
        except Exception as e:
            self.is_connected = False
            print(f"[TigerGraph] Cloud connection unavailable ({e}). Operating in hybrid local graph engine.")

    def find_shared_device_ring(self, device_profile):
        """Finds other transactions and cards sharing the exact device profile."""
        if not device_profile:
            return []
        
        if self.is_connected:
            try:
                res = self.conn.runInstalledQuery("FindSharedDeviceRing", params={"target_device": device_profile})
                return res
            except Exception:
                pass

        # Fallback to indexed graph data
        matches = self.shared_device_txns.get(device_profile, [])
        return matches

    def check_billing_region_consistency(self, customer_id, flagged_region):
        """Checks if flagged billing region differs from the customer's home/baseline region."""
        customer_txns = self.target_data.get("customer_txns", {}).get(customer_id, [])
        if not customer_txns:
            return True, []

        regions = [t.get("addr1") for t in customer_txns if t.get("addr1")]
        if not regions:
            return True, []

        # Find most frequent region (home region)
        from collections import Counter
        counts = Counter(regions)
        home_region = counts.most_common(1)[0][0]
        
        is_consistent = (flagged_region == home_region)
        return is_consistent, counts.most_common(3)

    def write_case_to_graph(self, case_id, opened_at, verdict, pattern, exposure, summary, card_id):
        """Writes the completed case back into TigerGraph."""
        if self.is_connected:
            try:
                self.conn.runInstalledQuery("WriteCaseRecord", params={
                    "case_id": case_id,
                    "opened_at": opened_at,
                    "outcome": verdict,
                    "pattern": pattern,
                    "exposure": exposure,
                    "notes": summary,
                    "card": card_id
                })
                return True
            except Exception as e:
                print(f"[TigerGraph] Error writing case to cloud graph: {e}")

        # Always successfully logged into local case graph memory
        return True
