<!-- src/routes/seasons/[slug]/bracket/+page.svelte -->
<script lang="ts">
  import { Trophy, ArrowRight, ArrowDown } from 'lucide-svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let season = $derived(data.season);

  type Match = PageData['matches'][number];
  type Out = 'merge' | 'straight' | 'half' | 'none';
  type In = 'half' | 'none';

  // Filter jalur: pertandingan di luar jalur dibuat redup (tata letak tetap)
  let activePath = $state<'all' | 'upper' | 'lower' | 'final' | 'ae'>('all');
  const paths = [
    { value: 'all', label: 'Semua jalur' },
    { value: 'upper', label: 'Upper' },
    { value: 'lower', label: 'Lower' },
    { value: 'final', label: 'Final' }
  ] as const;

  const byRound = (r: string) => data.matches.filter((m) => m.round.includes(r));
  let ub1 = $derived(byRound('Upper · Ronde 1'));
  let ub2 = $derived(byRound('Upper · Ronde 2'));
  let ubf = $derived(byRound('Upper Final'));
  let lb1 = $derived(byRound('Lower · Ronde 1'));
  let lb2 = $derived(byRound('Lower · Ronde 2'));
  let lb3 = $derived(byRound('Lower · Ronde 3'));
  let lbf = $derived(byRound('Lower Final'));
  let gf = $derived(byRound('Grand Final')[0]);

  let champion = $derived(
    gf ? (gf.team1.isWinner ? gf.team1.name : gf.team2.isWinner ? gf.team2.name : null) : null
  );

  function inPath(m: Match) {
    switch (activePath) {
      case 'upper': return m.round.startsWith('Upper');
      case 'lower': return m.round.startsWith('Lower');
      case 'final': return m.round.includes('Final');
      case 'ae': return m.team1.code === 'AE' || m.team2.code === 'AE';
      default: return true;
    }
  }
</script>

<svelte:head>
  <title>Bracket · {season.title} · Creator Rumble</title>
  <meta name="description" content="Bracket dan hasil pertandingan {season.title}." />
</svelte:head>

