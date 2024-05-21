<template>
  <section class="h-full common-padding bg-zinc relative">
    <div class="screen-max-width">
      <div class="mb-12 w-full">
        <h1
          id="features-heading"
          class="section-heading">
          Explore the full story.
        </h1>
      </div>

      <div class="flex flex-col justify-center items-center overflow-hidden">
        <div class="mt-32 mb-24 pl-24">
          <h2 class="text-5xl lg:text-7xl font-semibold">iPhone.</h2>
          <h2 class="text-5xl lg:text-7xl font-semibold">
            Forged in titanium.
          </h2>
        </div>

        <div class="flex-center flex-col sm:px-10">
          <div class="relative h-[50vh] w-full flex items-center">
            <video
              playsInline
              class="w-full h-full object-cover object-center"
              preload="none"
              muted
              autoPlay
              ref="video">
              <source
                :src="exploreVideo"
                type="video/webm" />
            </video>
          </div>

          <div class="flex flex-col w-full relative">
            <div class="feature-video-container">
              <div class="overflow-hidden flex-1 h-[50vh]">
                <img
                  :src="explore1Img"
                  alt="titanium"
                  class="feature-video g_grow" />
              </div>
              <div class="overflow-hidden flex-1 h-[50vh]">
                <img
                  :src="explore2Img"
                  alt="titanium 2"
                  class="feature-video g_grow" />
              </div>
            </div>

            <div class="feature-text-container">
              <div class="flex-1 flex-center">
                <p class="feature-text g_text">
                  iPhone 15 Pro is
                  <span class="text-white">
                    the first iPhone to feature an aerospace-grade titanium
                    design </span
                  >, using the same alloy that spacecrafts use for missions to
                  Mars.
                </p>
              </div>

              <div class="flex-1 flex-center">
                <p class="feature-text g_text">
                  Titanium has one of the best strength-to-weight ratios of any
                  metal, making these our
                  <span class="text-white"> lightest Pro models ever. </span>
                  You'll notice the difference the moment you pick one up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { explore1Img, explore2Img, exploreVideo } from '@/utils';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { ref, onMounted } from 'vue';

  const video: any = ref(null);

  gsap.registerPlugin(ScrollTrigger);
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

    gsap.to('#features-heading', {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: '#features-heading',
        start: 'top bottom',
        end: 'bottom 80%',
        scrub: 1,
        //toggleActions: start, leave, enterBack, leaveBack
        toggleActions: 'restart none none reverse',
      },
    });

    gsap.to('.g_grow', {
      scale: 1,
      opacity: 1,
      ease: 'power1',
      scrollTrigger: {
        trigger: video.value,
        start: 'center center',
        end: '125% center',
        scrub: 5.5,
        toggleActions: 'restart none none reverse',
      },
    });

    gsap.to('.g_text', {
      opacity: 1,
      y: 0,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.g_grow',
        start: '50% center',
        end: '80% center',
        scrub: 1,
        toggleActions: 'restart none none reverse',
      },
    });
  });
</script>
