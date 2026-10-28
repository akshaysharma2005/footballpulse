// Team of the Week (TOTW) Datasets as of October 28, 2025

export const FORMATIONS = {
  '4-3-3': {
    name: '4-3-3 Attack',
    positions: [
      { id: 'gk', role: 'GK', label: 'GK', x: 50, y: 88 },
      { id: 'lb', role: 'LB', label: 'LB', x: 15, y: 70 },
      { id: 'cb1', role: 'CB', label: 'LCB', x: 38, y: 72 },
      { id: 'cb2', role: 'CB', label: 'RCB', x: 62, y: 72 },
      { id: 'rb', role: 'RB', label: 'RB', x: 85, y: 70 },
      { id: 'cm1', role: 'CM', label: 'LCM', x: 30, y: 48 },
      { id: 'cdm', role: 'CDM', label: 'CDM', x: 50, y: 55 },
      { id: 'cm2', role: 'CM', label: 'RCM', x: 70, y: 48 },
      { id: 'lw', role: 'LW', label: 'LW', x: 18, y: 22 },
      { id: 'st', role: 'ST', label: 'ST', x: 50, y: 16 },
      { id: 'rw', role: 'RW', label: 'RW', x: 82, y: 22 }
    ]
  },
  '4-2-3-1': {
    name: '4-2-3-1 Modern',
    positions: [
      { id: 'gk', role: 'GK', label: 'GK', x: 50, y: 88 },
      { id: 'lb', role: 'LB', label: 'LB', x: 15, y: 70 },
      { id: 'cb1', role: 'CB', label: 'LCB', x: 38, y: 72 },
      { id: 'cb2', role: 'CB', label: 'RCB', x: 62, y: 72 },
      { id: 'rb', role: 'RB', label: 'RB', x: 85, y: 70 },
      { id: 'cdm1', role: 'CDM', label: 'LDM', x: 35, y: 56 },
      { id: 'cdm2', role: 'CDM', label: 'RDM', x: 65, y: 56 },
      { id: 'lam', role: 'LW', label: 'LAM', x: 22, y: 35 },
      { id: 'cam', role: 'CAM', label: 'CAM', x: 50, y: 34 },
      { id: 'ram', role: 'RW', label: 'RAM', x: 78, y: 35 },
      { id: 'st', role: 'ST', label: 'ST', x: 50, y: 16 }
    ]
  },
  '3-4-2-1': {
    name: '3-4-2-1 Tactical',
    positions: [
      { id: 'gk', role: 'GK', label: 'GK', x: 50, y: 88 },
      { id: 'cb1', role: 'CB', label: 'LCB', x: 25, y: 72 },
      { id: 'cb2', role: 'CB', label: 'CB', x: 50, y: 74 },
      { id: 'cb3', role: 'CB', label: 'RCB', x: 75, y: 72 },
      { id: 'lwb', role: 'LB', label: 'LWB', x: 14, y: 48 },
      { id: 'cm1', role: 'CM', label: 'LCM', x: 38, y: 52 },
      { id: 'cm2', role: 'CM', label: 'RCM', x: 62, y: 52 },
      { id: 'rwb', role: 'RB', label: 'RWB', x: 86, y: 48 },
      { id: 'lf', role: 'LW', label: 'LF', x: 32, y: 30 },
      { id: 'rf', role: 'RW', label: 'RF', x: 68, y: 30 },
      { id: 'st', role: 'ST', label: 'ST', x: 50, y: 16 }
    ]
  }
};

