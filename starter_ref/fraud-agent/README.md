# Agentic Fraud Investigation Agent (TigerGraph Task 04)

An AI agent that investigates flagged accounts, walks the transaction graph
to find fraud patterns invisible in a single row of data, and recommends a
next action with a confidence score — "graph meets AI detective."

## Why graph + AI

Fraud rarely shows up in one transaction. It shows up in **relationships**:
money moving in a circle, five "different" people using the same phone,
one account quietly splitting a big transfer into many small ones to dodge
a reporting threshold. A SQL table makes these relationships expensive to
find (self-joins on self-joins). A graph database is built to walk them in
milliseconds. The agent's job is to decide *which* graph query answers the
question at hand, then turn the raw graph result into a judgment call.

## What's fraud pattern is detected

| Pattern | What it looks like | Real-world meaning |
|---|---|---|
| **Circular flow** | A → B → C → A, tight time window, similar amounts | Layering / money laundering |
| **Shared device** | 5+ accounts all logging in from one device ID | Mule account ring, one operator |
| **Smurfing** | Many outgoing transfers just under a threshold (e.g. ₹10,000) | Structuring to avoid auto-flags |

## Architecture

```
data/*.csv  →  graph_engine.py (the graph)  →  agent.py (the reasoning)  →  verdict
                    ^
                    |
      gsql_queries.gsql = same queries, written for real TigerGraph
```

- **`generate_data.py`** — builds a synthetic dataset (accounts, devices,
  transactions) with the three fraud patterns above deliberately embedded
  among normal-looking activity, so the agent has to actually find them.
- **`graph_engine.py`** — loads the data into a graph and exposes four
  "queries": find cycles, find shared-device accounts, detect smurfing,
  and pull a 2-hop evidence neighborhood. Runs on `networkx` so you can
  demo with zero setup.
- **`gsql_queries.gsql`** — the exact same four queries, written in real
  GSQL for TigerGraph. **Swap this in once you get sponsor access** —
  the function signatures in `graph_engine.py` are written so you only
  need to change what's inside them (e.g. call the TigerGraph REST++ API
  via `pyTigerGraph` instead of `networkx`), not how `agent.py` calls them.
- **`agent.py`** — the "agentic" part. Given a flagged account, it decides
  what evidence to gather, then either (a) calls the real Claude API to
  reason over it, or (b) falls back to a transparent rule-based reasoner
  if no API key is set, so the whole pipeline runs out of the box.

## How to run it

```bash
pip install networkx
python generate_data.py      # creates data/*.csv
python agent.py A101         # investigate the laundering ring
python agent.py M03          # investigate a mule account
python agent.py A020         # investigate the smurfing account
python agent.py A005         # a normal account, for contrast — comes back clean
```

Optional — use real Claude reasoning instead of the rule-based fallback:

```bash
pip install anthropic
export ANTHROPIC_API_KEY=your_key_here
python agent.py A101
```

## Sample output

```
FRAUD INVESTIGATION REPORT — Account A101
Reasoning engine: rule-based fallback
--- Evidence gathered from graph ---
Cycles found: [['A101', 'A102', 'A103']]
Shared-device accounts: none
Smurfing check: {'is_smurfing': False, ...}
--- Agent verdict ---
Risk level:        MEDIUM
Confidence:        0.4
Recommended action: flag_for_review
Reasoning: Account is part of a circular transaction chain:
A101 -> A102 -> A103 -> A101. This is a classic money-laundering
layering pattern.
```

## If you get real TigerGraph access before the deadline

1. Spin up a free TigerGraph Cloud instance.
2. Run the schema + query definitions in `gsql_queries.gsql` via the GSQL
   shell (`gsql gsql_queries.gsql`).
3. Load `data/*.csv` using TigerGraph's Data Loader (map columns to the
   schema — it's a point-and-click UI).
4. In `graph_engine.py`, replace the `networkx` calls inside each method
   with `pyTigerGraph` calls to the installed queries (`conn.runInstalledQuery("FindCycles", ...)`).
   Nothing in `agent.py` needs to change.

## What to say in your submission / demo

- Lead with the **why**: fraud is a relationship problem, not a row
  problem — that's the whole pitch for graph + AI together.
- Show the **false-positive control**: the cycle detector doesn't just
  flag any loop, it requires a tight time window + similar amounts —
  mention this, it shows you thought about real-world noise, not just
  the happy path.
- Walk through **one full case** live (`python agent.py A101`) rather
  than just describing the code.
- Be upfront that the graph layer runs on `networkx` for the demo and is
  a straight swap to TigerGraph's GSQL (shown in `gsql_queries.gsql`) —
  this shows you understand what TigerGraph actually buys you (fast
  multi-hop traversal at scale) rather than just calling any graph a
  "TigerGraph agent."

## Ideas to extend if you have extra time before the 24th

- Let the LLM *choose* which query to run next based on the alert type,
  instead of always running all three (more truly "agentic").
- Add a simple Flask/Streamlit front end showing the subgraph visually.
- Add a "case history" so the agent's past verdicts on related accounts
  inform its confidence on new ones.
