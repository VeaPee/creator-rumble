// src/routes/seasons/[slug]/teams/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { SEASONS } from '#lib/data/seasons';

export const load: PageLoad = ({ params }) => {
  const season = SEASONS.find((s) => s.slug === params.slug);

  if (!season) {
    throw error(404, 'Musim tidak ditemukan');
  }

  // Mengambil array nilai dari objek TEAMS
  const teamList = season.teams ? Object.values(season.teams) : [];

  return {
    season,
    teamList
  };
};