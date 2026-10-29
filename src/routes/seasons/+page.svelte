<!-- src/routes/seasons/+page.svelte -->
<script lang="ts">
  import { Trophy, ArrowUpRight } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Semua musim · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  <main id="content" class="max-w-7xl mx-auto px-6 py-10 space-y-12">
    
    <!-- HEADER -->
    <header class="border-b border-white/10 pb-6">
      <h1 class="text-4xl lg:text-6xl font-black font-display uppercase text-white tracking-wide">
        Semua musim
      </h1>
    </header>

    <!-- LIST MUSIM -->
    <div class="space-y-8">
      {#each data.seasons as season (season.id)}
        <article class="bg-[#190614] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-start gap-8 lg:gap-12 hover:border-white/20 transition">
          
          <!-- ARTWORK MUSIM (Diperkecil & dikunci ukurannya secara presisi) -->
          <a
            href={`/seasons/${season.slug}`}
            aria-label={`Buka ${season.title}`}
            class="w-full sm:w-[300px] md:w-[320px] max-w-[320px] shrink-0 relative aspect-[4/5] bg-[#0d020a] overflow-hidden group block border border-white/10"
          >
            <img
              src={season.artwork}
              alt={`Artwork ${season.title}`}
              class="w-full h-full object-cover group-hover:scale-[1.03] transition duration-500"
            />
          </a>

          <!-- DETAIL MUSIM (Sebelah Kanan) -->
          <div class="flex-1 flex flex-col justify-between space-y-6 py-1 w-full">
            
            <div class="space-y-6">
              <!-- Meta Badge -->
              <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#a38a99]">
                <span >{season.game}</span>
                <span class="text-white/20">|</span>
                <span class={season.status === 'Selesai' ? 'text-[#a38a99]' : 'text-[#ffc700]'}>{season.status}</span>
              </div>

              <!-- Judul & Tanggal -->
              <div class="space-y-2">
                <h2 class="text-4xl lg:text-6xl font-black font-display uppercase text-white tracking-wide">
                  {season.title}
                </h2>
                <p class="text-xs font-bold text-[#a38a99] uppercase tracking-wider">
                  {season.dateLabel}
                </p>
              </div>

              <div class="border-b border-white/10 pt-2"></div>

              <!-- Info Juara -->
              {#if season.winner}
                <div class="flex items-start gap-3">
                  <Trophy class="w-6 h-6 text-[#ffc700] shrink-0 mt-1" />
                  <div>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-[#a38a99] block">Juara</span>
                    <h3 class="text-xl lg:text-2xl font-black font-display text-white uppercase tracking-wider">
                      {season.winner.name}
                    </h3>
                  </div>
                </div>
              {/if}
            </div>

            <!-- ACTION BUTTONS -->
            <div class="space-y-6 pt-2">
              <div>
                <a 
                  href={`/seasons/${season.slug}`} 
                  class="inline-flex items-center justify-center gap-2 bg-[#ffc700] text-black font-extrabold uppercase tracking-wider text-xs px-6 py-3 hover:bg-[#ffe066] transition"
                >
                  Buka season <ArrowUpRight class="w-4 h-4" />
                </a>
              </div>

              <div class="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-[#a38a99]">
                <a href={`/seasons/${season.slug}/bracket`} class="hover:text-white transition inline-flex items-center gap-1">
                  Bracket <ArrowUpRight class="w-3.5 h-3.5" />
                </a>
                <a href={`/schedule?season=${season.slug}`} class="hover:text-white transition inline-flex items-center gap-1">
                  Pertandingan <ArrowUpRight class="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </article>
      {/each}
    </div>

  </main>
</div>