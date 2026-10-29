<!-- src/routes/seasons/[slug]/teams/+page.svelte -->
<script lang="ts">
  import { ArrowRight } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Tim & roster · {data.season?.title ?? 'Musim'} · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  
  <!-- CONTEXT HEADER -->
  <header class="max-w-7xl mx-auto px-6 pt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#a38a99]">
    <a href="/seasons" class="hover:text-white transition">Musim</a>
    <span class="text-white/20">•</span>
    <a href={`/seasons/${data.season?.slug}`} class="hover:text-white transition">{data.season?.title}</a>
    <span class="text-white/20">•</span>
    <span class="text-[#ffc700]">{data.season?.status}</span>
  </header>

  <!-- SEASON SUB-NAVBAR -->
  <div class="border-b border-white/10 mt-4">
    <nav class="max-w-7xl mx-auto px-6 flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-[#a38a99]">
      <a href={`/seasons/${data.season?.slug}`} class="py-3 hover:text-white transition">Ringkasan</a>
      <a href={`/seasons/${data.season?.slug}/teams`} class="py-3 text-white border-b-2 border-[#ffc700]">Tim & roster</a>
      <a href={`/seasons/${data.season?.slug}/schedule`} class="py-3 hover:text-white transition">Jadwal & hasil</a>
      <a href={`/seasons/${data.season?.slug}/bracket`} class="py-3 hover:text-white transition">Bracket</a>
    </nav>
  </div>

  <!-- MAIN CONTENT -->
  <main id="content" class="max-w-7xl mx-auto px-6 py-10 space-y-8">
    <header class="space-y-1">
      <span class="text-xs font-extrabold uppercase tracking-widest text-[#ffc700] block">{data.season?.game}</span>
      <h1 class="text-4xl lg:text-6xl font-black font-display uppercase text-white tracking-wide">
        Tim & roster
      </h1>
      <p class="text-xs font-bold text-[#a38a99] uppercase tracking-wider">
        {data.season?.title} • {data.teamList?.length ?? 0} Tim
      </p>
    </header>

    <!-- ROSTER GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each data.teamList ?? [] as team (team.id)}
        <article class="bg-[#190614] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/20 transition">
          
          <!-- POSTER TIM -->
          <a 
            href={`/teams/${team.slug}?season=${data.season?.slug}`} 
            aria-label={team.name}
            class="block relative aspect-[16/9] bg-[#0d020a] overflow-hidden group border-b border-white/10"
          >
            <img 
              src={team.image} 
              alt={team.name} 
              class="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
              loading="lazy"
            />
          </a>

          <!-- BODY KARTU ROSTER -->
          <div class="p-6 flex-1 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <!-- Posisi / Rank -->
              <div class="text-[11px] font-bold uppercase tracking-wider text-[#a38a99]">
                Posisi {team.rankLabel}
              </div>

              <!-- Nama Tim -->
              <h2 class="text-2xl font-black font-display uppercase text-white tracking-wide">
                <a href={`/teams/${team.slug}?season=${data.season?.slug}`} class="hover:text-[#ffc700] transition">
                  {team.name}
                </a>
              </h2>

              <!-- DAFTAR PLAYER MENGGUNAKAN IMAGE-CARD -->
              <ol class="space-y-2 pt-2 border-t border-white/10">
                {#each team.roster as player (player.id)}
                  <li>
                    <a 
                      href={`/creators/${player.slug}`} 
                      class="flex items-center justify-between p-2 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition group rounded-sm"
                    >
                      <div class="flex items-center gap-3">
                        <!-- PORTRAIT MENGGUNAKAN IMAGE-CARD -->
                        <div class="w-10 h-10 shrink-0 bg-[#0d020a] border border-white/10 overflow-hidden relative flex items-center justify-center">
                          {#if player.imageCard || player.image}
                            <img 
                              src={player.imageCard ?? player.image} 
                              alt={player.name} 
                              class="w-full h-full object-cover group-hover:scale-105 transition" 
                              loading="lazy"
                            />
                          {:else}
                            <!-- FALLBACK AVATAR -->
                            <span class="text-xs font-black text-[#ffc700]">
                              {player.name.charAt(0)}
                            </span>
                          {/if}
                        </div>

                        <!-- NAMA & ROLE -->
                        <div class="flex flex-col">
                          <span class="text-xs font-extrabold uppercase text-white tracking-wider group-hover:text-[#ffc700] transition">
                            {player.name}
                          </span>
                          {#if player.role && player.role !== 'Kreator'}
                            <span class="text-[10px] font-bold uppercase text-[#a38a99]">
                              {player.role}
                            </span>
                          {/if}
                        </div>
                      </div>

                      <ArrowRight class="w-4 h-4 text-[#a38a99] group-hover:text-white group-hover:translate-x-0.5 transition" />
                    </a>
                  </li>
                {/each}
              </ol>
            </div>
          </div>

        </article>
      {/each}
    </div>
  </main>
</div>