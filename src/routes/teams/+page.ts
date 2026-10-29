// src/routes/teams/+page.ts
import type { PageLoad } from './$types';
import { TEAMS } from '#lib/data/season1';

export const load: PageLoad = () => {
  // Ambil semua tim dari season1.ts
  const teamsList = Object.values(TEAMS).map((team) => ({
    id: team.id,
    slug: team.slug,
    name: team.name,
    code: team.code,
    image: team.image
  }));

  return {
    teams: teamsList
  };
};