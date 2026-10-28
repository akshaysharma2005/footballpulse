// Team of the Week (TOTW) Pitch & Squad Builder Component
import { FORMATIONS, TOTW_DATA } from '../data/totw.js';
import confetti from 'canvas-confetti';
import { playGoalSound, playClickSound } from './audio.js';

let currentLeague = 'europe';
let currentFormation = '4-3-3';
let activeFilter = 'overall'; // 'overall' | 'xg' | 'defense' | 'prodigy'
let selectedPlayer = null;

export function initTotwBuilder(container) {
  if (!container) return;

  renderTotwView(container);
}

export function setTotwLeague(leagueId, container) {
  if (TOTW_DATA[leagueId]) {
    currentLeague = leagueId;
    triggerTotwConfetti();
    renderTotwView(container);
  }
}

export function triggerTotwConfetti() {
  try {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#00e676', '#00e5ff', '#ffd700', '#ffffff', '#a855f7']
    });
  } catch (e) {
    // confetti fallback
  }
}

export function renderTotwView(container) {
  const totw = TOTW_DATA[currentLeague] || TOTW_DATA['europe'];
  const formationConfig = FORMATIONS[currentFormation] || FORMATIONS['4-3-3'];

  // Map starting XI to current formation positions
  const squad = mapPlayersToFormation(totw.startingXI, formationConfig);

  container.innerHTML = `
    <div class="totw-wrapper">
      <!-- TOTW Header Banner -->
      <div class="totw-header">
        <div class="totw-title-area">
          <div class="totw-badge-pill">
            <span class="gold-crown">👑</span>
            <span>OFFICIAL PERFORMANCE SQUAD</span>
          </div>
          <h2 class="totw-heading">${totw.leagueName}</h2>
          <div class="totw-meta-row">
            <span class="totw-week-badge">⚡ ${totw.week}</span>
            <span class="totw-potw-badge">★ POTW: <strong>${totw.potw}</strong></span>
            <span class="totw-avg-rating">Team Avg Rating: <strong>${totw.avgRating}</strong></span>
          </div>
        </div>

        <!-- Controls: League Selector & Formation Switcher -->
        <div class="totw-controls">
          <div class="control-group">
            <label class="control-label">LEAGUE SQUAD</label>
            <div class="pill-selector" id="totw-league-pills">
              <button class="pill-btn ${currentLeague === 'europe' ? 'active' : ''}" data-league="europe">🌍 All-Europe</button>
              <button class="pill-btn ${currentLeague === 'epl' ? 'active' : ''}" data-league="epl">🦁 Premier League</button>
              <button class="pill-btn ${currentLeague === 'laliga' ? 'active' : ''}" data-league="laliga">⚔️ La Liga</button>
              <button class="pill-btn ${currentLeague === 'bundesliga' ? 'active' : ''}" data-league="bundesliga">🦅 Bundesliga</button>
            </div>
          </div>

          <div class="control-group">
            <label class="control-label">TACTICAL FORMATION</label>
            <div class="pill-selector" id="totw-formation-pills">
              <button class="pill-btn ${currentFormation === '4-3-3' ? 'active' : ''}" data-formation="4-3-3">4-3-3</button>
              <button class="pill-btn ${currentFormation === '4-2-3-1' ? 'active' : ''}" data-formation="4-2-3-1">4-2-3-1</button>
              <button class="pill-btn ${currentFormation === '3-4-2-1' ? 'active' : ''}" data-formation="3-4-2-1">3-4-2-1</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Stage: 3D Tactical Pitch & Bench -->
      <div class="totw-stage-layout">
        <!-- The Pitch -->
        <div class="pitch-container-3d" id="totw-pitch-stage">
          <div class="pitch-lighting-glow"></div>
          
          <!-- Tactical Pitch SVG markings -->
          <div class="pitch-surface">
            <!-- Grass Striping -->
            <div class="pitch-stripes">
              <div class="stripe"></div><div class="stripe"></div>
              <div class="stripe"></div><div class="stripe"></div>
              <div class="stripe"></div><div class="stripe"></div>
            </div>

            <!-- Pitch Lines -->
            <svg class="pitch-lines-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <!-- Outer boundary -->
              <rect x="2" y="2" width="96" height="96" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
              
              <!-- Halfway line & center circle -->
              <line x1="2" y1="50" x2="98" y2="50" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
              <circle cx="50" cy="50" r="14" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
              <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.6)"/>

              <!-- Attacking Penalty Box (Top) -->
              <rect x="24" y="2" width="52" height="18" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
              <rect x="36" y="2" width="28" height="7" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
              <path d="M 38 20 A 10 10 0 0 0 62 20" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
              <circle cx="50" cy="12" r="0.8" fill="rgba(255,255,255,0.6)"/>

              <!-- Defensive Penalty Box (Bottom) -->
              <rect x="24" y="80" width="52" height="18" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
              <rect x="36" y="91" width="28" height="7" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
              <path d="M 38 80 A 10 10 0 0 1 62 80" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
              <circle cx="50" cy="88" r="0.8" fill="rgba(255,255,255,0.6)"/>
            </svg>

            <!-- Starting XI Cards rendered in absolute % coordinates -->
            <div class="pitch-players-layer">
              ${squad.map(player => renderFutCard(player)).join('')}
            </div>
          </div>
        </div>

        <!-- Bench / Substitutes Panel -->
        <div class="totw-bench-panel">
          <div class="bench-header">
            <h3><span class="icon-sub">🔄</span> Bench & Reserves</h3>
            <span class="bench-count">${totw.substitutes ? totw.substitutes.length : 0} Players</span>
          </div>

          <div class="bench-cards-list">
            ${(totw.substitutes || []).map(sub => `
              <div class="bench-player-card" data-player-name="${sub.name}">
                <div class="bench-rating-chip">${sub.rating}</div>
                <div class="bench-info">
                  <div class="bench-name">${sub.flag || '⚽'} ${sub.name}</div>
                  <div class="bench-details">
                    <span class="bench-pos">${sub.pos}</span>
                    <span class="bench-club">${sub.club}</span>
                    <span class="bench-stat">${sub.stats || `Rating: ${sub.matchRating}`}</span>
                  </div>
                </div>
                <div class="bench-score">★ ${sub.matchRating}</div>
              </div>
            `).join('')}
          </div>

          <!-- TOTW AI Criteria Selector -->
          <div class="totw-criteria-box">
            <h4>⚡ Team of the Week Selector Algorithm</h4>
            <div class="criteria-buttons">
              <button class="crit-btn ${activeFilter === 'overall' ? 'active' : ''}" data-filter="overall">★ Sofascore / FotMob Match Rating</button>
              <button class="crit-btn ${activeFilter === 'xg' ? 'active' : ''}" data-filter="xg">🎯 xG & Finishing Outliers</button>
              <button class="crit-btn ${activeFilter === 'defense' ? 'active' : ''}" data-filter="defense">🛡️ Defensive Wall Masterclass</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Player Detail Spotlight Modal Container -->
      <div id="player-spotlight-modal" class="modal-overlay hidden">
        <div class="modal-content" id="modal-player-content"></div>
      </div>
    </div>
  `;

  attachTotwListeners(container);
}

