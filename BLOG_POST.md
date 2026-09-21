# Building an Agentic Fraud Investigator with TigerGraph: Moving from Uncertain Signals to Defensible Next-Best Actions

*Submitted for TigerGraph × Hacker House Goa (HHGOA) 2026 Hackathon*

---

## 1. Executive Summary & What We Built

Modern fraud detection in financial institutions faces a fundamental paradox: models produce thousands of probabilistic risk alerts each day, yet human analysts must manually correlate transactions, parse device fingerprints, review bank policies, and decide whether to block an account or file a suspicious activity report. When money is on the line, acting too slowly lets fraudsters drain funds, while acting precipitously on an ambiguous signal blocks innocent customers.

To solve this, we built the **TigerGraph Agentic Fraud Investigator**—an autonomous, policy-aware AI agent that investigates fraud alerts, resolves uncertainty through controlled evidence-gathering, detects complex syndicated attack rings, and recommends auditable **Next-Best Actions (NBA)** with calibrated approval routes (`auto`, `L1`, `L2`).

Our agent was evaluated on the **20 official benchmark exam cases (`HHG-001` through `HHG-020`)** derived from the IEEE-CIS fraud dataset, successfully generating 100% compliant answer files, identifying undocumented bot rings, and producing defensible FinCEN-compliant Suspicious Activity Reports (SAR).

---

## 2. System Architecture

The solution couples **TigerGraph's high-performance graph database** with an agentic reasoning loop:

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

### Core Pipeline Components:
1. **Trigger Intake**: Ingests risk-score alerts, customer disputes, or analyst requests.
2. **Graph Expansion**: Traverses customer transaction histories, merchant locations, and shared device profiles.
3. **GraphRAG & Case Memory**: Searches 5,565 historical closed investigations (`CC-0001` to `CC-5565`) to retrieve relevant precedents.
4. **Policy & Uncertainty Engine**: Evaluates evidence under bank rules R1–R10, recognizing when to verify before blocking (Rule R1) or identify disputed subscriptions (Rule R7).
5. **Next-Best Action & Approval Routing**: Produces both initial and post-evidence recommendations routed to automated execution (`auto`), team leads (`L1`), or fraud managers (`L2`).
6. **Regulatory SAR Generation**: Automatically drafts full FinCEN-compliant narratives (Who, What, When, Where, How, and Why) whenever regulatory thresholds are met.
7. **Graph Write-Back**: Persists newly completed investigations back into TigerGraph as new case vertices to enrich institutional memory.

---

## 3. How TigerGraph Is Used

Graph structures are uniquely suited for fraud investigation because fraudsters do not operate in isolation—they leave relational footprints across shared devices, proxies, cards, and temporal clusters. 

We modeled the domain in TigerGraph using the following schema:
- **Vertices**: `Customer`, `Card`, `Transaction`, `DeviceProfile` (DeviceInfo + OS + Browser + Screen), `BillingRegion`, `EmailDomain`, and `ClosedCase`.
- **Edges**: `OWNS` (`Customer` → `Card`), `MADE` (`Card` → `Transaction`), `FROM_DEVICE` (`Transaction` → `DeviceProfile`), `BILLED_IN` (`Transaction` → `BillingRegion`), `NEXT` (`Transaction` → `Transaction`), and `ON_CARD` (`ClosedCase` → `Card`).

### Key GSQL Queries Implemented:
* **`FindSharedDeviceRing`**: Traverses from a card's transactions to its device profiles, and then hops outward to uncover other cards and customers utilizing the identical device footprint. This query unlocked our discovery of the massive `SM-G935F` bot syndicate in benchmark case `HHG-014` (52 linked customer accounts and over $16,500 in exposure).
* **`DetectOutOfRegionUse`**: Computes geographical consistency by querying the customer's historical billing regions against a flagged card-present transaction. In case `HHG-018`, this detected physical transactions occurring in two distant regions within an impossible 8-minute window, immediately confirming counterfeit card cloning.
* **`RetrieveSimilarCases` & `WriteCaseRecord`**: Treats TigerGraph as a live Case Memory repository, retrieving precedents and writing newly resolved cases back to the graph.

---

## 4. Agentic Capabilities Implemented

1. **Handling Uncertainty (Rule R1)**: Rather than treating risk scores as verdicts, the agent recognizes that a single weak signal (<0.70 probability) requires verification (`VERIFY_WITH_CUSTOMER` or `STEP_UP_AUTH`) before blocking.
2. **Subscription Dispute Recognition (Rule R7)**: When customer C13171 disputed a $55.68 charge (`HHG-008`), the agent analyzed historical transaction cadence, discovered identical monthly charges on the 19th of each prior month, and advised customer warning and cancellation assistance without disrupting the cardholder.
3. **Evolving Next-Best Actions**: The agent models dynamic decision-making by recording its recommendations *before* evidence is requested, simulating controlled customer/analyst responses, and updating its final recommendations.
4. **Distinguishing Cases from Reports**: The agent distinguishes internal case records (`CREATE_CASE`) from regulatory filings (`FILE_REPORT`), reserving SARs strictly for cases exceeding $1,000 exposure, multi-card rings, or undocumented syndicates.

---

## 5. Key Lessons Learned

* **Risk Scores Are Not Truth**: A 0.87 score can easily be a false alarm on a customer transacting in their own home region (`HHG-007`), while a 0.05 score can mask a multi-account proxy botnet (`HHG-014`). Graph context is essential to disambiguate raw model outputs.
* **Graph Memory Compounds in Value**: Grounding agent reasoning in 5,565 closed historical cases allowed the agent to cite exact historical precedent cases (e.g. `CC-2649`, `CC-2971`) when categorizing undocumented proxy fraud.

---

## 6. What We Would Improve With More Time

* **Real-Time Graph Streaming**: Ingest live transaction feeds directly into TigerGraph via Kafka/Flink connectors for real-time edge insertion.
* **Graph Neural Network (GNN) Embeddings**: Train TigerGraph ML Workbench GNN embeddings to automatically score topological anomaly subgraphs before LLM reasoning.
* **Interactive Analyst Chat**: Expand the analyst dashboard with a bidirectional chat interface allowing human investigators to interrogate graph paths conversationally.

---

## 7. Social Media Post (X / LinkedIn)

```
Just built an Agentic Fraud Investigator powered by @TigerGraphDB for the Hacker House Goa (HHGOA) 2026 Hackathon! 🚀

Our AI agent navigates 590k+ transactions, performs multi-hop GSQL traversals to uncover bot syndicates, resolves uncertainty with controlled evidence gathering, and recommends Next-Best Actions under strict banking policies.

Check out our full architecture, graph schema, and 20 benchmark case findings: [Link to Repo/Blog]

#TigerGraph #GraphRAG #AI #FinTech #AgenticAI #FraudDetection #HHGOA
```
