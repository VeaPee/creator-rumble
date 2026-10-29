// src/routes/seasons/[slug]/bracket/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { SEASONS } from '#lib/data/seasons';
import { MATCHES } from '#lib/data/season1'; // Atau modul match sesuai musim yang aktif

export const load: PageLoad = ({ params }) => {
  const season = SEASONS.find((s) => s.slug === params.slug);

  if (!season) {
    throw error(404, 'Musim tidak ditemukan');
  }

  return {
    season,
    matches: MATCHES
  };
};