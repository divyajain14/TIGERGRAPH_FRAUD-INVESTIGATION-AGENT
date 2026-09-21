import json
import os

cases_dir = r"C:\Users\divya jain\.gemini\antigravity\scratch\tigergraph-fraud-agent\cases"
all_cases = []

for i in range(1, 21):
    case_id = f"HHG-{i:03d}"
    case_path = os.path.join(cases_dir, f"{case_id}.json")
    if os.path.exists(case_path):
        with open(case_path, "r", encoding="utf-8") as f:
            all_cases.append(json.load(f))

js_content = f"""// Generated Bundle of All 20 Benchmark Cases for TigerGraph UI
const benchmarkCases = {json.dumps(all_cases, indent=2)};

let currentCase = benchmarkCases[0];
let networkInstance = null;

function renderCaseList() {{
    const container = document.getElementById('case-list-container');
    container.innerHTML = '';
    
    benchmarkCases.forEach((c, idx) => {{
        const isFraud = c.case.verdict === 'fraud';
        const card = document.createElement('div');
        card.className = `case-card ${{c.case_id === currentCase.case_id ? 'active' : ''}}`;
        card.onclick = () => selectCase(c.case_id);
        
        card.innerHTML = `
            <div class="case-card-header">
                <span class="case-card-id">${{c.case_id}}</span>
                <span class="badge-verdict ${{isFraud ? 'badge-fraud' : 'badge-legit'}}">${{c.case.verdict.toUpperCase()}}</span>
            </div>
            <div class="case-card-sub">
                <span>${{c.case.pattern.replace(/_/g, ' ')}}</span>
                <span>${{isFraud ? '$' + c.case.exposure_usd.toFixed(2) : '$0.00'}}</span>
            </div>
        `;
        container.appendChild(card);
    }});
}}

function selectCase(caseId) {{
    currentCase = benchmarkCases.find(c => c.case_id === caseId);
    renderCaseList();
    renderCaseView();
}}

function renderCaseView() {{
    const view = document.getElementById('main-content-view');
    const c = currentCase.case;
    const isFraud = c.verdict === 'fraud';
    const nba = currentCase.next_best_actions;
    const sar = currentCase.sar;

    view.innerHTML = `
        <!-- Case Hero Header -->
        <div class="case-hero">
            <div class="hero-left">
                <h2>
                    <span>Case ${{currentCase.case_id}}</span>
                    <span class="badge-verdict ${{isFraud ? 'badge-fraud' : 'badge-legit'}}" style="font-size: 13px; padding: 4px 12px;">
                        ${{c.verdict.toUpperCase()}} (${{(c.fraud_probability * 100).toFixed(0)}}% PROB)
                    </span>
                    <span class="badge" style="background: #1F2937; color: #9CA3AF; border: 1px solid #374151;">
                        Pattern: ${{c.pattern.replace(/_/g, ' ')}}
                    </span>
                </h2>
                <p>${{c.summary}}</p>
            </div>
            <div class="hero-stats">
                <div class="stat-box">
                    <div class="stat-label">Assessed Exposure</div>
                    <div class="stat-value ${{isFraud ? 'stat-val-fraud' : 'stat-val-legit'}}">
                        $${{c.exposure_usd.toFixed(2)}}
                    </div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">SAR Regulatory Filing</div>
                    <div class="stat-value" style="color: ${{sar.file ? '#C4B5FD' : '#6B7280'}}">
                        ${{sar.file ? 'REQUIRED' : 'NOT REQUIRED'}}
                    </div>
                </div>
            </div>
        </div>

        <!-- 2 Column Section: Graph Network & Next Best Actions -->
        <div class="grid-2col">
            <!-- Left: Graph Subgraph & Memory -->
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A00" stroke-width="2"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/><line x1="8.5" y1="7.5" x2="15.5" y2="16.5"/><line x1="8.5" y1="16.5" x2="15.5" y2="7.5"/></svg>
                        TigerGraph Entity Traversal & Subgraph
                    </div>
                    <span style="font-size: 12px; color: var(--text-muted); font-family: monospace;">Written to Graph: ${{c.written_to_graph ? 'YES' : 'NO'}}</span>
                </div>
                <div id="graph-network"></div>

                <div style="margin-top: 16px;">
                    <div style="font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 8px;">
                        CASE MEMORY PRECEDENTS RETRIEVED (FROM 5,565 CLOSED CASES):
                    </div>
                    <div>
                        ${{c.similar_prior_cases.map(cid => `<span class="memory-tag">${{cid}}</span>`).join('')}}
                    </div>
                </div>
            </div>

            <!-- Right: Next Best Actions Progression -->
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                        Next-Best Actions & Policy Routing
                    </div>
                    <span style="font-size: 11px; background: rgba(59, 130, 246, 0.15); color: #93C5FD; padding: 2px 8px; border-radius: 6px; font-weight: 600;">
                        Policy Rules R1-R10
                    </span>
                </div>

                <div style="margin-bottom: 14px;">
                    <div style="font-size: 12px; font-weight: 600; color: var(--text-muted); margin-bottom: 6px; text-transform: uppercase;">
                        Final Recommended Actions (After Evidence)
                    </div>
                    ${{nba.final.map(a => `
                        <div class="action-card">
                            <div class="action-card-header">
                                <span class="action-name">${{a.action}}</span>
                                <span class="action-route">${{a.route.toUpperCase()}}</span>
                            </div>
                            <div class="action-reason">${{a.reason}}</div>
                        </div>
                    `).join('')}}
                </div>

                ${{currentCase.evidence_requests.length > 0 ? `
                    <div style="background: #111B2E; border: 1px solid #1E3A8A; border-radius: 8px; padding: 12px; margin-top: 10px;">
                        <div style="font-size: 11px; font-weight: 700; color: #60A5FA; margin-bottom: 4px;">CONTROLLED EVIDENCE REQUEST SIMULATION:</div>
                        <div style="font-size: 12px; color: #D1D5DB;">"${{currentCase.evidence_requests[0].assumed_response}}"</div>
                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">What changed: ${{nba.what_changed}}</div>
                    </div>
                ` : ''}}
            </div>
        </div>

        <!-- Evidence & Regulatory SAR Section -->
        <div class="grid-2col">
            <!-- Evidence Items -->
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        Investigation Evidence Log
                    </div>
                    <span style="font-size: 12px; color: var(--text-muted);">${{c.evidence.length}} Findings</span>
                </div>
                ${{c.evidence.map(e => `
                    <div class="evidence-item">
                        <div class="evidence-claim">${{e.claim}}</div>
                        <div class="evidence-meta">Source: ${{e.source.toUpperCase()}} &bull; Ref: ${{e.ref}} &bull; Entities: ${{e.entity_ids.slice(0, 3).join(', ')}}</div>
                    </div>
                `).join('')}}
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 10px;">
                    <strong>Stop Reason:</strong> ${{currentCase.stop_reason}}
                </div>
            </div>

            <!-- Regulatory SAR Box -->
            <div class="panel">
                <div class="panel-header">
                    <div class="panel-title">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                        Regulatory Compliance (FinCEN SAR Narrative)
                    </div>
                    <span style="font-size: 11px; padding: 2px 8px; border-radius: 6px; font-weight: 700; ${{sar.file ? 'background: #5B21B6; color: #EDE9FE;' : 'background: #374151; color: #9CA3AF;'}}">
                        ${{sar.file ? 'SAR FILED' : 'NOT REQUIRED'}}
                    </span>
                </div>

                ${{sar.file ? `
                    <div class="sar-box">
                        <div class="sar-header">
                            <span class="sar-title">Official SAR Narrative (FinCEN Standard)</span>
                            <span style="font-size: 11px; color: #A78BFA; font-family: monospace;">Amount: $${{sar.total_amount_usd.toFixed(2)}}</span>
                        </div>
                        <p class="sar-text">${{sar.narrative}}</p>
                        <div style="margin-top: 10px; font-size: 11px; color: #9CA3AF;">
                            <strong>Subjects:</strong> ${{sar.subjects.join(', ')}}
                        </div>
                    </div>
                ` : `
                    <div style="padding: 30px 20px; text-align: center; color: var(--text-muted); font-size: 13px;">
                        No suspicious activity report required under bank policy thresholds. Transaction cleared or below mandatory filing criteria.
                    </div>
                `}}
            </div>
        </div>
    `;

    renderNetworkGraph();
}}

function renderNetworkGraph() {{
    const container = document.getElementById('graph-network');
    const c = currentCase.case;
    const isFraud = c.verdict === 'fraud';

    const nodes = [
        {{ id: 'case', label: currentCase.case_id, color: '#FF6A00', shape: 'diamond', size: 28, font: {{ color: '#fff' }} }},
        {{ id: 'card', label: 'Card: ' + (c.connected_card_ids[0] || 'Target-K1'), color: '#3B82F6', shape: 'box', font: {{ color: '#fff' }} }},
        {{ id: 'txn', label: 'Flagged Txn', color: isFraud ? '#EF4444' : '#10B981', shape: 'dot', size: 22, font: {{ color: '#fff' }} }}
    ];

    const edges = [
        {{ from: 'case', to: 'card', label: 'ON_CARD', color: '#6B7280' }},
        {{ from: 'card', to: 'txn', label: 'MADE', color: '#6B7280' }}
    ];

    if (c.connected_device_profiles && c.connected_device_profiles.length > 0) {{
        nodes.push({{ id: 'dev', label: 'Device Profile', color: '#8B5CF6', shape: 'triangle', size: 20, font: {{ color: '#fff' }} }});
        edges.push({{ from: 'txn', to: 'dev', label: 'FROM_DEVICE', color: '#8B5CF6' }});

        if (c.connected_card_ids.length > 1) {{
            c.connected_card_ids.slice(1, 3).forEach((ccid, idx) => {{
                const otherId = 'ocard_' + idx;
                nodes.push({{ id: otherId, label: ccid, color: '#EF4444', shape: 'box', font: {{ color: '#fff' }} }});
                edges.push({{ from: 'dev', to: otherId, label: 'LINKED_CARD', color: '#EF4444' }});
            }});
        }}
    }}

    const data = {{ nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) }};
    const options = {{
        physics: {{ stabilization: true, barnesHut: {{ springLength: 100 }} }},
        nodes: {{ borderWidth: 2, shadow: true }},
        edges: {{ font: {{ size: 10, color: '#9CA3AF', strokeWidth: 0 }}, arrows: 'to' }}
    }};

    if (networkInstance) {{ networkInstance.destroy(); }}
    networkInstance = new vis.Network(container, data, options);
}}

// Initialize
renderCaseList();
renderCaseView();
"""

with open(r"C:\Users\divya jain\.gemini\antigravity\scratch\tigergraph-fraud-agent\web\app.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated web/app.js with all {len(all_cases)} cases successfully bundled!")
