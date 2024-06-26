<!-- Note: video carousel, this component is hard to understand, so I write a lot of comments for future reference -->

<template>
  <!-- Here I track the video carousel div so I can know when I enter the viewport the videos will start to play -->
  <section
    class="flex items-center"
    ref="carousel">
    <!-- This loop is to show all the videos, each video will be in a new div -->
    <div
      v-for="(list, index) in highlightsSlides"
      :key="list.id"
      class="pr-10 sm:pr-20 carousel-item">
      <div class="video-carousel-container">
        <div
          class="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
          <!-- This ref is for keeping track of all videos, and to now which one to play, got to, or to stop  -->
          <!-- I think it's more easy to track all the htmlVideoElements in an array, that's why I write it like this -->
          <!-- `@ended="playNextVideo(index)` so from here I track the end of each video, if it ended, just start the next one -->
          <video
            class="pointer-events-none"
            :class="{ 'translate-x-44': list.id === 2 }"
            :ref="setVideosRef"
            id="video"
            preload="auto"
            playsinline
            muted
            @ended="playNextVideo(index)">
            >
            <source
              :src="list.video"
              type="video/webm" />
          </video>
        </div>

        <!-- Here I track all the DIVs that will contains the videTexts, so I can animate them -->
        <div
          :ref="setTextsRef"
          class="absolute top-12 left-[5%] z-10 opacity-0 -translate-x-52">
          <p
            v-for="text in list.textLists"
            :key="text"
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
            class="text-xl md:text-2xl font-bold">
            {{ text }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <div
    ref="progresses"
    class="relative flex-center mt-10">
    <!-- small dots -->
    <div
      id="dots-container"
      class="flex-center py-5 px-7 backdrop-blur rounded-full bg-gray-300">
      <span
        v-for="(video, index) in highlightsSlides"
        :key="video.id"
        :style="{
          width: `${!(!playing && !paused) ? dotWidth(index) : '12px'}`,
        }"
        @click="goToVide(index)"
        class="mx-2 size-3 bg-gray-200 rounded-full relative cursor-pointer transition-[width] duration-500">
        <span class="absolute size-full rounded-full" />
        <span
          :ref="setProgressBars"
          class="absolute h-full w-0 bg-white rounded-full cursor-none pointer-events-none"></span>
      </span>
    </div>

    <button
      class="control-btn"
      v-if="!playing && !paused"
      @click="restart">
      <img
        width="30"
        :src="replayImg"
        alt="restart button" />
    </button>

    <button
      v-else
      @click="togglePause"
      class="control-btn">
      <img
        width="30"
        :src="!paused ? pauseImg : playImg"
        :alt="!paused ? 'pause button' : 'play button'" />
    </button>
    <br />
  </div>
</template>

