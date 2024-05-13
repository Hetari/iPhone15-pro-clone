<template>
  <div class="flex items-center">
    <div
      v-for="list in highlightsSlides"
      :key="list.id"
      id="slider"
      class="pr-10 sm:pr-20">
      <div class="video-carousel_container">
        <div
          class="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
          <video
            id="video"
            playsinline="true"
            preload="auto"
            muted>
            <source
              :src="list.video"
              type="video/webm" />
          </video>
        </div>

        <div class="absolute top-12 left-[5%] z-10">
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
</template>

<script setup lang="ts">
  import { highlightsSlides } from '@/constants';
</script>
