// Match Center & Deep Analytics (Shot Maps, Momentum Charts, Detailed Head-to-Head)
import { renderAnalyticsBanner } from './graphics.js';
import { playWhistle, playGoalSound, playClickSound } from './audio.js';
import confetti from 'canvas-confetti';

let activeMatch = null;
let isComparingRadar = false;

export function openMatchCenter(match, container) {
  activeMatch = match;
  isComparingRadar = false;
  renderMatchModal(match, container);
}

export function renderMatchModal(match, rootContainer) {
  const modal = document.getElementById('match-center-modal');
  if (!modal) return;

  const content = modal.querySelector('.match-modal-container');
  if (!content) return;

  modal.classList.remove('hidden');

  content.innerHTML = `
    <div class="match-center-wrapper">
      <!-- Modal Header -->
      <div class="match-center-header">
        <div class="header-league-info">
          <span class="league-pill">${match.leagueName}</span>
          <span class="venue-pill">📍 ${match.venue}</span>
          <span class="referee-pill">⚖️ ${match.referee || 'Michael Oliver'}</span>
        </div>
        <button class="modal-close-icon" id="close-match-center-btn">&times;</button>
      </div>

      <!-- Live Scoreboard Hero -->
      <div class="match-scoreboard-hero">
        <div class="team-hero-block home">
          ${match.homeTeam.badge ? `
            <img src="${match.homeTeam.badge}" alt="${match.homeTeam.name}" class="team-crest-large-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';" />
            <span class="team-crest-large" style="display:none">${match.homeTeam.logoEmoji || '⚽'}</span>
          ` : `<span class="team-crest-large">${match.homeTeam.logoEmoji || '⚽'}</span>`}
          <h2 class="team-name-large">${match.homeTeam.name}</h2>
          <div class="scorers-list">
            ${(match.homeTeam.scorers || []).map(s => `<span>⚽ ${s.name} ${s.minute}</span>`).join('')}
          </div>
        </div>

        <div class="score-center-block">
          <div class="live-clock-badge ${match.status === 'LIVE' ? 'is-live' : ''}">
            ${match.status === 'LIVE' ? `<span class="live-dot-pulse"></span> ${match.minute}' LIVE` : match.status}
          </div>
          <div class="score-display">
            <span class="score-num home-num">${match.homeTeam.score}</span>
            <span class="score-sep">:</span>
            <span class="score-num away-num">${match.awayTeam.score}</span>
          </div>
          <div class="xg-summary-hero">
            <span class="xg-home">xG ${match.stats.xg.home.toFixed(2)}</span>
            <span class="xg-sep">vs</span>
            <span class="xg-away">xG ${match.stats.xg.away.toFixed(2)}</span>
          </div>
        </div>

        <div class="team-hero-block away">
          ${match.awayTeam.badge ? `
            <img src="${match.awayTeam.badge}" alt="${match.awayTeam.name}" class="team-crest-large-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';" />
            <span class="team-crest-large" style="display:none">${match.awayTeam.logoEmoji || '⚽'}</span>
          ` : `<span class="team-crest-large">${match.awayTeam.logoEmoji || '⚽'}</span>`}
          <h2 class="team-name-large">${match.awayTeam.name}</h2>
          <div class="scorers-list">
            ${(match.awayTeam.scorers || []).map(s => `<span>⚽ ${s.name} ${s.minute}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Navigation Tabs inside Match Center -->
      <div class="match-center-tabs">
        <button class="tab-btn active" data-target="tab-analytics">⚡ Elite Analytics (Screenshot Showcase)</button>
        <button class="tab-btn" data-target="tab-shotmap">🎯 xG Shot Map</button>
        <button class="tab-btn" data-target="tab-momentum">📈 xG Momentum Timeline</button>
        <button class="tab-btn" data-target="tab-stats">📊 Detailed Team Stats</button>
      </div>

      <!-- Tab 1: Exact Analytics Showcase matching the user's screenshot! -->
      <div class="tab-pane active" id="tab-analytics">
        <div id="analytics-banner-target"></div>
      </div>

      <!-- Tab 2: Interactive Pitch Shot Map -->
      <div class="tab-pane" id="tab-shotmap">
        <div class="shotmap-container">
          <div class="shotmap-legend">
            <span class="legend-item"><span class="legend-dot goal"></span> Goal</span>
            <span class="legend-item"><span class="legend-dot saved"></span> Saved</span>
            <span class="legend-item"><span class="legend-dot blocked"></span> Blocked</span>
            <span class="legend-item"><span class="legend-dot missed"></span> Off Target</span>
            <span class="legend-item note">Dot size = xG Value</span>
          </div>
          <div class="shot-pitch-wrapper">
            ${renderPitchShotMap(match)}
          </div>
        </div>
      </div>

      <!-- Tab 3: Momentum Curve -->
      <div class="tab-pane" id="tab-momentum">
        <div class="momentum-container">
          <div class="momentum-header">
            <h4>Cumulative Expected Goals (xG) Progression</h4>
            <div class="momentum-legend">
              <span class="leg-home">${match.homeTeam.short} (Final xG: ${match.stats.xg.home.toFixed(2)})</span>
              <span class="leg-away">${match.awayTeam.short} (Final xG: ${match.stats.xg.away.toFixed(2)})</span>
            </div>
          </div>
          <div class="momentum-chart-box">
            ${renderMomentumSvg(match)}
          </div>
        </div>
      </div>

      <!-- Tab 4: Advanced Stats Comparison Bars -->
      <div class="tab-pane" id="tab-stats">
        <div class="advanced-stats-grid">
          ${renderStatBar('Expected Goals (xG)', match.stats.xg.home, match.stats.xg.away, match.stats.xg.home + match.stats.xg.away)}
          ${renderStatBar('Possession', `${match.stats.possession.home}%`, `${match.stats.possession.away}%`, 100, match.stats.possession.home, match.stats.possession.away)}
          ${renderStatBar('Total Shots', match.stats.shots.home, match.stats.shots.away, match.stats.shots.home + match.stats.shots.away)}
          ${renderStatBar('Shots On Target', match.stats.shotsOnTarget.home, match.stats.shotsOnTarget.away, match.stats.shotsOnTarget.home + match.stats.shotsOnTarget.away)}
          ${renderStatBar('Big Chances Created', match.stats.bigChances.home, match.stats.bigChances.away, (match.stats.bigChances.home + match.stats.bigChances.away) || 1)}
          ${renderStatBar('Pass Accuracy', `${match.stats.passAcc.home}%`, `${match.stats.passAcc.away}%`, 100, match.stats.passAcc.home, match.stats.passAcc.away)}
          ${renderStatBar('Total Passes', match.stats.passes.home, match.stats.passes.away, match.stats.passes.home + match.stats.passes.away)}
          ${renderStatBar('Field Tilt', `${match.stats.fieldTilt.home}%`, `${match.stats.fieldTilt.away}%`, 100, match.stats.fieldTilt.home, match.stats.fieldTilt.away)}
          ${renderStatBar('PPDA (Pressing Intensity)', match.stats.ppda.home, match.stats.ppda.away, 20, match.stats.ppda.away, match.stats.ppda.home)}
          ${renderStatBar('Expected Threat (xT)', `+${match.stats.xt.home}`, `+${match.stats.xt.away}`, match.stats.xt.home + match.stats.xt.away, match.stats.xt.home, match.stats.xt.away)}
        </div>
      </div>
    </div>
  `;

  // Render the analytical 3-panel graphic
  const bannerTarget = content.querySelector('#analytics-banner-target');
  renderAnalyticsBanner(bannerTarget, match, isComparingRadar);

  // Hook tab switching
  content.querySelectorAll('.match-center-tabs .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      content.querySelectorAll('.match-center-tabs .tab-btn').forEach(b => b.classList.remove('active'));
      content.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetPane = content.querySelector(`#${btn.dataset.target}`);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Compare toggle button inside radar
  const compareBtn = content.querySelector('#radar-compare-btn');
  if (compareBtn) {
    compareBtn.addEventListener('click', () => {
      playClickSound();
      isComparingRadar = !isComparingRadar;
      renderAnalyticsBanner(bannerTarget, match, isComparingRadar);
    });
  }

  // Close modal
  const closeBtn = content.querySelector('#close-match-center-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  };
}

function renderStatBar(title, val1Display, val2Display, total, val1 = null, val2 = null) {
  const num1 = val1 !== null ? Number(val1) : Number(val1Display);
  const num2 = val2 !== null ? Number(val2) : Number(val2Display);
  const sum = total || (num1 + num2) || 1;
  const pct1 = Math.min(100, Math.max(5, (num1 / sum) * 100));
  const pct2 = Math.min(100, Math.max(5, (num2 / sum) * 100));

  return `
    <div class="stat-compare-row">
      <div class="stat-compare-header">
        <span class="stat-val home-val">${val1Display}</span>
        <span class="stat-label-center">${title}</span>
        <span class="stat-val away-val">${val2Display}</span>
      </div>
      <div class="stat-dual-bar">
        <div class="stat-fill home-fill" style="width: ${pct1}%"></div>
        <div class="stat-fill away-fill" style="width: ${pct2}%"></div>
      </div>
    </div>
  `;
}

function renderPitchShotMap(match) {
  const shots = match.shots || [];
  const width = 600;
  const height = 360;

  return `
    <svg class="shotmap-pitch-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      <!-- Attacking Half Pitch -->
      <rect x="10" y="10" width="${width - 20}" height="${height - 20}" rx="12" fill="#061910" stroke="#164e32" stroke-width="1.5"/>
      
      <!-- Halfway Line -->
      <line x1="10" y1="${height - 10}" x2="${width - 10}" y2="${height - 10}" stroke="#164e32" stroke-width="1.2"/>
      
      <!-- Goal Box (Top) -->
      <rect x="${width / 2 - 120}" y="10" width="240" height="110" fill="none" stroke="#1b633f" stroke-width="1.2"/>
      <rect x="${width / 2 - 55}" y="10" width="110" height="42" fill="none" stroke="#1b633f" stroke-width="1"/>
      <circle cx="${width / 2}" cy="78" r="3" fill="#ffffff"/>
      <path d="M ${width / 2 - 60} 120 A 45 45 0 0 0 ${width / 2 + 60} 120" fill="none" stroke="#1b633f" stroke-width="1"/>

      <!-- Goal Frame -->
      <rect x="${width / 2 - 40}" y="4" width="80" height="6" fill="#ffffff" rx="2"/>

      <!-- Shots -->
      <g class="shot-nodes">
        ${shots.map(s => {
          // Map x, y from 0-100 to pitch coords
          // Shots are attacking towards top goal
          const px = (s.y / 100) * (width - 40) + 20;
          const py = ((100 - s.x) / 100) * (height - 60) + 20;
          const r = Math.max(5, s.xg * 16);

          let color = '#ff5252';
          if (s.result === 'goal') color = '#00e676';
          else if (s.result === 'saved') color = '#00e5ff';
          else if (s.result === 'blocked') color = '#ffb300';

          return `
            <g class="shot-group" transform="translate(${px}, ${py})">
              <circle r="${r + 2}" fill="${color}" opacity="0.3" />
              <circle r="${r}" fill="${color}" stroke="#ffffff" stroke-width="1.5" />
              <title>${s.player} (${s.min}') - ${s.xg} xG [${s.result.toUpperCase()}]</title>
              ${s.result === 'goal' ? `
                <text y="3.5" text-anchor="middle" font-size="8" fill="#000" font-weight="bold">⚽</text>
              ` : ''}
            </g>
          `;
        }).join('')}
      </g>
    </svg>
  `;
}

function renderMomentumSvg(match) {
  const timeline = match.timeline || [];
  if (timeline.length === 0) return `<div class="chart-empty">No timeline data</div>`;

  const width = 600;
  const height = 180;
  const padding = 30;

  const maxMin = 90;
  const maxXg = Math.max(3.0, match.stats.xg.home, match.stats.xg.away);

  function getX(min) {
    return padding + (min / maxMin) * (width - padding * 2);
  }

  function getY(xg) {
    return height - padding - (xg / maxXg) * (height - padding * 2);
  }

  // Generate paths
  let homePath = `M ${getX(0)} ${getY(0)}`;
  let awayPath = `M ${getX(0)} ${getY(0)}`;

  timeline.forEach(pt => {
    homePath += ` L ${getX(pt.min)} ${getY(pt.xgHome)}`;
    awayPath += ` L ${getX(pt.min)} ${getY(pt.xgAway)}`;
  });

  return `
    <svg class="momentum-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
      <!-- Grid Lines -->
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#1e293b" stroke-width="1"/>
      <line x1="${padding}" y1="${padding}" x2="${width - padding}" y2="${padding}" stroke="#1e293b" stroke-width="0.8" stroke-dasharray="3,3"/>
      
      <!-- Time markers -->
      <text x="${getX(0)}" y="${height - 10}" fill="#64748b" font-size="10" text-anchor="middle">0'</text>
      <text x="${getX(45)}" y="${height - 10}" fill="#64748b" font-size="10" text-anchor="middle">45' (HT)</text>
      <text x="${getX(90)}" y="${height - 10}" fill="#64748b" font-size="10" text-anchor="middle">90' (FT)</text>

      <!-- Home Area & Line (Neon Green) -->
      <path d="${homePath}" fill="none" stroke="#00e676" stroke-width="2.5" />

      <!-- Away Area & Line (Cyan) -->
      <path d="${awayPath}" fill="none" stroke="#00e5ff" stroke-width="2.5" />

      <!-- Event Markers (Goals) -->
      ${timeline.filter(t => t.event).map(pt => `
        <g transform="translate(${getX(pt.min)}, ${getY(Math.max(pt.xgHome, pt.xgAway)) - 10})">
          <circle r="6" fill="#ffd700" stroke="#000" stroke-width="1"/>
          <text y="3" text-anchor="middle" font-size="7">⚽</text>
          <text y="-8" text-anchor="middle" font-size="8.5" fill="#f8fafc" font-weight="bold">${pt.event}</text>
        </g>
      `).join('')}
    </svg>
  `;
}
