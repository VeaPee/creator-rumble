import adapter from '@sveltejs/adapter-vercel'; // Ganti adapter-auto dengan adapter-vercel
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({
        runtime: 'nodejs22.x' // Tentukan runtime secara eksplisit ke versi 22 atau 24
      })
    }), 
    tailwindcss()
  ]
});