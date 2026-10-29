<!-- src/routes/teams/+page.svelte -->
<script lang="ts">
  import { Search } from 'lucide-svelte';
  import TeamGrid from '#lib/components/TeamGrid.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let searchQuery = $state('');

  let filteredTeams = $derived(
    data.teams.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      return t.name.toLowerCase().includes(q) || t.code?.toLowerCase().includes(q);
    })
  );
</script>

<svelte:head>
  <title>Tim · Creator Rumble</title>
</svelte:head>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">
  <main id="content" class="max-w-7xl mx-auto px-6 py-10 space-y-10">
    
    <section class="space-y-6">
      <h1 class="text-5xl lg:text-7xl font-black font-display uppercase text-white tracking-wide">
        Tim
      </h1>

      <div class="space-y-2">
        <label for="search-team" class="text-xs font-bold uppercase tracking-widest text-[#a38a99] block">
          Cari tim
        </label>
        <div class="relative max-w-xl">
          <Search class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#a38a99]" />
          <input
            id="search-team"
            type="search"
            bind:value={searchQuery}
            placeholder="Ketik nama tim..."
            class="w-full bg-[#190614] border border-white/10 text-sm pl-11 pr-4 py-3 text-white placeholder-[#a38a99]/60 focus:outline-none focus:border-[#ffc700] transition"
          />
        </div>
      </div>
    </section>

    {#if filteredTeams.length > 0}
      <!-- Memanggil Komponen Reusable TeamGrid -->
      <TeamGrid teams={filteredTeams} />
    {:else}
      <div class="bg-[#190614] border border-white/10 p-12 text-center text-[#a38a99] space-y-2">
        <p class="text-base font-bold text-white">Tim tidak ditemukan</p>
        <p class="text-xs">Tidak ada tim yang cocok dengan "{searchQuery}".</p>
      </div>
    {/if}

  </main>
</div>