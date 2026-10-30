<!-- src/routes/matches/[id]/+page.svelte -->
<script lang="ts">
  import { Check, X, Play, ArrowUpRight } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let match = $derived(data.match);
</script>

<svelte:head>
  <title>{match.team1.name} vs {match.team2.name} · Creator Rumble Season 1</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  <main id="content" class="max-w-5xl mx-auto px-6 pt-8 space-y-12">
    
    <!-- BREADCRUMB NAVIGATION -->
    <nav class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a38a99]">
      <a href="/seasons/creator-rumble-season-1" class="hover:text-white transition">Season 1</a>
      <span>/</span>
      <a href="/schedule" class="hover:text-white transition">Schedule & Bracket</a>
    </nav>

    <!-- MATCH HEADER -->
    <header class="space-y-1">
      <h1 class="text-3xl lg:text-5xl font-black font-display uppercase text-white tracking-wide">
        {match.round}
      </h1>
      <p class="text-xs font-bold text-[#a38a99] uppercase tracking-wider">
        Dota 2 · {match.gameFormat} · {match.dateLabel}
      </p>
    </header>

    <!-- MATCH SHOWDOWN (HEAD TO HEAD) -->
    <section class="bg-[#190614] border border-white/10 p-6 lg:p-10 relative overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-8 text-center relative z-10">
        
        <!-- TIM 1 (KIRI) -->
        <div class="flex flex-col items-center space-y-3 {match.team1.isWinner ? 'opacity-100' : 'opacity-60'}">
          <a href={`/teams/${match.team1.slug}`} class="group space-y-3 flex flex-col items-center">
            <div class="w-36 h-48 lg:w-44 lg:h-56 bg-[#0d020a] border border-white/10 overflow-hidden shadow-2xl group-hover:border-[#ffc700]/50 transition">
              <img src={match.team1.image} alt={match.team1.name} class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            </div>
            <h2 class="text-xl lg:text-2xl font-black font-display text-white uppercase tracking-wide group-hover:text-[#ffc700] transition">
              {match.team1.name}
            </h2>
          </a>
          <span class="text-xs font-bold text-[#a38a99] uppercase tracking-wider">
            {match.team1.captainName} · Kapten
          </span>
        </div>

        <!-- SKOR TENGAH -->
        <div class="space-y-2 my-4 md:my-0">
          <div class="text-5xl lg:text-7xl font-black font-display text-white tracking-widest">
            <strong>{match.team1.score}<i> : </i>{match.team2.score}</strong>
          </div>
          <span class="inline-block text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 text-white">
            {match.status}
          </span>
        </div>

        <!-- TIM 2 (KANAN) -->
        <div class="flex flex-col items-center space-y-3 {match.team2.isWinner ? 'opacity-100' : 'opacity-60'}">
          <a href={`/teams/${match.team2.slug}`} class="group space-y-3 flex flex-col items-center">
            <div class="w-36 h-48 lg:w-44 lg:h-56 bg-[#0d020a] border border-white/10 overflow-hidden shadow-2xl group-hover:border-[#ffc700]/50 transition">
              <img src={match.team2.image} alt={match.team2.name} class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            </div>
            <h2 class="text-xl lg:text-2xl font-black font-display text-white uppercase tracking-wide group-hover:text-[#ffc700] transition">
              {match.team2.name}
            </h2>
          </a>
          <span class="text-xs font-bold text-[#a38a99] uppercase tracking-wider">
            {match.team2.captainName} · Kapten
          </span>
        </div>

      </div>
    </section>


<!-- HASIL PER GAME (GAME LEDGER) -->
<section class="space-y-4">
  <div class="border-b border-white/10 pb-3">
    <h2 class="text-xl font-black font-display uppercase text-white tracking-wide">
      Hasil per game
    </h2>
  </div>

  <div class="bg-[#190614] border border-white/10 divide-y divide-white/5">
    <!-- Header Tabel -->
    <div class="grid grid-cols-3 items-center px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#a38a99] border-b border-white/10">
      <div class="text-left">{match.team1.name}</div>
      <div class="text-center">Game</div>
      <div class="text-right">{match.team2.name}</div>
    </div>

    <!-- Loop Daftar Game -->
    {#each match.games as g (g.number)}
      <div class="grid grid-cols-3 items-center px-6 py-4 text-sm font-bold">
        
        <!-- Result Tim 1 (Kiri: Ikon lalu Teks) -->
        <div class="flex items-center justify-start">
          <span class="inline-flex items-center gap-1.5 leading-none {g.team1Winner ? 'text-[#ffc700]' : 'text-[#a38a99]'}">
            {#if g.team1Winner}
              <Check class="w-4 h-4 shrink-0" />
              <span>Menang</span>
            {:else}
              <X class="w-4 h-4 shrink-0" />
              <span>Kalah</span>
            {/if}
          </span>
        </div>

        <!-- Nomor Game (Tengah) -->
        <div class="text-center font-mono text-[#a38a99] leading-none">
          {String(g.number).padStart(2, '0')}
        </div>

        <!-- Result Tim 2 (Kanan: Teks lalu Ikon agar simetris ke pinggir) -->
        <div class="flex items-center justify-end">
          <span class="inline-flex items-center gap-1.5 leading-none {g.team2Winner ? 'text-[#ffc700]' : 'text-[#a38a99]'}">
            {#if g.team2Winner}
              <span>Menang</span>
              <Check class="w-4 h-4 shrink-0" />
            {:else}
              <span>Kalah</span>
              <X class="w-4 h-4 shrink-0" />
            {/if}
          </span>
        </div>

      </div>
    {/each}
  </div>
</section>


    <!-- VIDEO PERTANDINGAN -->
    <!-- {#if data.videos && data.videos.length > 0}
      <section class="space-y-4">
        <div class="flex justify-between items-end border-b border-white/10 pb-3">
          <h2 class="text-xl font-black font-display uppercase text-white tracking-wide">
            Video pertandingan
          </h2>
          <a href="/videos" class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ffc700] hover:underline">
            Semua video <ArrowUpRight class="w-4 h-4" />
          </a>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each data.videos as video}
            <div class="bg-[#190614] border border-white/10 overflow-hidden group hover:border-white/30 transition">
              <a href={video.url} target="_blank" class="relative block aspect-video bg-black overflow-hidden">
                <img src={video.thumbnail} alt={video.title} class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <span class="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition">
                  <div class="w-10 h-10 rounded-full bg-[#ffc700] text-black flex items-center justify-center pl-0.5 shadow-lg">
                    <Play class="w-5 h-5 fill-current" />
                  </div>
                </span>
                <span class="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded font-bold">
                  {video.duration}
                </span>
              </a>

              <div class="p-3 space-y-1">
                <span class="text-[10px] font-bold text-[#a38a99] uppercase tracking-wider block">
                  {video.channel}
                </span>
                <h3 class="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-[#ffc700] transition">
                  <a href={video.url} target="_blank">{video.title}</a>
                </h3>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if} -->

  </main>
</div>