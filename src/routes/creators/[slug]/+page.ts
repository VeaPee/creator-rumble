// src/routes/creators/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { CREATORS, TEAMS, MATCHES } from '#lib/data/season1';

export const load: PageLoad = ({ params }) => {
  const creatorKey = Object.keys(CREATORS).find(
    (key) => CREATORS[key].slug === params.slug
  );

  if (!creatorKey) {
    throw error(404, 'Kreator tidak ditemukan');
  }

  const creator = CREATORS[creatorKey];
  const team = TEAMS[creator.teamCode];

  // Filter otomatis pertandingan mana saja yang melibatkan tim kreator ini
  const creatorMatches = MATCHES.filter(
    (match) => match.team1.code === creator.teamCode || match.team2.code === creator.teamCode
  );

  return {
    creator: {
      ...creator,
      teamName: team?.name ?? `TEAM ${creator.teamCode}`,
      roster: team?.roster.map((m) => ({ slug: m.slug, name: m.name })) ?? [],
      stats: {
        seasons: 1,
        wins: creatorMatches.filter((m) => 
          (m.team1.code === creator.teamCode && m.team1.isWinner) || 
          (m.team2.code === creator.teamCode && m.team2.isWinner)
        ).length,
        losses: creatorMatches.filter((m) => 
          (m.team1.code === creator.teamCode && !m.team1.isWinner) || 
          (m.team2.code === creator.teamCode && !m.team2.isWinner)
        ).length,
        titles: creator.teamCode === 'AE' ? 1 : 0
      },
      matches: creatorMatches
    }
  };
};