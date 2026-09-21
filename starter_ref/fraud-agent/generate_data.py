"""
generate_data.py
-----------------
Creates a synthetic dataset of accounts, transactions, and devices,
with a few deliberately embedded fraud patterns:

  1. A "fraud ring" of accounts that transact in a circle (A -> B -> C -> A)
     to launder money.
  2. A cluster of "mule" accounts that all share the same device ID
     (classic sign of one person controlling many fake accounts).
  3. A "smurfing" pattern: one account splits a large amount into many
     small transfers to different accounts, just under a reporting threshold.

The rest of the data is normal, everyday-looking transactions, so the
agent actually has to work to find the fraud instead of it being obvious.

Output: data/accounts.csv, data/transactions.csv, data/devices.csv
"""

import csv
import random
import os
from datetime import datetime, timedelta

random.seed(42)
os.makedirs("data", exist_ok=True)

N_NORMAL_ACCOUNTS = 40
START_DATE = datetime(2026, 8, 1)


def rand_time(day_offset_max=30):
    return START_DATE + timedelta(
        days=random.randint(0, day_offset_max),
        hours=random.randint(0, 23),
        minutes=random.randint(0, 59),
    )


accounts = []      # (account_id, name, city, opened_date)
devices = []       # (device_id, account_id)
transactions = []  # (txn_id, src, dst, amount, timestamp)

txn_counter = 1


def add_txn(src, dst, amount, ts):
    global txn_counter
    transactions.append((f"T{txn_counter:04d}", src, dst, round(amount, 2), ts.isoformat()))
    txn_counter += 1


# --- 1. Normal accounts + normal random transactions -----------------------
cities = ["Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune", "Kolkata"]
for i in range(1, N_NORMAL_ACCOUNTS + 1):
    acc_id = f"A{i:03d}"
    accounts.append((acc_id, f"User_{i}", random.choice(cities), rand_time(0).date().isoformat()))
    devices.append((f"D{i:03d}", acc_id))  # each normal user, own device

normal_ids = [a[0] for a in accounts]
for _ in range(150):
    src, dst = random.sample(normal_ids, 2)
    add_txn(src, dst, random.uniform(50, 5000), rand_time())


# --- 2. Fraud ring: circular laundering (A101 -> A102 -> A103 -> A101) ------
ring_ids = ["A101", "A102", "A103"]
for i, acc_id in enumerate(ring_ids):
    accounts.append((acc_id, f"RingUser_{i+1}", random.choice(cities), rand_time(0).date().isoformat()))
    devices.append((f"D10{i+1}", acc_id))

ring_amount = 48000  # just under a common 50,000 reporting threshold
base_time = rand_time(20)
for i in range(3):
    src = ring_ids[i]
    dst = ring_ids[(i + 1) % 3]
    add_txn(src, dst, ring_amount, base_time + timedelta(minutes=i * 10))
    ring_amount *= 0.97  # small cut taken at each hop, typical of layering


# --- 3. Mule cluster: 5 accounts sharing ONE device -------------------------
mule_device = "D999"
mule_ids = [f"M{i:02d}" for i in range(1, 6)]
for i, acc_id in enumerate(mule_ids):
    accounts.append((acc_id, f"MuleUser_{i+1}", "Bangalore", rand_time(0).date().isoformat()))
    devices.append((mule_device, acc_id))  # <-- same device for all 5

# money flows into the mule accounts from random normal accounts, then
# quickly consolidates out to one "collector" account
collector = "A101"  # reuse ring account as the collector -> links the two patterns
for acc_id in mule_ids:
    src = random.choice(normal_ids)
    add_txn(src, acc_id, random.uniform(9000, 9900), rand_time(25))
    add_txn(acc_id, collector, random.uniform(8800, 9800), rand_time(26))


# --- 4. Smurfing: A020 splits a big amount into many small transfers -------
smurf_src = "A020"
smurf_targets = random.sample(normal_ids, 8)
t0 = rand_time(15)
for i, dst in enumerate(smurf_targets):
    add_txn(smurf_src, dst, random.uniform(9500, 9950), t0 + timedelta(minutes=i * 2))


# --- write CSVs --------------------------------------------------------------
with open("data/accounts.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["account_id", "name", "city", "opened_date"])
    w.writerows(accounts)

with open("data/devices.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["device_id", "account_id"])
    w.writerows(devices)

with open("data/transactions.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["txn_id", "src_account", "dst_account", "amount", "timestamp"])
    w.writerows(transactions)

print(f"Generated {len(accounts)} accounts, {len(devices)} device links, {len(transactions)} transactions.")
print("Embedded fraud patterns:")
print("  - Circular ring: A101 -> A102 -> A103 -> A101")
print("  - Mule cluster on shared device D999: M01..M05 -> collector A101")
print("  - Smurfing: A020 splits funds across 8 accounts, each just under 10,000")
