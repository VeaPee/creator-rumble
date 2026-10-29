// src/routes/schedule/+page.ts
import type { PageLoad } from './$types';
import { TEAMS, MATCHES } from '#lib/data/season1';

export const load: PageLoad = () => {
  const teamsList = Object.values(TEAMS).map((t) => ({
    code: t.code,
    name: t.name
  }));

  const matchesList = MATCHES.map((m) => {
    // Penentuan tanggal berdasarkan ronde
    const isDay2 = m.round.includes('Lower Final') || m.round.includes('Grand Final');
    const dateLabel = isDay2 ? 'Rabu, 21 Oktober 2026' : 'Selasa, 20 Oktober 2026';

    return {
      ...m,
      format: m.round.includes('Grand Final') ? 'BO3' : 'BO1',
      dateLabel
    };
  });

  return {
    teams: teamsList,
    matches: matchesList
  };
};