<script setup lang="ts">
  import { highlightsSlides } from '@/constants';
  import { pauseImg, playImg, replayImg } from '@/utils';
  import { onMounted, ref } from 'vue';
  import gsap from 'gsap';
  import { store } from '@/store';

  const playing = ref(false);
  const paused = ref(false);

  const carousel: any = ref('');
  const progresses: any = ref('');

  const currentVideoIndex = ref(0);
  let videos: HTMLVideoElement[] = [];
  let texts: HTMLElement[] = [];
  let progressBars: HTMLElement[] = [];

  const tl = gsap.timeline();

  function setVideosRef(e: any) {
    if (e && !videos.includes(e)) {
      videos.push(e);
    }
  }

  function setTextsRef(e: any) {
    if (e && !texts.includes(e)) {
      texts.push(e);
    }
  }

  function setProgressBars(e: any) {
    if (e && !progressBars.includes(e)) {
      progressBars.push(e);
    }
  }

  /**
   * Calculate the width of the dot in the video carousel controller
   * @param {number} index The index of the video in the highlightsSlides array
   * @returns {string} The width of the dot in string format
   */
  const dotWidth = (index: number): string => {
    /**
     * If the video is currently playing and the index matches the currentVideoIndex,
     * return a wide width. Otherwise, return a small width.
     */
    let width: string;

    // for phone
    if (window.innerWidth < 760) {
      width = '40px';
    }
    // for tablet
    else if (window.innerWidth < 1200) {
      width = '70px';
    }
    // for laptop and larger
    else {
      width = '100px';
    }

    return index === currentVideoIndex.value ? width : '12px';
  };

  /**
   * Play the next video in the video carousel
   * @param {number} index The index of the current video in the highlightsSlides array
   */
  const playNextVideo = (index: number) => {
    // If the index is bigger than the number of videos,
    // stop the video and return (don't play the next video)
    if (index >= highlightsSlides.length - 1) {
      // Stop playing the video
      playing.value = false;
      paused.value = false;
      return;
    }

    const nextVideo = videos[index + 1];

    // If there is no next video, stop here
    if (typeof nextVideo === 'undefined') {
      // Stop playing the video
      playing.value = false;
      paused.value = false;
      return;
    }

    nextVideo.play();
    animateTexts(index + 1);
    animateSlideMovement(index + 1);
    animateProgress(index + 1);
    resetTexts(index);

    // Increment the currentVideoIndex value
    currentVideoIndex.value++;
  };

  /**
   * Start the video carousel
   * Play the first video and set playing to true
   */
  const start = (index: number = 0) => {
    if (!playing.value && !paused.value) {
      resetTexts(videos.length - 1);
    }

    const firstVideo = videos[index];

    // play the first video
    playing.value = true;
    firstVideo.play();

    // animation here

    animateTexts(index);
    animateSlideMovement(index);
    animateProgress(index);
  };

  const restart = () => {
    // Reset everything
    currentVideoIndex.value = 0;
    // playing.value = true;
    paused.value = false;

    // Start the video carousel
    start(0);
  };

  const togglePause = () => {
    playing.value = !playing.value;
    paused.value = !paused.value;

    const currentVideo = videos[currentVideoIndex.value];
    if (currentVideo) {
      if (!playing.value) {
        currentVideo.pause();

        if (tl && tl.isActive()) {
          tl.pause();
        }
      }
      //
      else {
        currentVideo.play();

        if (tl && tl.paused()) {
          tl.resume();
        }
      }
    }
  };

  /**
   * Go to a specific video in the video carousel
   * @param {number} index The index of the video in the highlightsSlides array
   */
  const goToVide = (index: number) => {
    if (!playing.value || paused.value) {
      playing.value = true;
      paused.value = false;
    }

    const currentVideo = videos[currentVideoIndex.value];
    currentVideo.pause();
    currentVideo.currentTime = 0;

    // Update the currentVideoIndex value
    currentVideoIndex.value = index;

    // Start the video at the new index
    start(index);
  };

  /**
   * Initialize the intersection observer to observe the carousel
   * When the carousel comes into the viewport, start the video
   */
  const initIntersectionObserver = () => {
    /**
     * The options for the intersection observer
     * root: null means the viewport
     * rootMargin: 0px means the observer will trigger when the element is half in the viewport
     * threshold: 0.5 means the observer will trigger when the element is half in the viewport
     */
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    /**
     * Create a new intersection observer
     * The observer will trigger the callback function when the carousel comes into the viewport
     */
    const observer = new IntersectionObserver((entries) => {
      /**
       * Loop through all the entries
       * entries is an array of IntersectionObserverEntry objects
       */
      entries.forEach((entry) => {
        /**
         * If the carousel is intersecting with the viewport
         */
        if (entry.isIntersecting) {
          /**
           * Start the video
           * Disconnect the observer
           * To prevent the observer from triggering multiple times
           */
          start();
          observer.disconnect();
        }
      });
    }, options);

    /**
     * Get the carousel element
     */
    const carouselElement = carousel.value;
    /**
     * Observe the carousel element
     */
    observer.observe(carouselElement);
  };

  const animateTexts = (index: number) => {
    // Animate the text at the given index
    gsap.to(texts[index], {
      x: '0',
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: 'circ.inOut',
    });
  };

  const resetTexts = (index: number) => {
    gsap.to(texts[index], {
      x: '-100%',
      opacity: 0,
      duration: 1,
      ease: 'circ.inOut',
    });
  };

  const animateSlideMovement = (index: number) => {
    // Get the array of carousel cards
    let cards: HTMLElement[] = Array.from(carousel.value.children);

    // Calculate the width of a single card with the padding and gap
    let cardWidth = ref(cards[index].offsetWidth);

    // Calculate the new x position of the carousel based on the index of the slide to animate
    let newX: string = `-${index * cardWidth.value}px`;

    window.onresize = () => {
      cards = Array.from(carousel.value.children);
      cardWidth.value = cards[index].offsetWidth;
      newX = `-${index * cardWidth.value}px`;
    };

    // Animate the carousel to the new x position
    gsap.to(carousel.value, {
      x: newX,
      duration: 1,
      ease: 'expo.inOut',
    });
  };

  const animateProgress = (index: number) => {
    const videoDuration = highlightsSlides[index].videoDuration * 1000;

    // Add the first animation to the timeline
    tl.to(progressBars[index], {
      width: '100%',
      duration: videoDuration / 1000,
      onComplete: () => {
        gsap.set(progressBars[index], {
          // opacity: 0,
          width: 0,
          delay: 0.5,
          ease: 'circ',
        });
      },
    });

    // reset everything
    // tl.to(progressBars[index], {
    //   width: '0',
    // });

    // tl.to(progressBars[index], {
    //   opacity: '100',
    // });
  };

  onMounted(() => {
    initIntersectionObserver();
  });
</script>
