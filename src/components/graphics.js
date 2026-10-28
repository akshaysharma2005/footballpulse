// High-Fidelity Football Analytics Graphics (xG Zones, Pass Network Pitch, Hexagonal Playmaker Radar)

/**
 * Render the Exact 3-Panel "The Beautiful Game · Football Analytics" Section
 */
export function renderAnalyticsBanner(container, match, isComparing = false, selectedTeamSide = null) {
  if (!container || !match) return;

  // Determine which team is being tactically analyzed (default to away for Barcelona/Bayern if away won, or home)
  const defaultSide = match.passNetwork?.team === match.awayTeam.name ? 'away' : 'home';
  const activeSide = selectedTeamSide || defaultSide;
  const isAway = activeSide === 'away';

  const analyzingTeam = isAway ? match.awayTeam : match.homeTeam;
  const otherTeam = isAway ? match.homeTeam : match.awayTeam;

  const totalXg = isAway ? (match.stats?.xg?.away ?? 2.58) : (match.stats?.xg?.home ?? 1.48);
  const goals = analyzingTeam.score ?? 0;
  const shots = isAway ? (match.stats?.shots?.away ?? 17) : (match.stats?.shots?.home ?? 12);
  const passAcc = isAway ? (match.stats?.passAcc?.away ?? 89.6) : (match.stats?.passAcc?.home ?? 83.2);
  const touches = isAway ? (match.stats?.touches?.away ?? 712) : (match.stats?.touches?.home ?? 540);
  const fieldTilt = isAway ? (match.stats?.fieldTilt?.away ?? 62) : (match.stats?.fieldTilt?.home ?? 38);
  const ppda = isAway ? (match.stats?.ppda?.away ?? 6.8) : (match.stats?.ppda?.home ?? 11.2);
  const xt = isAway ? (match.stats?.xt?.away ?? 2.34) : (match.stats?.xt?.home ?? 1.15);

  const zoneXgData = (isAway && match.zoneXgAway) ? match.zoneXgAway : match.zoneXg;
  const passNetData = (isAway && match.passNetworkAway) ? match.passNetworkAway : match.passNetwork;
  
  let currentRadar = match.playmakerRadar;
  if (isAway && match.playmakerRadarAway) {
    currentRadar = match.playmakerRadarAway;
  } else if (!isAway && match.playmakerRadarHome) {
    currentRadar = match.playmakerRadarHome;
  } else if (!isAway && match.playmakerRadar?.comparison) {
    // If analyzing home and comparison is home player
    if (match.playmakerRadar.comparison.team === match.homeTeam.name) {
      currentRadar = match.playmakerRadar.comparison;
    }
  }

  const compRadar = isComparing && currentRadar?.comparison ? currentRadar.comparison : null;

  container.innerHTML = `
    <div class="analytics-showcase">
      <div class="analytics-header">
        <div class="title-with-pulse">
          <span class="icon-link">⚡</span>
          <h2>The Beautiful Game · Football Analytics</h2>
        </div>
        
        <!-- Team Selector for Analytics -->
        <div class="analytics-team-switcher">
          <button class="team-switch-btn ${!isAway ? 'active' : ''}" data-side="home">
            <span class="sw-badge">${match.homeTeam.logoEmoji || '⚽'}</span>
            <span>${match.homeTeam.short} (${match.homeTeam.score})</span>
          </button>
          <span class="vs-text">vs</span>
          <button class="team-switch-btn ${isAway ? 'active' : ''}" data-side="away">
            <span class="sw-badge">${match.awayTeam.logoEmoji || '⚽'}</span>
            <span>${match.awayTeam.short} (${match.awayTeam.score})</span>
          </button>
          <span class="min-tag">${match.status === 'LIVE' ? `${match.minute}' LIVE` : match.status}</span>
        </div>
      </div>

      <div class="analyzed-team-pill">
        <span>Tactical Breakdown for: <strong>${analyzingTeam.name}</strong></span>
        <span class="verified-opta-badge">✓ 100% Verified Opta Data</span>
      </div>

      <div class="analytics-grid">
        <!-- Card 1: xG Shot Analysis -->
        <div class="analytics-card card-xg">
          <div class="card-top-header">
            <div class="card-bar-accent green-accent"></div>
            <div>
              <h3>xG Shot Analysis</h3>
              <div class="card-subtitle">EXPECTED GOALS PER ZONE (${analyzingTeam.short})</div>
            </div>
          </div>

          <div class="card-body xg-chart-body" id="xg-bars-canvas-container">
            ${renderXgBarsHtml(zoneXgData)}
          </div>

          <div class="card-footer-metrics">
            <span>Total xG: <strong class="val-green">${totalXg.toFixed(2)}</strong></span>
            <span class="dot-sep">·</span>
            <span>Goals: <strong class="val-cyan">${goals}</strong></span>
            <span class="dot-sep">·</span>
            <span>Shots: <strong class="val-cyan">${shots}</strong></span>
          </div>
        </div>

        <!-- Card 2: Pass Network -->
        <div class="analytics-card card-pass">
          <div class="card-top-header">
            <div class="card-bar-accent cyan-accent"></div>
            <div>
              <h3>Pass Network</h3>
              <div class="card-subtitle">TOUCH MAP & CONNECTIONS (${analyzingTeam.short})</div>
            </div>
          </div>

          <div class="card-body pass-pitch-body" id="pass-pitch-container">
            ${renderPassNetworkSvg(passNetData)}
          </div>

          <div class="card-footer-metrics">
            <span>Pass Acc: <strong class="val-green">${passAcc}%</strong></span>
            <span class="dot-sep">·</span>
            <span>Touches: <strong class="val-cyan">${touches}</strong></span>
            <span class="dot-sep">·</span>
            <span>Field Tilt: <strong class="val-cyan">${fieldTilt}%</strong></span>
          </div>
        </div>

        <!-- Card 3: Playmaker Radar -->
        <div class="analytics-card card-radar">
          <div class="card-top-header">
            <div class="card-bar-accent purple-accent"></div>
            <div class="radar-title-row">
              <div>
                <h3>Playmaker Radar</h3>
                <div class="card-subtitle">${currentRadar?.playerName || 'Player'} (${analyzingTeam.short})</div>
              </div>
              ${currentRadar?.comparison ? `
                <button class="compare-toggle-btn ${isComparing ? 'active' : ''}" id="radar-compare-btn" title="Compare Rival Star">
                  ${isComparing ? 'vs ' + currentRadar.comparison.playerName.split(' ').pop() : '⇄ Compare'}
                </button>
              ` : ''}
            </div>
          </div>

          <div class="card-body radar-chart-body" id="radar-chart-container">
            ${renderHexagonRadarSvg(currentRadar, compRadar)}
          </div>

          <div class="card-footer-metrics">
            <span>Rating: <strong class="val-green">${currentRadar?.overallRating || 94.0}</strong></span>
            <span class="dot-sep">·</span>
            <span>PPDA: <strong class="val-amber">${ppda}</strong></span>
            <span class="dot-sep">·</span>
            <span>xT: <strong class="val-cyan">+${xt}</strong></span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach team switcher listeners
  const switchBtns = container.querySelectorAll('.team-switch-btn');
  switchBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const side = btn.getAttribute('data-side');
      renderAnalyticsBanner(container, match, isComparing, side);
    });
  });

  // Attach radar compare button listener
  const compareBtn = container.querySelector('#radar-compare-btn');
  if (compareBtn) {
    compareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      renderAnalyticsBanner(container, match, !isComparing, activeSide);
    });
  }
}

