<!-- Note: video carousel, this component is hard to understand, so I write a lot of comments for future reference -->

<template>
  <!-- flex -->
  <div
    class="flex items-center"
    ref="carousel">
    <div
      v-for="(list, index) in highlightsSlides"
      :key="list.id"
      class="pr-10 sm:pr-20">
      <div class="video-carousel-container">
        <div
          class="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
          <!-- :ref="`video-${index}`" -->
          <video
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

        <div
          :ref="setTextsRef"
          class="absolute top-12 left-[5%] z-10 opacity-0 -translate-x-52">
          <!-- :ref="`text${index}`" -->
          <p
            v-for="text in list.textLists"
            :key="text"
            class="text-xl md:text-2xl font-medium">
            {{ text }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div class="relative flex-center mt-10">
    <div class="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
      <span
        v-for="(video, index) in highlightsSlides"
        :key="video.id"
        :style="{ width: dotWidth(index) }"
        class="mx-2 size-3 bg-gray-200 rounded-full relative cursor-pointer">
        <span
          :ref="setProgressBars"
          class="absolute size-full rounded-full progress-bar" />
      </span>
    </div>

    <button
      class="control-btn"
      v-if="!playing"
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
        :src="paused === false ? pauseImg : playImg"
        :alt="paused === false ? 'pause button' : 'play button'" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { highlightsSlides } from '@/constants';
  import { pauseImg, playImg, replayImg } from '@/utils';
  import { onBeforeUpdate, onMounted, ref } from 'vue';
  import gsap from 'gsap';

  const playing = ref(false);
  const paused = ref(false);
  const carousel: any = ref('');
  const currentVideoIndex = ref(0);
  let videos: HTMLVideoElement[] = [];
  let texts = [];
  let progressBars = [];

  function setVideosRef(e: any) {
    if (e) {
      videos.push(e);
    }
  }

  function setTextsRef(e: any) {
    if (e) {
      texts.push(e);
    }
  }

  function setProgressBars(e: any) {
    if (e) {
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
    return index === currentVideoIndex.value && playing.value
      ? '100px'
      : '12px';
  };

  /**
   * Play the next video in the video carousel
   * @param {number} index The index of the current video in the highlightsSlides array
   */
  const playNextVideo = (index: number) => {
    // If the index is bigger than the number of videos,
    // stop the video and return (don't play the next video)
    if (index > highlightsSlides.length - 1) {
      // Stop playing the video
      playing.value = false;
      return;
    }

    const nextVideo = videos[index + 1];

    // If there is no next video, stop here
    if (typeof nextVideo === 'undefined') {
      return;
    }

    nextVideo.play();

    // Increment the currentVideoIndex value
    currentVideoIndex.value++;

    // TODO: add animation here same as start function and move the video slide
    // TODO: stop the animation here
  };

  /**
   * Start the video carousel
   * Play the first video and set playing to true
   */
  const start = () => {
    const firstVideo = videos[0];

    // play the first video
    firstVideo.play();

    // set playing to true
    playing.value = true;

    // TODO: add animation here
    // TODO: stop the animation here
  };

  const restart = () => {
    // TODO: add animation here
    // TODO: stop the animation here

    // Reset everything
    currentVideoIndex.value = 0;
    paused.value = false;

    // Start the video carousel
    start();
  };

  const togglePause = () => {
    playing.value = !playing.value;

    const currentVideo = videos[currentVideoIndex.value];
    if (currentVideo) {
      if (!playing.value) {
        currentVideo.pause();
      }
      //
      else {
        currentVideo.play();
      }
    }

    // TODO: paused the gsap timeline animation
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

  onMounted(() => {
    initIntersectionObserver();
  });

  onBeforeUpdate(() => {
    videos = [];
  });
</script>
