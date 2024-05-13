<template>
  <main>
    <Navbar />
    <Hero />
    <Highlights />
    <div class="h-screen"></div>
  </main>
</template>

<script setup lang="ts">
  import Lenis from 'lenis';
  import { onMounted } from 'vue';
  import { Navbar, Hero, Highlights } from './components';

  onMounted(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
</script>
