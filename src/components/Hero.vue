<template>
  <DiscountHero />
  <section class="w-full nav-height bg-black relative">
    <!-- h-5/6 w-full -->
    <div class="h-[70vh] max-w-[87rem] mx-auto flex-col flex-center">
      <h1
        @mouseenter="() => (store.isHovered = true)"
        @mouseleave="() => (store.isHovered = false)"
        id="title"
        class="hero-title cursor-none">
        iPhone 15 Pro
      </h1>

      <div class="w-9/12 md:w-10/12">
        <video
          class="pointer-events-none"
          autoplay
          muted
          playsinline="true"
          :key="videoSrc">
          <source
            :src="videoSrc"
            type="video/webm" />
        </video>
      </div>
    </div>

    <div
      id="cta"
      class="flex flex-col opacity-0 items-center translate-y-20">
      <a
        @mouseenter="btnHover(true, 4)"
        @mouseleave="btnHover(false, 1)"
        @click="goToHighlight"
        class="btn"
        >Buy</a
      >
      <p class="font-normal text-xl">Form $199/month or $999</p>
    </div>
    <ScrollAnimation />
  </section>
</template>

<script setup lang="ts">
  import DiscountHero from '@/components/DiscountHero.vue';
  import ScrollAnimation from '@/components/ScrollAnimation.vue';
  import { heroVideo, smallHeroVideo } from '@/utils';
  import { computed, onMounted, ref } from 'vue';
  import { gsap } from 'gsap';
  import { store } from '@/store';
  import Lenis from 'lenis';

  const btnHover = (bool: boolean, size: number) => {
    store.isHovered = bool;
    store.isBtnHovered = bool;
    store.hoveredCircleSize = size;
  };

  const goToHighlight = (e: any) => {
    e.preventDefault();

    const id = 'highlights';
    const target = document.getElementById(id) as HTMLElement;
    target.scrollIntoView({ behavior: 'smooth' });
  };

  // animations
  onMounted(() => {
    gsap.to('#title', {
      opacity: 1,
      delay: 2,
    });

    gsap.to('#cta', {
      opacity: 1,
      y: -50,
      delay: 2,
      ease: 'circ.inOut',
    });
  });

  // Check screen width and set appropriate video source
  const videoSrc = ref('');
  const screenWidth = computed(() => window.innerWidth);

  videoSrc.value = screenWidth.value > 760 ? heroVideo : smallHeroVideo;

  // TODO: If the screen width has changed, check again if the video source needs to be updated
</script>
