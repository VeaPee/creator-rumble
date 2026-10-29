<!-- +page.svelte -->
<script lang="ts">
  import { ArrowRight, ArrowUpRight } from 'lucide-svelte';
  import CreatorImage from '#lib/components/CreatorImage.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let creator = $derived(data.creator);
</script>

<svelte:head>
  <title>{creator.name} · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  <!-- Profile Hero Section -->
  <section class="relative bg-[#190614] border-b border-white/10 pt-10 pb-6 px-6 overflow-hidden">
    <!-- Team Watermark Text Background -->
    <span class="absolute right-6 bottom-0 font-display font-black text-8xl lg:text-[14rem] text-white/[0.03] select-none pointer-events-none leading-none">
      {creator.teamCode}
    </span>

    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
      <!-- Frame Foto Creator -->
      <div class="w-48 h-64 lg:w-56 lg:h-72 bg-[#0d020a] border-2 border-white/15 overflow-hidden shrink-0">
        <CreatorImage src={creator.image} alt={creator.name} class="w-full h-full object-cover" />
      </div>

      <!-- Identity Detail -->
      <div class="space-y-3 text-center md:text-left">
        <a href="/creators" class="text-xs font-bold uppercase tracking-wider text-[#a38a99] hover:text-white transition">
          ← Semua kreator
        </a>
        <h1 class="text-4xl lg:text-6xl font-black font-display text-white uppercase tracking-wide">
          {creator.name}
        </h1>
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-3">
          <span class="inline-block text-xs font-bold text-[#ffc700] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1">
            {creator.role}
          </span>
          
          <!-- Tombol Tautan Channel YouTube -->
          <a
            href={creator.youtubeUrl ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(creator.name + ' Creator Rumble by Ourastore')}`}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider bg-white/10 hover:bg-[#ffc700] hover:text-black border border-white/15 px-3.5 py-1 transition group"
          >
            <span>Channel</span>
            <span class="group-hover:translate-x-0.5 transition-transform">→</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Navigation Roster Satu Tim -->
    {#if creator.roster && creator.roster.length > 0}
      <nav class="max-w-7xl mx-auto flex flex-wrap items-center gap-4 mt-8 pt-4 border-t border-white/10 text-xs font-bold uppercase tracking-wider text-[#a38a99]">
        <span class="text-white">TEAM {creator.teamCode}</span>
        {#each creator.roster as member}
          <a
            href={`/creators/${member.slug}`}
            class="inline-flex items-center gap-1 hover:text-white transition {member.slug === creator.slug ? 'text-[#ffc700] underline' : ''}"
          >
            {member.name}
            <ArrowRight class="w-3 h-3" />
          </a>
        {/each}
      </nav>
    {/if}
  </section>

  <!-- Content Detail & Stats -->
  <main class="max-w-7xl mx-auto px-6 pt-10 space-y-12">
    <!-- Stat Cards -->
    {#if creator.stats}
      <section>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#190614] border border-white/10 p-6 text-center">
          <div>
            <dd class="text-3xl lg:text-4xl font-black font-display text-white">{creator.stats.seasons}</dd>
            <dt class="text-xs font-bold text-[#a38a99] uppercase tracking-wider mt-1">Musim</dt>
          </div>
          <div>
            <dd class="text-3xl lg:text-4xl font-black font-display text-[#ffc700]">{creator.stats.wins}</dd>
            <dt class="text-xs font-bold text-[#a38a99] uppercase tracking-wider mt-1">Seri menang</dt>
          </div>
          <div>
            <dd class="text-3xl lg:text-4xl font-black font-display text-white">{creator.stats.losses}</dd>
            <dt class="text-xs font-bold text-[#a38a99] uppercase tracking-wider mt-1">Seri kalah</dt>
          </div>
          <div>
            <dd class="text-3xl lg:text-4xl font-black font-display text-white">{creator.stats.titles}</dd>
            <dt class="text-xs font-bold text-[#a38a99] uppercase tracking-wider mt-1">Gelar juara</dt>
          </div>
        </div>
      </section>
    {/if}

    <!-- Pertandingan / Match History -->
    {#if creator.matches && creator.matches.length > 0}
      <section class="space-y-4">
        <h2 class="text-2xl lg:text-3xl font-black font-display uppercase text-white tracking-wide">
          Pertandingan
        </h2>

        <div class="grid md:grid-cols-2 gap-4">
          {#each creator.matches as match}
            <a
              href={`/matches/${match.id}`}
              class="bg-[#190614] border border-white/10 p-5 space-y-3 hover:border-white/30 transition block group"
            >
              <div class="flex justify-between items-center text-xs font-bold text-[#a38a99]">
                <span>{match.round}</span>
                <span class="text-xs bg-white/5 px-2 py-0.5 text-white">{match.status}</span>
              </div>

              <div class="space-y-2">
                <div class="flex justify-between items-center text-sm font-bold {match.team1.isWinner ? 'text-white' : 'text-[#a38a99]'}">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 bg-white/10 text-[10px] font-mono flex items-center justify-center">{match.team1.code}</span>
                    {match.team1.name}
                  </span>
                  <strong class="font-display text-lg">{match.team1.score}</strong>
                </div>

                <div class="flex justify-between items-center text-sm font-bold {match.team2.isWinner ? 'text-white' : 'text-[#a38a99]'}">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 bg-white/10 text-[10px] font-mono flex items-center justify-center">{match.team2.code}</span>
                    {match.team2.name}
                  </span>
                  <strong class="font-display text-lg">{match.team2.score}</strong>
                </div>
              </div>

              <div class="flex justify-between items-center pt-2 text-[11px] font-bold text-[#a38a99] border-t border-white/5">
                <span>{match.date}</span>
                <ArrowUpRight class="w-4 h-4 group-hover:text-[#ffc700] transition" />
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}
  </main>
</div>