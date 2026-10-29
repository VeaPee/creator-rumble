<!-- src/routes/teams/[slug]/+page.svelte -->
<script lang="ts">
  import { Trophy, ArrowUpRight, ArrowRight, Play } from 'lucide-svelte';
  import CreatorImage from '#lib/components/CreatorImage.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let team = $derived(data.team);
</script>

<svelte:head>
  <title>{team.name} · Season 1 · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  
  <!-- PROFILE HERO SECTION -->
  <section class="relative bg-[#190614] border-b border-white/10 pt-10 pb-8 px-6 overflow-hidden">
    <!-- Watermark Kode Tim di Background -->
    <span class="absolute right-6 bottom-0 font-display font-black text-8xl lg:text-[14rem] text-white/[0.03] select-none pointer-events-none leading-none">
      {team.code}
    </span>

    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
      <!-- Frame Poster Tim -->
      <div class="w-48 h-60 lg:w-56 lg:h-72 bg-[#0d020a] border border-white/15 overflow-hidden shrink-0 shadow-2xl">
        <img src={team.image} alt={team.name} class="w-full h-full object-cover" />
      </div>

      <!-- Detail Identitas Tim -->
      <div class="space-y-3 text-center md:text-left">
        <a href="/teams" class="text-xs font-bold uppercase tracking-wider text-[#a38a99] hover:text-white transition block">
          ← Semua tim
        </a>
        
        <span class="inline-block text-xs font-bold text-[#ffc700] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1">
          Season 1
        </span>

        <h1 class="text-4xl lg:text-6xl font-black font-display text-white uppercase tracking-wide">
          {team.name}
        </h1>

        <div class="flex items-center justify-center md:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-[#a38a99] pt-1">
          <Trophy class="w-4 h-4 text-[#ffc700]" />
          <span>Posisi {team.position}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- MAIN CONTENT CONTAINER -->
  <main class="max-w-7xl mx-auto px-6 pt-12 space-y-16">

    <!-- SEKSI ROSTER ANGGOTA TIM -->
    <section class="space-y-6">
      <div class="border-b border-white/10 pb-4">
        <h2 class="text-2xl lg:text-3xl font-black font-display uppercase text-white tracking-wide">
          Roster
        </h2>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {#each team.roster as member}
          <a
            href={`/creators/${member.slug}`}
            class="bg-[#190614] border border-white/10 p-3 group hover:border-[#ffc700]/50 transition flex flex-col items-center text-center space-y-3"
          >
            <div class="w-full aspect-square bg-[#0d020a] overflow-hidden border border-white/10 relative">
              <CreatorImage 
                src={member.image} 
                alt={member.name} 
                class="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
            </div>

            <div class="space-y-0.5">
              <small class="text-[10px] font-bold text-[#ffc700] uppercase tracking-wider block">
                {member.role}
              </small>
              <h3 class="text-sm font-black font-display text-white uppercase tracking-wide group-hover:text-[#ffc700] transition">
                {member.name}
              </h3>
            </div>
          </a>
        {/each}
      </div>
    </section>

    <!-- SEKSI RIWAYAT PERTANDINGAN -->
    {#if team.matches && team.matches.length > 0}
      <section class="space-y-6">
        <div class="flex justify-between items-end border-b border-white/10 pb-4">
          <h2 class="text-2xl lg:text-3xl font-black font-display uppercase text-white tracking-wide">
            Pertandingan
          </h2>
          <a href="/schedule" class="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#ffc700] hover:underline">
            Bracket <ArrowRight class="w-4 h-4" />
          </a>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          {#each team.matches as match}
            <a
              href={`/matches/${match.id}`}
              class="bg-[#190614] border border-white/10 p-5 space-y-3 hover:border-white/30 transition block group"
            >
              <div class="flex justify-between items-center text-xs font-bold text-[#a38a99]">
                <span>{match.round}</span>
                <span class="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 text-white uppercase tracking-wider">
                  {match.status}
                </span>
              </div>

              <!-- Baris Tim 1 -->
              <div class="space-y-2">
                <div class="flex justify-between items-center text-sm font-bold {match.team1.isWinner ? 'text-white' : 'text-[#a38a99]'}">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 bg-white/10 text-[10px] font-mono flex items-center justify-center font-bold">{match.team1.code}</span>
                    {match.team1.name}
                  </span>
                  <strong class="font-display text-lg">{match.team1.score}</strong>
                </div>

                <!-- Baris Tim 2 -->
                <div class="flex justify-between items-center text-sm font-bold {match.team2.isWinner ? 'text-white' : 'text-[#a38a99]'}">
                  <span class="flex items-center gap-2">
                    <span class="w-6 h-6 bg-white/10 text-[10px] font-mono flex items-center justify-center font-bold">{match.team2.code}</span>
                    {match.team2.name}
                  </span>
                  <strong class="font-display text-lg">{match.team2.score}</strong>
                </div>
              </div>

              <div class="flex justify-between items-center pt-2 text-[11px] font-bold text-[#a38a99] border-t border-white/5">
                <span>{match.scheduledAt ?? '20 Okt, 19.00 WIB'}</span>
                <ArrowUpRight class="w-4 h-4 group-hover:text-[#ffc700] transition" />
              </div>
            </a>
          {/each}
        </div>
      </section>
    {/if}

  </main>
</div>