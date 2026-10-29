// src/routes/matches/[id]/+page.ts
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { MATCHES, TEAMS } from '#lib/data/season1';

export const load: PageLoad = ({ params }) => {
  const match = MATCHES.find((m) => m.id === params.id);

  if (!match) {
    throw error(404, 'Pertandingan tidak ditemukan');
  }

  const team1Data = TEAMS[match.team1.code];
  const team2Data = TEAMS[match.team2.code];

  // Susun data detail game
  let gamesList: Array<{ number: number; team1Winner: boolean; team2Winner: boolean }> = [];

  if (match.games && match.games.length > 0) {
    gamesList = match.games.map((g, idx) => ({
      number: g.ordinal || idx + 1,
      team1Winner: g.winnerEntryId === team1Data?.id,
      team2Winner: g.winnerEntryId === team2Data?.id
    }));
  } else {
    const totalGames = Math.max(match.team1.score + match.team2.score, 1);
    let t1ScoreRem = match.team1.score;
    let t2ScoreRem = match.team2.score;

    for (let i = 1; i <= totalGames; i++) {
      let team1Winner = false;
      let team2Winner = false;

      if (t1ScoreRem > 0) {
        team1Winner = true;
        t1ScoreRem--;
      } else if (t2ScoreRem > 0) {
        team2Winner = true;
        t2ScoreRem--;
      } else {
        team1Winner = match.team1.isWinner;
        team2Winner = match.team2.isWinner;
      }

      gamesList.push({ number: i, team1Winner, team2Winner });
    }
  }

  const videos = [
    {
      id: 'EH6eui7phmQ',
      title: `${match.team1.name} vs ${match.team2.name} - ${match.round}`,
      channel: team2Data?.viceCaptain?.name ?? 'Rinee',
      duration: '4:57:08',
      thumbnail: 'https://img.youtube.com/vi/EH6eui7phmQ/hqdefault.jpg',
      url: 'https://www.youtube.com/watch?v=EH6eui7phmQ'
    }
  ];

  return {
    match: {
      ...match,
      gameFormat: match.round.includes('Grand Final') ? 'BO3' : 'BO1',
      // Menggunakan data dateLabel dan scheduledAt asli dari match (misal: Rabu, 21 Oktober 2026)
      dateLabel: match.dateLabel && match.scheduledAt ? `${match.dateLabel}, ${match.scheduledAt}` : (match.dateLabel ?? '20 Oktober 2026'),
      games: gamesList,
      team1: {
        ...match.team1,
        slug: team1Data?.slug ?? `team-${match.team1.code.toLowerCase()}`,
        image: team1Data?.image ?? '/event/teams/placeholder.webp',
        captainName: team1Data?.captain?.name ?? 'Kapten'
      },
      team2: {
        ...match.team2,
        slug: team2Data?.slug ?? `team-${match.team2.code.toLowerCase()}`,
        image: team2Data?.image ?? '/event/teams/placeholder.webp',
        captainName: team2Data?.captain?.name ?? 'Kapten'
      }
    },
    videos
  };
};