<template>
  <section
    id="highlights"
    class="w-screen overflow-hidden h-full common-padding bg-zinc">
    <div class="screen-max-width">
      <!-- max-md:space-y-5 -->
      <div class="mb-12 w-full md:flex items-end justify-between">
        <h1
          id="highlights-title"
          class="section-heading">
          Get the highlights.
        </h1>
        <div class="flex flex-wrap items-end gap-5">
          <p
            class="link"
            @mouseenter="() => (store.isLinkHovered = true)"
            @mouseleave="() => (store.isLinkHovered = false)">
            Watch the film
            <img
              :src="watchImg"
              alt="watch"
              class="ml-2" />
          </p>
          <p
            class="link"
            @mouseenter="() => (store.isLinkHovered = true)"
            @mouseleave="() => (store.isLinkHovered = false)">
            Watch the Event
            <img
              :src="rightImg"
              alt="right"
              class="ml-2" />
          </p>
        </div>
      </div>

      <VideoCarousel />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { store } from '@/store';
  import VideoCarousel from './VideoCarousel.vue';
  import { rightImg, watchImg } from '@/utils';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { onMounted } from 'vue';

  // animations
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#highlights-title',
        // start: 'top bottom',
        start: 'top bottom',
        // end: 'bottom 80%',
        end: 'bottom 80%',

        //toggleActions: start, leave, enterBack, leaveBack
        toggleActions: 'restart none none reverse',
      },
    });

    tl.to('#highlights-title', {
      opacity: 1,
      y: 0,
    });

    tl.to('.link', {
      opacity: 1,
      y: 0,
      stagger: 0.1,
    });
    // gsap.to('#highlights-title', {
    //   opacity: 1,
    //   y: 0,
    //   scrollTrigger: {
    //     trigger: '#highlights-title',
    //     start: 'top bottom',
    //     end: 'bottom 80%',

    //     toggleActions: 'play none none reverse',
    //     scrub: true,
    //   },
    // });

    // gsap.to('.link', {
    //   opacity: 1,
    //   y: 0,
    //   stagger: 0.25,
    //   scrollTrigger: {
    //     trigger: '#highlights-title',
    //     start: 'top bottom',
    //     end: 'bottom 80%',
    //     scrub: true,
    //   },
    // });
  });
</script>
