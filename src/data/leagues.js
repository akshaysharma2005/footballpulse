// Top European Football Leagues & Live Matchday Data

export const LEAGUES = [
  { id: 'all', name: 'All Competitions', icon: '⚽', badge: '🌍' },
  { id: 'ucl', name: 'UEFA Champions League', icon: '⭐', badge: '🇪🇺', color: '#1a56db' },
  { id: 'epl', name: 'Premier League', icon: '🦁', badge: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#38003c' },
  { id: 'laliga', name: 'La Liga EA Sports', icon: '⚔️', badge: '🇪🇸', color: '#ee151f' },
  { id: 'seriea', name: 'Serie A Enilive', icon: '🇮🇹', badge: '🇮🇹', color: '#024494' },
  { id: 'bundesliga', name: 'Bundesliga', icon: '🦅', badge: '🇩🇪', color: '#d3010c' },
  { id: 'ligue1', name: 'Ligue 1 McDonald\'s', icon: '🗼', badge: '🇫🇷', color: '#091c3e' }
];

export const INITIAL_MATCHES = [
  {
    id: 'm1',
    leagueId: 'epl',
    leagueName: 'Premier League',
    status: 'LIVE',
    minute: 76,
    isHot: true,
    homeTeam: {
      id: 'mci',
      name: 'Manchester City',
      short: 'MCI',
      badge: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🩵',
      score: 3,
      scorers: [
        { name: 'E. Haaland', minute: '24\' (P)', type: 'pen' },
        { name: 'K. De Bruyne', minute: '58\'', type: 'goal' },
        { name: 'E. Haaland', minute: '71\'', type: 'goal' }
      ]
    },
    awayTeam: {
      id: 'ars',
      name: 'Arsenal',
      short: 'ARS',
      badge: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🔴',
      score: 2,
      scorers: [
        { name: 'B. Saka', minute: '39\'', type: 'goal' },
        { name: 'G. Martinelli', minute: '64\'', type: 'goal' }
      ]
    },
    venue: 'Etihad Stadium, Manchester',
    referee: 'Michael Oliver',
    stats: {
      xg: { home: 2.58, away: 1.42 },
      possession: { home: 58, away: 42 },
      shots: { home: 14, away: 9 },
      shotsOnTarget: { home: 7, away: 4 },
      corners: { home: 6, away: 4 },
      fouls: { home: 8, away: 11 },
      bigChances: { home: 4, away: 2 },
      passes: { home: 641, away: 420 },
      passAcc: { home: 89.2, away: 82.5 },
      touches: { home: 785, away: 540 },
      fieldTilt: { home: 68, away: 32 },
      ppda: { home: 7.8, away: 12.4 },
      xt: { home: 1.64, away: 0.92 }
    },
    // The exact structure corresponding to the user's analytics visualizer
    zoneXg: [
      { zone: '6-yd', label: '6-yd Box', xg: 0.82, shots: 3, color: '#00e676' },
      { zone: 'Pen', label: 'Penalty Spot', xg: 0.76, shots: 4, color: '#00e5ff' },
      { zone: 'D-L', label: 'Box Left (D-L)', xg: 0.43, shots: 3, color: '#ffb300' },
      { zone: 'D-R', label: 'Box Right (D-R)', xg: 0.38, shots: 2, color: '#ff7043' },
      { zone: 'Far', label: 'Outside Box', xg: 0.12, shots: 1, color: '#00b0ff' },
      { zone: 'FK', label: 'Direct FK', xg: 0.07, shots: 1, color: '#ff5252' }
    ],
    passNetwork: {
      team: 'Manchester City',
      nodes: [
        { id: 'GK', label: 'GK', name: 'Ederson', x: 12, y: 50, touches: 42, acc: 91 },
        { id: 'LB', label: 'LB', name: 'Gvardiol', x: 30, y: 22, touches: 68, acc: 88 },
        { id: 'CB1', label: 'CB', name: 'Dias', x: 26, y: 40, touches: 75, acc: 94 },
        { id: 'CB2', label: 'CB', name: 'Akanji', x: 26, y: 62, touches: 71, acc: 92 },
        { id: 'RB', label: 'RB', name: 'Walker', x: 32, y: 80, touches: 64, acc: 87 },
        { id: 'CDM', label: 'CDM', name: 'Rodri', x: 48, y: 50, touches: 96, acc: 94, isPivot: true },
        { id: 'LCM', label: 'LCM', name: 'Silva', x: 55, y: 30, touches: 82, acc: 90 },
        { id: 'RCM', label: 'RCM', name: 'Foden', x: 56, y: 70, touches: 67, acc: 86 },
        { id: 'CAM', label: 'CAM', name: 'De Bruyne', x: 68, y: 50, touches: 78, acc: 85, isStar: true },
        { id: 'LW', label: 'LW', name: 'Grealish', x: 74, y: 24, touches: 53, acc: 84 },
        { id: 'RW', label: 'RW', name: 'Doku', x: 76, y: 78, touches: 49, acc: 82 },
        { id: 'ST', label: 'ST', name: 'Haaland', x: 88, y: 50, touches: 32, acc: 78, hasBall: true }
      ],
      links: [
        { from: 'GK', to: 'CB1', value: 18, dashed: true },
        { from: 'GK', to: 'CB2', value: 16, dashed: true },
        { from: 'CB1', to: 'LB', value: 24, dashed: false },
        { from: 'CB2', to: 'RB', value: 21, dashed: false },
        { from: 'CB1', to: 'CDM', value: 31, dashed: false },
        { from: 'CB2', to: 'CDM', value: 29, dashed: false },
        { from: 'CDM', to: 'LCM', value: 38, dashed: false },
        { from: 'CDM', to: 'RCM', value: 34, dashed: false },
        { from: 'CDM', to: 'CAM', value: 42, dashed: false, thick: true },
        { from: 'LCM', to: 'LW', value: 22, dashed: true },
        { from: 'RCM', to: 'RW', value: 25, dashed: true },
        { from: 'CAM', to: 'ST', value: 28, dashed: true, keyLink: true }
      ]
    },
    playmakerRadar: {
      playerName: 'Kevin De Bruyne',
      team: 'Manchester City',
      pos: 'CAM · #17',
      overallRating: 92.5,
      metrics: [
        { label: 'Spatial IQ', value: 96, fullMark: 100 },
        { label: 'Vision', value: 98, fullMark: 100 },
        { label: 'Key Pass', value: 93, fullMark: 100 },
        { label: 'Press Resist', value: 89, fullMark: 100 },
        { label: 'Tempo', value: 92, fullMark: 100 },
        { label: 'Threat', value: 86, fullMark: 100 }
      ],
      comparison: {
        playerName: 'Martin Ødegaard',
        team: 'Arsenal',
        pos: 'CAM · #8',
        overallRating: 88.4,
        metrics: [
          { label: 'Spatial IQ', value: 91, fullMark: 100 },
          { label: 'Vision', value: 92, fullMark: 100 },
          { label: 'Key Pass', value: 88, fullMark: 100 },
          { label: 'Press Resist', value: 93, fullMark: 100 },
          { label: 'Tempo', value: 89, fullMark: 100 },
          { label: 'Threat', value: 80, fullMark: 100 }
        ]
      }
    },
    shots: [
      { id: 's1', team: 'home', player: 'E. Haaland', min: 24, xg: 0.76, result: 'goal', x: 88, y: 50, zone: 'Pen' },
      { id: 's2', team: 'home', player: 'K. De Bruyne', min: 32, xg: 0.12, result: 'saved', x: 74, y: 38, zone: 'Far' },
      { id: 's3', team: 'away', player: 'B. Saka', min: 39, xg: 0.38, result: 'goal', x: 86, y: 62, zone: 'D-R' },
      { id: 's4', team: 'home', player: 'P. Foden', min: 44, xg: 0.07, result: 'blocked', x: 75, y: 50, zone: 'FK' },
      { id: 's5', team: 'home', player: 'K. De Bruyne', min: 58, xg: 0.43, result: 'goal', x: 84, y: 38, zone: 'D-L' },
      { id: 's6', team: 'away', player: 'G. Martinelli', min: 64, xg: 0.45, result: 'goal', x: 87, y: 44, zone: 'D-L' },
      { id: 's7', team: 'home', player: 'E. Haaland', min: 71, xg: 0.82, result: 'goal', x: 94, y: 52, zone: '6-yd' }
    ],
    timeline: [
      { min: 0, xgHome: 0.00, xgAway: 0.00 },
      { min: 15, xgHome: 0.22, xgAway: 0.10 },
      { min: 24, xgHome: 0.98, xgAway: 0.10, event: '⚽ Haaland 24\' (P)' },
      { min: 39, xgHome: 1.15, xgAway: 0.48, event: '⚽ Saka 39\'' },
      { min: 45, xgHome: 1.25, xgAway: 0.55 },
      { min: 58, xgHome: 1.68, xgAway: 0.65, event: '⚽ De Bruyne 58\'' },
      { min: 64, xgHome: 1.68, xgAway: 1.10, event: '⚽ Martinelli 64\'' },
      { min: 71, xgHome: 2.50, xgAway: 1.20, event: '⚽ Haaland 71\'' },
      { min: 76, xgHome: 2.58, xgAway: 1.42 }
    ]
  },
  {
    id: 'm2',
    leagueId: 'laliga',
    leagueName: 'La Liga EA Sports',
    status: 'LIVE',
    minute: 63,
    isHot: true,
    homeTeam: {
      id: 'rma',
      name: 'Real Madrid',
      short: 'RMA',
      badge: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '👑',
      score: 2,
      scorers: [
        { name: 'Vinícius Jr.', minute: '19\'', type: 'goal' },
        { name: 'K. Mbappé', minute: '52\'', type: 'goal' }
      ]
    },
    awayTeam: {
      id: 'bar',
      name: 'FC Barcelona',
      short: 'FCB',
      badge: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🔵🔴',
      score: 1,
      scorers: [
        { name: 'Lamine Yamal', minute: '41\'', type: 'goal' }
      ]
    },
    venue: 'Santiago Bernabéu, Madrid',
    referee: 'Gil Manzano',
    stats: {
      xg: { home: 2.14, away: 1.65 },
      possession: { home: 49, away: 51 },
      shots: { home: 12, away: 10 },
      shotsOnTarget: { home: 6, away: 5 },
      corners: { home: 5, away: 6 },
      fouls: { home: 9, away: 10 },
      bigChances: { home: 3, away: 2 },
      passes: { home: 480, away: 512 },
      passAcc: { home: 88.4, away: 89.1 },
      touches: { home: 610, away: 645 },
      fieldTilt: { home: 54, away: 46 },
      ppda: { home: 8.6, away: 7.9 },
      xt: { home: 1.48, away: 1.32 }
    },
    zoneXg: [
      { zone: '6-yd', label: '6-yd Box', xg: 0.65, shots: 2, color: '#00e676' },
      { zone: 'Pen', label: 'Penalty Spot', xg: 0.72, shots: 3, color: '#00e5ff' },
      { zone: 'D-L', label: 'Box Left (D-L)', xg: 0.51, shots: 4, color: '#ffb300' },
      { zone: 'D-R', label: 'Box Right (D-R)', xg: 0.18, shots: 1, color: '#ff7043' },
      { zone: 'Far', label: 'Outside Box', xg: 0.08, shots: 2, color: '#00b0ff' },
      { zone: 'FK', label: 'Direct FK', xg: 0.00, shots: 0, color: '#ff5252' }
    ],
    passNetwork: {
      team: 'Real Madrid',
      nodes: [
        { id: 'GK', label: 'GK', name: 'Courtois', x: 12, y: 50, touches: 38, acc: 88 },
        { id: 'LB', label: 'LB', name: 'Mendy', x: 30, y: 22, touches: 54, acc: 89 },
        { id: 'CB1', label: 'CB', name: 'Rüdiger', x: 26, y: 40, touches: 65, acc: 93 },
        { id: 'CB2', label: 'CB', name: 'Militão', x: 26, y: 62, touches: 62, acc: 91 },
        { id: 'RB', label: 'RB', name: 'Carvajal', x: 32, y: 80, touches: 59, acc: 86 },
        { id: 'CDM', label: 'CDM', name: 'Tchouaméni', x: 46, y: 50, touches: 74, acc: 92, isPivot: true },
        { id: 'LCM', label: 'LCM', name: 'Valverde', x: 55, y: 32, touches: 78, acc: 89 },
        { id: 'RCM', label: 'RCM', name: 'Camavinga', x: 55, y: 68, touches: 71, acc: 91 },
        { id: 'CAM', label: 'CAM', name: 'Bellingham', x: 67, y: 50, touches: 84, acc: 87, isStar: true },
        { id: 'LW', label: 'LW', name: 'Vinícius Jr.', x: 78, y: 24, touches: 62, acc: 83 },
        { id: 'RW', label: 'RW', name: 'Rodrygo', x: 76, y: 76, touches: 50, acc: 85 },
        { id: 'ST', label: 'ST', name: 'Mbappé', x: 89, y: 48, touches: 44, acc: 81, hasBall: true }
      ],
      links: [
        { from: 'GK', to: 'CB1', value: 14, dashed: true },
        { from: 'GK', to: 'CB2', value: 15, dashed: true },
        { from: 'CB1', to: 'CDM', value: 28, dashed: false },
        { from: 'CB2', to: 'CDM', value: 27, dashed: false },
        { from: 'CDM', to: 'CAM', value: 36, dashed: false, thick: true },
        { from: 'CAM', to: 'LW', value: 32, dashed: false },
        { from: 'CAM', to: 'ST', value: 26, dashed: true, keyLink: true },
        { from: 'LW', to: 'ST', value: 29, dashed: true }
      ]
    },
    playmakerRadar: {
      playerName: 'Jude Bellingham',
      team: 'Real Madrid',
      pos: 'CAM · #5',
      overallRating: 93.8,
      metrics: [
        { label: 'Spatial IQ', value: 95, fullMark: 100 },
        { label: 'Vision', value: 91, fullMark: 100 },
        { label: 'Key Pass', value: 89, fullMark: 100 },
        { label: 'Press Resist', value: 97, fullMark: 100 },
        { label: 'Tempo', value: 90, fullMark: 100 },
        { label: 'Threat', value: 94, fullMark: 100 }
      ],
      comparison: {
        playerName: 'Pedri',
        team: 'FC Barcelona',
        pos: 'CM · #8',
        overallRating: 91.2,
        metrics: [
          { label: 'Spatial IQ', value: 96, fullMark: 100 },
          { label: 'Vision', value: 95, fullMark: 100 },
          { label: 'Key Pass', value: 91, fullMark: 100 },
          { label: 'Press Resist', value: 95, fullMark: 100 },
          { label: 'Tempo', value: 94, fullMark: 100 },
          { label: 'Threat', value: 76, fullMark: 100 }
        ]
      }
    },
    shots: [
      { id: 's21', team: 'home', player: 'Vinícius Jr.', min: 19, xg: 0.51, result: 'goal', x: 86, y: 35, zone: 'D-L' },
      { id: 's22', team: 'away', player: 'Lamine Yamal', min: 41, xg: 0.44, result: 'goal', x: 84, y: 68, zone: 'D-R' },
      { id: 's23', team: 'home', player: 'K. Mbappé', min: 52, xg: 0.72, result: 'goal', x: 88, y: 48, zone: 'Pen' }
    ],
    timeline: [
      { min: 0, xgHome: 0.00, xgAway: 0.00 },
      { min: 19, xgHome: 0.51, xgAway: 0.12, event: '⚽ Vinícius Jr. 19\'' },
      { min: 41, xgHome: 0.85, xgAway: 0.56, event: '⚽ Lamine Yamal 41\'' },
      { min: 52, xgHome: 1.80, xgAway: 0.82, event: '⚽ Mbappé 52\'' },
      { min: 63, xgHome: 2.14, xgAway: 1.65 }
    ]
  },
  {
    id: 'm3',
    leagueId: 'ucl',
    leagueName: 'UEFA Champions League',
    status: 'LIVE',
    minute: 54,
    isHot: true,
    homeTeam: {
      id: 'int',
      name: 'Inter Milan',
      short: 'INT',
      badge: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🐍',
      score: 1,
      scorers: [
        { name: 'L. Martínez', minute: '34\'', type: 'goal' }
      ]
    },
    awayTeam: {
      id: 'bay',
      name: 'Bayern Munich',
      short: 'BAY',
      badge: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🔴⚪',
      score: 2,
      scorers: [
        { name: 'H. Kane', minute: '21\' (P)', type: 'pen' },
        { name: 'J. Musiala', minute: '49\'', type: 'goal' }
      ]
    },
    venue: 'San Siro, Milan',
    referee: 'Szymon Marciniak',
    stats: {
      xg: { home: 1.25, away: 1.88 },
      possession: { home: 44, away: 56 },
      shots: { home: 8, away: 13 },
      shotsOnTarget: { home: 3, away: 6 },
      corners: { home: 3, away: 7 },
      fouls: { home: 12, away: 8 },
      bigChances: { home: 2, away: 3 },
      passes: { home: 395, away: 560 },
      passAcc: { home: 83.1, away: 90.3 },
      touches: { home: 512, away: 698 },
      fieldTilt: { home: 41, away: 59 },
      ppda: { home: 11.2, away: 6.8 },
      xt: { home: 0.88, away: 1.55 }
    },
    zoneXg: [
      { zone: '6-yd', label: '6-yd Box', xg: 0.55, shots: 2, color: '#00e676' },
      { zone: 'Pen', label: 'Penalty Spot', xg: 0.85, shots: 3, color: '#00e5ff' },
      { zone: 'D-L', label: 'Box Left (D-L)', xg: 0.22, shots: 2, color: '#ffb300' },
      { zone: 'D-R', label: 'Box Right (D-R)', xg: 0.16, shots: 1, color: '#ff7043' },
      { zone: 'Far', label: 'Outside Box', xg: 0.10, shots: 2, color: '#00b0ff' },
      { zone: 'FK', label: 'Direct FK', xg: 0.00, shots: 0, color: '#ff5252' }
    ],
    passNetwork: {
      team: 'Bayern Munich',
      nodes: [
        { id: 'GK', label: 'GK', name: 'Neuer', x: 14, y: 50, touches: 48, acc: 93 },
        { id: 'LB', label: 'LB', name: 'Davies', x: 38, y: 20, touches: 72, acc: 88 },
        { id: 'CB1', label: 'CB', name: 'Kim', x: 28, y: 40, touches: 84, acc: 95 },
        { id: 'CB2', label: 'CB', name: 'Upamecano', x: 28, y: 60, touches: 80, acc: 94 },
        { id: 'RB', label: 'RB', name: 'Kimmich', x: 42, y: 78, touches: 92, acc: 92 },
        { id: 'CDM', label: 'CDM', name: 'Pavlović', x: 50, y: 50, touches: 88, acc: 93, isPivot: true },
        { id: 'LCM', label: 'LCM', name: 'Musiala', x: 68, y: 36, touches: 86, acc: 91, isStar: true },
        { id: 'RCM', label: 'RCM', name: 'Olise', x: 72, y: 72, touches: 64, acc: 87 },
        { id: 'CAM', label: 'CAM', name: 'Gnabry', x: 75, y: 50, touches: 52, acc: 84 },
        { id: 'ST', label: 'ST', name: 'Kane', x: 86, y: 50, touches: 58, acc: 86, hasBall: true }
      ],
      links: [
        { from: 'GK', to: 'CB1', value: 20, dashed: true },
        { from: 'CB1', to: 'CDM', value: 34, dashed: false },
        { from: 'CDM', to: 'Musiala', value: 40, dashed: false, thick: true },
        { from: 'Musiala', to: 'Kane', value: 32, dashed: true, keyLink: true }
      ]
    },
    playmakerRadar: {
      playerName: 'Jamal Musiala',
      team: 'Bayern Munich',
      pos: 'AM · #42',
      overallRating: 94.2,
      metrics: [
        { label: 'Spatial IQ', value: 97, fullMark: 100 },
        { label: 'Vision', value: 93, fullMark: 100 },
        { label: 'Key Pass', value: 92, fullMark: 100 },
        { label: 'Press Resist', value: 99, fullMark: 100 },
        { label: 'Tempo', value: 91, fullMark: 100 },
        { label: 'Threat', value: 93, fullMark: 100 }
      ],
      comparison: {
        playerName: 'Hakan Çalhanoğlu',
        team: 'Inter Milan',
        pos: 'CM · #20',
        overallRating: 89.6,
        metrics: [
          { label: 'Spatial IQ', value: 92, fullMark: 100 },
          { label: 'Vision', value: 94, fullMark: 100 },
          { label: 'Key Pass', value: 95, fullMark: 100 },
          { label: 'Press Resist', value: 87, fullMark: 100 },
          { label: 'Tempo', value: 93, fullMark: 100 },
          { label: 'Threat', value: 78, fullMark: 100 }
        ]
      }
    },
    shots: [
      { id: 's31', team: 'away', player: 'H. Kane', min: 21, xg: 0.76, result: 'goal', x: 88, y: 50, zone: 'Pen' },
      { id: 's32', team: 'home', player: 'L. Martínez', min: 34, xg: 0.55, result: 'goal', x: 92, y: 48, zone: '6-yd' },
      { id: 's33', team: 'away', player: 'J. Musiala', min: 49, xg: 0.42, result: 'goal', x: 85, y: 38, zone: 'D-L' }
    ],
    timeline: [
      { min: 0, xgHome: 0.00, xgAway: 0.00 },
      { min: 21, xgHome: 0.15, xgAway: 0.82, event: '⚽ Kane 21\' (P)' },
      { min: 34, xgHome: 0.78, xgAway: 0.95, event: '⚽ Martínez 34\'' },
      { min: 49, xgHome: 0.85, xgAway: 1.62, event: '⚽ Musiala 49\'' },
      { min: 54, xgHome: 1.25, xgAway: 1.88 }
    ]
  },
  {
    id: 'm4',
    leagueId: 'epl',
    leagueName: 'Premier League',
    status: 'FT',
    minute: 90,
    isHot: false,
    homeTeam: {
      id: 'liv',
      name: 'Liverpool',
      short: 'LIV',
      badge: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🔴',
      score: 3,
      scorers: [
        { name: 'M. Salah', minute: '14\'', type: 'goal' },
        { name: 'L. Díaz', minute: '36\'', type: 'goal' },
        { name: 'D. Núñez', minute: '82\'', type: 'goal' }
      ]
    },
    awayTeam: {
      id: 'che',
      name: 'Chelsea',
      short: 'CHE',
      badge: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🔵',
      score: 1,
      scorers: [
        { name: 'C. Palmer', minute: '48\'', type: 'goal' }
      ]
    },
    venue: 'Anfield, Liverpool',
    referee: 'Anthony Taylor',
    stats: {
      xg: { home: 2.84, away: 1.18 },
      possession: { home: 54, away: 46 },
      shots: { home: 18, away: 8 },
      shotsOnTarget: { home: 9, away: 3 },
      corners: { home: 8, away: 3 },
      fouls: { home: 10, away: 12 },
      bigChances: { home: 5, away: 1 },
      passes: { home: 530, away: 460 },
      passAcc: { home: 87.5, away: 84.1 },
      touches: { home: 710, away: 590 },
      fieldTilt: { home: 65, away: 35 },
      ppda: { home: 7.2, away: 11.5 },
      xt: { home: 1.92, away: 0.81 }
    },
    zoneXg: [
      { zone: '6-yd', label: '6-yd Box', xg: 0.95, shots: 4, color: '#00e676' },
      { zone: 'Pen', label: 'Penalty Spot', xg: 0.88, shots: 5, color: '#00e5ff' },
      { zone: 'D-L', label: 'Box Left (D-L)', xg: 0.48, shots: 3, color: '#ffb300' },
      { zone: 'D-R', label: 'Box Right (D-R)', xg: 0.35, shots: 3, color: '#ff7043' },
      { zone: 'Far', label: 'Outside Box', xg: 0.14, shots: 2, color: '#00b0ff' },
      { zone: 'FK', label: 'Direct FK', xg: 0.04, shots: 1, color: '#ff5252' }
    ],
    passNetwork: {
      team: 'Liverpool',
      nodes: [
        { id: 'GK', label: 'GK', name: 'Alisson', x: 12, y: 50, touches: 39, acc: 89 },
        { id: 'LB', label: 'LB', name: 'Robertson', x: 35, y: 20, touches: 74, acc: 86 },
        { id: 'CB1', label: 'CB', name: 'Van Dijk', x: 28, y: 40, touches: 88, acc: 95 },
        { id: 'CB2', label: 'CB', name: 'Konaté', x: 28, y: 60, touches: 76, acc: 92 },
        { id: 'RB', label: 'RB', name: 'Alexander-Arnold', x: 38, y: 80, touches: 96, acc: 85, isStar: true },
        { id: 'CDM', label: 'CDM', name: 'Gravenberch', x: 50, y: 50, touches: 84, acc: 92, isPivot: true },
        { id: 'LCM', label: 'LCM', name: 'Mac Allister', x: 58, y: 34, touches: 80, acc: 91 },
        { id: 'RCM', label: 'RCM', name: 'Szoboszlai', x: 62, y: 68, touches: 68, acc: 88 },
        { id: 'LW', label: 'LW', name: 'Díaz', x: 76, y: 22, touches: 58, acc: 84 },
        { id: 'RW', label: 'RW', name: 'Salah', x: 80, y: 78, touches: 62, acc: 85 },
        { id: 'ST', label: 'ST', name: 'Núñez', x: 88, y: 50, touches: 41, acc: 79, hasBall: true }
      ],
      links: [
        { from: 'Alexander-Arnold', to: 'Salah', value: 38, dashed: false, thick: true },
        { from: 'Van Dijk', to: 'Gravenberch', value: 32, dashed: false },
        { from: 'Mac Allister', to: 'Díaz', value: 26, dashed: true },
        { from: 'Salah', to: 'Núñez', value: 22, dashed: true, keyLink: true }
      ]
    },
    playmakerRadar: {
      playerName: 'Mohamed Salah',
      team: 'Liverpool',
      pos: 'RW · #11',
      overallRating: 93.1,
      metrics: [
        { label: 'Spatial IQ', value: 94, fullMark: 100 },
        { label: 'Vision', value: 92, fullMark: 100 },
        { label: 'Key Pass', value: 90, fullMark: 100 },
        { label: 'Press Resist', value: 88, fullMark: 100 },
        { label: 'Tempo', value: 90, fullMark: 100 },
        { label: 'Threat', value: 98, fullMark: 100 }
      ],
      comparison: {
        playerName: 'Cole Palmer',
        team: 'Chelsea',
        pos: 'AM · #20',
        overallRating: 89.4,
        metrics: [
          { label: 'Spatial IQ', value: 92, fullMark: 100 },
          { label: 'Vision', value: 93, fullMark: 100 },
          { label: 'Key Pass', value: 91, fullMark: 100 },
          { label: 'Press Resist', value: 89, fullMark: 100 },
          { label: 'Tempo', value: 86, fullMark: 100 },
          { label: 'Threat', value: 90, fullMark: 100 }
        ]
      }
    },
    shots: [
      { id: 's41', team: 'home', player: 'M. Salah', min: 14, xg: 0.62, result: 'goal', x: 86, y: 64, zone: 'D-R' },
      { id: 's42', team: 'home', player: 'L. Díaz', min: 36, xg: 0.48, result: 'goal', x: 88, y: 36, zone: 'D-L' },
      { id: 's43', team: 'away', player: 'C. Palmer', min: 48, xg: 0.35, result: 'goal', x: 82, y: 52, zone: 'Far' },
      { id: 's44', team: 'home', player: 'D. Núñez', min: 82, xg: 0.95, result: 'goal', x: 94, y: 50, zone: '6-yd' }
    ],
    timeline: [
      { min: 0, xgHome: 0.00, xgAway: 0.00 },
      { min: 14, xgHome: 0.62, xgAway: 0.05, event: '⚽ Salah 14\'' },
      { min: 36, xgHome: 1.45, xgAway: 0.15, event: '⚽ Díaz 36\'' },
      { min: 48, xgHome: 1.55, xgAway: 0.60, event: '⚽ Palmer 48\'' },
      { min: 82, xgHome: 2.70, xgAway: 1.05, event: '⚽ Núñez 82\'' },
      { min: 90, xgHome: 2.84, xgAway: 1.18 }
    ]
  },
  {
    id: 'm5',
    leagueId: 'bundesliga',
    leagueName: 'Bundesliga',
    status: 'FT',
    minute: 90,
    isHot: false,
    homeTeam: {
      id: 'b04',
      name: 'Bayer Leverkusen',
      short: 'B04',
      badge: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🦁',
      score: 3,
      scorers: [
        { name: 'F. Wirtz', minute: '27\'', type: 'goal' },
        { name: 'V. Boniface', minute: '55\'', type: 'goal' },
        { name: 'F. Wirtz', minute: '89\'', type: 'goal' }
      ]
    },
    awayTeam: {
      id: 'bvb',
      name: 'Borussia Dortmund',
      short: 'BVB',
      badge: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🐝',
      score: 2,
      scorers: [
        { name: 'S. Guirassy', minute: '38\'', type: 'goal' },
        { name: 'J. Brandt', minute: '67\'', type: 'goal' }
      ]
    },
    venue: 'BayArena, Leverkusen',
    referee: 'Felix Zwayer',
    stats: {
      xg: { home: 2.45, away: 1.82 },
      possession: { home: 61, away: 39 },
      shots: { home: 16, away: 11 },
      shotsOnTarget: { home: 8, away: 5 },
      corners: { home: 7, away: 4 },
      fouls: { home: 9, away: 11 },
      bigChances: { home: 4, away: 3 },
      passes: { home: 620, away: 410 },
      passAcc: { home: 90.1, away: 83.4 },
      touches: { home: 770, away: 520 },
      fieldTilt: { home: 71, away: 29 },
      ppda: { home: 6.9, away: 12.8 },
      xt: { home: 1.85, away: 1.05 }
    },
    zoneXg: [
      { zone: '6-yd', label: '6-yd Box', xg: 0.74, shots: 3, color: '#00e676' },
      { zone: 'Pen', label: 'Penalty Spot', xg: 0.82, shots: 4, color: '#00e5ff' },
      { zone: 'D-L', label: 'Box Left (D-L)', xg: 0.44, shots: 3, color: '#ffb300' },
      { zone: 'D-R', label: 'Box Right (D-R)', xg: 0.32, shots: 2, color: '#ff7043' },
      { zone: 'Far', label: 'Outside Box', xg: 0.10, shots: 3, color: '#00b0ff' },
      { zone: 'FK', label: 'Direct FK', xg: 0.03, shots: 1, color: '#ff5252' }
    ],
    passNetwork: {
      team: 'Bayer Leverkusen',
      nodes: [
        { id: 'GK', label: 'GK', name: 'Hrádecký', x: 12, y: 50, touches: 34, acc: 88 },
        { id: 'CB1', label: 'CB', name: 'Tapsoba', x: 26, y: 32, touches: 82, acc: 94 },
        { id: 'CB2', label: 'CB', name: 'Tah', x: 26, y: 50, touches: 86, acc: 96 },
        { id: 'CB3', label: 'CB', name: 'Hincapié', x: 26, y: 68, touches: 79, acc: 93 },
        { id: 'LWB', label: 'LWB', name: 'Grimaldo', x: 48, y: 18, touches: 92, acc: 89, isStar: true },
        { id: 'RWB', label: 'RWB', name: 'Frimpong', x: 52, y: 82, touches: 76, acc: 85 },
        { id: 'CM1', label: 'CM', name: 'Xhaka', x: 44, y: 44, touches: 104, acc: 95, isPivot: true },
        { id: 'CM2', label: 'CM', name: 'Andrich', x: 44, y: 58, touches: 78, acc: 91 },
        { id: 'LAM', label: 'LAM', name: 'Wirtz', x: 70, y: 35, touches: 94, acc: 91, isStar: true },
        { id: 'RAM', label: 'RAM', name: 'Hofmann', x: 68, y: 65, touches: 60, acc: 87 },
        { id: 'ST', label: 'ST', name: 'Boniface', x: 86, y: 50, touches: 48, acc: 80, hasBall: true }
      ],
      links: [
        { from: 'Xhaka', to: 'Wirtz', value: 46, dashed: false, thick: true },
        { from: 'Grimaldo', to: 'Wirtz', value: 38, dashed: false },
        { from: 'Wirtz', to: 'Boniface', value: 31, dashed: true, keyLink: true }
      ]
    },
    playmakerRadar: {
      playerName: 'Florian Wirtz',
      team: 'Bayer Leverkusen',
      pos: 'AM · #10',
      overallRating: 95.0,
      metrics: [
        { label: 'Spatial IQ', value: 98, fullMark: 100 },
        { label: 'Vision', value: 96, fullMark: 100 },
        { label: 'Key Pass', value: 95, fullMark: 100 },
        { label: 'Press Resist', value: 94, fullMark: 100 },
        { label: 'Tempo', value: 93, fullMark: 100 },
        { label: 'Threat', value: 94, fullMark: 100 }
      ],
      comparison: {
        playerName: 'Julian Brandt',
        team: 'Borussia Dortmund',
        pos: 'AM · #19',
        overallRating: 88.0,
        metrics: [
          { label: 'Spatial IQ', value: 89, fullMark: 100 },
          { label: 'Vision', value: 91, fullMark: 100 },
          { label: 'Key Pass', value: 89, fullMark: 100 },
          { label: 'Press Resist', value: 84, fullMark: 100 },
          { label: 'Tempo', value: 87, fullMark: 100 },
          { label: 'Threat', value: 86, fullMark: 100 }
        ]
      }
    },
    shots: [
      { id: 's51', team: 'home', player: 'F. Wirtz', min: 27, xg: 0.44, result: 'goal', x: 86, y: 38, zone: 'D-L' },
      { id: 's52', team: 'away', player: 'S. Guirassy', min: 38, xg: 0.68, result: 'goal', x: 92, y: 50, zone: '6-yd' },
      { id: 's53', team: 'home', player: 'V. Boniface', min: 55, xg: 0.74, result: 'goal', x: 88, y: 52, zone: 'Pen' },
      { id: 's54', team: 'away', player: 'J. Brandt', min: 67, xg: 0.35, result: 'goal', x: 82, y: 64, zone: 'D-R' },
      { id: 's55', team: 'home', player: 'F. Wirtz', min: 89, xg: 0.52, result: 'goal', x: 85, y: 46, zone: 'Far' }
    ],
    timeline: [
      { min: 0, xgHome: 0.00, xgAway: 0.00 },
      { min: 27, xgHome: 0.44, xgAway: 0.10, event: '⚽ Wirtz 27\'' },
      { min: 38, xgHome: 0.62, xgAway: 0.78, event: '⚽ Guirassy 38\'' },
      { min: 55, xgHome: 1.48, xgAway: 0.92, event: '⚽ Boniface 55\'' },
      { min: 67, xgHome: 1.70, xgAway: 1.45, event: '⚽ Brandt 67\'' },
      { min: 89, xgHome: 2.40, xgAway: 1.75, event: '⚽ Wirtz 89\'' },
      { min: 90, xgHome: 2.45, xgAway: 1.82 }
    ]
  },
  {
    id: 'm6',
    leagueId: 'ligue1',
    leagueName: 'Ligue 1',
    status: 'LIVE',
    minute: 31,
    isHot: true,
    homeTeam: {
      id: 'psg',
      name: 'Paris Saint-Germain',
      short: 'PSG',
      badge: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🗼',
      score: 1,
      scorers: [
        { name: 'B. Barcola', minute: '18\'', type: 'goal' }
      ]
    },
    awayTeam: {
      id: 'asm',
      name: 'AS Monaco',
      short: 'ASM',
      badge: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🔴⚪',
      score: 0,
      scorers: []
    },
    venue: 'Parc des Princes, Paris',
    referee: 'Clément Turpin',
    stats: {
      xg: { home: 1.15, away: 0.38 },
      possession: { home: 64, away: 36 },
      shots: { home: 7, away: 3 },
      shotsOnTarget: { home: 4, away: 1 },
      corners: { home: 4, away: 1 },
      fouls: { home: 4, away: 6 },
      bigChances: { home: 2, away: 0 },
      passes: { home: 280, away: 160 },
      passAcc: { home: 91.2, away: 82.0 },
      touches: { home: 350, away: 210 },
      fieldTilt: { home: 72, away: 28 },
      ppda: { home: 6.5, away: 14.1 },
      xt: { home: 0.95, away: 0.32 }
    },
    zoneXg: [
      { zone: '6-yd', label: '6-yd Box', xg: 0.42, shots: 1, color: '#00e676' },
      { zone: 'Pen', label: 'Penalty Spot', xg: 0.48, shots: 2, color: '#00e5ff' },
      { zone: 'D-L', label: 'Box Left (D-L)', xg: 0.15, shots: 2, color: '#ffb300' },
      { zone: 'D-R', label: 'Box Right (D-R)', xg: 0.08, shots: 1, color: '#ff7043' },
      { zone: 'Far', label: 'Outside Box', xg: 0.02, shots: 1, color: '#00b0ff' },
      { zone: 'FK', label: 'Direct FK', xg: 0.00, shots: 0, color: '#ff5252' }
    ],
    passNetwork: {
      team: 'Paris Saint-Germain',
      nodes: [
        { id: 'GK', label: 'GK', name: 'Donnarumma', x: 12, y: 50, touches: 22, acc: 86 },
        { id: 'LB', label: 'LB', name: 'Mendes', x: 36, y: 20, touches: 48, acc: 90 },
        { id: 'CB1', label: 'CB', name: 'Marquinhos', x: 26, y: 40, touches: 52, acc: 95 },
        { id: 'CB2', label: 'CB', name: 'Pacho', x: 26, y: 60, touches: 50, acc: 94 },
        { id: 'RB', label: 'RB', name: 'Hakimi', x: 42, y: 80, touches: 58, acc: 89, isStar: true },
        { id: 'CDM', label: 'CDM', name: 'Vitinha', x: 50, y: 50, touches: 64, acc: 96, isPivot: true },
        { id: 'LCM', label: 'LCM', name: 'Neves', x: 56, y: 35, touches: 54, acc: 92 },
        { id: 'RCM', label: 'RCM', name: 'Zaïre-Emery', x: 56, y: 65, touches: 46, acc: 90 },
        { id: 'LW', label: 'LW', name: 'Barcola', x: 78, y: 24, touches: 40, acc: 85, isStar: true },
        { id: 'RW', label: 'RW', name: 'Dembélé', x: 76, y: 76, touches: 42, acc: 83 },
        { id: 'ST', label: 'ST', name: 'Asensio', x: 84, y: 50, touches: 32, acc: 86, hasBall: true }
      ],
      links: [
        { from: 'Vitinha', to: 'Barcola', value: 24, dashed: false, thick: true },
        { from: 'Hakimi', to: 'Dembélé', value: 22, dashed: false }
      ]
    },
    playmakerRadar: {
      playerName: 'Bradley Barcola',
      team: 'Paris Saint-Germain',
      pos: 'LW · #29',
      overallRating: 91.8,
      metrics: [
        { label: 'Spatial IQ', value: 92, fullMark: 100 },
        { label: 'Vision', value: 89, fullMark: 100 },
        { label: 'Key Pass', value: 90, fullMark: 100 },
        { label: 'Press Resist', value: 91, fullMark: 100 },
        { label: 'Tempo', value: 95, fullMark: 100 },
        { label: 'Threat', value: 94, fullMark: 100 }
      ],
      comparison: {
        playerName: 'Maghnes Akliouche',
        team: 'AS Monaco',
        pos: 'AM · #11',
        overallRating: 87.2,
        metrics: [
          { label: 'Spatial IQ', value: 89, fullMark: 100 },
          { label: 'Vision', value: 90, fullMark: 100 },
          { label: 'Key Pass', value: 88, fullMark: 100 },
          { label: 'Press Resist', value: 90, fullMark: 100 },
          { label: 'Tempo', value: 84, fullMark: 100 },
          { label: 'Threat', value: 82, fullMark: 100 }
        ]
      }
    },
    shots: [
      { id: 's61', team: 'home', player: 'B. Barcola', min: 18, xg: 0.42, result: 'goal', x: 88, y: 35, zone: '6-yd' }
    ],
    timeline: [
      { min: 0, xgHome: 0.00, xgAway: 0.00 },
      { min: 18, xgHome: 0.42, xgAway: 0.08, event: '⚽ Barcola 18\'' },
      { min: 31, xgHome: 1.15, xgAway: 0.38 }
    ]
  },
  {
    id: 'm7',
    leagueId: 'seriea',
    leagueName: 'Serie A',
    status: 'UPCOMING',
    minute: 0,
    startTime: '20:45 CET',
    isHot: false,
    homeTeam: {
      id: 'juv',
      name: 'Juventus',
      short: 'JUV',
      badge: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '⚪⚫',
      score: 0,
      scorers: []
    },
    awayTeam: {
      id: 'nap',
      name: 'Napoli',
      short: 'NAP',
      badge: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=80&auto=format&fit=crop&q=60',
      logoEmoji: '🔵',
      score: 0,
      scorers: []
    },
    venue: 'Allianz Stadium, Turin',
    referee: 'Daniele Doveri',
    stats: {
      xg: { home: 0, away: 0 },
      possession: { home: 50, away: 50 },
      shots: { home: 0, away: 0 },
      shotsOnTarget: { home: 0, away: 0 },
      corners: { home: 0, away: 0 },
      fouls: { home: 0, away: 0 },
      bigChances: { home: 0, away: 0 },
      passes: { home: 0, away: 0 },
      passAcc: { home: 0, away: 0 },
      touches: { home: 0, away: 0 },
      fieldTilt: { home: 50, away: 50 },
      ppda: { home: 0, away: 0 },
      xt: { home: 0, away: 0 }
    },
    zoneXg: [
      { zone: '6-yd', label: '6-yd Box', xg: 0.0, shots: 0, color: '#00e676' },
      { zone: 'Pen', label: 'Penalty Spot', xg: 0.0, shots: 0, color: '#00e5ff' },
      { zone: 'D-L', label: 'Box Left (D-L)', xg: 0.0, shots: 0, color: '#ffb300' },
      { zone: 'D-R', label: 'Box Right (D-R)', xg: 0.0, shots: 0, color: '#ff7043' },
      { zone: 'Far', label: 'Outside Box', xg: 0.0, shots: 0, color: '#00b0ff' },
      { zone: 'FK', label: 'Direct FK', xg: 0.0, shots: 0, color: '#ff5252' }
    ],
    passNetwork: {
      team: 'Juventus',
      nodes: [
        { id: 'GK', label: 'GK', name: 'Di Gregorio', x: 12, y: 50, touches: 0, acc: 0 },
        { id: 'LB', label: 'LB', name: 'Cambiaso', x: 34, y: 22, touches: 0, acc: 0 },
        { id: 'CB1', label: 'CB', name: 'Bremer', x: 26, y: 40, touches: 0, acc: 0 },
        { id: 'CB2', label: 'CB', name: 'Gatti', x: 26, y: 60, touches: 0, acc: 0 },
        { id: 'RB', label: 'RB', name: 'Savona', x: 34, y: 78, touches: 0, acc: 0 },
        { id: 'CDM', label: 'CDM', name: 'Locatelli', x: 48, y: 50, touches: 0, acc: 0, isPivot: true },
        { id: 'LCM', label: 'LCM', name: 'Thuram', x: 58, y: 34, touches: 0, acc: 0 },
        { id: 'RCM', label: 'RCM', name: 'Koopmeiners', x: 62, y: 66, touches: 0, acc: 0 },
        { id: 'LW', label: 'LW', name: 'Yıldız', x: 76, y: 24, touches: 0, acc: 0, isStar: true },
        { id: 'RW', label: 'RW', name: 'Conceição', x: 76, y: 76, touches: 0, acc: 0 },
        { id: 'ST', label: 'ST', name: 'Vlahović', x: 88, y: 50, touches: 0, acc: 0, hasBall: true }
      ],
      links: []
    },
    playmakerRadar: {
      playerName: 'Kenan Yıldız',
      team: 'Juventus',
      pos: 'LW · #10',
      overallRating: 89.2,
      metrics: [
        { label: 'Spatial IQ', value: 91, fullMark: 100 },
        { label: 'Vision', value: 88, fullMark: 100 },
        { label: 'Key Pass', value: 87, fullMark: 100 },
        { label: 'Press Resist', value: 92, fullMark: 100 },
        { label: 'Tempo', value: 90, fullMark: 100 },
        { label: 'Threat', value: 91, fullMark: 100 }
      ],
      comparison: {
        playerName: 'Khvicha Kvaratskhelia',
        team: 'Napoli',
        pos: 'LW · #77',
        overallRating: 91.5,
        metrics: [
          { label: 'Spatial IQ', value: 92, fullMark: 100 },
          { label: 'Vision', value: 90, fullMark: 100 },
          { label: 'Key Pass', value: 91, fullMark: 100 },
          { label: 'Press Resist', value: 95, fullMark: 100 },
          { label: 'Tempo', value: 88, fullMark: 100 },
          { label: 'Threat', value: 95, fullMark: 100 }
        ]
      }
    },
    shots: [],
    timeline: []
  }
];
