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
          <!--! :ref="`video-${index}`" -->
          <video
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
          <!--! :ref="'text' + index" -->
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
      <!--! Loop it as the video numbers -->
      <span
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

  const dotWidth = (index: number) => {};

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
