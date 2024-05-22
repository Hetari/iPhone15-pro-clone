<template>
  <!-- Main section containing the 3D model and options -->
  <section
    id="model"
    class="common-padding">
    <div class="screen-max-width max-h-screen">
      <h2
        id="three-d-heading"
        class="section-heading">
        Take a closer look
      </h2>

      <!-- Wrapper for the 3D models -->
      <div
        @mouseenter="() => (store.hoveredCircleSize = 0)"
        @mouseleave="() => (store.hoveredCircleSize = 1)"
        ref="models_wrapper"
        class="flex flex-col items-center cursor-grab active:cursor-grabbing translate-y-[100%] opacity-0">
        <div
          ref="modelContainer"
          class="w-full h-[70vh] md:h-[80vh] overflow-hidden relative flex-center">
          <!-- Small iPhone model -->
          <div
            ref="iPhone_sm"
            class="size-full absolute translate-x-0 scale-100 z-[3]">
            <Model3D class="scale-100 transition-all" />
          </div>

          <!-- Large iPhone model -->
          <div
            ref="iPhone_lg"
            class="size-full absolute -translate-x-[100%]">
            <Model3D class="scale-110 transition-all" />
          </div>
        </div>
      </div>

      <!-- Model name display -->
      <p
        @mouseenter="() => (store.isHovered = true)"
        @mouseleave="() => (store.isHovered = false)"
        class="text-sm font-light text-center mb-5">
        {{ modelName }}
      </p>

      <div
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
        class="mx-auto w-full">
        <div class="flex-center">
          <!-- List of color options -->
          <ul class="color-container">
            <li
              class="size-6 rounded-full mx-2 cursor-pointer flex items-end justify-center"
              :style="{ 'background-color': model.color[0] }"
              v-for="model in models"
              @click="changeModel(model.modelColor, model.title, model.id)"
              :key="model.id">
              <span
                class="size-1 rounded-full absolute bottom-1.5 transition-[background] duration-300"
                :class="
                  currentId == model.id ? ' bg-white' : 'bg-transparent'
                "></span>
            </li>
          </ul>

          <!-- Size selection buttons -->
          <button class="size-btn-container relative">
            <div
              id="selectCircle"
              class="size-btn !bg-white absolute inset-1 -translate-x-0.5 -z-10"></div>

            <span
              v-for="size in sizes"
              :key="size.label"
              class="size-btn"
              :style="{
                color: selectedSize === size.value ? 'black' : 'white',
              }"
              @click="changeSize(size.value)">
              {{ size.label }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { sizes, models } from '@/constants/index.ts';
  // Import necessary components and libraries
  import Model3D from './Model3D.vue';
  import { onMounted, ref } from 'vue';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { store } from '../store.ts';
  import { gsap } from 'gsap';

  gsap.registerPlugin(ScrollTrigger);

  const currentId = ref(1);

  // Ref for storing the current model name
  const modelName = ref('iPhone 15 Pro in Natural Titanium');

  // Ref for storing the selected size
  const selectedSize = ref('small');

  // Refs for different elements in the template
  const iPhone_sm = ref(null);
  const iPhone_lg = ref(null);
  const models_wrapper = ref(null);

  // Function to change the phone model color and title
  const changeModel = (modelColor: string, title: string, id: number) => {
    // Set the phone color in the store
    store.phoneColor = modelColor;
    // Update the current model name
    modelName.value = title;

    // Update the selected model ID
    currentId.value = id;
  };

  // Function to change the selected size
  const changeSize = (size: string) => {
    selectedSize.value = size;

    let x = size === 'small' ? -2 : 42;
    animateSelectCircle(x);
    animatePhoneSizes(size, iPhone_lg, iPhone_sm);

    if (size == 'large') {
      store.rotateR = true;
      store.rotateL = false;
    } else {
      store.rotateR = false;
      store.rotateL = true;
    }
  };

  // Lifecycle hook to run when the component is mounted
  onMounted(() => {
    gsap.to('#three-d-heading', {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: '#three-d-heading',
        start: 'top bottom',
        end: 'bottom 80%',
        scrub: 1,

        //toggleActions: start, leave, enterBack, leaveBack
        toggleActions: 'restart none none reverse',
      },
    });

    gsap.to(models_wrapper.value, {
      y: 0,
      opacity: 1,
      delay: 1,
      scrollTrigger: {
        trigger: '#three-d-heading',
        start: 'top bottom',
        end: 'bottom 80%',
        scrub: 1,

        //toggleActions: start, leave, enterBack, leaveBack
        toggleActions: 'restart none none reverse',
      },
    });
  });

  const animateSelectCircle = (newX: number) => {
    gsap.to('#selectCircle', {
      x: newX + 'px',
      duration: 0.1,
      ease: 'sine.inOut',
    });
  };

  const animatePhoneSizes = (size: string, iPhone_lg: any, iPhone_sm: any) => {
    const lg = size === 'small' ? '-100%' : '0%';
    const sm = size === 'small' ? '0%' : '100%';
    gsap.to(iPhone_lg.value, {
      x: lg,
      duration: 1,
      ease: 'power2.inOut',
    });
    gsap.to(iPhone_sm.value, {
      x: sm,
      duration: 1,
      ease: 'power2.inOut',
    });
  };
</script>
