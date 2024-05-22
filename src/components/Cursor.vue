<template>
  <div
    id="cursor"
    ref="cursor"
    class="grid place-content-center size-10 rounded-full fixed pointer-events-none inset-0 z-[100000] opacity-0 transition-[opacity, width, height] duration-500 ease-in-out mix-blend-difference"
    :class="{
      'bg-white': store.isHovered || store.isLinkHovered,
      'bg-[#3a3a3a]': !store.isHovered && !store.isLinkHovered,
    }">
    <i
      ref="cursorIcon"
      id="cursorIcon"
      class="text-[6px] leading-[4px] opacity-0 transition-all duration-400 ease-in-out text-black z-[100001] mix-blend-normal fa-solid"
      :class="{ 'opacity-100': store.isLinkHovered || store.isBtnHovered }"></i>
  </div>
</template>

<script setup lang="ts">
  import { store } from '@/store';
  import { onMounted, ref } from 'vue';

  const cursor: any = ref(null);
  const cursorIcon: any = ref(null);

  const animateCursor = (e: MouseEvent, isLinkHovered: boolean): void => {
    const offset = cursor.value.offsetWidth / 2;
    const x = e.clientX - offset;
    const y = e.clientY - offset;

    const keyFrames = {
      transform: `translate3d(${x}px, ${y}px, 0)
      scale(${isLinkHovered ? 5 : store.hoveredCircleSize})`,
    };

    cursor.value.animate(keyFrames, {
      duration: 1000,
      fill: 'forwards',
    });
  };

  const getIconClass = (type: string) => {
    switch (type) {
      case 'link':
        return 'fa-arrow-up-right-from-square';
      case 'btn':
        return 'fa-arrow-pointer';
      default:
        return '';
    }
  };

  onMounted(() => {
    window.onmousemove = (e: MouseEvent) => {
      animateCursor(e, store.isLinkHovered);

      if (store.isLinkHovered) {
        cursorIcon.value.classList.add(getIconClass('link'));
      } else {
        cursorIcon.value.classList.remove(getIconClass('link'));
      }

      if (store.isBtnHovered) {
        cursorIcon.value.classList.add(getIconClass('btn'));
      } else {
        cursorIcon.value.classList.remove(getIconClass('btn'));
      }
    };
  });
</script>
