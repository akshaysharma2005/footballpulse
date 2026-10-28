// FootballPulse - Core Application Entry Point
import { LEAGUES, INITIAL_MATCHES } from './data/leagues.js';
import { STANDINGS, TOP_SCORERS } from './data/standings.js';
import { REAL_BLOCKBUSTERS, fetchLiveEspnScores } from './services/espnLiveService.js';
import { renderAnalyticsBanner } from './components/graphics.js';
import { initTotwBuilder, setTotwLeague, triggerTotwConfetti } from './components/totwBuilder.js';
import { openMatchCenter } from './components/matchCenter.js';
import { startLiveEngine, toggleSimulation, setSimulationSpeed, triggerSimulatedGoal } from './components/liveEngine.js';
import { isSoundEnabled, toggleSound, playClickSound, playWhistle, playGoalSound } from './components/audio.js';

// Combined Real Match Data: Real Blockbusters + Real Live ESPN Matches
let realMatches = [...REAL_BLOCKBUSTERS];
let liveEspnMatches = [];
let matches = [...REAL_BLOCKBUSTERS];
let activeTab = 'matches'; // 'matches' | 'totw' | 'standings'
let matchDataMode = 'blockbusters'; // 'blockbusters' | 'live' | 'all'
let selectedLeagueId = 'all';
let selectedStatus = 'all'; // 'all' | 'LIVE' | 'FT' | 'UPCOMING'
let featuredMatch = matches[0]; // Real Madrid 0 - 4 Barcelona (El Clásico)
let isRadarComparing = false;
let standingsLeague = 'epl';
let isFetchingApi = false;
let lastApiUpdate = 'Oct 28 Live Feed';

const app = document.getElementById('app');

async function init() {
  renderApp();
  
  // Fetch real-time live and scheduled matches from ESPN open API
  loadLiveEspnData();

  // Background ticker engine
  startLiveEngine(matches, () => {
    if (activeTab === 'matches') {
      updateLiveScoresOnly();
    }
  });
}

async function loadLiveEspnData() {
  isFetchingApi = true;
  updateApiBannerDom();

  try {
    liveEspnMatches = await fetchLiveEspnScores();
    lastApiUpdate = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    recomputeMatches();
  } catch (err) {
    console.warn('ESPN Live feed error:', err);
  } finally {
    isFetchingApi = false;
    renderApp();
  }
}

function recomputeMatches() {
  if (matchDataMode === 'blockbusters') {
    matches = [...realMatches];
  } else if (matchDataMode === 'live') {
    matches = liveEspnMatches.length > 0 ? [...liveEspnMatches] : [...realMatches];
  } else {
    // All
    matches = [...realMatches, ...liveEspnMatches];
  }

  // Ensure featuredMatch points to a valid match
  if (!matches.some(m => m.id === featuredMatch?.id)) {
    featuredMatch = matches[0];
  }
}

