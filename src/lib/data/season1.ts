import type { Team, Creator } from '#lib/types';

// 1. DAFTAR KREATORS LENGKAP (40 KREATORS)
export const CREATORS: Record<string, Creator> = {
  // TEAM AE
  nafari: { id: 'eaebc2f4-c929-4637-b3ed-9a3036153ed7', slug: 'nafari', name: 'NAFARI', role: 'Kapten', teamCode: 'AE', image: '/event/creators/nafari.webp', imageCard: '/event/creators/single-card/nafari.webp', youtubeUrl: 'https://www.youtube.com/@Nafari126' },
  rinee: { id: 'a3bc00bc-c3e2-4c14-bd47-61685f22ea3c', slug: 'rinee', name: 'RINEE', role: 'Wakil Kapten', teamCode: 'AE', image: '/event/creators/rinee.webp', imageCard: '/event/creators/single-card/rinee.webp', youtubeUrl: 'https://www.youtube.com/@Rineeeloyyyeh' },
  mikoto: { id: 'dcd96ac0-4f1f-4301-a352-8e8177c802f1', slug: 'mikoto', name: 'MIKOTO', role: 'Kreator', teamCode: 'AE', image: '/event/creators/mikoto.webp', imageCard: '/event/creators/single-card/mikoto.webp', youtubeUrl: 'https://www.youtube.com/@@mikoto347' },
  aville: { id: '01be9956-ca9a-45fe-92a6-6545c14853d1', slug: 'aville', name: 'AVILLE', role: 'Kreator', teamCode: 'AE', image: '/event/creators/aville.webp', imageCard: '/event/creators/single-card/aville.webp', youtubeUrl: 'https://www.youtube.com/@AvilleYT' },
  dorii: { id: 'a3226cea-ae44-4df0-a647-522a7948e9d2', slug: 'dorii', name: 'DORII', role: 'Kreator', teamCode: 'AE', image: '/event/creators/dorii.webp', imageCard: '/event/creators/single-card/dorii.webp', youtubeUrl: 'https://www.youtube.com/@DoriiiGG' },

  // TEAM B2F ALPHA
  'hyde-obrien': { id: 'd34d9e0b-0ca1-49dc-a239-6cba1926f206', slug: 'hyde-o-brien', name: "HYDE O'BRIEN", role: 'Kapten', teamCode: 'B2FA', image: '/event/creators/hyde.webp', imageCard: '/event/creators/single-card/hyde.webp', youtubeUrl: 'https://www.youtube.com/@set1awanade' },
  'mada-rahadian': { id: 'a6f69f1c-ea98-4df6-ad95-7cf3ae4f7af1', slug: 'mada-rahadian', name: 'MADA RAHADIAN', role: 'Wakil Kapten', teamCode: 'B2FA', image: '/event/creators/mada.webp', imageCard: '/event/creators/single-card/mada.webp', youtubeUrl: 'https://www.youtube.com/@madarahadian' },
  jhocam: { id: 'd3cd00cc-a66e-44d7-83c6-d2a4306f08ec', slug: 'jhocam', name: 'JHOCAM', role: 'Kreator', teamCode: 'B2FA', image: '/event/creators/jhocam.webp', imageCard: '/event/creators/single-card/jhocam.webp', youtubeUrl: 'https://www.youtube.com/@jhocamtri' },
  rusman: { id: '526ba1d2-ddf4-419b-8154-d1c00fd48e2d', slug: 'rusman', name: 'RUSMAN', role: 'Kreator', teamCode: 'B2FA', image: '/event/creators/rusman.webp', imageCard: '/event/creators/single-card/rusman.webp', youtubeUrl: 'https://www.youtube.com/@RusmanDota2' },
  'ace-anthem': { id: '9fd86c48-c18e-47a8-9374-33b37a0a0222', slug: 'ace-anthem', name: 'ACE ANTHEM', role: 'Kreator', teamCode: 'B2FA', image: '/event/creators/ace_anthem.webp', imageCard: '/event/creators/single-card/ace_anthem.webp', youtubeUrl: 'https://www.youtube.com/@aceanthem2' },

  // TEAM KCG
  riddok: { id: '12d459f3-4dcd-45fd-9b69-7f01a338cfcc', slug: 'riddok', name: 'RIDDOK', role: 'Kapten', teamCode: 'KCG', image: '/event/creators/riddok.webp', imageCard: '/event/creators/single-card/riddok.webp', youtubeUrl: 'https://www.youtube.com/@RDKbosspubg' },
  waddap: { id: 'ba71914d-3200-4294-932f-0451fe62f1ff', slug: 'waddap', name: 'WADDAP', role: 'Wakil Kapten', teamCode: 'KCG', image: '/event/creators/waddap.webp', imageCard: '/event/creators/single-card/waddap.webp', youtubeUrl: 'https://www.youtube.com/@Waddap25' },
  varizh: { id: '114b251e-d1fb-48bc-91ca-14ba70360de3', slug: 'varizh', name: 'VARIZH', role: 'Kreator', teamCode: 'KCG', image: '/event/creators/varizh.webp', imageCard: '/event/creators/single-card/varizh.webp', youtubeUrl: 'https://www.youtube.com/@varizhh' },
  ramzi: { id: 'c3ffd975-7ad9-440d-913b-d45031120fd1', slug: 'ramzi', name: 'RAMZI', role: 'Kreator', teamCode: 'KCG', image: '/event/creators/ramzi.webp', imageCard: '/event/creators/single-card/ramzi.webp', youtubeUrl: 'https://www.youtube.com/@ramzibayhaki' },
  kisan: { id: 'b212f0bf-67d8-488c-9e8a-670c362f0054', slug: 'kisan', name: 'KISAN', role: 'Kreator', teamCode: 'KCG', image: '/event/creators/kisan.webp', imageCard: '/event/creators/single-card/kisan.webp', youtubeUrl: 'https://www.youtube.com/@kisansss' },

  // TEAM B2F BETA
  'alvin-susanto': { id: 'b7353cbe-c4e0-4cdd-89ea-7663236096ac', slug: 'alvin-susanto', name: 'ALVIN SUSANTO', role: 'Kapten', teamCode: 'B2FB', image: '/event/creators/alvin.webp', imageCard: '/event/creators/single-card/alvin.webp', youtubeUrl: 'https://www.youtube.com/@AlvinSusanto12' },
  nico: { id: '483c1f25-db1b-4624-a1c3-d4ec420391d8', slug: 'nico', name: 'NICO', role: 'Wakil Kapten', teamCode: 'B2FB', image: '/event/creators/nico.webp', imageCard: '/event/creators/single-card/nico.webp', youtubeUrl: 'https://www.youtube.com/@nicholasjoelll' },
  inyourdream: { id: '2679cd39-64ef-47c3-8299-486aaa8f0147', slug: 'inyourdream', name: 'INYOURDREAM', role: 'Kreator', teamCode: 'B2FB', image: '/event/creators/iyd.webp', imageCard: '/event/creators/single-card/iyd.webp', youtubeUrl: 'https://www.youtube.com/@inYourdreaM' },
  yabyooo: { id: '6cbb3510-81d5-466a-b4a8-bb3eaaad7cf3', slug: 'yabyooo', name: 'YABYOOO', role: 'Kreator', teamCode: 'B2FB', image: '/event/creators/yabyoo.webp', imageCard: '/event/creators/single-card/yabyoo.webp', youtubeUrl: 'https://www.youtube.com/@Yabyooo' },
  'akbar-rais': { id: 'ad17b4dd-8019-4781-99da-299d0085b772', slug: 'akbar-rais', name: 'AKBAR RAIS', role: 'Kreator', teamCode: 'B2FB', image: '/event/creators/akbar_rais.webp', imageCard: '/event/creators/single-card/akbar_rais.webp', youtubeUrl: 'https://www.youtube.com/@AkbarRais' },

  // TEAM PRK
  fakmon: { id: '5ab74d92-b900-4cf0-9f3d-af4074bff9c3', slug: 'fakmon', name: 'FAKMON', role: 'Kapten', teamCode: 'PRK', image: '/event/creators/fakmon.webp', imageCard: '/event/creators/single-card/fakmon.webp', youtubeUrl: 'https://www.youtube.com/@FakmonGG' },
  macbeth: { id: 'c559f701-63cb-4b5d-bcef-0006f855d391', slug: 'macbeth', name: 'MACBETH', role: 'Wakil Kapten', teamCode: 'PRK', image: '/event/creators/macbeth.webp', imageCard: '/event/creators/single-card/macbeth.webp', youtubeUrl: 'https://www.youtube.com/@iandipra' },
  jikroy: { id: '637aa2e6-7676-4870-b84c-7e46b20ae83b', slug: 'jikroy', name: 'JIKROY', role: 'Kreator', teamCode: 'PRK', image: '/event/creators/jikroy.webp', imageCard: '/event/creators/single-card/jikroy.webp', youtubeUrl: 'https://www.youtube.com/@jikroy' },
  kelthuzard: { id: '28998f4f-05f8-4f2f-b547-7b43ac9672b3', slug: 'kelthuzard', name: 'KELTHUZARD', role: 'Kreator', teamCode: 'PRK', image: '/event/creators/kelthuzard.webp', imageCard: '/event/creators/single-card/kelthuzard.webp', youtubeUrl: 'https://www.youtube.com/@KelThuzardDota' },
  'ivan-bbdan': { id: '0f449298-3176-4359-8e36-3655f7b61d4f', slug: 'ivan-bbdan', name: 'IVAN BBDAN', role: 'Kreator', teamCode: 'PRK', image: '/event/creators/ivanbbd.webp', imageCard: '/event/creators/single-card/ivanbbd.webp', youtubeUrl: 'https://www.youtube.com/@DanielIvann' },

  // TEAM OURASTORE
  deankt: { id: '70b65cb3-6b67-4061-943c-4746eb6473ed', slug: 'deankt', name: 'DEANKT', role: 'Kapten', teamCode: 'OURA', image: '/event/creators/deankt.webp', imageCard: '/event/creators/single-card/deankt.webp', youtubeUrl: 'https://www.youtube.com/@deanDEANKT' },
  oura: { id: 'a5355d61-ba21-4326-9d5b-d2ce32f55ed2', slug: 'oura', name: 'OURA', role: 'Wakil Kapten', teamCode: 'OURA', image: '/event/creators/oura.webp', imageCard: '/event/creators/single-card/oura.webp', youtubeUrl: 'https://www.youtube.com/@ouraekooju' },
  asterix: { id: '3d08027b-95dc-49d2-9aaf-e4223951a43c', slug: 'asterix', name: 'ASTERIX', role: 'Kreator', teamCode: 'OURA', image: '/event/creators/asterix.webp', imageCard: '/event/creators/single-card/asterix.webp', youtubeUrl: 'https://www.youtube.com/@asterix1925' },
  vino: { id: '007d9f50-6798-4b15-884d-bb55f920401a', slug: 'vino', name: 'VINO', role: 'Kreator', teamCode: 'OURA', image: '/event/creators/vino.webp', imageCard: '/event/creators/single-card/vino.webp', youtubeUrl: 'https://www.youtube.com/@VEENOMONDOTA' },
  rexxy: { id: '9875c4b7-d26e-4dcd-ad76-c69dac687868', slug: 'rexxy', name: 'REXXY', role: 'Kreator', teamCode: 'OURA', image: '/event/creators/rexxy.webp', imageCard: '/event/creators/single-card/rexxy.webp', youtubeUrl: 'https://www.youtube.com/@fahmirexxy' },

  // TEAM AAA
  youk: { id: '7c7d203d-4605-4ad1-966b-485b464138fd', slug: 'youk', name: 'YOUK', role: 'Kapten', teamCode: 'AAA', image: '/event/creators/youk.webp', imageCard: '/event/creators/single-card/youk.webp', youtubeUrl: 'https://www.youtube.com/@youktheoo' },
  jot: { id: '2a210420-74a1-4a4d-a4d3-8b91ef3c69d9', slug: 'jot', name: 'JOT', role: 'Wakil Kapten', teamCode: 'AAA', image: '/event/creators/jot.webp', imageCard: '/event/creators/single-card/jot.webp', youtubeUrl: 'https://www.youtube.com/@Tierison' },
  mocel: { id: '43af6aae-d3d1-4a8d-b704-ffea56185ff2', slug: 'mocel', name: 'MOCEL', role: 'Kreator', teamCode: 'AAA', image: '/event/creators/mocel.webp', imageCard: '/event/creators/single-card/mocel.webp', youtubeUrl: 'https://www.youtube.com/@Dreamocell' },
  vlaicu: { id: '249f5f36-2902-41a9-b08f-4ca31ab77884', slug: 'vlaicu', name: 'VLAICU', role: 'Kreator', teamCode: 'AAA', image: '/event/creators/vlaicu.webp', imageCard: '/event/creators/single-card/vlaicu.webp', youtubeUrl: 'https://www.youtube.com/@Vlaicuuu' },
  boba: { id: '9b0917a4-465d-4eb1-996f-ccfbd2c2ebd9', slug: 'boba', name: 'BOBA', role: 'Kreator', teamCode: 'AAA', image: '/event/creators/boba.webp', imageCard: '/event/creators/single-card/boba.webp', youtubeUrl: 'https://www.youtube.com/@bobacott' },

  // TEAM O2H
  pendo: { id: '93fe8b5d-eae3-4fb6-a4aa-d233d41b6a7d', slug: 'pendo', name: 'PENDO', role: 'Kapten', teamCode: 'O2H', image: '/event/creators/pendo.webp', imageCard: '/event/creators/single-card/pendo.webp', youtubeUrl: 'https://www.youtube.com/@aldyagdiansyah' },
  jepon: { id: 'a482f6dc-2983-45dc-9881-821ee0092979', slug: 'jepon', name: 'JEPON', role: 'Wakil Kapten', teamCode: 'O2H', image: '/event/creators/jepon.webp', imageCard: '/event/creators/single-card/jepon.webp', youtubeUrl: 'https://www.youtube.com/@PonJepon' },
  daya: { id: 'c1846de8-55d8-4db4-8809-5bf69bd06e7e', slug: 'daya', name: 'DAYA', role: 'Kreator', teamCode: 'O2H', image: '/event/creators/daya.webp', imageCard: '/event/creators/single-card/daya.webp', youtubeUrl: 'https://www.youtube.com/@MamangDayaDota' },
  kelly: { id: '990caf86-ad39-4c7d-b465-91651bd35cdf', slug: 'kelly', name: 'KELLY', role: 'Kreator', teamCode: 'O2H', image: '/event/creators/kelly.webp', imageCard: '/event/creators/single-card/kelly.webp', youtubeUrl: 'https://www.youtube.com/@kellychandraa' },
  asteriskk: { id: 'e13b5209-f931-48af-8511-c354f1246c09', slug: 'asteriskk', name: 'ASTERISKK', role: 'Kreator', teamCode: 'O2H', image: '/event/creators/asteriskk.webp', imageCard: '/event/creators/single-card/asteriskk.webp', youtubeUrl: 'https://www.youtube.com/@asteriskk6' }
};