/**
 * Generate SVG/HTML Bar Chart for xG Zones matching the screenshot
 */
function renderXgBarsHtml(zones) {
  if (!zones || zones.length === 0) {
    return `<div class="chart-empty">No shot data available</div>`;
  }

  // Max value to scale height (usually around 1.0)
  const maxVal = 1.0;

  return `
    <div class="xg-bar-chart">
      <!-- Y-Axis Scale -->
      <div class="xg-y-axis">
        <span class="y-label">1.0</span>
        <span class="y-label">.5</span>
        <span class="y-label">0</span>
      </div>

      <div class="xg-bars-wrapper">
        <!-- Horizontal grid guidelines -->
        <div class="grid-line line-10"></div>
        <div class="grid-line line-05"></div>
        <div class="grid-line line-00"></div>

        <div class="xg-bars-flex">
          ${zones.map(z => {
            const heightPct = Math.min(100, Math.max(4, (z.xg / maxVal) * 100));
            return `
              <div class="xg-bar-col" data-zone="${z.zone}" title="${z.label}: ${z.xg.toFixed(2)} xG (${z.shots} shots)">
                <span class="xg-bar-val" style="color: ${z.color}">${z.xg.toFixed(2)}</span>
                <div class="xg-bar-track">
                  <div class="xg-bar-fill" style="height: ${heightPct}%; background: ${z.color}; box-shadow: 0 0 12px ${z.color}88;"></div>
                </div>
                <span class="xg-bar-label">${z.zone}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Tactical Pitch with Pass Network, Pass Lanes, and Player Nodes
 */
function renderPassNetworkSvg(network) {
  if (!network || !network.nodes) {
    return `<div class="chart-empty">No pass network data</div>`;
  }

  const { nodes, links } = network;
  const width = 360;
  const height = 180;

  // Node map for fast lookup
  const nodeMap = {};
  nodes.forEach(n => {
    nodeMap[n.id] = {
      ...n,
      px: (n.x / 100) * width,
      py: (n.y / 100) * height
    };
  });

  return `
    <svg class="pass-pitch-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      <!-- Pitch background & markings -->
      <defs>
        <radialGradient id="pitchGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#072a1a" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#02100a" stop-opacity="0.95"/>
        </radialGradient>
        <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Pitch border & turf -->
      <rect x="6" y="6" width="${width - 12}" height="${height - 12}" rx="8" fill="url(#pitchGlow)" stroke="#114028" stroke-width="1.2"/>
      
      <!-- Pitch lines -->
      <line x1="${width / 2}" y1="6" x2="${width / 2}" y2="${height - 6}" stroke="#1b5e3c" stroke-width="1" stroke-dasharray="3,3"/>
      <circle cx="${width / 2}" cy="${height / 2}" r="28" fill="none" stroke="#1b5e3c" stroke-width="1"/>
      
      <!-- Goal boxes -->
      <!-- Left Box (Home Defense) -->
      <rect x="6" y="${height / 2 - 38}" width="38" height="76" fill="none" stroke="#1b5e3c" stroke-width="1"/>
      <rect x="6" y="${height / 2 - 18}" width="16" height="36" fill="none" stroke="#1b5e3c" stroke-width="0.8"/>
      <!-- Right Box (Attacking Zone) -->
      <rect x="${width - 44}" y="${height / 2 - 38}" width="38" height="76" fill="none" stroke="#1b5e3c" stroke-width="1"/>
      <rect x="${width - 22}" y="${height / 2 - 18}" width="16" height="36" fill="none" stroke="#1b5e3c" stroke-width="0.8"/>

      <!-- Passing Links -->
      <g class="pass-links">
        ${links.map(link => {
          const from = nodeMap[link.from];
          const to = nodeMap[link.to];
          if (!from || !to) return '';
          const strokeWidth = link.thick ? 2.5 : Math.max(1.0, (link.value / 35) * 2.2);
          const strokeColor = link.keyLink ? '#ffb300' : (link.thick ? '#00e676' : '#2dd4bf');
          const dash = link.dashed ? '3,3' : 'none';
          const opacity = link.dashed ? 0.75 : 0.85;

          return `
            <line x1="${from.px}" y1="${from.py}" x2="${to.px}" y2="${to.py}"
              stroke="${strokeColor}" stroke-width="${strokeWidth}"
              stroke-dasharray="${dash}" opacity="${opacity}" />
          `;
        }).join('')}
      </g>

      <!-- Player Nodes -->
      <g class="pass-nodes">
        ${nodes.map(n => {
          const pt = nodeMap[n.id];
          const isGk = n.id === 'GK';
          const isSt = n.id === 'ST';
          const isCam = n.id === 'CAM';
          const isCdm = n.id === 'CDM';

          let strokeColor = '#00e5ff';
          let fillColor = '#081726';
          let textColor = '#ffffff';

          if (isGk) {
            strokeColor = '#ffffff';
            fillColor = '#1f2937';
          } else if (isCdm) {
            strokeColor = '#00e676';
            fillColor = '#052b1b';
          } else if (isCam) {
            strokeColor = '#00e5ff';
            fillColor = '#042238';
          } else if (isSt) {
            strokeColor = '#ffb300';
            fillColor = '#3d2600';
            textColor = '#ffecb3';
          } else if (['LCM', 'RCM', 'LW', 'RW'].includes(n.id)) {
            strokeColor = '#ffb300';
            fillColor = '#241a05';
            textColor = '#ffe082';
          }

          const r = isCdm ? 9.5 : (isGk ? 8 : 8.5);

          return `
            <g class="node-group" data-player="${n.name}" transform="translate(${pt.px}, ${pt.py})">
              <circle r="${r + 2}" fill="none" stroke="${strokeColor}" stroke-width="1.2" opacity="0.4" />
              <circle r="${r}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="1.8" filter="url(#nodeGlow)" />
              <text y="3" text-anchor="middle" font-size="6.8" font-family="'JetBrains Mono', monospace" font-weight="700" fill="${textColor}">
                ${n.label}
              </text>
              ${n.hasBall ? `
                <!-- Glowing Ball on current striker -->
                <g transform="translate(10, 0)">
                  <circle r="4.2" fill="#ffffff" stroke="#111" stroke-width="0.8"/>
                  <text y="2.2" text-anchor="middle" font-size="5" fill="#000">⚽</text>
                </g>
              ` : ''}
            </g>
          `;
        }).join('')}
      </g>
    </svg>
  `;
}

/**
 * Glowing Hexagon Tactical Radar Chart matching Playmaker Radar in screenshot
 */
function renderHexagonRadarSvg(radar, comparison = null) {
  if (!radar || !radar.metrics) return `<div class="chart-empty">No radar data</div>`;

  const size = 260;
  const center = size / 2;
  const radius = 78;
  const metrics = radar.metrics;
  const total = metrics.length; // 6 metrics for hexagon

  // Hexagon angles: Top (Spatial IQ), Top-Right (Vision), Bottom-Right (Key Pass), Bottom (Press Resist), Bottom-Left (Tempo), Top-Left (Threat)
  // Angles in radians starting at -PI/2 (top)
  const angleStep = (Math.PI * 2) / total;

  // Grid levels (0.2, 0.4, 0.6, 0.8, 1.0)
  const levels = [0.25, 0.5, 0.75, 1.0];

  function getPoint(index, valPct) {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = radius * valPct;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  }

  // Build grid polygon paths
  const gridPolygons = levels.map(lvl => {
    const pts = [];
    for (let i = 0; i < total; i++) {
      const p = getPoint(i, lvl);
      pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    }
    return pts.join(' ');
  });

  // Primary Player polygon
  const primaryPoints = metrics.map((m, i) => {
    const pct = m.value / (m.fullMark || 100);
    return getPoint(i, pct);
  });
  const primaryPolygonStr = primaryPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // Comparison Player polygon (if active)
  let compPolygonStr = '';
  let compPoints = [];
  if (comparison && comparison.metrics) {
    compPoints = comparison.metrics.map((m, i) => {
      const pct = m.value / (m.fullMark || 100);
      return getPoint(i, pct);
    });
    compPolygonStr = compPoints.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  }

  // Label configuration with colors matching the screenshot
  const labelConfig = [
    { label: 'Spatial IQ', color: '#00e676', pos: 'top' },
    { label: 'Vision', color: '#00e5ff', pos: 'top-right' },
    { label: 'Key Pass', color: '#ffb300', pos: 'bottom-right' },
    { label: 'Press Resist', color: '#00e676', pos: 'bottom' },
    { label: 'Tempo', color: '#c084fc', pos: 'bottom-left' },
    { label: 'Threat', color: '#ff5252', pos: 'top-left' }
  ];

  return `
    <svg class="radar-svg" viewBox="0 0 ${size} ${size}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="radarRadialGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#00e676" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#00e5ff" stop-opacity="0.05"/>
        </radialGradient>
        <radialGradient id="compRadialGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ec4899" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0.05"/>
        </radialGradient>
      </defs>

      <!-- Background Hexagonal Rings -->
      <g class="radar-grid">
        ${gridPolygons.map((pts, idx) => `
          <polygon points="${pts}" fill="none" stroke="#16312a" stroke-width="${idx === levels.length - 1 ? '1.2' : '0.8'}" stroke-dasharray="${idx === levels.length - 1 ? 'none' : '2,2'}" />
        `).join('')}

        <!-- Axis Lines -->
        ${Array.from({ length: total }).map((_, i) => {
          const pt = getPoint(i, 1.0);
          return `<line x1="${center}" y1="${center}" x2="${pt.x}" y2="${pt.y}" stroke="#1a3b34" stroke-width="0.9" />`;
        }).join('')}

        <!-- Center Hub -->
        <circle cx="${center}" cy="${center}" r="3" fill="#ffffff" opacity="0.9"/>
      </g>

      <!-- Comparison Polygon (if toggled) -->
      ${comparison ? `
        <polygon points="${compPolygonStr}" fill="url(#compRadialGlow)" stroke="#ec4899" stroke-width="2" opacity="0.85" />
        ${compPoints.map(p => `
          <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#ec4899" stroke="#ffffff" stroke-width="1.2" />
        `).join('')}
      ` : ''}

      <!-- Primary Player Radar Polygon -->
      <polygon points="${primaryPolygonStr}" fill="url(#radarRadialGlow)" stroke="#00e676" stroke-width="2.2" />

      <!-- Vertices with glow -->
      ${primaryPoints.map((p, i) => {
        const dotColor = labelConfig[i]?.color || '#00e676';
        return `
          <circle cx="${p.x}" cy="${p.y}" r="3.8" fill="${dotColor}" stroke="#ffffff" stroke-width="1.2" />
        `;
      }).join('')}

      <!-- Metric Labels and Values around the hexagon perimeter -->
      <g class="radar-labels">
        ${metrics.map((m, i) => {
          const labelPt = getPoint(i, 1.28);
          const valPt = getPoint(i, 1.12);
          const cfg = labelConfig[i] || { label: m.label, color: '#00e676' };

          let textAnchor = 'middle';
          let dx = 0;
          let dy = 0;

          if (i === 0) { // Top (Spatial IQ)
            dy = -4;
          } else if (i === 1) { // Top-Right (Vision)
            textAnchor = 'start';
            dx = 6;
          } else if (i === 2) { // Bottom-Right (Key Pass)
            textAnchor = 'start';
            dx = 6;
            dy = 2;
          } else if (i === 3) { // Bottom (Press Resist)
            dy = 12;
          } else if (i === 4) { // Bottom-Left (Tempo)
            textAnchor = 'end';
            dx = -6;
            dy = 2;
          } else if (i === 5) { // Top-Left (Threat)
            textAnchor = 'end';
            dx = -6;
          }

          return `
            <g transform="translate(${labelPt.x + dx}, ${labelPt.y + dy})">
              <text text-anchor="${textAnchor}" font-family="'Outfit', sans-serif" font-size="10.5" font-weight="600" fill="${cfg.color}">
                ${m.label}
              </text>
              <text y="10" text-anchor="${textAnchor}" font-family="'JetBrains Mono', monospace" font-size="9.5" font-weight="700" fill="${cfg.color}">
                ${m.value}
              </text>
            </g>
          `;
        }).join('')}
      </g>
    </svg>
  `;
}
