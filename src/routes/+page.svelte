<!-- src/routes/seasons/creator-rumble-season-1/+page.svelte -->
<script lang="ts">
  import { Trophy, Play, ArrowUpRight, ArrowRight } from 'lucide-svelte';
  import CreatorImage from '#lib/components/CreatorImage.svelte';
  import CaptainSpotlight from '#lib/components/CaptainSpotlight.svelte';
  import TeamGrid from '#lib/components/TeamGrid.svelte';
  import StandingsTable from '#lib/components/StandingsTable.svelte';
  import { TEAMS } from '#lib/data/season1';
  import { SEASONS } from '#lib/data/seasons';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // Mengubah objek TEAMS menjadi array klasemen yang diurutkan berdasarkan rankLabel[cite: 14]
  const standings = Object.values(TEAMS)
    .map((team) => ({
      pos: team.rankLabel ?? '9+',
      team: team.name,
      captain: team.captain.name,
      code: team.code,
      isChampion: team.rankLabel === '1'
    }))
    .sort((a, b) => {
      const parsePos = (p: string) => parseInt(p.split('–')[0]) || 99;
      return parsePos(a.pos) - parsePos(b.pos);
    });

  // Ambil data spesifik Season 1 secara dinamis dari central data 'SEASONS'[cite: 14]
  const currentSeason = SEASONS.find((s) => s.slug === 'creator-rumble-season-1')!;

  const sponsorLogo = '/event/logo/ourastore.webp';
  const hostLogo = '/event/logo/anonimdt.webp';
  const featuredMatchId = '0aeee182-aa24-45c4-9002-7838388959c3';

  const captains = Object.values(TEAMS).map((team) => ({
    slug: team.captain.slug,
    name: team.captain.name,
    team: team.code,
    image: team.captain.image,
    roster: team.roster.filter((m) => m.slug !== team.captain.slug).map((m) => m.name)
  }));

  const championCaptain = captains.find((c) => c.slug === 'nafari') ?? captains[0];

  const heroNodes = [
    { slug: 'mikoto', name: 'Mikoto' },
    { slug: 'aville', name: 'Aville' },
    { slug: 'dorii', name: 'Dorii' },
    { slug: 'rinee', name: 'Rinee' },
    { slug: 'nafari', name: 'Nafari' }
  ];

  const journey = [
    { round: 'Upper · Ronde 1', opponent: 'TEAM AAA', score: '1:0' },
    { round: 'Upper · Ronde 2', opponent: 'TEAM KCG', score: '1:0' },
    { round: 'Upper Final', opponent: 'TEAM B2F ALPHA', score: '1:0' },
    { round: 'Grand Final', opponent: 'TEAM B2F ALPHA', score: '2:0' }
  ];

  const teamsList = Object.values(currentSeason.teams).map((t) => ({
    code: t.code,
    name: t.name,
    image: t.image
  }));
</script>