// 2. DAFTAR TIM LENGKAP (BERASARKAN ROSTER KREATORS)
export const TEAMS: Record<string, Team> = {
  AE: {
    id: 'e5b6db94-55f6-4ac6-ae6f-371d17d40281',
    slug: 'team-ae',
    name: 'TEAM AE',
    code: 'AE',
    color: '#FFD166',
    image: '/event/teams/ae.webp',
    rankLabel: '1',
    captain: CREATORS.nafari,
    viceCaptain: CREATORS.rinee,
    roster: [CREATORS.nafari, CREATORS.rinee, CREATORS.mikoto, CREATORS.aville, CREATORS.dorii]
  },
  B2FA: {
    id: '2db72908-76ab-4c74-ae17-291ca7dd90d4',
    slug: 'team-b2f-alpha',
    name: 'TEAM B2F ALPHA',
    code: 'B2FA',
    color: '#FFD166',
    image: '/event/teams/b2f-alpha.webp',
    rankLabel: '2',
    captain: CREATORS['hyde-obrien'],
    viceCaptain: CREATORS['mada-rahadian'],
    roster: [CREATORS['hyde-obrien'], CREATORS['mada-rahadian'], CREATORS.jhocam, CREATORS.rusman, CREATORS['ace-anthem']]
  },
  KCG: {
    id: '2921d5a9-c7aa-4069-ab99-e1fe68358e0b',
    slug: 'team-kcg',
    name: 'TEAM KCG',
    code: 'KCG',
    color: '#FFD166',
    image: '/event/teams/kcg.webp',
    rankLabel: '3',
    captain: CREATORS.riddok,
    viceCaptain: CREATORS.waddap,
    roster: [CREATORS.riddok, CREATORS.waddap, CREATORS.varizh, CREATORS.ramzi, CREATORS.kisan]
  },
  B2FB: {
    id: '256f48ed-981f-4d5b-814d-c30d81dae56a',
    slug: 'team-b2f-beta',
    name: 'TEAM B2F BETA',
    code: 'B2FB',
    color: '#FFD166',
    image: '/event/teams/b2f-beta.webp',
    rankLabel: '4',
    captain: CREATORS['alvin-susanto'],
    viceCaptain: CREATORS.nico,
    roster: [CREATORS['alvin-susanto'], CREATORS.nico, CREATORS.inyourdream, CREATORS.yabyooo, CREATORS['akbar-rais']]
  },
  PRK: {
    id: '79894b0d-42a8-4df7-b966-ad8b8b4aee33',
    slug: 'team-prk',
    name: 'TEAM PRK',
    code: 'PRK',
    color: '#FFD166',
    image: '/event/teams/prk.webp',
    rankLabel: '5-6',
    captain: CREATORS.fakmon,
    viceCaptain: CREATORS.macbeth,
    roster: [CREATORS.fakmon, CREATORS.macbeth, CREATORS.jikroy, CREATORS.kelthuzard, CREATORS['ivan-bbdan']]
  },
  OURA: {
    id: '9da7f587-fd8b-48cd-a894-74cc3b37c183',
    slug: 'team-ourastore',
    name: 'TEAM OURASTORE',
    code: 'OURA',
    color: '#FFD166',
    image: '/event/teams/ourastore.webp',
    rankLabel: '5-6',
    captain: CREATORS.deankt,
    viceCaptain: CREATORS.oura,
    roster: [CREATORS.deankt, CREATORS.oura, CREATORS.asterix, CREATORS.vino, CREATORS.rexxy]
  },
  AAA: {
    id: 'ec2caa87-7ff2-48e5-a5c7-5252e8f6ec4b',
    slug: 'team-aaa',
    name: 'TEAM AAA',
    code: 'AAA',
    color: '#FFD166',
    image: '/event/teams/aaa.webp',
    rankLabel: '7-8',
    captain: CREATORS.youk,
    viceCaptain: CREATORS.jot,
    roster: [CREATORS.youk, CREATORS.jot, CREATORS.mocel, CREATORS.vlaicu, CREATORS.boba]
  },
  O2H: {
    id: '955f9c1b-335c-4e14-8900-df4fe1ac6f35',
    slug: 'team-o2h',
    name: 'TEAM O2H',
    code: 'O2H',
    color: '#FFD166',
    image: '/event/teams/o2h.webp',
    rankLabel: '7-8',
    captain: CREATORS.pendo,
    viceCaptain: CREATORS.jepon,
    roster: [CREATORS.pendo, CREATORS.jepon, CREATORS.daya, CREATORS.kelly, CREATORS.asteriskk]
  }
};

