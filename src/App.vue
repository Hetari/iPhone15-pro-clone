<template>
  <main>
    <Navbar />
    <Hero />
    <Highlights />
    <PhoneModel />
  </main>
</template>

<script setup lang="ts">
  import Lenis from 'lenis';
  import { onMounted } from 'vue';
  import { Navbar, Hero, Highlights, PhoneModel } from './components';

  onMounted(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
</script>
