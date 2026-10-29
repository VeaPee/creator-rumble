<!-- src/lib/components/StandingsTable.svelte -->
<script lang="ts">
  export interface StandingItem {
    pos: string;
    team: string;
    captain: string;
    code: string;
    isChampion?: boolean;
  }

  interface Props {
    standings: StandingItem[];
    title?: string;
  }

  let { standings, title = 'Klasemen akhir' }: Props = $props();
</script>

<section class="space-y-6 pt-4 border-t border-white/10">
  <h2 class="text-3xl lg:text-4xl font-black font-display uppercase tracking-wide text-white">
    {title}
  </h2>

  <div class="bg-[#190614] border border-white/10 overflow-x-auto">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="border-b border-white/10 text-[10px] font-bold text-[#a38a99] uppercase tracking-widest bg-white/5">
          <th class="py-3.5 px-6">Posisi</th>
          <th class="py-3.5 px-6">Tim</th>
          <th class="py-3.5 px-6">Kapten</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5 text-sm font-semibold">
        {#each standings as s}
          <tr class="hover:bg-white/5 transition {s.isChampion ? 'bg-[#ffc700]/10' : ''}">
            <td class="py-4 px-6 text-[#ffc700] font-mono font-bold">{s.pos}</td>
            <td class="py-4 px-6 font-bold text-white flex items-center gap-3">
              <span class="w-7 h-7 bg-white/10 text-white text-[10px] font-black flex items-center justify-center">
                {s.code}
              </span>
              <span>{s.team}</span>
            </td>
            <td class="py-4 px-6 text-[#a38a99]">{s.captain}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>