<!-- src/routes/channels/+page.svelte -->
<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';
  import CreatorImage from '#lib/components/CreatorImage.svelte';
  import type { PageData } from './$types';

  // Menerima data kreator dan liveCount dari +page.server.ts
  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Semua Channel Kreator · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  <main id="content" class="max-w-7xl mx-auto px-6 py-10 space-y-12">
    
    <!-- HEADER & WIDGET ON AIR -->
    <header class="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div class="space-y-2">
        <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ffc700]">
          <span>Creator Rumble</span>
          <span>·</span>
          <span class="text-[#a38a99]">Direktori Channel</span>
        </div>
        <h1 class="text-4xl lg:text-6xl font-black font-display uppercase text-white tracking-wide">
          Semua Channel
        </h1>
        <p class="text-xs text-[#a38a99] font-semibold">
          Daftar lengkap seluruh kanal YouTube kreator partisipan Creator Rumble. Dukung dan tonton konten mereka!
        </p>
      </div>

      <!-- Widget Indikator ON AIR Real-time -->
      <div class="flex items-center bg-[#190614] border border-white/10 px-3 py-2 shrink-0 self-start md:self-auto">
        <div class="flex items-center gap-2 pr-3 border-r border-white/10 text-xs font-black font-mono tracking-widest text-white">
          <span class="w-2.5 h-2.5 rounded-full {data.liveCount > 0 ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}"></span>
          <span>ON AIR</span>
        </div>
        <div class="pl-3 font-mono font-black text-base text-[#ffc700] min-w-[32px] text-center">
          {String(data.liveCount).padStart(2, '0')}
        </div>
      </div>
    </header>

    <!-- GRID CHANNEL -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each data.creators as creator (creator.slug)}
        <a 
          href={creator.youtubeUrl ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(creator.name + ' Creator Rumble by Ourastore')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          class="bg-[#190614] border border-white/10 p-5 flex flex-col justify-between space-y-6 group hover:border-[#ffc700] hover:bg-[#1f081a] transition duration-300 relative overflow-hidden"
        >
          <!-- Badge LIVE jika kreator sedang siaran langsung -->
          {#if creator.isLive}
            <span class="absolute top-3 right-3 bg-red-600 text-white text-[9px] font-extrabold px-2 py-0.5 uppercase tracking-widest animate-pulse z-10">
              LIVE
            </span>
          {/if}

          <!-- Bagian Atas: Foto & Info Utama -->
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 shrink-0 bg-[#0d020a] border border-white/15 overflow-hidden relative flex items-center justify-center">
              <CreatorImage 
                src={creator.imageCard ?? creator.image} 
                alt={creator.name} 
                class="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
              />
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#ffc700]">
                Tim {creator.teamCode}
              </span>
              <h2 class="text-base font-black uppercase text-white tracking-wider truncate group-hover:text-[#ffc700] transition">
                {creator.name}
              </h2>
              <span class="text-xs font-semibold text-[#a38a99] uppercase tracking-wider truncate">
                {creator.role}
              </span>
            </div>
          </div>

          <!-- Bagian Bawah: Tombol Aksi Channel -->
          <div class="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#a38a99] group-hover:text-white transition">
            <span class="inline-flex items-center gap-1.5">
              <!-- Ikon Standar YouTube SVG -->
              <svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>YouTube</span>
            </span>
            <span class="inline-flex items-center gap-1 text-[#ffc700] group-hover:translate-x-1 transition-transform">
              Kunjungi <ArrowUpRight class="w-4 h-4" />
            </span>
          </div>
        </a>
      {/each}
    </div>

  </main>
</div>