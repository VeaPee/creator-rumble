<!-- src/lib/components/Navbar.svelte -->
<script lang="ts">
  import { Menu } from 'lucide-svelte';
</script>

<header class="sticky top-0 z-50 w-full bg-[#10030c]/90 backdrop-blur-md border-b border-white/5">
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <a href="/" aria-label="Creator Rumble beranda">
      <img src="/event/brand/creator-rumble.webp" alt="Creator Rumble" class="h-8 object-contain" />
    </a>

    <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-[#a38a99]">
      <a href="/seasons" class="hover:text-white transition">Musim</a>
      <a href="/schedule" class="hover:text-white transition">Jadwal &amp; hasil</a>
      <a href="/teams" class="hover:text-white transition">Tim</a>
      <a href="/creators" class="hover:text-white transition">Kreator</a>
      <a href="/channels" class="hover:text-white transition">Channel</a>
      <a href="/seasons/creator-rumble-season-1" class="bg-white/5 border border-white/10 text-xs px-3 py-1.5 rounded-full font-bold text-[#ffc700] hover:bg-white/10 transition">
        Season 1
      </a>
    </nav>

    <button class="md:hidden text-white cursor-pointer" aria-label="Buka menu">
      <Menu class="w-6 h-6" />
    </button>
  </div>
</header>