// Tambahkan objek MATCHES di bagian bawah file season1.ts

// src/lib/data/season1.ts (Bagian MATCHES)

export const MATCHES = [
  // --- UPPER BRACKET RONDE 1 (20 OKTOBER) ---
  {
    id: 'ub-r1-1',
    round: 'Upper · Ronde 1',
    scheduledAt: '19.00 WIB',
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'AAA', name: 'TEAM AAA', score: 0, isWinner: false },
    team2: { code: 'AE', name: 'TEAM AE', score: 1, isWinner: true }
  },
  {
    id: 'ub-r1-2',
    round: 'Upper · Ronde 1',
    scheduledAt: '19.00 WIB',
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'KCG', name: 'TEAM KCG', score: 1, isWinner: true },
    team2: { code: 'B2FB', name: 'TEAM B2F BETA', score: 0, isWinner: false }
  },
  {
    id: 'ub-r1-3',
    round: 'Upper · Ronde 1',
    scheduledAt: '19.00 WIB',
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'OURA', name: 'TEAM OURASTORE', score: 0, isWinner: false },
    team2: { code: 'PRK', name: 'TEAM PRK', score: 1, isWinner: true }
  },
  {
    id: 'ub-r1-4',
    round: 'Upper · Ronde 1',
    scheduledAt: '19.00 WIB',
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'O2H', name: 'TEAM O2H', score: 0, isWinner: false },
    team2: { code: 'B2FA', name: 'TEAM B2F ALPHA', score: 1, isWinner: true }
  },

  // --- UPPER BRACKET RONDE 2 (20 OKTOBER) ---
  {
    id: 'ub-r2-1',
    round: 'Upper · Ronde 2',
    scheduledAt: null,
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'AE', name: 'TEAM AE', score: 1, isWinner: true },
    team2: { code: 'KCG', name: 'TEAM KCG', score: 0, isWinner: false }
  },
  {
    id: 'ub-r2-2',
    round: 'Upper · Ronde 2',
    scheduledAt: null,
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'PRK', name: 'TEAM PRK', score: 0, isWinner: false },
    team2: { code: 'B2FA', name: 'TEAM B2F ALPHA', score: 1, isWinner: true }
  },

  // --- UPPER BRACKET FINAL (20 OKTOBER) ---
  {
    id: 'ub-final',
    round: 'Upper Final',
    scheduledAt: null,
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'AE', name: 'TEAM AE', score: 1, isWinner: true },
    team2: { code: 'B2FA', name: 'TEAM B2F ALPHA', score: 0, isWinner: false }
  },

  // --- LOWER BRACKET RONDE 1 (20 OKTOBER) ---
  {
    id: 'lb-r1-1',
    round: 'Lower · Ronde 1',
    scheduledAt: null,
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'AAA', name: 'TEAM AAA', score: 0, isWinner: false },
    team2: { code: 'B2FB', name: 'TEAM B2F BETA', score: 1, isWinner: true }
  },
  {
    id: 'lb-r1-2',
    round: 'Lower · Ronde 1',
    scheduledAt: null,
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'OURA', name: 'TEAM OURASTORE', score: 1, isWinner: true },
    team2: { code: 'O2H', name: 'TEAM O2H', score: 0, isWinner: false }
  },

  // --- LOWER BRACKET RONDE 2 (20 OKTOBER) ---
  {
    id: 'lb-r2-1',
    round: 'Lower · Ronde 2',
    scheduledAt: null,
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'B2FB', name: 'TEAM B2F BETA', score: 1, isWinner: true },
    team2: { code: 'PRK', name: 'TEAM PRK', score: 0, isWinner: false }
  },
  {
    id: 'lb-r2-2',
    round: 'Lower · Ronde 2',
    scheduledAt: null,
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'OURA', name: 'TEAM OURASTORE', score: 0, isWinner: false },
    team2: { code: 'KCG', name: 'TEAM KCG', score: 1, isWinner: true }
  },

  // --- LOWER BRACKET RONDE 3 (20 OKTOBER) ---
  {
    id: 'lb-r3',
    round: 'Lower · Ronde 3',
    scheduledAt: null,
    dateLabel: 'Selasa, 20 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'B2FB', name: 'TEAM B2F BETA', score: 0, isWinner: false },
    team2: { code: 'KCG', name: 'TEAM KCG', score: 1, isWinner: true }
  },

  // --- LOWER BRACKET FINAL (21 OKTOBER) ---
  {
    id: 'lb-final',
    round: 'Lower Final',
    scheduledAt: '18.00 WIB',
    dateLabel: 'Rabu, 21 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'KCG', name: 'TEAM KCG', score: 0, isWinner: false },
    team2: { code: 'B2FA', name: 'TEAM B2F ALPHA', score: 1, isWinner: true }
  },

  // --- GRAND FINAL (21 OKTOBER) ---
  {
    id: '0aeee182-aa24-45c4-9002-7838388959c3',
    round: 'Grand Final',
    scheduledAt: '20.00 WIB',
    dateLabel: 'Rabu, 21 Oktober 2026',
    status: 'Selesai',
    team1: { code: 'AE', name: 'TEAM AE', score: 2, isWinner: true },
    team2: { code: 'B2FA', name: 'TEAM B2F ALPHA', score: 0, isWinner: false }
  }
];