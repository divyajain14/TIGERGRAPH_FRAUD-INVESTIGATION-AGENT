# DO THIS — Simple Checklist (deadline: 24th)

Follow top to bottom. Things marked 🧑 are for YOU to do by hand (2 minutes
each, mostly clicking). Things marked 💻 are already done for you in this
folder — just run the command shown.

---

### 1. 🧑 Read the actual task rules
Go to hhgoa.com → Notice Board → find "Task 04". Check:
- [ ] What exact format do they want? (a GitHub link? a zip? a video?)
- [ ] Exact deadline time on the 24th (not just the date)
- [ ] Do they give you a dataset, or do you bring your own? (we already
      built a fake dataset for you, so you're fine either way)

### 2. 🧑 Join the Telegram group
Open: https://t.me/twofourtysevenpm/2306
Just read pinned messages / recent messages for anything about TigerGraph
credits or extra instructions. No need to post anything yet.

### 3. 💻 Test the demo (works right now, no sign-ups needed)
In a terminal, inside the unzipped `fraud-agent` folder:
```
pip install networkx
python generate_data.py
python agent.py A101
```
If you see a "FRAUD INVESTIGATION REPORT" printed out — it worked. This
alone is submittable if you run out of time, but the next steps make it
much stronger.

### 4. 🧑 Get real TigerGraph access (free, ~5 minutes)
1. Go to **https://tgcloud.io**
2. Click Sign Up, use your email
3. Click "Create Solution" (or "New Instance") — pick the free tier
4. Give it any name, wait ~2 minutes for it to spin up
5. Once it's ready, click on it — you'll see a **hostname** (a URL ending
   in `.i.tgcloud.io`). Note it down.
6. You already set a **username** (usually `tigergraph`) and **password**
   when creating it — note those down too.

### 5. 🧑 Paste your 3 details into one file
Open `tigergraph_connector.py` in this folder (any text editor, even
Notepad). Near the top you'll see:
```python
TG_HOST = "https://YOUR-INSTANCE-NAME.i.tgcloud.io"
TG_USERNAME = "tigergraph"
TG_PASSWORD = "YOUR-PASSWORD-HERE"
```
Replace those 3 lines with your actual details from Step 4. Save the file.

### 6. 💻 Run the real setup (loads your data onto real TigerGraph)
```
pip install pyTigerGraph
python tigergraph_connector.py setup
```
This creates the schema and uploads your data. Takes a minute or two.

### 7. 💻 Test it on real TigerGraph
```
python tigergraph_connector.py test A101
```
You should see real GSQL query results printed from your own cloud
instance — this is your proof you actually used TigerGraph, not just a
simulation.

### 8. 🧑 (Optional, makes it stronger) Turn on real AI reasoning
Skip this if short on time — the rule-based fallback already works and is
explainable, which judges like.

If you want real Claude reasoning instead:
1. Get a key from https://console.anthropic.com (needs sign up)
2. Run: `pip install anthropic`
3. Run: `export ANTHROPIC_API_KEY=your_key_here` (Mac/Linux) or
   `set ANTHROPIC_API_KEY=your_key_here` (Windows)
4. Run `python agent.py A101` again — it'll now use real Claude.

### 9. 🧑 Submit
Package whatever the Notice Board asked for (Step 1) — probably a zip or
GitHub repo of this whole folder, plus a short write-up. Use the
"What to say in your submission" section in `README.md` for exactly what
to write.

---

**If you're stuck on any single step, tell me which number you're on and
what error/message you're seeing — paste it here and I'll fix it.**
