# ============================================================================
# Configuration for TigerGraph Agentic Fraud Investigation
# ============================================================================

import os

# Set your TigerGraph Cloud (Savanna) credentials here:
TG_HOST = os.environ.get("TG_HOST", "https://YOUR-INSTANCE.i.tgcloud.io")
TG_USERNAME = os.environ.get("TG_USERNAME", "tigergraph")
TG_PASSWORD = os.environ.get("TG_PASSWORD", "tigergraph")
TG_GRAPH_NAME = "FraudGraph"
TG_SECRET = os.environ.get("TG_SECRET", "")

# Local Data Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
CASES_DIR = os.path.join(BASE_DIR, "cases")

TRANSACTIONS_CSV = os.path.join(DATA_DIR, "transactions.csv")
IDENTITY_CSV = os.path.join(DATA_DIR, "identity.csv")
CLOSED_CASES_CSV = os.path.join(DATA_DIR, "closed_cases_history.csv")
CASE_PACK_CSV = os.path.join(DATA_DIR, "case_pack.csv")
TARGET_CASE_TXNS_JSON = os.path.join(DATA_DIR, "target_case_txns.json")
SHARED_DEVICE_TXNS_JSON = os.path.join(DATA_DIR, "shared_device_txns.json")
