<template>
  <main>
    <Cursor />
    <Navbar />
    <Hero />
    <Highlights />
    <PhoneModel />
    <Features />
    <Gaming />
    <Footer />
  </main>
</template>

<script setup lang="ts">
  import Lenis from 'lenis';
  import { onMounted } from 'vue';
  import {
    Cursor,
    Navbar,
    Hero,
    Highlights,
    PhoneModel,
    Features,
    Gaming,
    Footer,
  } from './components';

  onMounted(() => {
    // Add smooth scrolling for all app
    const lenis = new Lenis({
      duration: 2.5,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
</script>
