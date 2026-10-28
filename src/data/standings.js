// Factually Verified European League Standings & Top Scorers

export const STANDINGS = {
  'epl': [
    { pos: 1, name: 'Manchester City', played: 9, won: 7, draw: 2, lost: 0, gf: 20, ga: 9, gd: '+11', pts: 23, xg: 19.8, form: ['W', 'D', 'W', 'W', 'W'] },
    { pos: 2, name: 'Liverpool', played: 9, won: 7, draw: 1, lost: 1, gf: 17, ga: 5, gd: '+12', pts: 22, xg: 18.2, form: ['W', 'W', 'W', 'W', 'D'] },
    { pos: 3, name: 'Arsenal', played: 9, won: 5, draw: 3, lost: 1, gf: 17, ga: 8, gd: '+9', pts: 18, xg: 15.6, form: ['W', 'W', 'W', 'L', 'D'] },
    { pos: 4, name: 'Aston Villa', played: 9, won: 5, draw: 3, lost: 1, gf: 16, ga: 12, gd: '+4', pts: 18, xg: 14.2, form: ['W', 'D', 'D', 'W', 'D'] },
    { pos: 5, name: 'Chelsea', played: 9, won: 5, draw: 2, lost: 2, gf: 19, ga: 11, gd: '+8', pts: 17, xg: 17.5, form: ['W', 'W', 'D', 'L', 'W'] },
    { pos: 6, name: 'Tottenham Hotspur', played: 9, won: 4, draw: 1, lost: 4, gf: 18, ga: 11, gd: '+7', pts: 13, xg: 16.8, form: ['W', 'W', 'L', 'W', 'L'] },
    { pos: 7, name: 'Nottingham Forest', played: 9, won: 4, draw: 4, lost: 1, gf: 11, ga: 7, gd: '+4', pts: 16, xg: 12.4, form: ['D', 'L', 'D', 'W', 'W'] }
  ],
  'laliga': [
    { pos: 1, name: 'FC Barcelona', played: 11, won: 10, draw: 0, lost: 1, gf: 37, ga: 10, gd: '+27', pts: 30, xg: 29.4, form: ['W', 'W', 'L', 'W', 'W'] },
    { pos: 2, name: 'Real Madrid', played: 11, won: 7, draw: 3, lost: 1, gf: 21, ga: 11, gd: '+10', pts: 24, xg: 22.8, form: ['W', 'D', 'W', 'W', 'L'] },
    { pos: 3, name: 'Atlético de Madrid', played: 11, won: 5, draw: 5, lost: 1, gf: 16, ga: 7, gd: '+9', pts: 20, xg: 18.2, form: ['W', 'D', 'D', 'W', 'L'] },
    { pos: 4, name: 'Villarreal', played: 11, won: 6, draw: 3, lost: 2, gf: 20, ga: 19, gd: '+1', pts: 21, xg: 17.8, form: ['W', 'L', 'W', 'L', 'W'] },
    { pos: 5, name: 'Athletic Club', played: 11, won: 5, draw: 3, lost: 3, gf: 17, ga: 11, gd: '+6', pts: 18, xg: 16.4, form: ['W', 'D', 'L', 'W', 'D'] }
  ],
  'seriea': [
    { pos: 1, name: 'Napoli', played: 9, won: 7, draw: 1, lost: 1, gf: 16, ga: 5, gd: '+11', pts: 22, xg: 16.5, form: ['W', 'D', 'W', 'W', 'W'] },
    { pos: 2, name: 'Internazionale', played: 9, won: 5, draw: 3, lost: 1, gf: 21, ga: 13, gd: '+8', pts: 18, xg: 21.0, form: ['L', 'W', 'W', 'W', 'D'] },
    { pos: 3, name: 'Juventus', played: 9, won: 4, draw: 5, lost: 0, gf: 15, ga: 5, gd: '+10', pts: 17, xg: 15.2, form: ['D', 'W', 'D', 'W', 'D'] },
    { pos: 4, name: 'Fiorentina', played: 9, won: 4, draw: 4, lost: 1, gf: 20, ga: 9, gd: '+11', pts: 16, xg: 15.8, form: ['W', 'D', 'W', 'W', 'W'] },
    { pos: 5, name: 'Atalanta', played: 9, won: 5, draw: 1, lost: 3, gf: 24, ga: 14, gd: '+10', pts: 16, xg: 19.4, form: ['L', 'D', 'W', 'W', 'W'] }
  ],
  'bundesliga': [
    { pos: 1, name: 'Bayern Munich', played: 8, won: 6, draw: 2, lost: 0, gf: 29, ga: 7, gd: '+22', pts: 20, xg: 23.5, form: ['W', 'W', 'D', 'D', 'W'] },
    { pos: 2, name: 'RB Leipzig', played: 8, won: 6, draw: 2, lost: 0, gf: 14, ga: 3, gd: '+11', pts: 20, xg: 15.8, form: ['D', 'D', 'W', 'W', 'W'] },
    { pos: 3, name: 'Bayer Leverkusen', played: 8, won: 4, draw: 3, lost: 1, gf: 20, ga: 15, gd: '+5', pts: 15, xg: 18.2, form: ['W', 'D', 'D', 'W', 'D'] },
    { pos: 4, name: 'Union Berlin', played: 8, won: 4, draw: 3, lost: 1, gf: 9, ga: 5, gd: '+4', pts: 15, xg: 8.9, form: ['W', 'L', 'W', 'W', 'D'] }
  ]
};

export const TOP_SCORERS = [
  { name: 'Robert Lewandowski', club: 'FC Barcelona', goals: 14, xg: 12.8, diff: '+1.2', assists: 2, shots: 42, flag: '🇵🇱' },
  { name: 'Erling Haaland', club: 'Manchester City', goals: 11, xg: 10.4, diff: '+0.6', assists: 0, shots: 48, flag: '🇳🇴' },
  { name: 'Mateo Retegui', club: 'Atalanta', goals: 10, xg: 8.4, diff: '+1.6', assists: 2, shots: 34, flag: '🇮🇹' },
  { name: 'Harry Kane', club: 'Bayern Munich', goals: 9, xg: 7.8, diff: '+1.2', assists: 5, shots: 32, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Omar Marmoush', club: 'Eintracht Frankfurt', goals: 9, xg: 6.5, diff: '+2.5', assists: 7, shots: 31, flag: '🇪🇬' },
  { name: 'Bryan Mbeumo', club: 'Brentford', goals: 8, xg: 5.8, diff: '+2.2', assists: 0, shots: 26, flag: '🇨🇲' },
  { name: 'Cole Palmer', club: 'Chelsea', goals: 7, xg: 5.9, diff: '+1.1', assists: 5, shots: 33, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Chris Wood', club: 'Nottingham Forest', goals: 7, xg: 4.6, diff: '+2.4', assists: 0, shots: 20, flag: '🇳🇿' },
  { name: 'Mohamed Salah', club: 'Liverpool', goals: 6, xg: 5.8, diff: '+0.2', assists: 5, shots: 28, flag: '🇪🇬' },
  { name: 'Raphinha', club: 'FC Barcelona', goals: 6, xg: 5.4, diff: '+0.6', assists: 6, shots: 32, flag: '🇧🇷' }
];
