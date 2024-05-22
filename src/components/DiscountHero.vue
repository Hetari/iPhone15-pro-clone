<template>
  <section class="bg-[#1D1D1F] h-20 flex-center px-10">
    <p
      class="text-center text-[17px] max-lg:text-[15px] leading-5 lg:max-w-[25rem] max-lg:max-w-[26rem]"
      @mouseenter="() => (store.isHovered = true)"
      @mouseleave="() => (store.isHovered = false)">
      Get $170–$630 in credit toward iPhone 15 Pro when you trade in iPhone 11
      or higher.<span class="underline m-0 p-0 underline-offset-[-4px]">*</span>
      <a
        class="text-blue group"
        href="#">
        <span class="group-hover:underline">Buy</span> &gt;</a
      >
    </p>
  </section>
</template>

<script setup lang="ts">
  import { store } from '@/store';
</script>
