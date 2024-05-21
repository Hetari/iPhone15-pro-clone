<template>
  <main>
    <Navbar />
    <Hero />
    <Highlights />
    <PhoneModel />
    <Features />
    <Gaming />
  </main>
</template>

<script setup lang="ts">
  import Lenis from 'lenis';
  import { onMounted } from 'vue';
  import {
    Navbar,
    Hero,
    Highlights,
    PhoneModel,
    Features,
    Gaming,
  } from './components';

  onMounted(() => {
    // Add smooth scrolling for all app
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
</script>
