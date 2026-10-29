<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import Navbar from '#lib/components/Navbar.svelte';
  import '../app.css'; // Import file CSS global jika ada

  let { children } = $props(); // Syntax Svelte 5 / SvelteKit terbaru
</script>

<div class="min-h-screen bg-[#10030c] text-[#f5e6ec] font-sans">
  <!-- Navbar dipanggil secara global di sini -->
  <Navbar />

  <!-- Children merender konten tiap route/page -->
  {@render children()}
</div>