<svelte:head>
  <title>Creator Rumble Season 1 · TEAM AE juara</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans">
  <main id="content" class="max-w-7xl mx-auto px-6 py-4 space-y-20">
    <!-- HERO SECTION -->
    <section class="rumble-hero">
      <div class="space-y-6 z-10">
        <div class="space-y-6">
          <div class="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#a38a99]">
            <span class="text-[#ffc700]">{currentSeason.title}</span>
          </div>

          <div>
            <span class="champion-eyebrow">Juara</span>
            <h1 class="champion-title">
              <span class="champion-title__prefix">TEAM</span>
              <span class="champion-title__name">AE</span>
            </h1>
          </div>

          <div class="result-card">
            <p class="result-card__label">
              <Trophy class="w-4 h-4 text-[#ffc700] shrink-0" />
              Grand Final
            </p>
            <div class="result-card__body">
              <div class="result-team">
                <img src="/event/teams/ae.webp" alt="TEAM AE" />
                <span>AE</span>
              </div>
              <strong class="result-score">2–0</strong>
              <div class="result-team result-team--lost">
                <img src="/event/teams/b2f-alpha.webp" alt="TEAM B2F ALPHA" />
                <span>B2F ALPHA</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-4 pt-2">
            <a 
              href={`/matches/${featuredMatchId}`} 
              class="inline-flex items-center gap-2 bg-[#ffc700] text-black font-extrabold text-xs uppercase px-7 py-3.5 hover:bg-yellow-400 transition"
            >
              LIHAT FINAL <ArrowUpRight class="w-4 h-4" />
            </a>
            <a 
              href="https://www.youtube.com/live/cHZKzP6N2xQ?si=b8lvQybpOEnBOzB6" 
              class="inline-flex items-center gap-2 text-white font-bold text-xs hover:text-[#ffc700] transition"
            >
              <Play class="w-4 h-4 fill-current" /> Tonton final
            </a>
          </div>
        </div>
      </div>

      <!-- Championship Hero Scene -->
      <div class="scene-stage relative">
        <div class="absolute top-0 right-0 z-20 flex items-center gap-3 pt-2 pr-2">
          <img src={sponsorLogo} alt="Ourastore" class="h-6 md:h-8 object-contain" />
          <span class="text-[#a38a99] font-bold">×</span>
          <img src={hostLogo} alt="AnonimDT" class="h-6 md:h-8 object-contain" />
        </div>

        <div class="scene-environment" aria-hidden="true">
          <svg class="w-full h-full" viewBox="0 0 800 650" fill="none" preserveAspectRatio="xMidYMid meet">
            <path class="standard-field" d="M180 78H759L569 630H13Z" />
            <path class="standard-edge" d="M180 78H759L569 630H13Z" />
            <path class="standard-rule" d="M225 45H791L597 607" />
          </svg>
        </div>

        {#each heroNodes as p, i (p.slug)}
          <div class="player-node node-{p.slug}" style="--i: {i}">
            <a href="/creators/{p.slug}" aria-label="Profil {p.name}">
              <CreatorImage src="/event/creators/{p.slug}.webp" alt={p.name} class="w-full h-auto" />
            </a>
          </div>
        {/each}

        <ul class="roster-caption">
          <li class="is-captain"><span>Kapten</span>{championCaptain.name}</li>
          {#each championCaptain.roster as member}
            <li>{member}</li>
          {/each}
        </ul>
      </div>
    </section>

    <!-- Navigasi Event Bar -->
    <nav class="flex flex-wrap items-center justify-between border-y border-white/10 py-4 text-xs font-bold uppercase tracking-wider text-[#a38a99]">
      <div class="flex items-center gap-8">
        <a href="#hasil" class="hover:text-white transition">Pertandingan</a>
        <a href="#kreator" class="hover:text-white transition">Kreator</a>
        <a href="#channels" class="hover:text-white transition">Channel</a>
        <a href={`/seasons/${currentSeason.slug}/bracket`} class="hover:text-white transition inline-flex items-center gap-1">
          Bracket <ArrowUpRight class="w-3.5 h-3.5 text-[#ffc700]" />
        </a>
        <a href="#klasemen" class="hover:text-white transition">Klasemen</a>
      </div>
      <a href="/seasons" class="hover:text-white transition inline-flex items-center gap-1 text-[#ffc700]">
        Ringkasan <ArrowRight class="w-3.5 h-3.5" />
      </a>
    </nav>

    <!-- Pertandingan Penentu -->
    <section id="hasil" class="space-y-6 pt-4">
      <div class="flex justify-between items-end border-b border-white/5 pb-4">
        <div>
          <h2 class="text-3xl lg:text-4xl font-black font-display uppercase tracking-wide text-white">
            Pertandingan penentu
          </h2>
        </div>
        <a href="#perjalanan" class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ffc700] hover:underline">
          Semua hasil <ArrowRight class="w-4 h-4" />
        </a>
      </div>

      <div class="bg-[#190614] border border-white/10 overflow-hidden rounded-none">
        <div class="grid md:grid-cols-[1fr_minmax(180px,auto)_1fr] items-stretch min-h-[360px] lg:min-h-[420px]">
          <div class="relative group overflow-hidden flex items-end p-6 min-h-[280px]">
            <img src="/event/teams/ae.webp" alt="TEAM AE" class="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div class="relative z-10 space-y-1">
              <h3 class="text-3xl lg:text-5xl font-black font-display uppercase text-white tracking-wide">TEAM AE</h3>
              <span class="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#ffc700] text-black px-3 py-0.5 tracking-widest uppercase">
                <Trophy class="w-3 h-3" /> WINNER
              </span>
            </div>
          </div>

          <div class="bg-[#0f040c] border-x border-white/10 px-4 py-6 flex flex-col items-center justify-center text-center z-20 space-y-3 shrink-0">
            <span class="text-[11px] font-bold text-[#ffc700] tracking-widest uppercase">BO3</span>
            <div class="text-5xl lg:text-6xl font-black font-display text-[#ffc700] tracking-normal leading-none whitespace-nowrap">
              2 : 0
            </div>
            <a href={`/matches/${featuredMatchId}`} class="inline-flex items-center gap-1 text-[11px] font-bold text-[#a38a99] hover:text-white transition whitespace-nowrap">
              Detail pertandingan <ArrowUpRight class="w-3.5 h-3.5" />
            </a>
          </div>

          <div class="relative group overflow-hidden flex items-end justify-end p-6 min-h-[280px]">
            <img src="/event/teams/b2f-alpha.webp" alt="TEAM B2F ALPHA" class="absolute inset-0 w-full h-full object-cover object-top grayscale opacity-75 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 transition duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
            <div class="relative z-10 space-y-1 text-right">
              <h3 class="text-3xl lg:text-5xl font-black font-display uppercase text-white tracking-wide">TEAM B2F ALPHA</h3>
              <span class="inline-block text-[10px] font-bold bg-white/10 text-[#a38a99] px-3 py-0.5 tracking-widest uppercase">RUNNER UP</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Seksi Kapten Spotlight -->
    <section id="kreator" class="space-y-6 pt-4">
      <div class="flex justify-between items-end">
        <h2 class="text-3xl lg:text-4xl font-black font-display uppercase tracking-wide text-white">
          Kapten
        </h2>
        <a href="/creators" class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ffc700] hover:underline">
          Semua kreator <ArrowUpRight class="w-4 h-4" />
        </a>
      </div>
      <CaptainSpotlight {captains} />
    </section>

    <!-- YouTube Creator Channels Marquee Section (DINAMIS LIVE COUNT) -->
    <section id="channels" class="space-y-6 pt-4 border-t border-white/10 overflow-hidden">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 class="text-3xl lg:text-4xl font-black font-display uppercase tracking-wide text-white">
            Kanal YouTube Kreator
          </h2>
          <p class="text-xs text-[#a38a99] font-semibold mt-1">
            Tonton watch party dan konten Creator Rumble langsung dari channel resmi para kreator.
          </p>
        </div>

        <div class="flex items-center gap-4">
          <!-- Widget Indikator ON AIR Real-time -->
          <div class="flex items-center bg-[#190614] border border-white/10 px-3 py-1.5 shrink-0">
            <div class="flex items-center gap-2 pr-3 border-r border-white/10 text-xs font-black font-mono tracking-widest text-white">
              <span class="w-2 h-2 rounded-full {data.liveCount > 0 ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}"></span>
              <span>ON AIR</span>
            </div>
            <div class="pl-3 font-mono font-black text-sm text-[#ffc700] min-w-[28px] text-center">
              {String(data.liveCount).padStart(2, '0')}
            </div>
          </div>

          <a href="/channels" class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ffc700] hover:underline shrink-0">
            Semua Channel <ArrowUpRight class="w-4 h-4" />
          </a>
        </div>
      </div>

      <div class="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div class="flex w-max animate-marquee gap-6 py-2 hover:[animation-play-state:paused]">
          {#each [...data.creators, ...data.creators] as creator, i (creator.slug + '-' + i)}
            <a 
              href={creator.youtubeUrl ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(creator.name + ' Creator Rumble by Ourastore')}`} 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-3 bg-[#190614] border border-white/10 p-4 min-w-[240px] group hover:border-[#ffc700] transition shrink-0 relative"
            >
              {#if creator.isLive}
                <span class="absolute top-2 right-2 bg-red-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 uppercase tracking-widest animate-pulse z-10">
                  LIVE
                </span>
              {/if}

              <div class="w-12 h-12 shrink-0 bg-[#0d020a] border border-white/10 overflow-hidden relative flex items-center justify-center">
                <img src={creator.imageCard ?? creator.image} alt={creator.name} class="w-full h-full object-cover group-hover:scale-105 transition" />
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-xs font-black uppercase text-white tracking-wider truncate group-hover:text-[#ffc700] transition">
                  {creator.name}
                </span>
                <span class="text-[10px] font-bold text-[#a38a99] uppercase tracking-wider truncate">
                  Tim {creator.teamCode} · {creator.role}
                </span>
              </div>
              <div class="ml-auto text-xs font-bold text-[#ffc700] flex items-center gap-1 shrink-0">
                <span>Channel</span>
                <span>→</span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </section>

    <!-- Champion Journey / Bracket Path -->
    <section id="perjalanan" class="space-y-6 pt-4 border-t border-white/10">
      <div class="flex justify-between items-end">
        <div>
          <h2 class="text-3xl lg:text-4xl font-black font-display uppercase tracking-wide text-white">
            Jalan menuju <span class="text-[#ffc700]">gelar juara.</span>
          </h2>
          <p class="text-xs text-[#a38a99] font-semibold mt-1">TEAM AE</p>
        </div>
        <a href={`/seasons/${currentSeason.slug}/bracket`} class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ffc700] hover:underline">
          Telusuri bracket <ArrowUpRight class="w-4 h-4" />
        </a>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each journey as j}
          <div class="bg-[#190614] border border-white/10 p-5 space-y-2 hover:border-[#ffc700] transition">
            <span class="text-[10px] font-bold text-[#ffc700] uppercase tracking-widest">{j.round}</span>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-bold text-white">{j.opponent}</h3>
              <span class="text-xl font-black font-display text-[#ffc700]">{j.score}</span>
            </div>
          </div>
        {/each}
      </div>
    </section>

    <!-- Tim Participant Grid -->
    <section id="tim" class="space-y-6 pt-4 border-t border-white/10">
      <div class="flex justify-between items-end">
        <h2 class="text-3xl lg:text-4xl font-black font-display uppercase tracking-wide text-white">
          Tim
        </h2>
        <a href="/teams" class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ffc700] hover:underline">
          Tim &amp; roster <ArrowRight class="w-4 h-4" />
        </a>
      </div>
      <TeamGrid teams={teamsList} />
    </section>

    <!-- Klasemen Akhir Table -->
    <div id="klasemen">
      <StandingsTable {standings} />
    </div>
  </main>

  <!-- Footer -->
  <footer class="border-t border-white/10 py-12 mt-20 text-center text-xs text-[#a38a99] space-y-4">
    <img src="/event/brand/creator-rumble.webp" alt="Creator Rumble" class="h-7 object-contain mx-auto" />
    <p>© 2026 Creator Rumble · Indonesia</p>
  </footer>
</div>