/**
 * Render EA FC / FUT Style Card
 */
function renderFutCard(player) {
  const isCap = player.isCap;
  const isPotw = player.potw;
  const rating = player.rating || 90;
  const statText = player.stats ? formatQuickStats(player.stats) : `★ ${player.matchRating}`;

  return `
    <div class="fut-card-wrapper" style="left: ${player.x}%; top: ${player.y}%;" data-player-id="${player.shortName}">
      <div class="fut-card ${isPotw ? 'fut-potw' : (isCap ? 'fut-captain' : 'fut-gold')}">
        <!-- Holographic Card Sheen -->
        <div class="fut-sheen"></div>

        <!-- Card Top: Rating & Position -->
        <div class="fut-card-top">
          <div class="fut-rating">${rating}</div>
          <div class="fut-pos">${player.label || player.posId?.toUpperCase()}</div>
          <div class="fut-nation">${player.nationFlag || '🌍'}</div>
          <div class="fut-club">${player.clubLogo || '⚽'}</div>
        </div>

        <!-- Card Avatar / Silhouette -->
        <div class="fut-avatar-box">
          <div class="fut-avatar-circle">
            <span class="avatar-initials">${getInitials(player.name)}</span>
          </div>
          ${isPotw ? '<span class="potw-crown-badge">👑 POTW</span>' : ''}
          ${isCap ? '<span class="captain-badge">C</span>' : ''}
        </div>

        <!-- Card Name & Match Performance -->
        <div class="fut-card-bottom">
          <div class="fut-player-name">${player.shortName || player.name}</div>
          <div class="fut-club-name">${player.club}</div>
          
          <div class="fut-stats-pill">
            <span class="fut-rating-star">★ ${player.matchRating}</span>
            <span class="fut-stat-snippet">${statText}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getInitials(name) {
  if (!name) return 'FP';
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function formatQuickStats(stats) {
  if (stats.goals !== undefined && stats.assists !== undefined) {
    if (stats.goals > 0 && stats.assists > 0) return `${stats.goals}⚽ ${stats.assists}🅰️`;
    if (stats.goals > 0) return `${stats.goals} ⚽ Goal${stats.goals > 1 ? 's' : ''}`;
    if (stats.assists > 0) return `${stats.assists} 🅰️ Assist${stats.assists > 1 ? 's' : ''}`;
  }
  if (stats.saves !== undefined) return `${stats.saves} Saves`;
  if (stats.tackles !== undefined) return `${stats.tackles} Tackles`;
  if (stats.xg !== undefined) return `${stats.xg} xG`;
  return 'In-Form';
}

function mapPlayersToFormation(players, formation) {
  if (!players || !formation) return [];
  const positions = formation.positions;

  return positions.map((pos, idx) => {
    const player = players[idx] || players[0];
    return {
      ...player,
      label: pos.label,
      x: pos.x,
      y: pos.y
    };
  });
}

function attachTotwListeners(container) {
  // League Pills
  container.querySelectorAll('#totw-league-pills .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      currentLeague = btn.dataset.league;
      triggerTotwConfetti();
      renderTotwView(container);
    });
  });

  // Formation Pills
  container.querySelectorAll('#totw-formation-pills .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      currentFormation = btn.dataset.formation;
      renderTotwView(container);
    });
  });

  // Criteria buttons
  container.querySelectorAll('.criteria-buttons .crit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      activeFilter = btn.dataset.filter;
      triggerTotwConfetti();
      renderTotwView(container);
    });
  });

  // Card clicks to open spotlight modal
  container.querySelectorAll('.fut-card-wrapper').forEach(card => {
    card.addEventListener('click', () => {
      playClickSound();
      const playerId = card.dataset.playerId;
      const totw = TOTW_DATA[currentLeague] || TOTW_DATA['europe'];
      const player = totw.startingXI.find(p => p.shortName === playerId) || totw.startingXI[0];
      openPlayerSpotlight(player, container);
    });
  });
}

function openPlayerSpotlight(player, rootContainer) {
  const modal = rootContainer.querySelector('#player-spotlight-modal');
  const content = rootContainer.querySelector('#modal-player-content');
  if (!modal || !content) return;

  playGoalSound();

  content.innerHTML = `
    <div class="spotlight-card">
      <button class="modal-close-btn" id="close-spotlight-btn">&times;</button>
      
      <div class="spotlight-header">
        <div class="spotlight-card-preview">
          <div class="fut-card fut-gold">
            <div class="fut-card-top">
              <div class="fut-rating">${player.rating}</div>
              <div class="fut-pos">${player.label || player.posId}</div>
              <div class="fut-nation">${player.nationFlag || '🌍'}</div>
              <div class="fut-club">${player.clubLogo || '⚽'}</div>
            </div>
            <div class="fut-avatar-box">
              <span class="avatar-initials big">${getInitials(player.name)}</span>
            </div>
            <div class="fut-card-bottom">
              <div class="fut-player-name">${player.name}</div>
              <div class="fut-club-name">${player.club}</div>
            </div>
          </div>
        </div>

        <div class="spotlight-bio">
          <div class="bio-tag">TEAM OF THE WEEK SPOTLIGHT</div>
          <h2>${player.name}</h2>
          <div class="spotlight-sub">${player.nation || ''} · ${player.club}</div>
          
          <p class="spotlight-quote">"${player.quote || 'Outstanding tactical presence and decisive contributions in this matchday.'}"</p>

          <div class="stat-highlight-grid">
            <div class="stat-cell">
              <span class="cell-label">MATCH RATING</span>
              <span class="cell-val green">★ ${player.matchRating}</span>
            </div>
            <div class="stat-cell">
              <span class="cell-label">CARD OVR</span>
              <span class="cell-val cyan">${player.rating}</span>
            </div>
            ${Object.entries(player.stats || {}).map(([key, val]) => `
              <div class="stat-cell">
                <span class="cell-label">${camelToLabel(key)}</span>
                <span class="cell-val">${val}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  content.querySelector('#close-spotlight-btn').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

function camelToLabel(str) {
  return str.replace(/([A-Z])/g, ' $1').toUpperCase();
}
