// src/routes/seasons/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { SEASONS } from '#lib/data/seasons';

export const load: PageLoad = ({ params }) => {
  const season = SEASONS.find((s) => s.slug === params.slug);

  if (!season) {
    throw error(404, 'Musim tidak ditemukan');
  }

  // Ambil klasemen akhir & pertandingan terbaru
  const standings = [
    { rank: '1', team: season.teams.AE, captain: 'NAFARI', isChampion: true },
    { rank: '2', team: season.teams.B2FA, captain: "HYDE O'BRIEN", isChampion: false },
    { rank: '3', team: season.teams.KCG, captain: 'RIDDOK', isChampion: false },
    { rank: '4', team: season.teams.B2FB, captain: 'ALVIN SUSANTO', isChampion: false },
    { rank: '5–6', team: season.teams.PRK, captain: 'FAKMON', isChampion: false },
    { rank: '5–6', team: season.teams.OURA, captain: 'DEANKT', isChampion: false },
    { rank: '7–8', team: season.teams.AAA, captain: 'YOUK', isChampion: false },
    { rank: '7–8', team: season.teams.O2H, captain: 'PENDO', isChampion: false }
  ];

  return {
    season,
    standings
  };
};