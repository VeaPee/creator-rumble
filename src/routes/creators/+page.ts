// src/routes/creators/+page.ts
import type { PageLoad } from './$types';
import { CREATORS, TEAMS } from '#lib/data/season1';

export const load: PageLoad = () => {
  // 1. Ambil data Kapten untuk Spotlight
  const captains = Object.values(TEAMS).map((team) => ({
    slug: team.captain.slug,
    name: team.captain.name,
    team: team.code,
    image: team.captain.image,
    roster: team.roster.map((m) => m.name)
  }));

  // 2. Ambil daftar Semua Kreator (40 Kreator)
  const allCreators = Object.values(CREATORS).map((creator) => ({
    id: creator.id,
    slug: creator.slug,
    name: creator.name,
    role: creator.role,
    teamCode: creator.teamCode,
    image: creator.image
  }));

  return {
    captains,
    allCreators
  };
};