<!-- src/routes/seasons/[slug]/+page.svelte -->
<script lang="ts">
  import { CalendarDays, ArrowRight } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let season = $derived(data.season);
</script>

<svelte:head>
  <title>{season.title} · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  
  <!-- CONTEXT HEADER -->
  <header class="max-w-7xl mx-auto px-6 pt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#a38a99]">
    <a href="/seasons" class="hover:text-white transition">Musim</a>
    <span class="text-white/20">•</span>
    <span class="text-[#ffc700]">{season.status}</span>
  </header>

  <!-- SEASON SUB-NAV (BAR NAVIGASI KHUSUS MUSIM) -->
  <div class="border-b border-white/10 mt-4">
    <nav class="max-w-7xl mx-auto px-6 flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-[#a38a99]">
      <a href={`/seasons/${season.slug}`} class="py-3 text-white border-b-2 border-[#ffc700]">Ringkasan</a>
      <a href={`/seasons/${season.slug}/teams`} class="py-3 hover:text-white transition">Tim & roster</a>
      <a href={`/seasons/${season.slug}/schedule`} class="py-3 hover:text-white transition">Jadwal & hasil</a>
      <a href={`/seasons/${season.slug}/bracket`} class="py-3 hover:text-white transition">Bracket</a>
    </nav>
  </div>

  <!-- MAIN CONTENT CONTAINER -->
  <main id="content" class="max-w-7xl mx-auto px-6 py-10">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- SISI KIRI (OVERVIEW, HASIL, KLASEMEN) -->
      <div class="lg:col-span-8 space-y-12">
        
        <!-- HEAD SECTION -->
        <section class="space-y-3">
          <span class="text-xs font-extrabold uppercase tracking-widest text-[#ffc700] block">{season.game}</span>
          <h1 class="text-5xl lg:text-7xl font-black font-display uppercase text-white tracking-wide">
            {season.title}
          </h1>
          <div class="flex items-center gap-2 text-sm font-bold text-[#a38a99]">
            <CalendarDays class="w-4 h-4 text-[#ffc700]" />
            <span>{season.dateLabel}</span>
          </div>
        </section>

        <!-- HASIL PERTANDINGAN SOROTAN -->
        <section class="space-y-6">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 class="text-2xl font-black font-display uppercase text-white tracking-wide">Hasil pertandingan</h2>
            <a href={`/seasons/${season.slug}/schedule`} class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ffc700] hover:underline">
              Semua hasil <ArrowRight class="w-4 h-4" />
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {#each season.matches.slice(-6).reverse() as match (match.id)}
              <a href={`/matches/${match.id}`} class="bg-[#190614] border border-white/10 p-4 hover:border-white/20 transition space-y-3 block">
                <div class="flex items-center justify-between text-[11px] font-bold text-[#a38a99]">
                  <span>{match.round}</span>
                  <span class="text-[#ffc700]">{match.status}</span>
                </div>

                <div class="space-y-2">
                  <div class={`flex items-center justify-between text-sm font-extrabold uppercase ${match.team1.isWinner ? 'text-white' : 'text-[#a38a99]'}`}>
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold">{match.team1.code}</span>
                      <span>{match.team1.name}</span>
                    </div>
                    <span>{match.team1.score}</span>
                  </div>

                  <div class={`flex items-center justify-between text-sm font-extrabold uppercase ${match.team2.isWinner ? 'text-white' : 'text-[#a38a99]'}`}>
                    <div class="flex items-center gap-2">
                      <span class="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold">{match.team2.code}</span>
                      <span>{match.team2.name}</span>
                    </div>
                    <span>{match.team2.score}</span>
                  </div>
                </div>
              </a>
            {/each}
          </div>
        </section>

        <!-- KLASEMEN AKHIR -->
        <section class="space-y-6">
          <div class="border-b border-white/10 pb-3">
            <h2 class="text-2xl font-black font-display uppercase text-white tracking-wide">Klasemen akhir</h2>
          </div>

          <div class="overflow-x-auto bg-[#190614] border border-white/10">
            <table class="w-full text-left text-sm border-collapse">
              <thead>
                <tr class="border-b border-white/10 text-[11px] font-bold uppercase tracking-wider text-[#a38a99]">
                  <th class="p-4 w-16">Posisi</th>
                  <th class="p-4">Tim</th>
                  <th class="p-4">Kapten</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5 font-semibold">
                {#each data.standings as item}
                  <tr class={item.isChampion ? 'bg-white/5' : ''}>
                    <td class="p-4 text-center font-bold text-[#a38a99]">{item.rank}</td>
                    <td class="p-4">
                      <a href={`/teams/${item.team.slug}?season=${season.slug}`} class="inline-flex items-center gap-3 font-extrabold uppercase text-white hover:text-[#ffc700] transition">
                        <span class="w-8 h-8 rounded bg-white/10 flex items-center justify-center text-xs font-black">{item.team.code}</span>
                        <span>{item.team.name}</span>
                      </a>
                    </td>
                    <td class="p-4 text-xs font-bold text-[#a38a99] uppercase">{item.captain}</td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </section>

      </div>

      <!-- SISI KANAN (FORMAT & ASIDE FACTS) -->
      <aside class="lg:col-span-4 space-y-6">
        <div class="bg-[#190614] border border-white/10 p-6 space-y-6">
          <h2 class="text-xl font-black font-display uppercase text-white tracking-wide border-b border-white/10 pb-3">
            Format pertandingan
          </h2>

          <dl class="space-y-4 text-sm">
            <div class="flex justify-between border-b border-white/5 pb-2">
              <dt class="text-[#a38a99] font-bold">Bracket</dt>
              <dd class="font-extrabold text-white">Double elimination</dd>
            </div>
            <div class="flex justify-between border-b border-white/5 pb-2">
              <dt class="text-[#a38a99] font-bold">Seri</dt>
              <dd class="font-extrabold text-white">BO1</dd>
            </div>
            <div class="flex justify-between border-b border-white/5 pb-2">
              <dt class="text-[#a38a99] font-bold">Grand Final</dt>
              <dd class="font-extrabold text-white">BO3</dd>
            </div>
          </dl>

          <a 
            href={`/seasons/${season.slug}/bracket`} 
            class="inline-flex items-center justify-center gap-2 bg-[#ffc700] text-black font-extrabold uppercase tracking-wider text-xs w-full py-3 hover:bg-[#ffe066] transition"
          >
            Lihat bracket <ArrowRight class="w-4 h-4" />
          </a>
        </div>
      </aside>

    </div>
  </main>
</div>