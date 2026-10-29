// src/routes/seasons/+page.ts
import type { PageLoad } from './$types';
import { SEASONS } from '#lib/data/seasons';

export const load: PageLoad = () => {
  return {
    seasons: SEASONS
  };
};