<!-- src/routes/schedule/+page.svelte -->
<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // State filter
  let selectedSeason = $state('creator-rumble-season-1');
  let selectedStatus = $state<'all' | 'results' | 'upcoming'>('all');
  let selectedTeam = $state('all');

  const isDone = (status: string) => status === 'Selesai';

  let filteredMatches = $derived(
    data.matches.filter((m) => {
      if (selectedStatus === 'results' && !isDone(m.status)) return false;
      if (selectedStatus === 'upcoming' && isDone(m.status)) return false;
      if (selectedTeam !== 'all' && m.team1.code !== selectedTeam && m.team2.code !== selectedTeam) return false;
      return true;
    })
  );

  // Kelompokkan per tanggal
  let groups = $derived.by(() => {
    const map = new Map<string, typeof data.matches>();
    for (const m of filteredMatches) {
      const list = map.get(m.dateLabel);
      if (list) list.push(m);
      else map.set(m.dateLabel, [m]);
    }
    return [...map];
  });

  let doneCount = $derived(data.matches.filter((m) => isDone(m.status)).length);
  let tabs = $derived([
    { value: 'all' as const, label: 'Semua', count: data.matches.length },
    { value: 'results' as const, label: 'Hasil', count: doneCount },
    { value: 'upcoming' as const, label: 'Berikutnya', count: data.matches.length - doneCount }
  ]);
</script>

<svelte:head>
  <title>Jadwal & hasil · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  <main id="content" class="max-w-7xl mx-auto px-6 py-10 space-y-8">

    <!-- HEADER -->
    <section class="space-y-2">
      <span class="flex items-center gap-3 font-display text-sm font-extrabold uppercase tracking-[0.3em] text-[#ffc700]">
        <span class="h-0.5 w-8 bg-current"></span> Season 1
      </span>
      <h1 class="text-4xl lg:text-6xl font-black font-display uppercase text-white tracking-wide">
        Jadwal <span class="text-[#ffc700]">&amp;</span> hasil
      </h1>
    </section>

    <!-- FILTER BAR -->
    <div class="flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4">
      <div class="inline-flex border border-white/10 bg-[#190614] p-1" role="group" aria-label="Status">
        {#each tabs as tab (tab.value)}
          <button
            type="button"
            onclick={() => (selectedStatus = tab.value)}
            aria-pressed={selectedStatus === tab.value}
            class="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider transition cursor-pointer
              {selectedStatus === tab.value ? 'bg-[#ffc700] text-black' : 'text-[#a38a99] hover:text-white'}"
          >
            {tab.label}
            <span class="font-mono text-[10px] {selectedStatus === tab.value ? 'text-black/60' : 'text-white/40'}">{tab.count}</span>
          </button>
        {/each}
      </div>

      <div class="flex items-center gap-3">
        <label for="filter-team" class="sr-only">Tim</label>
        <select
          id="filter-team"
          bind:value={selectedTeam}
          class="bg-[#190614] border border-white/10 text-xs font-semibold px-3 py-2.5 text-white focus:outline-none focus:border-[#ffc700] transition"
        >
          <option value="all">Semua tim</option>
          {#each data.teams as t}
            <option value={t.code}>{t.name}</option>
          {/each}
        </select>

        <label for="season-select" class="sr-only">Musim</label>
        <select
          id="season-select"
          bind:value={selectedSeason}
          class="bg-[#190614] border border-white/10 text-xs font-semibold px-3 py-2.5 text-white focus:outline-none focus:border-[#ffc700] transition"
        >
          <option value="creator-rumble-season-1">Season 1</option>
        </select>

        <span class="font-mono text-xs font-bold tracking-wider text-[#a38a99]">WIB</span>
      </div>
    </div>

    <!-- DAFTAR PERTANDINGAN -->
    <div class="space-y-8">
      {#each groups as [dateLabel, matches] (dateLabel)}
        <section class="space-y-3">
          <h2 class="flex items-center justify-between border-b border-white/10 pb-2 text-sm font-bold uppercase tracking-wider text-[#ffc700]">
            {dateLabel}
            <span class="font-mono text-xs text-[#a38a99]">{matches.length} match</span>
          </h2>

          <div class="space-y-2">
            {#each matches as match (match.id)}
              {@const done = isDone(match.status)}
              <a
                href={`/matches/${match.id}`}
                class="group grid grid-cols-[80px_1fr_120px] md:grid-cols-[100px_1fr_200px_100px] items-center gap-4 bg-[#190614] border border-white/10 p-4 hover:border-white/30 transition"
              >
                <!-- Waktu Pertandingan -->
                <div class="font-display text-lg font-bold text-white">
                  {match.scheduledAt ?? '—'}
                </div>

                <!-- Bagian Tim & Skor (Susunan Gambar Pertama) -->
                <div class="space-y-2">
                  <!-- Baris Tim 1 -->
                  <div class="flex items-center justify-between pr-4 {done && !match.team1.isWinner ? 'opacity-40' : 'opacity-100'}">
                    <div class="flex items-center gap-3">
                      <span class="w-7 h-7 bg-white/10 text-[10px] font-mono font-black text-white/80 flex items-center justify-center shrink-0 border border-white/10">
                        {match.team1.code}
                      </span>
                      <span class="text-xs md:text-sm font-bold tracking-wider text-white">
                        {match.team1.name}
                      </span>
                    </div>
                    <strong class="font-display text-lg font-black {match.team1.isWinner ? 'text-[#ffc700]' : 'text-white/60'}">
                      {match.team1.score ?? '0'}
                    </strong>
                  </div>

                  <!-- Baris Tim 2 -->
                  <div class="flex items-center justify-between pr-4 {done && !match.team2.isWinner ? 'opacity-40' : 'opacity-100'}">
                    <div class="flex items-center gap-3">
                      <span class="w-7 h-7 bg-white/10 text-[10px] font-mono font-black text-white/80 flex items-center justify-center shrink-0 border border-white/10">
                        {match.team2.code}
                      </span>
                      <span class="text-xs md:text-sm font-bold tracking-wider text-white">
                        {match.team2.name}
                      </span>
                    </div>
                    <strong class="font-display text-lg font-black {match.team2.isWinner ? 'text-[#ffc700]' : 'text-white/60'}">
                      {match.team2.score ?? '0'}
                    </strong>
                  </div>
                </div>

                <!-- Informasi Ronde & Format -->
                <div class="hidden md:flex flex-col justify-center text-xs space-y-0.5 text-[#a38a99]">
                  <span class="font-bold text-white/90">{match.round}</span>
                  <small class="font-mono text-[10px] text-[#a38a99]">{match.format}</small>
                </div>

                <!-- Status & Panah Link -->
                <div class="flex items-center justify-end gap-3 text-right">
                  <span class="text-xs font-medium text-[#a38a99] group-hover:text-white transition">
                    {match.status}
                  </span>
                  <ArrowUpRight class="w-4 h-4 text-[#a38a99] group-hover:text-[#ffc700] transition" />
                </div>
              </a>
            {/each}
          </div>
        </section>
      {:else}
        <div class="border border-white/10 bg-[#190614] p-12 text-center">
          <p class="text-sm font-bold text-white">Tidak ada pertandingan yang cocok dengan filter.</p>
        </div>
      {/each}
    </div>

  </main>
</div>