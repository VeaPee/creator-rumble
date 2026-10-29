<!-- src/lib/components/CaptainSpotlight.svelte -->
<script lang="ts">
  import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-svelte';
  import CreatorImage from '#lib/components/CreatorImage.svelte';

  export interface Captain {
    slug: string;
    name: string;
    team: string;
    image: string;
    roster: string[];
  }

  // Menerima list captains lewat props
  let { captains = [] }: { captains: Captain[] } = $props();

  let selectedCaptainIndex = $state(0);
  let activeCaptain = $derived(captains[selectedCaptainIndex] || null);

  function prevCaptain() {
    if (captains.length === 0) return;
    selectedCaptainIndex = (selectedCaptainIndex - 1 + captains.length) % captains.length;
  }

  function nextCaptain() {
    if (captains.length === 0) return;
    selectedCaptainIndex = (selectedCaptainIndex + 1) % captains.length;
  }
</script>

{#if activeCaptain}
  <section id="kreator-spotlight" class="space-y-6">
    <div class="spotlight-stage">
      <span class="spotlight-ghost">{activeCaptain.team}</span>

      <!-- Frame Foto Kapten -->
      <div class="spotlight-portrait-frame">
        <CreatorImage src={activeCaptain.image} alt={activeCaptain.name} class="w-full h-full" />
      </div>

      <div class="space-y-4 z-10">
        <div>
          <h3 class="text-5xl lg:text-6xl font-black font-display text-white uppercase leading-none">
            {activeCaptain.name}
          </h3>
          <span class="text-xs font-bold text-[#ffc700] uppercase tracking-widest block mt-1">
            TEAM {activeCaptain.team}
          </span>
        </div>

        <div class="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#a38a99]">
          {#each activeCaptain.roster as member, idx}
            <a href={`/creators/${member.toLowerCase()}`} class="hover:text-white transition">{member}</a>
            {#if idx < activeCaptain.roster.length - 1}
              <span>·</span>
            {/if}
          {/each}
        </div>

        <a 
          href={`/creators/${activeCaptain.slug}`} 
          class="inline-flex items-center gap-2 bg-[#ffc700] text-black font-extrabold text-xs uppercase px-6 py-3 hover:bg-yellow-400 transition"
        >
          Lihat profil <ArrowUpRight class="w-4 h-4" />
        </a>
      </div>
    </div>

    <!-- Controls & Selector Bar -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-6 pt-2">
      <div class="flex items-center gap-4 text-xs font-bold font-mono text-[#a38a99]">
        <button onclick={prevCaptain} aria-label="Sebelumnya" class="p-2 bg-white/5 hover:bg-white/10 text-white transition border border-white/10 cursor-pointer">
          <ArrowLeft class="w-4 h-4" />
        </button>
        <span>0{selectedCaptainIndex + 1} / 0{captains.length}</span>
        <button onclick={nextCaptain} aria-label="Berikutnya" class="p-2 bg-white/5 hover:bg-white/10 text-white transition border border-white/10 cursor-pointer">
          <ArrowRight class="w-4 h-4" />
        </button>
      </div>

      <div class="flex items-center gap-2 overflow-x-auto max-w-full pb-2">
        {#each captains as cap, idx}
          <button
            onclick={() => selectedCaptainIndex = idx}
            aria-label={`Pilih ${cap.name}`}
            class="flex flex-col items-center gap-1 transition p-1 cursor-pointer {selectedCaptainIndex === idx ? 'border-b-2 border-[#ffc700] opacity-100' : 'opacity-40 hover:opacity-100'}"
          >
            <span class="selector-face">
              <CreatorImage src={cap.image} alt={cap.name} class="w-full h-full" />
            </span>
            <span class="text-[10px] font-bold font-display uppercase text-white tracking-wider">
              {cap.name}<small class="block text-[8px] text-[#a38a99]">{cap.team}</small>
            </span>
          </button>
        {/each}
      </div>
    </div>
  </section>
{/if}