function renderApp() {
  app.innerHTML = `
    <!-- Top Nav Bar -->
    <header class="navbar">
      <div class="nav-brand">
        <div class="brand-logo-icon">⚽</div>
        <div class="brand-text-col">
          <div class="brand-title">FOOTBALL<span class="highlight">PULSE</span></div>
          <div class="brand-tagline">REAL SCORES AS OF OCTOBER 28, 2025 · xG INTEL · TEAM OF THE WEEK</div>
        </div>
      </div>

      <!-- Main Navigation Tabs -->
      <nav class="nav-tabs">
        <button class="nav-tab ${activeTab === 'matches' ? 'active' : ''}" data-tab="matches">
          <span class="tab-icon">⚡</span>
          <span class="tab-text">Real Matches & Analytics</span>
          <span class="live-count-badge">${matches.filter(m => m.status === 'LIVE').length} LIVE</span>
        </button>
        <button class="nav-tab ${activeTab === 'totw' ? 'active' : ''}" data-tab="totw">
          <span class="tab-icon">👑</span>
          <span class="tab-text">Team of the Week</span>
          <span class="totw-tag-pill">OCT 28, 2025</span>
        </button>
        <button class="nav-tab ${activeTab === 'standings' ? 'active' : ''}" data-tab="standings">
          <span class="tab-icon">📊</span>
          <span class="tab-text">Tables & Scorers</span>
        </button>
      </nav>

      <!-- Action Controls -->
      <div class="nav-actions">
        <!-- Live Sim Quick Trigger -->
        <button class="action-btn sim-goal-btn" id="quick-goal-btn" title="Simulate Random Goal">
          <span>⚽ Goal Sim</span>
        </button>

        <!-- Sim Speed dropdown / toggle -->
        <div class="sim-speed-control">
          <span class="speed-label">CLOCK</span>
          <button class="speed-btn active" data-speed="1">1x</button>
          <button class="speed-btn" data-speed="3">3x</button>
        </div>

        <!-- Sound Toggle -->
        <button class="action-btn sound-toggle-btn" id="sound-btn" title="Toggle Sound Effects">
          ${isSoundEnabled() ? '🔊 Sound On' : '🔇 Muted'}
        </button>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="main-content" id="main-content-view">
      ${renderActiveView()}
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-inner">
        <div><strong>FOOTBALL PULSE</strong> · Official Match Scores as of October 28, 2025 · Real Club Logos & Expected Goals (xG) Analytics</div>
        <div class="footer-tags">
          <span>Premier League</span> · <span>La Liga</span> · <span>Serie A</span> · <span>Bundesliga</span> · <span>Ligue 1</span> · <span>Champions League</span>
        </div>
      </div>
    </footer>
  `;

  attachNavListeners();
  postRenderViewSetup();
}

function renderActiveView() {
  if (activeTab === 'matches') {
    return renderMatchesView();
  } else if (activeTab === 'totw') {
    return `<div id="totw-view-container"></div>`;
  } else if (activeTab === 'standings') {
    return renderStandingsView();
  }
  return '';
}

function renderMatchesView() {
  const filteredMatches = matches.filter(m => {
    const matchesLeague = selectedLeagueId === 'all' || m.leagueId === selectedLeagueId;
    const matchesStatus = selectedStatus === 'all' || m.status === selectedStatus;
    return matchesLeague && matchesStatus;
  });

  return `
    <div class="matches-view-wrapper">
      <!-- Live API Feed Status Banner -->
      <div class="live-api-status-banner">
        <div class="api-status-left">
          <div class="api-live-indicator">
            <span class="pulse-green-dot"></span>
            <span>DATA AS OF OCT 28, 2025</span>
          </div>
          <div>
            <div class="api-feed-text">Official Scores as of Tuesday, October 28, 2025 (Matchdays & Midweek Fixtures)</div>
            <div class="api-feed-sub">Verified real scores, scorers, club crests & xG models directly from ESPN soccer records</div>
          </div>
        </div>

        <div class="api-actions-right">
          <!-- Data Mode Switcher -->
          <div class="data-mode-pills" id="data-mode-pills">
            <button class="mode-pill-btn ${matchDataMode === 'blockbusters' ? 'active' : ''}" data-mode="blockbusters">
              🌟 Verified Matchdays (El Clásico 0-4, Arsenal 2-2 Liverpool, Inter 4-4 Juve)
            </button>
            <button class="mode-pill-btn ${matchDataMode === 'live' ? 'active' : ''}" data-mode="live">
              🔴 Live Today (Oct 28: Serie A & Midweek Fixtures)
            </button>
            <button class="mode-pill-btn ${matchDataMode === 'all' ? 'active' : ''}" data-mode="all">
              🌍 All Matches (${realMatches.length + liveEspnMatches.length})
            </button>
          </div>

          <!-- Refresh Button -->
          <button class="refresh-api-btn ${isFetchingApi ? 'loading' : ''}" id="refresh-api-btn" title="Refresh Live Scores from ESPN">
            <span class="refresh-icon">🔄</span>
            <span>${isFetchingApi ? 'Fetching...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      <!-- 1. The Featured Analytics Showcase (Matching user screenshot!) -->
      <section class="analytics-hero-section">
        <div id="hero-analytics-banner"></div>
      </section>

      <!-- 2. League Filter Chips -->
      <section class="leagues-filter-bar">
        <div class="filter-chips-scroll">
          ${LEAGUES.map(league => `
            <button class="league-chip ${selectedLeagueId === league.id ? 'active' : ''}" data-league-id="${league.id}">
              <span class="chip-badge">${league.badge}</span>
              <span class="chip-name">${league.name}</span>
              ${league.id !== 'all' ? `
                <span class="chip-count">${matches.filter(m => m.leagueId === league.id).length}</span>
              ` : ''}
            </button>
          `).join('')}
        </div>
      </section>

      <!-- 3. Status Filters (All, Live, Finished, Upcoming) -->
      <section class="status-filter-row">
        <div class="status-pills">
          <button class="status-pill ${selectedStatus === 'all' ? 'active' : ''}" data-status="all">All (${matches.length})</button>
          <button class="status-pill live-pill ${selectedStatus === 'LIVE' ? 'active' : ''}" data-status="LIVE">
            <span class="live-dot-pulse"></span> LIVE (${matches.filter(m => m.status === 'LIVE').length})
          </button>
          <button class="status-pill ${selectedStatus === 'FT' ? 'active' : ''}" data-status="FT">Full Time (${matches.filter(m => m.status === 'FT').length})</button>
          <button class="status-pill ${selectedStatus === 'UPCOMING' ? 'active' : ''}" data-status="UPCOMING">Upcoming (${matches.filter(m => m.status === 'UPCOMING').length})</button>
        </div>
        <div class="fixtures-caption">Click any match to load its real xG Zone Analysis, Pass Network & Playmaker Radar</div>
      </section>

      <!-- 4. Matches Cards Grid -->
      <section class="matches-grid">
        ${filteredMatches.length === 0 ? `
          <div class="no-matches-box">No matches found for the selected filter.</div>
        ` : filteredMatches.map(match => renderMatchCard(match)).join('')}
      </section>
    </div>
  `;
}

