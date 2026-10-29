<!-- src/routes/seasons/[slug]/schedule/+page.svelte -->
<script lang="ts">
  import type { PageData } from './$types';
  import MatchList from '#lib/components/MatchList.svelte';

  let { data }: { data: PageData } = $props();
  let season = $derived(data.season);
</script>

<svelte:head>
  <title>Jadwal & hasil · {season.title} · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  
  <!-- CONTEXT HEADER -->
  <header class="max-w-7xl mx-auto px-6 pt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#a38a99]">
    <a href="/seasons" class="hover:text-white transition">Musim</a>
    <span class="text-white/20">•</span>
    <span class="text-[#ffc700]">{season.status}</span>
  </header>

  <!-- SEASON SUB-NAVBAR -->
  <div class="border-b border-white/10 mt-4">
    <nav class="max-w-7xl mx-auto px-6 flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-[#a38a99]">
      <a href={`/seasons/${season.slug}`} class="py-3 hover:text-white transition">Ringkasan</a>
      <a href={`/seasons/${season.slug}/teams`} class="py-3 hover:text-white transition">Tim & roster</a>
      <a href={`/seasons/${season.slug}/schedule`} class="py-3 text-white border-b-2 border-[#ffc700]">Jadwal & hasil</a>
      <a href={`/seasons/${season.slug}/bracket`} class="py-3 hover:text-white transition">Bracket</a>
    </nav>
  </div>

  <!-- MAIN CONTENT -->
  <main id="content" class="max-w-7xl mx-auto px-6 py-10 space-y-8">
    <header class="space-y-1">
      <span class="text-xs font-extrabold uppercase tracking-widest text-[#ffc700] block">{season.game}</span>
      <h1 class="text-4xl lg:text-6xl font-black font-display uppercase text-white tracking-wide">
        Jadwal & hasil
      </h1>
      <p class="text-xs font-bold text-[#a38a99] uppercase tracking-wider">
        {season.title} • {season.dateLabel}
      </p>
    </header>

    <!-- KONTEN DAFTAR PERTANDINGAN (REUSED MATCHLIST) -->
    <MatchList matches={season.matches} />
  </main>
</div>