# ⚽ FootballPulse

> **The Beautiful Game · Next-Generation Football Analytics & Live Intel**  
> Real European matchday scores, official Opta & Understat Expected Goals (xG) models, passing networks, playmaker radars, and interactive Team of the Week (TOTW) squad builder.

---

## ✨ Features

- **⚡ Elite 3-Panel Analytics Visualizer**:
  - **xG Shot Analysis**: Zone breakdown (`6-yd`, `Pen`, `D-L`, `D-R`, `Far`, `FK`) with interactive team switcher.
  - **Pass Network**: Interactive pitch diagram showing player positioning, touch density, and key passing links.
  - **Playmaker Radar**: 6-axis performance radar (*Spatial IQ, Vision, Key Pass, Press Resistance, Tempo, Threat*) with side-by-side rival star comparison (e.g. Raphinha vs Vinícius Jr., Saka vs Salah, Palmer vs Isak, Musiala vs Olise).

- **📊 100% Verified Official Match Statistics**:
  - Verified Opta / Understat data for Europe's biggest blockbusters:
    - **El Clásico**: Real Madrid 0 – 4 FC Barcelona
    - **Premier League**: Arsenal 2 – 2 Liverpool · Chelsea 2 – 1 Newcastle · Man City 1 – 0 Southampton
    - **Derby d'Italia**: Inter Milan 4 – 4 Juventus (8-goal thriller)
    - **Bundesliga**: VfL Bochum 0 – 5 Bayern Munich
  - Real ball possession, expected goals, big chances, pass completion, PPDA pressing metrics, and Expected Threat (xT).

- **👑 Holographic Team of the Week (TOTW) Builder**:
  - 3D perspective glowing pitch with tactical field markings.
  - Formations switcher: **4-3-3 Attack**, **4-2-3-1 Modern**, and **3-4-2-1 Tactical**.
  - EA FC / FUT-style glowing cards with overall ratings, match ratings, key stats, and scout quotes.
  - League squads for **All-Europe Elite XI**, **Premier League**, **La Liga**, and **Bundesliga**.
  - Interactive player scouting modal and celebratory confetti animations.

- **🎯 Interactive Match Center & Shot Map**:
  - Click any fixture to view full tactical breakdown.
  - Pitch shot map with color-coded outcomes (goals, saved, blocked, off-target) and shot-size proportional to xG.
  - Cumulative xG momentum curve throughout the 90 minutes.

- **📈 League Tables & Golden Boot Leaders**:
  - Up-to-date standings for Premier League, La Liga, Serie A, and Bundesliga.
  - Top scorers list with xG over/underperformance analysis.

- **🔊 Web Audio API Sound Effects**:
  - Synthesized referee whistles, stadium roar/celebration chimes, and tactical UI clicks with mute toggle.

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript (ES Modules), HTML5 Semantic Structure
- **Design & Styling**: Custom Vanilla CSS with modern dark analytics theme, glassmorphism, glowing accents
- **Build Tool**: Vite
- **Libraries**: `canvas-confetti`
- **APIs**: ESPN public soccer scoreboard endpoints & verified Opta/Understat dataset

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/akshaysharma2005/footballpulse.git

# Navigate to project directory
cd footballpulse

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5180/` (or the port specified in console).

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

MIT License. Open source and built for football analytics enthusiasts.
