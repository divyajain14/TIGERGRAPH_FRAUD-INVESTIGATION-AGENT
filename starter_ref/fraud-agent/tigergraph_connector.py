"""
tigergraph_connector.py
-------------------------
DROP-IN replacement for the local networkx demo, using REAL TigerGraph Cloud.

You (the human) only need to do 3 things — no coding required:

  1. Go to https://tgcloud.io and sign up free (needs your email).
  2. Create a free instance/solution. Give it any name.
  3. Once it's running, TigerGraph gives you:
       - a hostname (looks like: https://something.i.tgcloud.io)
       - a username (default: tigergraph)
       - a password (you set this when creating the instance)
     Paste those 3 values into the CONFIG section right below.

Then run, in this order:
    python tigergraph_connector.py setup     # creates schema + loads your data
    python tigergraph_connector.py test A101 # runs a real query on TigerGraph

After that, agent.py can be pointed at this file instead of graph_engine.py
(see the bottom of this file for the 1-line swap).
"""

# =========================================================================
# STEP 3 ABOVE GOES HERE — fill these in, nothing else to code
# =========================================================================
TG_HOST = "https://YOUR-INSTANCE-NAME.i.tgcloud.io"   # <-- paste your hostname
TG_USERNAME = "tigergraph"                             # <-- usually stays default
TG_PASSWORD = "YOUR-PASSWORD-HERE"                     # <-- paste your password
GRAPH_NAME = "FraudGraph"
# =========================================================================

import sys
import csv


def get_connection():
    import pyTigerGraph as tg
    conn = tg.TigerGraphConnection(
        host=TG_HOST,
        username=TG_USERNAME,
        password=TG_PASSWORD,
        graphname=GRAPH_NAME,
    )
    conn.getToken(conn.createSecret())
    return conn


def setup():
    """Creates the schema on your TigerGraph instance and loads data/*.csv."""
    import pyTigerGraph as tg

    print("Connecting to TigerGraph Cloud...")
    conn = tg.TigerGraphConnection(host=TG_HOST, username=TG_USERNAME, password=TG_PASSWORD)

    print("Creating schema (Account, Device, Transacted_With, Uses_Device)...")
    with open("gsql_queries.gsql") as f:
        gsql_script = f.read()
    # Run just the schema-creation lines (everything before the first CREATE QUERY)
    schema_part = gsql_script.split("CREATE QUERY")[0]
    print(conn.gsql(schema_part))

    conn.graphname = GRAPH_NAME
    conn.getToken(conn.createSecret())

    print("Loading accounts.csv...")
    with open("data/accounts.csv") as f:
        rows = list(csv.DictReader(f))
    for row in rows:
        conn.upsertVertex("Account", row["account_id"], {
            "name": row["name"], "city": row["city"], "opened_date": row["opened_date"]
        })

    print("Loading devices.csv...")
    with open("data/devices.csv") as f:
        for row in csv.DictReader(f):
            conn.upsertVertex("Device", row["device_id"], {})
            conn.upsertEdge("Account", row["account_id"], "Uses_Device", "Device", row["device_id"])

    print("Loading transactions.csv...")
    with open("data/transactions.csv") as f:
        for row in csv.DictReader(f):
            conn.upsertEdge(
                "Account", row["src_account"], "Transacted_With", "Account", row["dst_account"],
                {"txn_id": row["txn_id"], "amount": float(row["amount"]), "timestamp": row["timestamp"]}
            )

    print("\nInstalling the 4 GSQL queries (FindCycles, SharedDeviceRing, SmurfingDetector, GetNeighborhood)...")
    queries_part = "CREATE QUERY" + gsql_script.split("CREATE QUERY", 1)[1]
    print(conn.gsql(f"USE GRAPH {GRAPH_NAME}\n{queries_part}\nINSTALL QUERY ALL"))

    print("\n✅ Setup complete! Your data is live on real TigerGraph Cloud.")
    print("Try: python tigergraph_connector.py test A101")


def test(account_id):
    """Runs the real GSQL queries against your live TigerGraph instance."""
    conn = get_connection()

    print(f"Running FindCycles on {account_id}...")
    print(conn.runInstalledQuery("FindCycles", {"start": account_id}))

    print(f"\nRunning SharedDeviceRing on {account_id}...")
    print(conn.runInstalledQuery("SharedDeviceRing", {"start": account_id}))

    print(f"\nRunning SmurfingDetector on {account_id}...")
    print(conn.runInstalledQuery("SmurfingDetector", {"start": account_id}))


# =========================================================================
# Optional: real-TigerGraph version of FraudGraph, same interface as
# graph_engine.FraudGraph, so agent.py doesn't need any changes at all.
# To switch agent.py to use this, change the import line in agent.py from
#     from graph_engine import FraudGraph
# to
#     from tigergraph_connector import FraudGraph
# =========================================================================
class FraudGraph:
    def __init__(self, *args, **kwargs):
        # args are ignored — real TigerGraph doesn't need local CSV paths,
        # the data already lives on the server after you run `setup()`.
        self.conn = get_connection()

    def get_subgraph_summary(self, account_id, hops=2):
        cycles = self.conn.runInstalledQuery("FindCycles", {"start": account_id, "max_hops": hops + 2})
        shared_device = self.conn.runInstalledQuery("SharedDeviceRing", {"start": account_id})
        smurfing = self.conn.runInstalledQuery("SmurfingDetector", {"start": account_id})
        neighborhood = self.conn.runInstalledQuery("GetNeighborhood", {"start": account_id, "hops": hops})

        shared_accounts = [r["v_id"] for r in shared_device[0]["RelatedAccounts"]] if shared_device else []
        smurf_result = smurfing[0] if smurfing else {}

        return {
            "account_id": account_id,
            "num_related_accounts": len(neighborhood[0]["Result"]) if neighborhood else 0,
            "edges": [],  # populate from neighborhood result if you want full edge detail
            "shared_device_accounts": shared_accounts,
            "cycles_found": cycles,
            "smurfing": {
                "is_smurfing": smurf_result.get("is_likely_smurfing", False),
                "num_near_threshold_txns": smurf_result.get("near_threshold_txn_count", 0),
                "targets": [],
            },
        }


if __name__ == "__main__":
    if len(sys.argv) < 2 or sys.argv[1] not in ("setup", "test"):
        print("Usage:")
        print("  python tigergraph_connector.py setup       # one-time: create schema + load data")
        print("  python tigergraph_connector.py test A101   # run queries on a real account")
        sys.exit(1)

    if TG_HOST.startswith("https://YOUR-INSTANCE"):
        print("⚠️  You haven't filled in TG_HOST / TG_PASSWORD at the top of this file yet.")
        print("    Open tigergraph_connector.py and paste in your tgcloud.io details first.")
        sys.exit(1)

    if sys.argv[1] == "setup":
        setup()
    else:
        test(sys.argv[2])
