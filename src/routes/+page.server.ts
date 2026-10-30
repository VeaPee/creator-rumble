import { CREATORS } from '#lib/data/season1';
import { getLiveCreators } from '#lib/server/youtube-live';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return getLiveCreators(Object.values(CREATORS));
};