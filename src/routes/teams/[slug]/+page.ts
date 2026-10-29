// src/routes/teams/[slug]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { TEAMS, MATCHES, CREATORS } from '#lib/data/season1';

export const load: PageLoad = ({ params }) => {
  // Cari tim berdasarkan slug (contoh: 'team-aaa')
  const teamKey = Object.keys(TEAMS).find(
    (key) => TEAMS[key].slug === params.slug
  );

  if (!teamKey) {
    throw error(404, 'Tim tidak ditemukan');
  }

  const team = TEAMS[teamKey];

  // Filter riwayat pertandingan untuk tim ini
  const teamMatches = MATCHES.filter(
    (m) => m.team1.code === team.code || m.team2.code === team.code
  );

  // Ambil data detail roster anggota tim dari CREATORS
  const rosterMembers = team.roster.map((r) => {
    const creatorKey = Object.keys(CREATORS).find(
      (k) => CREATORS[k].slug === r.slug
    );
    const creatorData = creatorKey ? CREATORS[creatorKey] : null;

    return {
      slug: r.slug,
      name: r.name,
      role: creatorData?.role ?? 'Kreator',
      image: creatorData?.image ?? '/event/creators/placeholder.webp'
    };
  });

  return {
    team: {
      ...team,
      roster: rosterMembers,
      matches: teamMatches,
      position: team.rankLabel ?? 'Peserta'
    }
  };
};