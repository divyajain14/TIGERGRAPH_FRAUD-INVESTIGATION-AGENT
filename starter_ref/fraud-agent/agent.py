"""
agent.py
---------
The "agentic" layer on top of the graph.

Given an alert (just an account_id that some upstream system flagged,
e.g. "unusual login" or "large transfer"), this agent:

  1. Decides which graph queries to run (cycles? shared device? smurfing?)
  2. Runs them via graph_engine.FraudGraph
  3. Hands the evidence to an LLM to reason over and produce a
     recommendation + confidence score + human-readable justification

If you have an ANTHROPIC_API_KEY set as an environment variable, it will
call the real Claude API. If not, it falls back to a transparent rule-based
reasoner (FALLBACK_REASONER below) so you can demo the full pipeline with
zero API cost/setup, then flip on the real LLM later for the final polish.

Usage:
    python agent.py A101
    python agent.py M03
    python agent.py A020
"""

import os
import sys
import json
from graph_engine import FraudGraph

DATA_DIR = "data"


# ---------------------------------------------------------------------------
# Step 1: the "decide which queries to run" logic. In a fuller version this
# itself could be an LLM call ("given this alert type, which tools should I
# use?") — kept as simple explicit logic here so the demo is fast and cheap.
# ---------------------------------------------------------------------------
def investigate(account_id, graph: FraudGraph):
    evidence = graph.get_subgraph_summary(account_id, hops=2)
    return evidence


# ---------------------------------------------------------------------------
# Step 2a: real LLM reasoning (used if ANTHROPIC_API_KEY is set)
# ---------------------------------------------------------------------------
def llm_reason(evidence):
    import anthropic

    client = anthropic.Anthropic()  # reads ANTHROPIC_API_KEY from env

    prompt = f"""You are a fraud investigation analyst. You have been given
graph evidence about a flagged account. Analyze it and respond with STRICT
JSON only, no markdown, no preamble, in this exact shape:

{{
  "risk_level": "low" | "medium" | "high",
  "confidence": <float 0.0-1.0>,
  "recommended_action": "ignore" | "monitor" | "flag_for_review" | "freeze_account",
  "reasoning": "<2-4 sentence explanation citing specific evidence>"
}}

Evidence for account {evidence['account_id']}:
{json.dumps(evidence, indent=2)}
"""

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=500,
        messages=[{"role": "user", "content": prompt}],
    )
    text = response.content[0].text.strip()
    text = text.replace("```json", "").replace("```", "").strip()
    return json.loads(text)


# ---------------------------------------------------------------------------
# Step 2b: fallback rule-based reasoner — no API key needed. This is what
# runs out of the box so you can demo immediately. It's intentionally
# transparent (not a black box) which is a nice thing to show judges too:
# "graph gives ground truth, LLM/rules turn it into a judgment call."
# ---------------------------------------------------------------------------
def fallback_reason(evidence):
    reasons = []
    risk_score = 0

    if evidence["cycles_found"]:
        risk_score += 40
        reasons.append(
            f"Account is part of a circular transaction chain: "
            f"{' -> '.join(evidence['cycles_found'][0] + [evidence['cycles_found'][0][0]])}. "
            f"This is a classic money-laundering layering pattern."
        )

    if evidence["shared_device_accounts"]:
        risk_score += 35
        reasons.append(
            f"Account shares a device with {len(evidence['shared_device_accounts'])} "
            f"other account(s): {', '.join(evidence['shared_device_accounts'])}. "
            f"Strong signal of a single operator controlling multiple identities (mule ring)."
        )

    if evidence["smurfing"]["is_smurfing"]:
        risk_score += 30
        reasons.append(
            f"Account made {evidence['smurfing']['num_near_threshold_txns']} outgoing "
            f"transactions just under the reporting threshold — a classic 'smurfing' "
            f"pattern used to avoid automatic flags."
        )

    if not reasons:
        reasons.append("No suspicious graph patterns found in the account's 2-hop neighborhood.")

    risk_score = min(risk_score, 100)
    if risk_score >= 60:
        level, action = "high", "freeze_account"
    elif risk_score >= 30:
        level, action = "medium", "flag_for_review"
    elif risk_score > 0:
        level, action = "low", "monitor"
    else:
        level, action = "low", "ignore"

    return {
        "risk_level": level,
        "confidence": round(risk_score / 100, 2),
        "recommended_action": action,
        "reasoning": " ".join(reasons),
    }


def run(account_id):
    graph = FraudGraph(
        f"{DATA_DIR}/accounts.csv",
        f"{DATA_DIR}/transactions.csv",
        f"{DATA_DIR}/devices.csv",
    )
    evidence = investigate(account_id, graph)

    use_llm = bool(os.environ.get("ANTHROPIC_API_KEY"))
    if use_llm:
        try:
            verdict = llm_reason(evidence)
            mode = "Claude LLM"
        except Exception as e:
            print(f"[warning] LLM call failed ({e}), falling back to rule-based reasoner.\n")
            verdict = fallback_reason(evidence)
            mode = "rule-based fallback"
    else:
        verdict = fallback_reason(evidence)
        mode = "rule-based fallback (set ANTHROPIC_API_KEY to use real Claude reasoning)"

    print("=" * 70)
    print(f"FRAUD INVESTIGATION REPORT — Account {account_id}")
    print(f"Reasoning engine: {mode}")
    print("=" * 70)
    print("\n--- Evidence gathered from graph ---")
    print(f"Related accounts in 2-hop neighborhood: {evidence['num_related_accounts']}")
    print(f"Cycles found: {evidence['cycles_found'] or 'none'}")
    print(f"Shared-device accounts: {evidence['shared_device_accounts'] or 'none'}")
    print(f"Smurfing check: {evidence['smurfing']}")

    print("\n--- Agent verdict ---")
    print(f"Risk level:        {verdict['risk_level'].upper()}")
    print(f"Confidence:        {verdict['confidence']}")
    print(f"Recommended action: {verdict['recommended_action']}")
    print(f"Reasoning: {verdict['reasoning']}")
    print()
    return verdict


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python agent.py <account_id>")
        print("Try: python agent.py A101   (ring member)")
        print("     python agent.py M03    (mule account)")
        print("     python agent.py A020   (smurfing account)")
        print("     python agent.py A005   (normal account, for contrast)")
        sys.exit(1)
    run(sys.argv[1])
