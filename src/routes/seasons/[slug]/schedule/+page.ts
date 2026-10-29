// src/routes/seasons/[slug]/schedule/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { SEASONS } from '#lib/data/seasons';

export const load: PageLoad = ({ params }) => {
  const season = SEASONS.find((s) => s.slug === params.slug);

  if (!season) {
    throw error(404, 'Musim tidak ditemukan');
  }

  return {
    season
  };
};