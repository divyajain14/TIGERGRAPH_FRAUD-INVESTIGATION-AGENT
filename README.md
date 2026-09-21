# TigerGraph Agentic Fraud Investigation & Next-Best Action Engine
**Hacker House Goa (HHGOA) 2026 Hackathon Submission**

An autonomous, policy-aware AI Fraud Investigation Agent powered by **TigerGraph Savanna (Graph + Vector + GSQL)**, designed to investigate ambiguous fraud signals, resolve uncertainty through controlled evidence requests, discover coordinated fraud rings, and recommend compliant **Next-Best Actions (NBA)** with automated and human-in-the-loop approval routing.

---

## Architecture Overview

```
                          [ Incoming Trigger ]
        (Risk Score Anomaly / Customer Dispute / Analyst Request)
                                    |
                                    v
                     +-----------------------------+
                     |  Fraud Investigator Agent   |
                     +-----------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
+------------------------+                      +------------------------+
|  TigerGraph Savanna    |                      |  Case Memory Engine    |
|  - Entity Resolution   |                      |  - Precedent Search    |
|  - Shared Device Rings |                      |  - 5,565 Closed Cases  |
|  - Velocity & Traversal|                      |  - Graph Write-Back    |
+------------------------+                      +------------------------+
            |                                               |
            +-----------------------+-----------------------+
                                    |
                                    v
                     +-----------------------------+
                     |   Uncertainty Evaluator     |
                     |  - Weak Signal Verification |
                     |  - Policy Rules R1 - R10    |
                     +-----------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
+------------------------+                      +------------------------+
| Next-Best Actions      |                      | Regulatory Compliance  |
| - Initial vs Final     |                      | - FinCEN SAR Generator |
| - Routing: auto, L1, L2|                      | - Defensible Narrative |
+------------------------+                      +------------------------+
```

---

## Key Features

1. **Graph Pattern Recognition**:
   - Accurately detects the 5 known typologies (`card_testing`, `card_not_present_fraud`, `card_not_present_new_device`, `out_of_region_use`, `account_takeover`).
   - Identifies **undocumented bot syndicates** (e.g. `SM-G935F` proxy botnet across 52 accounts with $16k+ exposure).
2. **Policy Compliance (Rules R1–R10)**:
   - Evaluates uncertainty on weak signals (<0.70 probability) and requests customer validation before blocking (Rule R1).
   - Identifies disputed recurring subscriptions (Rule R7) without blocking legitimate cardholders.
   - Assigns strict approval tiers: `auto` (safe actions), `L1` (team lead for declines and blocks $\le \$2,500$), and `L2` (fraud manager for blocks $> \$2,500$ and mandatory SAR filings).
3. **Graph Case Memory**:
   - Searches historical closed investigations (`CC-0001` to `CC-5565`) to ground agent reasoning in bank precedents.
   - Automatically writes new case vertices and edges back into TigerGraph (`written_to_graph: true`).
4. **FinCEN Regulatory SAR Generator**:
   - Produces 6–12 sentence standalone regulatory narratives satisfying FinCEN standards whenever mandatory filing thresholds are met.
5. **Interactive Analyst Dashboard**:
   - Sleek UI with interactive entity subgraphs, before/after action progressions, and audit trails for all 20 exam cases.

---

## Project Structure

```
tigergraph-fraud-agent/
├── cases/                     # 20 Official Benchmark Case JSON Files (HHG-001 to HHG-020)
│   ├── HHG-001.json
│   └── ...
├── data/                      # Dataset (transactions, identity, closed cases, case pack)
├── src/
│   ├── agent.py               # Core Agentic Investigation & Reasoning Engine
│   ├── case_memory.py         # Historical Precedent Retrieval & Memory Write-Back
│   ├── tigergraph_connector.py# TigerGraph Cloud & Graph Traversal Interface
│   ├── config.py              # Configuration & Credentials
│   └── generate_cases.py      # Benchmark runner and schema validator
├── tigergraph/
│   └── schema_and_queries.gsql# Complete TigerGraph Schema & GSQL Queries
├── web/
│   ├── index.html             # Interactive Analyst Dashboard
│   └── app.js                 # UI logic & bundled case visualizer
├── BLOG_POST.md               # Technical Blog Post for Submission
└── README.md                  # Project Documentation
```

---

## Quickstart & How to Run

### 1. Run the Benchmark Generator
To run the agent on all 20 exam cases and regenerate the answer files in `cases/`:
```bash
python src/generate_cases.py
```

### 2. Launch the Analyst Dashboard
Simply open `web/index.html` in any web browser! You can inspect all 20 cases, visualize the TigerGraph subgraphs, examine the evidence logs, and review the before/after action timelines.

### 3. Deploy to TigerGraph Cloud (Savanna)
1. Log into [tgcloud.io](https://tgcloud.io) and create a free TigerGraph instance.
2. Open **GraphStudio** or the **GSQL Console**.
3. Copy and paste the contents of `tigergraph/schema_and_queries.gsql` to create the schema and install analytical queries with one click.
4. Set your credentials in `src/config.py` (or via environment variables `TG_HOST` and `TG_PASSWORD`).
