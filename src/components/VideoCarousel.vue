<!-- Note: video carousel, this component is hard to understand, so I write a lot of comments for future reference -->

<template>
  <!-- flex -->
  <div class="flex items-center">
    <div
      v-for="(list, index) in highlightsSlides"
      :key="list.id"
      class="pr-10 sm:pr-20">
      <div class="video-carousel-container">
        <div
          class="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
          <video
            :ref="`video-${index}`"
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

        <div class="absolute top-12 left-[5%] z-10">
          <p
            :ref="`text${index}`"
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
      <!--! Loop it as the video numbers -->
      <span
        v-for="(video, index) in highlightsSlides"
        :key="video.id"
        :style="{ width: dotWidth(index) }"
        class="mx-2 size-3 bg-gray-200 rounded-full relative cursor-pointer">
        <span class="absolute size-full rounded-full" />
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
  import { onMounted, ref } from 'vue';

  const playing = ref(false);
  const paused = ref(false);
  const currentVideoIndex = ref(0);

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

  const playNextVideo = (index: number) => {};
  const start = () => {};
  const restart = () => {};
  const togglePause = () => {};
  const stopCurrentVideo = () => {};

  const initIntersectionObserver = () => {};

  onMounted(() => {
    initIntersectionObserver();
  });
</script>
