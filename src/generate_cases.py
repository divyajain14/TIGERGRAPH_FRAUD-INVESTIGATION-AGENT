# ============================================================================
# Benchmark Runner & Answer Validator
# Runs agent on 20 benchmark cases and outputs cases/<case_id>.json
# ============================================================================

import csv
import json
import os
import sys

# Ensure src is in python path
current_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(current_dir)
if project_dir not in sys.path:
    sys.path.insert(0, project_dir)

from src import config
from src.agent import FraudInvestigatorAgent

def validate_case_format(data):
    """Strictly validates that generated JSON conforms to the hackathon answer format."""
    required_top = ["case_id", "case", "evidence_requests", "next_best_actions", "sar", "stop_reason", "tool_calls", "tokens", "latency_s"]
    for k in required_top:
        assert k in data, f"Missing top-level key '{k}'"

    c = data["case"]
    required_case = ["status", "verdict", "fraud_probability", "pattern", "pattern_description", 
                     "affected_txn_ids", "first_suspicious_txn_id", "connected_card_ids", 
                     "connected_device_profiles", "exposure_usd", "evidence", "similar_prior_cases", 
                     "summary", "written_to_graph", "graph_case_id"]
    for k in required_case:
        assert k in c, f"Missing case key '{k}'"

    assert c["verdict"] in ["fraud", "legitimate", "uncertain"], f"Invalid verdict: {c['verdict']}"
    assert c["status"] in ["open", "closed_fraud", "closed_legitimate", "escalated"], f"Invalid status: {c['status']}"

    sar = data["sar"]
    required_sar = ["file", "reason", "narrative", "subjects", "total_amount_usd", "activity_dates"]
    for k in required_sar:
        assert k in sar, f"Missing sar key '{k}'"

    nba = data["next_best_actions"]
    assert "initial" in nba and "final" in nba and "what_changed" in nba, "Missing next_best_actions keys"

    return True

def main():
    os.makedirs(config.CASES_DIR, exist_ok=True)
    print("Initializing FraudInvestigatorAgent...")
    agent = FraudInvestigatorAgent()

    # Load case pack
    case_pack = []
    with open(config.CASE_PACK_CSV, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for r in reader:
            case_pack.append(r)

    print(f"\n=======================================================")
    print(f"Running Agent on {len(case_pack)} Benchmark Exam Cases")
    print(f"=======================================================\n")

    generated_count = 0
    total_exposure = 0.0
    fraud_count = 0
    legit_count = 0
    sar_count = 0

    for idx, c_info in enumerate(case_pack, 1):
        case_id = c_info["case_id"]
        print(f"[{idx}/{len(case_pack)}] Investigating {case_id} (Trigger: {c_info['trigger_type']})...")
        
        case_result = agent.investigate_case(c_info)
        validate_case_format(case_result)

        # Save to cases/<case_id>.json
        out_file = os.path.join(config.CASES_DIR, f"{case_id}.json")
        with open(out_file, "w", encoding="utf-8") as f:
            json.dump(case_result, f, indent=2)

        verdict = case_result["case"]["verdict"]
        pattern = case_result["case"]["pattern"]
        exposure = case_result["case"]["exposure_usd"]
        filed_sar = case_result["sar"]["file"]

        if verdict == "fraud":
            fraud_count += 1
            total_exposure += exposure
        else:
            legit_count += 1

        if filed_sar:
            sar_count += 1

        print(f"   -> Verdict: {verdict.upper()} | Pattern: {pattern} | Exp: ${exposure:.2f} | SAR: {filed_sar} | Actions: {len(case_result['next_best_actions']['final'])}")
        generated_count += 1

    print(f"\n=======================================================")
    print(f"Benchmark Complete! Successfully generated {generated_count} / 20 case files.")
    print(f"Cases Directory: {config.CASES_DIR}")
    print(f"Summary: {fraud_count} Fraud, {legit_count} Legitimate, {sar_count} SAR Filings.")
    print(f"Total Identified Fraud Exposure: ${total_exposure:.2f}")
    print(f"=======================================================\n")

if __name__ == "__main__":
    main()