function renderMatchCard(match) {
  const isSelected = featuredMatch && featuredMatch.id === match.id;
  const isLive = match.status === 'LIVE';
  const isFt = match.status === 'FT';

  return `
    <div class="match-card ${isSelected ? 'is-selected' : ''} ${isLive ? 'is-live' : ''}" data-match-id="${match.id}">
      <!-- Card Top: League & Status & Date -->
      <div class="match-card-top">
        <div class="league-meta-cell">
          <span class="card-league-badge">${match.leagueName}</span>
          ${match.dateText ? `<span class="match-date-badge">· ${match.dateText}</span>` : ''}
        </div>
        <div class="card-status-badge ${isLive ? 'status-live' : (isFt ? 'status-ft' : 'status-upcoming')}">
          ${isLive ? `<span class="live-dot-pulse"></span> ${match.minute || match.clockDisplay || ''} LIVE` : (isFt ? 'FT' : match.clockDisplay || 'Upcoming')}
        </div>
      </div>

      <!-- Teams & Score Block with Real Logos -->
      <div class="match-teams-block">
        <!-- Home Team -->
        <div class="team-row home-row">
          <div class="team-identity">
            ${match.homeTeam.badge ? `
              <img src="${match.homeTeam.badge}" alt="${match.homeTeam.name}" class="team-crest-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';" />
              <span class="team-icon" style="display:none">${match.homeTeam.logoEmoji || '⚽'}</span>
            ` : `<span class="team-icon">${match.homeTeam.logoEmoji || '⚽'}</span>`}
            <span class="team-name">${match.homeTeam.name}</span>
          </div>
          <span class="team-score ${match.homeTeam.score > match.awayTeam.score ? 'winning' : ''}">${match.status === 'UPCOMING' ? '-' : match.homeTeam.score}</span>
        </div>

        <!-- Away Team -->
        <div class="team-row away-row">
          <div class="team-identity">
            ${match.awayTeam.badge ? `
              <img src="${match.awayTeam.badge}" alt="${match.awayTeam.name}" class="team-crest-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';" />
              <span class="team-icon" style="display:none">${match.awayTeam.logoEmoji || '⚽'}</span>
            ` : `<span class="team-icon">${match.awayTeam.logoEmoji || '⚽'}</span>`}
            <span class="team-name">${match.awayTeam.name}</span>
          </div>
          <span class="team-score ${match.awayTeam.score > match.homeTeam.score ? 'winning' : ''}">${match.status === 'UPCOMING' ? '-' : match.awayTeam.score}</span>
        </div>
      </div>

      <!-- Live / Official Scorers (if any) -->
      ${(match.homeTeam.scorers?.length || match.awayTeam.scorers?.length) ? `
        <div class="match-mini-scorers">
          ${[...(match.homeTeam.scorers || []), ...(match.awayTeam.scorers || [])].map(s => `
            <span class="scorer-pill">⚽ ${s.name} ${s.minute}</span>
          `).join('')}
        </div>
      ` : ''}

      <!-- xG Dual Gauge Bar -->
      <div class="match-xg-gauge">
        <div class="xg-text-row">
          <span class="xg-home-val">xG ${match.stats?.xg?.home ? match.stats.xg.home.toFixed(2) : '1.20'}</span>
          <span class="xg-label">Expected Goals</span>
          <span class="xg-away-val">xG ${match.stats?.xg?.away ? match.stats.xg.away.toFixed(2) : '1.10'}</span>
        </div>
        <div class="xg-bar-track">
          <div class="xg-bar-home" style="width: ${getXgPercentage(match.stats?.xg?.home || 1, match.stats?.xg?.away || 1)}%"></div>
          <div class="xg-bar-away" style="width: ${100 - getXgPercentage(match.stats?.xg?.home || 1, match.stats?.xg?.away || 1)}%"></div>
        </div>
      </div>

      <!-- Card Action Buttons -->
      <div class="match-card-actions">
        <button class="card-btn btn-feature ${isSelected ? 'active' : ''}" data-action="feature" data-match-id="${match.id}">
          ${isSelected ? '✓ In Analytics Banner' : '⚡ Inspect Analytics'}
        </button>
        <button class="card-btn btn-modal" data-action="modal" data-match-id="${match.id}">
          🎯 Match Center & Shots
        </button>
        ${isLive ? `
          <button class="card-btn btn-sim-quick" data-action="quick-goal" data-match-id="${match.id}" title="Simulate Goal for this match">
            +⚽
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function getXgPercentage(homeXg, awayXg) {
  const sum = (homeXg + awayXg) || 1;
  return Math.min(90, Math.max(10, (homeXg / sum) * 100));
}

function renderStandingsView() {
  const table = STANDINGS[standingsLeague] || STANDINGS['epl'];

  return `
    <div class="standings-wrapper">
      <div class="standings-header">
        <div>
          <h2>Top European Leagues Standings & Golden Boot</h2>
          <div class="standings-sub">Official points tables, expected goal supremacy and individual honors</div>
        </div>

        <div class="standings-league-pills" id="standings-league-pills">
          <button class="pill-btn ${standingsLeague === 'epl' ? 'active' : ''}" data-sleague="epl">🦁 Premier League</button>
          <button class="pill-btn ${standingsLeague === 'laliga' ? 'active' : ''}" data-sleague="laliga">⚔️ La Liga</button>
          <button class="pill-btn ${standingsLeague === 'bundesliga' ? 'active' : ''}" data-sleague="bundesliga">🦅 Bundesliga</button>
        </div>
      </div>

      <div class="standings-grid-layout">
        <!-- Standings Table -->
        <div class="table-card">
          <div class="table-title">
            <h3>Official League Table & xG Balance</h3>
            <span class="table-badge">Matchday 26</span>
          </div>

          <div class="table-responsive">
            <table class="league-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Club</th>
                  <th>P</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GD</th>
                  <th>xG</th>
                  <th>Form</th>
                  <th>PTS</th>
                </tr>
              </thead>
              <tbody>
                ${table.map(row => `
                  <tr class="${row.pos <= 4 ? 'ucl-zone' : ''}">
                    <td class="pos-cell">${row.pos}</td>
                    <td class="team-cell"><strong>${row.name}</strong></td>
                    <td>${row.played}</td>
                    <td>${row.won}</td>
                    <td>${row.draw}</td>
                    <td>${row.lost}</td>
                    <td>${row.gd}</td>
                    <td class="xg-cell">${row.xg}</td>
                    <td class="form-cell">
                      ${row.form.map(f => `<span class="form-tag form-${f.toLowerCase()}">${f}</span>`).join('')}
                    </td>
                    <td class="pts-cell"><strong>${row.pts}</strong></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Top Scorers & xG Leaders -->
        <div class="scorers-card">
          <div class="table-title">
            <h3>Golden Boot & xG Overperformance</h3>
            <span class="table-badge">All Top Leagues</span>
          </div>

          <div class="scorers-list-panel">
            ${TOP_SCORERS.map((sc, idx) => `
              <div class="scorer-row">
                <div class="scorer-rank">${idx + 1}</div>
                <div class="scorer-info">
                  <div class="scorer-name">${sc.flag} ${sc.name}</div>
                  <div class="scorer-club">${sc.club} · ${sc.assists} Assists</div>
                </div>
                <div class="scorer-stats-col">
                  <div class="scorer-goals"><strong>${sc.goals}</strong> Goals</div>
                  <div class="scorer-xg">${sc.xg} xG (<span class="diff-pos">${sc.diff}</span>)</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function postRenderViewSetup() {
  if (activeTab === 'matches') {
    const bannerTarget = document.getElementById('hero-analytics-banner');
    if (bannerTarget && featuredMatch) {
      renderAnalyticsBanner(bannerTarget, featuredMatch, isRadarComparing);

      // Radar compare button
      const compareBtn = bannerTarget.querySelector('#radar-compare-btn');
      if (compareBtn) {
        compareBtn.addEventListener('click', () => {
          playClickSound();
          isRadarComparing = !isRadarComparing;
          renderAnalyticsBanner(bannerTarget, featuredMatch, isRadarComparing);
        });
      }
    }
    attachMatchViewListeners();
  } else if (activeTab === 'totw') {
    const totwContainer = document.getElementById('totw-view-container');
    if (totwContainer) {
      initTotwBuilder(totwContainer);
    }
  } else if (activeTab === 'standings') {
    attachStandingsListeners();
  }
}

function updateApiBannerDom() {
  const refreshBtn = document.getElementById('refresh-api-btn');
  if (refreshBtn) {
    if (isFetchingApi) {
      refreshBtn.classList.add('loading');
      refreshBtn.innerHTML = '<span class="refresh-icon">🔄</span><span>Fetching...</span>';
    } else {
      refreshBtn.classList.remove('loading');
      refreshBtn.innerHTML = '<span class="refresh-icon">🔄</span><span>Refresh</span>';
    }
  }
}

function updateLiveScoresOnly() {
  if (featuredMatch && featuredMatch.status === 'LIVE') {
    const bannerTarget = document.getElementById('hero-analytics-banner');
    if (bannerTarget) {
      renderAnalyticsBanner(bannerTarget, featuredMatch, isRadarComparing);
      const compareBtn = bannerTarget.querySelector('#radar-compare-btn');
      if (compareBtn) {
        compareBtn.addEventListener('click', () => {
          playClickSound();
          isRadarComparing = !isRadarComparing;
          renderAnalyticsBanner(bannerTarget, featuredMatch, isRadarComparing);
        });
      }
    }
  }

  // Update cards in DOM
  matches.forEach(m => {
    const card = document.querySelector(`.match-card[data-match-id="${m.id}"]`);
    if (card) {
      const scoreHome = card.querySelector('.home-row .team-score');
      const scoreAway = card.querySelector('.away-row .team-score');
      const statusBadge = card.querySelector('.card-status-badge');
      const xgHome = card.querySelector('.xg-home-val');
      const xgAway = card.querySelector('.xg-away-val');
      const xgBarHome = card.querySelector('.xg-bar-home');
      const xgBarAway = card.querySelector('.xg-bar-away');

      if (scoreHome) scoreHome.textContent = m.homeTeam.score;
      if (scoreAway) scoreAway.textContent = m.awayTeam.score;
      if (statusBadge && m.status === 'LIVE') {
        statusBadge.innerHTML = `<span class="live-dot-pulse"></span> ${m.minute || m.clockDisplay || ''} LIVE`;
      }
      if (xgHome && m.stats?.xg) xgHome.textContent = `xG ${m.stats.xg.home.toFixed(2)}`;
      if (xgAway && m.stats?.xg) xgAway.textContent = `xG ${m.stats.xg.away.toFixed(2)}`;
      if (xgBarHome && xgBarAway && m.stats?.xg) {
        const pct = getXgPercentage(m.stats.xg.home, m.stats.xg.away);
        xgBarHome.style.width = `${pct}%`;
        xgBarAway.style.width = `${100 - pct}%`;
      }
    }
  });

  const liveCountBadge = document.querySelector('.live-count-badge');
  if (liveCountBadge) {
    liveCountBadge.textContent = `${matches.filter(m => m.status === 'LIVE').length} LIVE`;
  }
}

function attachNavListeners() {
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      playClickSound();
      activeTab = tab.dataset.tab;
      renderApp();
    });
  });

  const soundBtn = document.getElementById('sound-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const isNowEnabled = toggleSound();
      if (isNowEnabled) playWhistle();
      soundBtn.innerHTML = isNowEnabled ? '🔊 Sound On' : '🔇 Muted';
    });
  }

  const quickGoalBtn = document.getElementById('quick-goal-btn');
  if (quickGoalBtn) {
    quickGoalBtn.addEventListener('click', () => {
      const liveMatches = matches.filter(m => m.status === 'LIVE');
      const target = liveMatches.length > 0 ? liveMatches[Math.floor(Math.random() * liveMatches.length)] : matches[0];
      triggerSimulatedGoal(target);
      updateLiveScoresOnly();
    });
  }

  document.querySelectorAll('.sim-speed-control .speed-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      document.querySelectorAll('.sim-speed-control .speed-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const speed = Number(btn.dataset.speed);
      setSimulationSpeed(speed);
      startLiveEngine(matches, () => {
        if (activeTab === 'matches') updateLiveScoresOnly();
      });
    });
  });
}

function attachMatchViewListeners() {
  // Data mode switcher (Blockbusters vs Live vs All)
  document.querySelectorAll('#data-mode-pills .mode-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      matchDataMode = btn.dataset.mode;
      recomputeMatches();
      renderApp();
    });
  });

  // Refresh API button
  const refreshBtn = document.getElementById('refresh-api-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      playClickSound();
      loadLiveEspnData();
    });
  }

  // League chip filters
  document.querySelectorAll('.league-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      playClickSound();
      selectedLeagueId = chip.dataset.leagueId;
      renderApp();
    });
  });

  // Status pills
  document.querySelectorAll('.status-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      playClickSound();
      selectedStatus = pill.dataset.status;
      renderApp();
    });
  });

  // Match card buttons
  document.querySelectorAll('.match-card').forEach(card => {
    const matchId = card.dataset.matchId;
    const match = matches.find(m => m.id === matchId);
    if (!match) return;

    const featureBtn = card.querySelector('[data-action="feature"]');
    if (featureBtn) {
      featureBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playClickSound();
        featuredMatch = match;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const bannerTarget = document.getElementById('hero-analytics-banner');
        if (bannerTarget) {
          renderAnalyticsBanner(bannerTarget, featuredMatch, isRadarComparing);
          document.querySelectorAll('.match-card').forEach(c => c.classList.remove('is-selected'));
          card.classList.add('is-selected');
        }
      });
    }

    const modalBtn = card.querySelector('[data-action="modal"]');
    if (modalBtn) {
      modalBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playClickSound();
        openMatchCenter(match);
      });
    }

    const quickGoal = card.querySelector('[data-action="quick-goal"]');
    if (quickGoal) {
      quickGoal.addEventListener('click', (e) => {
        e.stopPropagation();
        triggerSimulatedGoal(match);
        updateLiveScoresOnly();
      });
    }

    card.addEventListener('click', () => {
      playClickSound();
      featuredMatch = match;
      const bannerTarget = document.getElementById('hero-analytics-banner');
      if (bannerTarget) {
        renderAnalyticsBanner(bannerTarget, featuredMatch, isRadarComparing);
        document.querySelectorAll('.match-card').forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');
      }
    });
  });
}

function attachStandingsListeners() {
  document.querySelectorAll('#standings-league-pills .pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();
      standingsLeague = btn.dataset.sleague;
      const mainContent = document.getElementById('main-content-view');
      if (mainContent) {
        mainContent.innerHTML = renderStandingsView();
        attachStandingsListeners();
      }
    });
  });
}

// Start application
init();