export const TOTW_DATA = {
  'europe': {
    leagueId: 'europe',
    leagueName: 'All-Europe Elite XI · October 28, 2025',
    week: 'Matchday as of Oct 28, 2025',
    potw: 'Raphinha (FC Barcelona) - 96 OVR',
    avgRating: 9.38,
    startingXI: [
      {
        posId: 'gk',
        name: 'Iñaki Peña',
        shortName: 'Iñaki Peña',
        club: 'FC Barcelona',
        clubLogo: '🔵🔴',
        nation: 'Spain',
        nationFlag: '🇪🇸',
        rating: 91,
        potw: false,
        matchRating: 9.2,
        stats: { saves: 4, cleanSheet: true, xgPrevented: '+1.48', passAcc: '88%' },
        cardColor: 'gold',
        quote: 'Unbeatable at the Santiago Bernabéu: 4 crucial saves to secure 4-0 clean sheet'
      },
      {
        posId: 'lb',
        name: 'Alejandro Balde',
        shortName: 'Balde',
        club: 'FC Barcelona',
        clubLogo: '🔵🔴',
        nation: 'Spain',
        nationFlag: '🇪🇸',
        rating: 90,
        matchRating: 9.0,
        stats: { tackles: 4, recoveries: 7, cleanSheet: true, topSpeed: '35.4 km/h' },
        cardColor: 'gold',
        quote: 'Total flank dominance: shut down Real Madrid counters and supported Yamal'
      },
      {
        posId: 'cb1',
        name: 'Iñigo Martínez',
        shortName: 'Iñigo Martínez',
        club: 'FC Barcelona',
        clubLogo: '🔵🔴',
        nation: 'Spain',
        nationFlag: '🇪🇸',
        rating: 92,
        matchRating: 9.3,
        stats: { offsidesTrapped: 12, clearances: 8, aerialDuelsWon: '100%', passAcc: '94%' },
        cardColor: 'gold',
        quote: 'High-line tactical masterclass: trapped Real Madrid attackers offside 12 times'
      },
      {
        posId: 'cb2',
        name: 'Virgil van Dijk',
        shortName: 'Van Dijk',
        club: 'Liverpool',
        clubLogo: '🔴',
        nation: 'Netherlands',
        nationFlag: '🇳🇱',
        rating: 92,
        matchRating: 9.1,
        stats: { goals: 1, aerialDuelsWon: 6, clearances: 7, passAcc: '91%' },
        cardColor: 'gold',
        quote: 'Equalizing header (18\') at Emirates Stadium and impenetrable aerial defending'
      },
      {
        posId: 'rb',
        name: 'Denzel Dumfries',
        shortName: 'Dumfries',
        club: 'Inter Milan',
        clubLogo: '🐍',
        nation: 'Netherlands',
        nationFlag: '🇳🇱',
        rating: 91,
        matchRating: 9.2,
        stats: { goals: 1, tackles: 4, chancesCreated: 3, distance: '11.4 km' },
        cardColor: 'gold',
        quote: 'Powerhouse display in 4-4 Derby d\'Italia thriller: 53\' goal and constant wing pressure'
      },
      {
        posId: 'cdm',
        name: 'Marc Casadó',
        shortName: 'Casadó',
        club: 'FC Barcelona',
        clubLogo: '🔵🔴',
        nation: 'Spain',
        nationFlag: '🇪🇸',
        rating: 91,
        matchRating: 9.3,
        stats: { assists: 1, recoveries: 9, tackles: 5, passAcc: '94%' },
        cardColor: 'gold',
        quote: 'Sublime through-ball assist for Lewandowski\'s breakthrough goal at the Bernabéu'
      },
      {
        posId: 'cm1',
        name: 'Cole Palmer',
        shortName: 'Palmer',
        club: 'Chelsea',
        clubLogo: '🔵',
        nation: 'England',
        nationFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        rating: 94,
        matchRating: 9.4,
        stats: { goals: 1, keyPasses: 5, dribbles: '4/4', xg: 0.48 },
        cardColor: 'special',
        quote: 'Match-winning blast (47\') and sensational through-ball for Jackson vs Newcastle'
      },
      {
        posId: 'cm2',
        name: 'Jamal Musiala',
        shortName: 'Musiala',
        club: 'Bayern Munich',
        clubLogo: '🔴⚪',
        nation: 'Germany',
        nationFlag: '🇩🇪',
        rating: 94,
        matchRating: 9.3,
        stats: { goals: 1, assists: 1, dribbles: 7, duelsWon: 11 },
        cardColor: 'special',
        quote: 'Gliding headed goal (26\') and assist in Bayern Munich\'s 5-0 Bochum clinic'
      },
      {
        posId: 'lw',
        name: 'Raphinha',
        shortName: 'Raphinha',
        club: 'FC Barcelona',
        clubLogo: '🔵🔴',
        nation: 'Brazil',
        nationFlag: '🇧🇷',
        rating: 96,
        isCap: true,
        potw: true,
        matchRating: 9.8,
        stats: { goals: 1, assists: 1, keyPasses: 4, xT: '+2.34' },
        cardColor: 'legendary',
        quote: 'Player of the Week! El Clásico MOTM: chipped goal (84\'), assist for Yamal (77\')'
      },
      {
        posId: 'st',
        name: 'Robert Lewandowski',
        shortName: 'Lewandowski',
        club: 'FC Barcelona',
        clubLogo: '🔵🔴',
        nation: 'Poland',
        nationFlag: '🇵🇱',
        rating: 95,
        matchRating: 9.6,
        stats: { goals: 2, shots: 4, xg: 1.37, conversion: '50%' },
        cardColor: 'special',
        quote: 'Ruthless 2-minute brace (54\', 56\') to dismantle Real Madrid: 14 league goals in 11 games'
      },
      {
        posId: 'rw',
        name: 'Bukayo Saka',
        shortName: 'Saka',
        club: 'Arsenal',
        clubLogo: '🔴',
        nation: 'England',
        nationFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        rating: 93,
        matchRating: 9.3,
        stats: { goals: 1, takeOns: 5, chancesCreated: 3, xg: 0.38 },
        cardColor: 'special',
        quote: 'Sensational 9th-minute curling strike returning from injury in 2-2 draw vs Liverpool'
      }
    ],
    substitutes: [
      { name: 'Kenan Yıldız', pos: 'AM', club: 'Juventus', rating: 93, matchRating: 9.4, flag: '🇹🇷', stats: '2 Goals off bench in 4-4 vs Inter' },
      { name: 'Lamine Yamal', pos: 'RW', club: 'FC Barcelona', rating: 92, matchRating: 9.1, flag: '🇪🇸', stats: 'Youngest El Clásico goalscorer at 17' },
      { name: 'Erling Haaland', pos: 'ST', club: 'Man City', rating: 93, matchRating: 8.8, flag: '🇳🇴', stats: '5\' Match-winner vs Southampton (11 goals)' },
      { name: 'Mateo Retegui', pos: 'ST', club: 'Atalanta', rating: 92, matchRating: 9.2, flag: '🇮🇹', stats: 'Brace in 6-1 Verona rout (10 goals)' },
      { name: 'Harry Kane', pos: 'ST', club: 'Bayern Munich', rating: 93, matchRating: 8.9, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', stats: '57\' Goal vs Bochum (9 goals)' },
      { name: 'Michael Olise', pos: 'RW', club: 'Bayern Munich', rating: 91, matchRating: 9.0, flag: '🇫🇷', stats: 'Stunning direct FK goal (16\')' },
      { name: 'Mohamed Salah', pos: 'RW', club: 'Liverpool', rating: 93, matchRating: 8.9, flag: '🇪🇬', stats: '81\' Equalizer at Arsenal' }
    ]
  },
  'epl': {
    leagueId: 'epl',
    leagueName: 'Premier League TOTW · October 28, 2025',
    week: 'Matchday 9 Standouts',
    potw: 'Cole Palmer (Chelsea) - 94 OVR',
    avgRating: 9.26,
    startingXI: [
      { posId: 'gk', name: 'Mark Flekken', shortName: 'Flekken', club: 'Brentford', rating: 90, nationFlag: '🇳🇱', matchRating: 9.0, stats: { saves: 7, claims: 3 } },
      { posId: 'lb', name: 'Joško Gvardiol', shortName: 'Gvardiol', club: 'Man City', rating: 90, nationFlag: '🇭🇷', matchRating: 8.9, stats: { touches: 84, passAcc: '92%' } },
      { posId: 'cb1', name: 'Virgil van Dijk', shortName: 'Van Dijk', club: 'Liverpool', rating: 92, nationFlag: '🇳🇱', matchRating: 9.1, stats: { goals: 1, aerialDuelsWon: 6 } },
      { posId: 'cb2', name: 'Levi Colwill', shortName: 'Colwill', club: 'Chelsea', rating: 89, nationFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matchRating: 8.8, stats: { blocks: 3, duelsWon: 6 } },
      { posId: 'rb', name: 'Rico Lewis', shortName: 'Lewis', club: 'Man City', rating: 89, nationFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matchRating: 8.8, stats: { tackles: 4, passAcc: '90%' } },
      { posId: 'cdm', name: 'Moisés Caicedo', shortName: 'Caicedo', club: 'Chelsea', rating: 92, nationFlag: '🇪🇨', matchRating: 9.2, stats: { tackles: 7, recoveries: 11 } },
      { posId: 'cm1', name: 'Mikel Merino', shortName: 'Merino', club: 'Arsenal', rating: 90, nationFlag: '🇪🇸', matchRating: 9.0, stats: { goals: 1, duelsWon: 8 } },
      { posId: 'cm2', name: 'Cole Palmer', shortName: 'Palmer', club: 'Chelsea', rating: 94, isCap: true, potw: true, nationFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matchRating: 9.4, stats: { goals: 1, keyPasses: 5 } },
      { posId: 'lw', name: 'Matheus Nunes', shortName: 'Nunes', club: 'Man City', rating: 90, nationFlag: '🇵🇹', matchRating: 9.0, stats: { assists: 1, crosses: 6 } },
      { posId: 'st', name: 'Erling Haaland', shortName: 'Haaland', club: 'Man City', rating: 94, nationFlag: '🇳🇴', matchRating: 8.8, stats: { goals: 1, shots: 8, xg: 2.14 } },
      { posId: 'rw', name: 'Bukayo Saka', shortName: 'Saka', club: 'Arsenal', rating: 93, nationFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matchRating: 9.3, stats: { goals: 1, takeOns: 5 } }
    ],
    substitutes: [
      { name: 'Mohamed Salah', pos: 'RW', club: 'Liverpool', rating: 93, matchRating: 8.9, flag: '🇪🇬' },
      { name: 'Nicolas Jackson', pos: 'ST', club: 'Chelsea', rating: 89, matchRating: 8.8, flag: '🇸🇳' },
      { name: 'Chris Wood', pos: 'ST', club: 'Nottingham Forest', rating: 89, matchRating: 9.1, flag: '🇳🇿' },
      { name: 'Bryan Mbeumo', pos: 'RW', club: 'Brentford', rating: 92, matchRating: 9.2, flag: '🇨🇲' }
    ]
  },
  'laliga': {
    leagueId: 'laliga',
    leagueName: 'La Liga EA Sports · October 28, 2025',
    week: 'Matchday 11 Standouts',
    potw: 'Raphinha (FC Barcelona) - 96 OVR',
    avgRating: 9.40,
    startingXI: [
      { posId: 'gk', name: 'Iñaki Peña', shortName: 'Peña', club: 'FC Barcelona', rating: 91, nationFlag: '🇪🇸', matchRating: 9.2, stats: { saves: 4, cleanSheet: true } },
      { posId: 'lb', name: 'Alejandro Balde', shortName: 'Balde', club: 'FC Barcelona', rating: 90, nationFlag: '🇪🇸', matchRating: 9.0, stats: { recoveries: 7, tackles: 4 } },
      { posId: 'cb1', name: 'Iñigo Martínez', shortName: 'Iñigo', club: 'FC Barcelona', rating: 92, nationFlag: '🇪🇸', matchRating: 9.3, stats: { clearances: 8, passAcc: '94%' } },
      { posId: 'cb2', name: 'Pau Cubarsí', shortName: 'Cubarsí', club: 'FC Barcelona', rating: 90, nationFlag: '🇪🇸', matchRating: 9.1, stats: { passAcc: '95%', duelsWon: 6 } },
      { posId: 'rb', name: 'Jules Koundé', shortName: 'Koundé', club: 'FC Barcelona', rating: 91, nationFlag: '🇫🇷', matchRating: 9.1, stats: { tackles: 5, duelsWon: 8 } },
      { posId: 'cdm', name: 'Marc Casadó', shortName: 'Casadó', club: 'FC Barcelona', rating: 91, nationFlag: '🇪🇸', matchRating: 9.3, stats: { assists: 1, passAcc: '94%' } },
      { posId: 'cm1', name: 'Pedri', shortName: 'Pedri', club: 'FC Barcelona', rating: 93, nationFlag: '🇪🇸', matchRating: 9.2, stats: { passes: 88, passAcc: '93%' } },
      { posId: 'cm2', name: 'Fermín López', shortName: 'Fermín', club: 'FC Barcelona', rating: 89, nationFlag: '🇪🇸', matchRating: 8.8, stats: { pressedHigh: 14, duels: 7 } },
      { posId: 'lw', name: 'Raphinha', shortName: 'Raphinha', club: 'FC Barcelona', rating: 96, isCap: true, potw: true, nationFlag: '🇧🇷', matchRating: 9.8, stats: { goals: 1, assists: 1 } },
      { posId: 'st', name: 'Robert Lewandowski', shortName: 'Lewandowski', club: 'FC Barcelona', rating: 95, nationFlag: '🇵🇱', matchRating: 9.6, stats: { goals: 2, shots: 4 } },
      { posId: 'rw', name: 'Lamine Yamal', shortName: 'Lamine Yamal', club: 'FC Barcelona', rating: 93, nationFlag: '🇪🇸', matchRating: 9.2, stats: { goals: 1, dribbles: 6 } }
    ],
    substitutes: [
      { name: 'Dodi Lukebakio', pos: 'RW', club: 'Sevilla', rating: 90, matchRating: 9.2, flag: '🇧🇪', stats: 'Brace in 2-0 win at Espanyol' },
      { name: 'Ayoze Pérez', pos: 'ST', club: 'Villarreal', rating: 90, matchRating: 9.1, flag: '🇪🇸', stats: 'Goal in 2-1 win at Valladolid' },
      { name: 'Vinícius Jr.', pos: 'LW', club: 'Real Madrid', rating: 89, matchRating: 7.8, flag: '🇧🇷' }
    ]
  },
  'bundesliga': {
    leagueId: 'bundesliga',
    leagueName: 'Bundesliga · October 28, 2025',
    week: 'Matchday 8 Standouts',
    potw: 'Jamal Musiala (Bayern Munich) - 94 OVR',
    avgRating: 9.25,
    startingXI: [
      { posId: 'gk', name: 'Manuel Neuer', shortName: 'Neuer', club: 'Bayern Munich', rating: 89, nationFlag: '🇩🇪', matchRating: 8.8, stats: { cleanSheet: true } },
      { posId: 'lb', name: 'Alphonso Davies', shortName: 'Davies', club: 'Bayern Munich', rating: 90, nationFlag: '🇨🇦', matchRating: 9.1, stats: { assists: 1, tackles: 4 } },
      { posId: 'cb1', name: 'Kim Min-jae', shortName: 'Kim', club: 'Bayern Munich', rating: 91, nationFlag: '🇰🇷', matchRating: 9.2, stats: { passAcc: '96%', touches: 105 } },
      { posId: 'cb2', name: 'Willi Orbán', shortName: 'Orbán', club: 'RB Leipzig', rating: 90, nationFlag: '🇭🇺', matchRating: 9.0, stats: { clearances: 7, cleanSheet: true } },
      { posId: 'rb', name: 'Konrad Laimer', shortName: 'Laimer', club: 'Bayern Munich', rating: 89, nationFlag: '🇦🇹', matchRating: 8.9, stats: { tackles: 5, passAcc: '91%' } },
      { posId: 'cdm', name: 'Joshua Kimmich', shortName: 'Kimmich', club: 'Bayern Munich', rating: 93, nationFlag: '🇩🇪', matchRating: 9.3, stats: { passes: 118, touches: 124 } },
      { posId: 'cm1', name: 'Florian Wirtz', shortName: 'Wirtz', club: 'Bayer Leverkusen', rating: 91, nationFlag: '🇩🇪', matchRating: 8.9, stats: { keyPasses: 4, dribbles: 5 } },
      { posId: 'cm2', name: 'Jamal Musiala', shortName: 'Musiala', club: 'Bayern Munich', rating: 94, isCap: true, potw: true, nationFlag: '🇩🇪', matchRating: 9.5, stats: { goals: 1, assists: 1 } },
      { posId: 'lw', name: 'Kingsley Coman', shortName: 'Coman', club: 'Bayern Munich', rating: 90, nationFlag: '🇫🇷', matchRating: 9.0, stats: { goals: 1, takeOns: 5 } },
      { posId: 'st', name: 'Harry Kane', shortName: 'Kane', club: 'Bayern Munich', rating: 94, nationFlag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', matchRating: 9.2, stats: { goals: 1, assists: 1 } },
      { posId: 'rw', name: 'Michael Olise', shortName: 'Olise', club: 'Bayern Munich', rating: 92, nationFlag: '🇫🇷', matchRating: 9.2, stats: { goals: 1, assists: 1 } }
    ],
    substitutes: [
      { name: 'Loïs Openda', pos: 'ST', club: 'RB Leipzig', rating: 90, matchRating: 9.0, flag: '🇧🇪' },
      { name: 'Leroy Sané', pos: 'RW', club: 'Bayern Munich', rating: 90, matchRating: 9.0, flag: '🇩🇪', stats: 'Goal (65\') vs Bochum' },
      { name: 'Victor Boniface', pos: 'ST', club: 'Bayer Leverkusen', rating: 88, matchRating: 8.6, flag: '🇳🇬' }
    ]
  }
};
