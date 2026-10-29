<!-- src/routes/creators/+page.svelte -->
<script lang="ts">
  import { Search } from 'lucide-svelte';
  import CaptainSpotlight from '#lib/components/CaptainSpotlight.svelte';
  import CreatorImage from '#lib/components/CreatorImage.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  // State pencarian
  let searchQuery = $state('');

  // Filter daftar kreator berdasarkan nama atau kode tim secara otomatis
  let filteredCreators = $derived(
    data.allCreators.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      return c.name.toLowerCase().includes(q) || c.teamCode.toLowerCase().includes(q);
    })
  );
</script>

<svelte:head>
  <title>Kreator · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  <main id="content" class="max-w-7xl mx-auto px-6 py-8 space-y-16">
    
    <!-- 1. SEKSI SPOTLIGHT KAPTEN (BAGIAN ATAS) -->
    <section class="space-y-6">
      <div class="border-b border-white/10 pb-4">
        <h1 class="text-3xl lg:text-5xl font-black font-display uppercase text-white tracking-wide">
          Sorotan Kapten
        </h1>
      </div>

      <!-- Memanggil Card Spotlight Reusable -->
      <CaptainSpotlight captains={data.captains} />
    </section>

    <!-- 2. SEKSI SEMUA KREATOR & FITUR SEARCH -->
    <section class="space-y-6 pt-8 border-t border-white/10">
      
      <!-- Header Seksi & Search Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-2xl lg:text-4xl font-black font-display uppercase text-white tracking-wide">
            Semua Kreator
          </h2>
          <p class="text-xs text-[#a38a99] font-medium mt-1">
            Menampilkan {filteredCreators.length} dari {data.allCreators.length} kreator
          </p>
        </div>

        <!-- Input Search Bar -->
        <div class="relative w-full sm:w-80">
          <Search class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a38a99]" />
          <input
            type="search"
            bind:value={searchQuery}
            placeholder="Cari kreator atau tim (cth: Mikoto, AE)..."
            class="w-full bg-[#190614] border border-white/10 text-xs pl-10 pr-4 py-3 text-white placeholder-[#a38a99] focus:outline-none focus:border-[#ffc700] transition"
          />
        </div>
      </div>

      <!-- Grid Daftar Kreator -->
      {#if filteredCreators.length > 0}
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {#each filteredCreators as creator (creator.id)}
            <a
              href={`/creators/${creator.slug}`}
              class="bg-[#190614] border border-white/10 p-3 group hover:border-[#ffc700]/50 transition flex flex-col items-center text-center space-y-3"
            >
              <!-- Frame Foto Kreator -->
              <div class="w-full aspect-square bg-[#0d020a] overflow-hidden border border-white/10 relative">
                <CreatorImage 
                  src={creator.image} 
                  alt={creator.name} 
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                />
              </div>

              <!-- Metadata ID -->
              <div class="space-y-0.5">
                <h3 class="text-sm font-black font-display text-white uppercase tracking-wide group-hover:text-[#ffc700] transition">
                  {creator.name}
                </h3>
                <span class="text-[10px] font-bold text-[#ffc700] uppercase tracking-wider block">
                  TEAM {creator.teamCode} · <span class="text-[#a38a99]">{creator.role}</span>
                </span>
              </div>
            </a>
          {/each}
        </div>
      {:else}
        <!-- State jika pencarian tidak ditemukan -->
        <div class="bg-[#190614] border border-white/10 p-12 text-center text-[#a38a99] space-y-2">
          <p class="text-sm font-bold text-white">Tidak ada kreator yang ditemukan</p>
          <p class="text-xs">Coba kata kunci lain atau periksa ejaan nama kreator/tim.</p>
        </div>
      {/if}

    </section>

  </main>
</div>