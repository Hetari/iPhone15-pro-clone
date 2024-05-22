<template>
  <section class="common-padding">
    <div class="screen-max-width">
      <div
        id="chip"
        class="flex-center w-full my-20">
        <img
          :src="chipImg"
          alt="chip"
          width="180"
          height="180" />
      </div>

      <div className="flex flex-col items-center">
        <h2
          @mouseenter="
            () => {
              store.isHovered = true;
              store.hoveredCircleSize = 8;
            }
          "
          @mouseleave="
            () => {
              store.isHovered = false;
              store.hoveredCircleSize = 1;
            }
          "
          className="game-title">
          A17 Pro chip.
          <br />
          A monster win for gaming.
        </h2>

        <p
          @mouseenter="
            () => {
              store.isHovered = true;
              store.hoveredCircleSize = 4;
            }
          "
          @mouseleave="
            () => {
              store.isHovered = false;
              store.hoveredCircleSize = 1;
            }
          "
          className="game-subtitle">
          It's here. The biggest redesign in the history of Apple GPUs.
        </p>
      </div>

      <div class="mt-10 md:mt-20 mb-14">
        <div class="relative h-full flex-center">
          <div class="overflow-hidden">
            <img
              :src="frameImg"
              alt="frame"
              class="pointer-events-none bg-transparent relative z-10" />
          </div>
          <div class="game-video">
            <video
              class="pointer-events-none"
              autoplay
              muted
              preload="none"
              ref="video"
              playsinline="true">
              <source
                :src="frameVideo"
                type="video/webm" />
            </video>
          </div>
        </div>
        <p className="text-gray font-semibold text-center mt-3">
          Honkai: Star Rail
        </p>
      </div>

      <div className="game-text-container">
        <div
          @mouseenter="
            () => {
              store.isHovered = true;
              store.hoveredCircleSize = 8;
            }
          "
          @mouseleave="
            () => {
              store.isHovered = false;
              store.hoveredCircleSize = 1;
            }
          "
          className="flex flex-1 justify-center flex-col">
          <p className="game-text g_fadeIn">
            A17 Pro is an entirely new class of iPhone chip that delivers our
            <span className="text-white"> best graphic performance by far </span
            >.
          </p>

          <p className="game-text g_fadeIn">
            Mobile
            <span className="text-white">
              games will look and feel so immersive </span
            >, with incredibly detailed environments and characters.
          </p>
        </div>

        <div
          @mouseenter="
            () => {
              store.isHovered = true;
              store.hoveredCircleSize = 8;
            }
          "
          @mouseleave="
            () => {
              store.isHovered = false;
              store.hoveredCircleSize = 1;
            }
          "
          className="flex-1 flex justify-center flex-col g_fadeIn">
          <p className="game-text">New</p>
          <p className="game-bigtext">Pro-class GPU</p>
          <p className="game-text">with 6 cores</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { store } from '@/store';
  import { chipImg, frameImg, frameVideo } from '@/utils';
  import gsap from 'gsap';
  import ScrollToPlugin from 'gsap/ScrollToPlugin';
  import { onMounted, ref } from 'vue';

  const video: any = ref(null);

  gsap.registerPlugin(ScrollToPlugin);
  onMounted(() => {
    const v = video.value;
    gsap.to(v, {
      scrollTrigger: {
        trigger: v,
        toggleActions: 'restart none none reverse',
        start: '-10% bottom',
      },
      onComplete: () => video.value.play(),
    });

    gsap.from('#chip', {
      opacity: 0,
      scale: 2,
      duration: 2,
      delay: 0.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '#chip',
        start: '20% bottom',
      },
    });

    gsap.to('.g_fadeIn', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.inOut',
    });
  });
</script>
