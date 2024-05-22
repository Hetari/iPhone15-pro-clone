<template>
  <!-- TODO: Refactor this component until you match the real site nav https://www.apple.com/iphone-15-pro/ -->
  <header class="w-full p-3 px-5 sm:px-10 flex-center">
    <nav class="max-sm:w-5/6 flex gap-10 screen-max-width">
      <img
        @mouseenter="() => (store.isHovered = true)"
        @mouseleave="() => (store.isHovered = false)"
        :src="appleImg"
        alt="apple logo"
        width="12"
        class="cursor-pointer" />

      <div class="flex flex-1 justify-center items-center max-sm:hidden">
        <div
          class="px-4 text-[13px] cursor-pointer text-white/85 hover:text-white transition-[color] duration-300"
          @mouseenter="() => (store.isHovered = true)"
          @mouseleave="() => (store.isHovered = false)"
          v-for="(item, index) in navLists"
          :key="index">
          <p>{{ item }}</p>
        </div>
      </div>

      <!-- TODO: add hamburger here -->
      <div
        class="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1"
        @mouseenter="() => (store.isHovered = true)"
        @mouseleave="() => (store.isHovered = false)">
        <img
          :src="searchImg"
          alt="search"
          class="size-[14px] cursor-pointer" />
        <img
          :src="bagImg"
          alt="store"
          class="size-[14px] cursor-pointer" />
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
  import { appleImg, bagImg, searchImg } from '@/utils';
  import { navLists } from '@/constants';
  import { store } from '@/store';
</script>