<!-- Kartu pertandingan -->
{#snippet card(m: Match, label: string, big = false)}
  <a
    href={`/matches/${m.id}`}
    class="card"
    class:big
    class:dim={!inPath(m)}
    class:ae={activePath === 'ae' && inPath(m)}
  >
    <div class="card-top">
      <span>{label}</span>
      <span>{m.scheduledAt ?? ''}</span>
    </div>
    {#each [m.team1, m.team2] as t}
      <div class="row" class:win={t.isWinner}>
        <span class="name">{t.name}</span>
        <b>{t.score ?? '–'}</b>
      </div>
    {/each}
  </a>
{/snippet}

<!-- Satu kolom ronde: header + slot berukuran sama + garis penghubung -->
{#snippet column(title: string, list: Match[], tag: string, inn: In, out: Out)}
  <div class="col">
    <div class="col-head">{title}</div>
    <div class="slots">
      {#each list as m, i (m.id)}
        <div class="slot">
          {#if inn === 'half'}
            <span class="ln" style="right:100%;width:calc(var(--g) / 2)"></span>
          {/if}

          {@render card(m, `${tag}${list.length > 1 ? '-' + (i + 1) : ''}`)}

          {#if out === 'merge'}
            <span class="ln" style="left:100%;width:calc(var(--g) / 2)"></span>
            <span
              class="vl"
              style="left:calc(100% + var(--g) / 2);{i % 2 === 0 ? 'top:50%;bottom:0' : 'top:0;bottom:50%'}"
            ></span>
          {:else if out === 'straight'}
            <span class="ln" style="left:100%;width:var(--g)"></span>
          {:else if out === 'half'}
            <span class="ln" style="left:100%;width:calc(var(--g) / 2)"></span>
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/snippet}

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans pb-20">

  <!-- CONTEXT HEADER -->
  <header class="max-w-7xl mx-auto px-6 pt-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#a38a99]">
    <a href="/seasons" class="hover:text-white transition">Musim</a>
    <span class="text-white/20">•</span>
    <a href={`/seasons/${season.slug}`} class="hover:text-white transition">{season.title}</a>
    <span class="text-white/20">•</span>
    <span class="text-[#ffc700]">{season.status}</span>
  </header>

  <!-- SEASON SUB-NAVBAR -->
  <div class="border-b border-white/10 mt-4">
    <nav class="max-w-7xl mx-auto px-6 flex items-center gap-8 text-sm font-bold uppercase tracking-wider text-[#a38a99]">
      <a href={`/seasons/${season.slug}`} class="py-3 hover:text-white transition">Ringkasan</a>
      <a href={`/seasons/${season.slug}/teams`} class="py-3 hover:text-white transition">Tim & roster</a>
      <a href={`/seasons/${season.slug}/schedule`} class="py-3 hover:text-white transition">Jadwal & hasil</a>
      <a href={`/seasons/${season.slug}/bracket`} class="py-3 text-white border-b-2 border-[#ffc700]">Bracket</a>
    </nav>
  </div>

  <!-- MAIN CONTENT -->
  <main id="content" class="max-w-7xl mx-auto px-6 py-10 space-y-8">

    <!-- HEADER BRACKET -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
      <div class="space-y-1">
        <h1 class="text-4xl lg:text-6xl font-black font-display uppercase text-white tracking-wide">Bracket</h1>
        <p class="text-xs font-bold text-[#a38a99] uppercase tracking-wider">
          {season.title} • Double Elimination Format
        </p>
      </div>
    </div>

    <!-- FILTER JALUR BRACKET -->
    <div class="flex flex-wrap items-center gap-2" role="group" aria-label="Jalur bracket">
      {#each paths as p (p.value)}
        <button
          type="button"
          onclick={() => (activePath = p.value)}
          aria-pressed={activePath === p.value}
          class="px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition cursor-pointer {activePath === p.value ? 'bg-[#ffc700] text-black' : 'bg-white/5 text-[#a38a99] hover:bg-white/10 hover:text-white'}"
        >
          {p.label}
        </button>
      {/each}

      <button
        type="button"
        onclick={() => (activePath = 'ae')}
        aria-pressed={activePath === 'ae'}
        class="ml-auto inline-flex items-center gap-1.5 px-4 py-2 text-xs font-extrabold uppercase tracking-wider transition cursor-pointer {activePath === 'ae' ? 'bg-[#ffc700] text-black' : 'bg-[#ffc700]/10 text-[#ffc700] hover:bg-[#ffc700]/20'}"
      >
        <Trophy class="w-3.5 h-3.5" /> Jalur TEAM AE
      </button>
    </div>

    <!-- BRACKET -->
    <div class="bg-[#190614] border border-white/10 p-6 overflow-x-auto">
      <div class="de">

        <!-- UPPER BRACKET -->
        <div class="band band-upper">
          <div class="band-title">Upper Bracket</div>
          <div class="cols">
            <div class="col">
              <div class="col-head"></div>
              <div class="slots">
                <p class="note"><ArrowDown class="w-4 h-4 text-[#ffc700] shrink-0" /> Tim yang kalah di Upper turun ke Lower Bracket</p>
              </div>
            </div>
            {@render column('Ronde 1', ub1, 'UB R1', 'none', 'merge')}
            {@render column('Ronde 2', ub2, 'UB R2', 'half', 'merge')}
            {@render column('Upper Final', ubf, 'UB FINAL', 'half', 'half')}
          </div>
        </div>

        <!-- LOWER BRACKET -->
        <div class="band band-lower">
          <div class="band-title">Lower Bracket</div>
          <div class="cols">
            {@render column('Ronde 1', lb1, 'LB R1', 'none', 'straight')}
            {@render column('Ronde 2', lb2, 'LB R2', 'none', 'merge')}
            {@render column('Ronde 3', lb3, 'LB R3', 'half', 'straight')}
            {@render column('Lower Final', lbf, 'LB FINAL', 'none', 'half')}
          </div>
        </div>

        <!-- GRAND FINAL: bertemu di tengah antara Upper dan Lower -->
        <span class="gf-v"></span>
        <span class="gf-in"></span>
        {#if gf}
          <div class="gf">
            <div class="gf-label">Grand Final</div>
            {@render card(gf, `GRAND FINAL · BO3`, true)}
            {#if champion}
              <div class="champ">
                <Trophy class="w-5 h-5 text-[#ffc700] mx-auto mb-1" />
                <span class="text-[10px] font-bold uppercase tracking-widest text-[#a38a99] block">Juara</span>
                <span class="text-2xl font-black font-display text-[#ffc700] tracking-wider">{champion}</span>
              </div>
            {/if}
          </div>
        {/if}

      </div>
    </div>
  </main>
</div>

<style>
  /* ---- Ukuran dasar. Ubah di sini untuk menyesuaikan kerapatan ---- */
  .de {
    --w: 13rem;       /* lebar kolom */
    --g: 2.75rem;     /* jarak antar kolom (ruang garis penghubung) */
    --slot: 6.75rem;  /* tinggi satu slot pertandingan */
    --top: 4.25rem;   /* judul band + header kolom */
    --bgap: 2rem;     /* jarak Upper ke Lower */

    /* posisi tengah Upper Final & Lower Final (untuk Grand Final) */
    --yu: calc(var(--top) + 2 * var(--slot));
    --yl: calc(2 * var(--top) + 5 * var(--slot) + var(--bgap));
    --gfx: calc(4 * (var(--w) + var(--g)));

    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--bgap);
    width: calc(5 * var(--w) + 4 * var(--g));
    margin: 0 auto;
  }

  .band-upper { --line: rgba(255, 199, 0, 0.4); --accent: #ffc700; height: calc(var(--top) + 4 * var(--slot)); }
  .band-lower { --line: rgba(255, 255, 255, 0.2); --accent: #ffffff; height: calc(var(--top) + 2 * var(--slot)); }
  .band { display: flex; flex-direction: column; }
  .cols { flex: 1; display: flex; gap: var(--g); }

  .band-title {
    height: 2.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    display: flex;
    align-items: center;
  }
  .band-lower .band-title { color: #a38a99; }

  .col { width: var(--w); flex-shrink: 0; display: flex; flex-direction: column; }
  .col-head {
    height: 2rem;
    display: flex;
    align-items: center;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #a38a99;
  }
  .slots { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .slot { position: relative; flex: 1; display: flex; align-items: center; padding: 0.5rem 0; }
  .slot > :global(.card) { width: 100%; }

  .note {
    display: flex; gap: 0.5rem; align-items: flex-start;
    padding: 0.75rem; font-size: 0.7rem; line-height: 1.4; color: #a38a99;
    border: 1px dashed rgba(255, 255, 255, 0.12);
  }

  /* ---- Garis penghubung ---- */
  .ln { position: absolute; top: 50%; height: 0; border-top: 2px solid var(--line); transform: translateY(-1px); }
  .vl { position: absolute; width: 0; border-left: 2px solid var(--line); margin-left: -1px; }

  /* Garis ke Grand Final */
  .gf-v {
    position: absolute;
    left: calc(var(--gfx) - var(--g) / 2);
    top: var(--yu);
    height: calc(var(--yl) - var(--yu));
    border-left: 2px solid rgba(255, 199, 0, 0.4);
    margin-left: -1px;
  }
  .gf-in {
    position: absolute;
    left: calc(var(--gfx) - var(--g) / 2);
    width: calc(var(--g) / 2);
    top: calc((var(--yu) + var(--yl)) / 2);
    border-top: 2px solid rgba(255, 199, 0, 0.4);
    transform: translateY(-1px);
  }
  .gf {
    position: absolute;
    left: var(--gfx);
    width: var(--w);
    top: calc((var(--yu) + var(--yl)) / 2);
    transform: translateY(-50%);
  }
  .gf-label {
    position: absolute; bottom: calc(100% + 0.5rem); left: 0;
    font-size: 0.65rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #ffc700;
  }
  .champ { position: absolute; top: calc(100% + 1rem); left: 0; right: 0; text-align: center; }

  /* ---- Kartu ---- */
  :global(.card) {
    display: block;
    background: #1e0819;
    border: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.75rem;
    transition: border-color 0.2s, opacity 0.2s, transform 0.2s;
  }
  .band-upper :global(.card) { border-color: rgba(255, 199, 0, 0.28); }
  :global(.card:hover) { border-color: #ffc700; transform: translateY(-1px); }
  :global(.card.dim) { opacity: 0.25; }
  :global(.card.ae) { box-shadow: 0 0 0 1px #ffc700, 0 0 18px rgba(255, 199, 0, 0.25); }

  :global(.card-top) {
    display: flex; justify-content: space-between;
    padding: 0.2rem 0.65rem;
    background: #290c23;
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.04em; color: #a38a99;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .band-upper :global(.card-top) { color: #ffc700; }

  :global(.card .row) {
    display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;
    padding: 0.45rem 0.65rem;
    color: #a38a99;
    border-left: 2px solid transparent;
  }
  :global(.card .row + .row) { border-top: 1px solid rgba(255, 255, 255, 0.05); }
  :global(.card .name) { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 600; }
  :global(.card .row b) { font-family: ui-monospace, monospace; font-size: 0.85rem; }
  :global(.card .row.win) { color: #fff; font-weight: 800; background: rgba(255, 255, 255, 0.08); border-left-color: #fff; }
  .band-upper :global(.card .row.win) { background: rgba(255, 199, 0, 0.12); border-left-color: #ffc700; }
  .band-upper :global(.card .row.win b) { color: #ffc700; }

  /* Grand Final lebih menonjol */
  :global(.card.big) { border: 2px solid #ffc700; box-shadow: 0 10px 40px -12px rgba(255, 199, 0, 0.35); }
  :global(.card.big .card-top) { color: #ffc700; padding: 0.3rem 0.65rem; border-bottom-color: rgba(255, 199, 0, 0.3); }
  :global(.card.big .row) { padding: 0.65rem 0.75rem; font-size: 0.8rem; }
  :global(.card.big .row.win) { background: rgba(255, 199, 0, 0.18); color: #ffc700; border-left: 4px solid #ffc700; }
  :global(.card.big .row b) { font-size: 1rem; }
</style>