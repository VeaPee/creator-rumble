<!-- src/lib/components/TeamGrid.svelte -->
<script lang="ts">
  import { ArrowUpRight } from 'lucide-svelte';

  export interface TeamItem {
    code?: string;
    slug?: string;
    name: string;
    image: string;
  }

  let { teams = [] }: { teams: TeamItem[] } = $props();
</script>

<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
  {#each teams as t}
    <!-- Memastikan slug selalu berawalan 'team-' tanpa duplikasi -->
    {@const rawSlug = t.slug ?? t.code?.toLowerCase() ?? ''}
    {@const targetSlug = rawSlug.startsWith('team-') ? rawSlug : `team-${rawSlug}`}
    
    <a 
      href={`/teams/${targetSlug}`}
      class="bg-[#190614] border border-white/10 overflow-hidden group hover:border-white/30 transition flex flex-col justify-between"
    >
      <!-- Container Gambar Poster Roster Tim -->
      <div class="relative w-full aspect-[4/5] bg-black/40 overflow-hidden">
        <img 
          src={t.image} 
          alt={t.name} 
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
        />
      </div>

      <!-- Label Nama Tim di Bagian Bawah Card -->
      <div class="p-3 bg-[#10030c]/80 flex items-center justify-between border-t border-white/5">
        <span class="text-xs font-bold font-display uppercase text-white tracking-wider group-hover:text-[#ffc700] transition">
          {t.name}
        </span>
        <ArrowUpRight class="w-3.5 h-3.5 text-[#ffc700] shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </a>
  {/each}
</div>