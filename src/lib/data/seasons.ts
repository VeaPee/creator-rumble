// src/lib/data/seasons.ts
import { TEAMS as TEAMS_S1, MATCHES as MATCHES_S1 } from './season1';

export interface SeasonInfo {
  id: string;
  slug: string;
  title: string;
  game: string;
  status: 'Selesai' | 'Berlangsung' | 'Akan Datang';
  dateLabel: string;
  artwork: string;
  winner?: {
    name: string;
    slug: string;
  };
  teams: typeof TEAMS_S1;
  matches: typeof MATCHES_S1;
}

export const SEASONS: SeasonInfo[] = [
  {
    id: 'creator-rumble-season-1',
    slug: 'creator-rumble-season-1',
    title: 'Season 1',
    game: 'Dota 2',
    status: 'Selesai',
    dateLabel: '20–21 Okt 2026',
    artwork: '/event/scene/Champion_Season1.jpg',
    winner: {
      name: TEAMS_S1.AE?.name ?? 'TEAM AE',
      slug: TEAMS_S1.AE?.slug ?? 'team-ae'
    },
    teams: TEAMS_S1,
    matches: MATCHES_S1
  }
  // Saat Season 2 rilis nanti, tinggal tambahkan objek Season 2 di sini:
  /*
  {
    id: 'creator-rumble-season-2',
    slug: 'creator-rumble-season-2',
    title: 'Season 2',
    game: 'Dota 2',
    status: 'Akan Datang',
    dateLabel: '2027',
    artwork: '/event/teams/placeholder-s2.webp',
    teams: TEAMS_S2,
    matches: MATCHES_S2
  }
  */
];