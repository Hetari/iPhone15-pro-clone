<template>
  <div
    class="opacity-65 absolute left-10 bottom-32"
    @mouseenter="scrollHover(true, 2)"
    @mouseleave="scrollHover(false, 1)">
    <div class="w-5 flex-center flex-col gap-4">
      <span class="animate-pulse">
        <p
          class="inline-block -rotate-90 text-center text-white text-xs translate-x-[-1%]">
          scroll
        </p>
      </span>

      <div class="animate-bounce">
        <svg
          fill="none"
          class="rotate-90 fill-current text-white size-4"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xml:space="preserve">
          <path
            id="XMLID_27_"
            d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
    s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { store } from '@/store';

  const scrollHover = (bool: boolean, size: number) => {
    store.isHovered = bool;
    store.hoveredCircleSize = size;
  };
</script>
