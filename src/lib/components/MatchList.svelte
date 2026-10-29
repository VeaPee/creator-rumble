<!-- src/lib/components/MatchList.svelte -->
<script lang="ts">
  import type { Match } from '#lib/types';

  let { matches }: { matches: Match[] } = $props();
  let selectedRound = $state('semua');

  // Ambil daftar ronde unik untuk filter
  let rounds = $derived(['semua', ...new Set(matches.map((m) => m.round))]);

  // Filter pertandingan berdasarkan ronde yang dipilih
  let filteredMatches = $derived(
    selectedRound === 'semua'
      ? matches
      : matches.filter((m) => m.round === selectedRound)
  );
</script>

<div class="space-y-6">
  <!-- FILTER RONDE -->
  <div class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
    {#each rounds as round}
      <button
        onclick={() => (selectedRound = round)}
        class={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition whitespace-nowrap ${
          selectedRound === round
            ? 'bg-[#ffc700] text-black'
            : 'bg-white/5 text-[#a38a99] hover:text-white hover:bg-white/10'
        }`}
      >
        {round}
      </button>
    {/each}
  </div>

  <!-- LIST KARTU PERTANDINGAN -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each filteredMatches as match (match.id)}
      <a
        href={`/matches/${match.id}`}
        class="bg-[#190614] border border-white/10 p-5 hover:border-white/20 transition space-y-4 block"
      >
        <div class="flex items-center justify-between text-xs font-bold text-[#a38a99]">
          <span>{match.round}</span>
          <div class="flex items-center gap-2">
            {#if match.scheduledAt}
              <span>{match.scheduledAt}</span>
              <span>•</span>
            {/if}
            <span class="text-[#ffc700]">{match.status}</span>
          </div>
        </div>

        <div class="space-y-2.5">
          <!-- TEAM 1 -->
          <div
            class={`flex items-center justify-between text-base font-extrabold uppercase ${
              match.team1.isWinner ? 'text-white' : 'text-[#a38a99]'
            }`}
          >
            <div class="flex items-center gap-3">
              <span
                class="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-xs font-black"
                >{match.team1.code}</span
              >
              <span>{match.team1.name}</span>
            </div>
            <span class="text-xl font-display">{match.team1.score}</span>
          </div>

          <!-- TEAM 2 -->
          <div
            class={`flex items-center justify-between text-base font-extrabold uppercase ${
              match.team2.isWinner ? 'text-white' : 'text-[#a38a99]'
            }`}
          >
            <div class="flex items-center gap-3">
              <span
                class="w-7 h-7 rounded bg-white/10 flex items-center justify-center text-xs font-black"
                >{match.team2.code}</span
              >
              <span>{match.team2.name}</span>
            </div>
            <span class="text-xl font-display">{match.team2.score}</span>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>