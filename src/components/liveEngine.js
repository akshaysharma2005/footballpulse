// Live Match Simulation & Real-time Update Engine
import { playWhistle, playGoalSound } from './audio.js';
import confetti from 'canvas-confetti';

let simulationInterval = null;
let isSimulating = false; // Simulation OFF by default to preserve 100% verified real official statistics
let simulationSpeed = 1; // 1x, 2x, 5x

export function startLiveEngine(matches, onUpdate) {
  if (simulationInterval) clearInterval(simulationInterval);

  simulationInterval = setInterval(() => {
    if (!isSimulating) return;

    let updated = false;

    matches.forEach(m => {
      // NEVER mutate real verified matches or finished FT matches
      if (m.isReal || m.status === 'FT') return;

      if (m.status === 'LIVE' && m.minute < 90) {
        m.minute += 1;
        updated = true;

        // Occasional goal event simulation for non-verified simulated matches
        if (Math.random() < 0.015) {
          triggerSimulatedGoal(m);
        }
      }
    });

    if (updated && onUpdate) {
      onUpdate();
    }
  }, 3500 / simulationSpeed);
}

export function toggleSimulation(shouldRun) {
  isSimulating = shouldRun !== undefined ? shouldRun : !isSimulating;
  return isSimulating;
}

export function setSimulationSpeed(speed) {
  simulationSpeed = speed;
}

export function triggerSimulatedGoal(match) {
  // If match is real and verified, do not corrupt real data
  if (match.isReal || match.status === 'FT') {
    showGoalBanner('Official Match Recorded', `${match.homeTeam.name} vs ${match.awayTeam.name} is a verified official matchday result.`);
    return;
  }

  const scorerPool = isHome
    ? ['E. Haaland', 'K. De Bruyne', 'P. Foden', 'Vinícius Jr.', 'K. Mbappé', 'M. Salah', 'F. Wirtz']
    : ['B. Saka', 'Lamine Yamal', 'G. Martinelli', 'H. Kane', 'J. Musiala', 'J. Brandt'];
  const scorer = scorerPool[Math.floor(Math.random() * scorerPool.length)];

  team.scorers = team.scorers || [];
  team.scorers.push({
    name: scorer,
    minute: `${match.minute}'`,
    type: 'goal'
  });

  // Boost xG
  if (isHome) {
    match.stats.xg.home = +(match.stats.xg.home + 0.65).toFixed(2);
  } else {
    match.stats.xg.away = +(match.stats.xg.away + 0.65).toFixed(2);
  }

  // Play audio & show banner
  playGoalSound();
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.2 }
    });
  } catch (e) {}

  showGoalBanner(`GOAL! ${scorer} (${match.minute}')`, `${team.name} takes the lead! [${match.homeTeam.score} - ${match.awayTeam.score}]`);
}

function showGoalBanner(title, text) {
  let toast = document.getElementById('live-goal-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'live-goal-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="toast-card">
      <div class="toast-icon">⚽⚡</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-sub">${text}</div>
      </div>
    </div>
  `;

  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 4500);
}
