# ============================================================================
# Case Memory & Precedent Retrieval Engine
# TigerGraph Agentic Fraud Investigation
# ============================================================================

import csv
import os
from src import config

class CaseMemoryEngine:
    def __init__(self, closed_cases_path=config.CLOSED_CASES_CSV):
        self.closed_cases = []
        self.cases_by_pattern = {}
        self.cases_by_card = {}
        self.load_cases(closed_cases_path)

    def load_cases(self, path):
        if not os.path.exists(path):
            print(f"Warning: Closed cases file not found at {path}")
            return

        with open(path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                self.closed_cases.append(row)
                pat = row.get("pattern", "none")
                card = row.get("card_id", "")
                self.cases_by_pattern.setdefault(pat, []).append(row)
                if card:
                    self.cases_by_card.setdefault(card, []).append(row)

        print(f"[CaseMemoryEngine] Loaded {len(self.closed_cases)} historical cases into memory.")

    def retrieve_similar_cases(self, pattern, exposure=None, device_keywords=None, limit=3):
        """
        Retrieves relevant closed cases based on pattern, exposure similarity, and device info.
        """
        candidates = self.cases_by_pattern.get(pattern, [])
        if not candidates:
            # Fallback to general cases
            candidates = self.closed_cases[:50]

        scored_cases = []
        for c in candidates:
            score = 1.0
            notes = c.get("analyst_notes", "").lower()
            
            # Match device keywords if provided
            if device_keywords:
                for kw in device_keywords:
                    if kw.lower() in notes:
                        score += 5.0

            # Match exposure range if provided
            if exposure is not None and exposure > 0:
                try:
                    hist_exp = float(c.get("exposure_usd", 0))
                    diff_ratio = abs(hist_exp - exposure) / (exposure + 1e-5)
                    score += max(0, 3.0 - diff_ratio)
                except ValueError:
                    pass

            scored_cases.append((score, c["case_id"]))

        scored_cases.sort(key=lambda x: x[0], reverse=True)
        top_case_ids = [cid for _, cid in scored_cases[:limit]]
        return top_case_ids

    def write_case_to_memory(self, case_record):
        """
        Writes a new case to in-memory case store and graph memory log.
        """
        self.closed_cases.append(case_record)
        pat = case_record.get("pattern", "none")
        self.cases_by_pattern.setdefault(pat, []).append(case_record)
        return True
