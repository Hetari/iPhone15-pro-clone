<template>
  <!-- Main section containing the 3D model and options -->
  <section
    id="model"
    class="common-padding">
    <div class="screen-max-width">
      <!-- TODO: hover effects -->
      <h2
        id="three-d-heading"
        class="section-heading">
        Take a closer look
      </h2>

      <!-- Wrapper for the 3D models -->
      <div
        ref="models_wrapper"
        class="flex flex-col items-center mt-5 cursor-grab active:cursor-grabbing">
        <div
          ref="model"
          class="w-full h-[75vh] md:h-[90vh] overflow-hidden relative flex-center">
          <!-- Small iPhone model -->
          <div
            ref="iPhone_sm"
            class="size-full absolute translate-x-0 scale-100 z-[3]">
            <Model3D class="" />
          </div>

          <!-- Large iPhone model -->
          <div
            ref="iPhone_lg"
            class="size-full absolute translate-x-[100%]">
            <Model3D class="" />
          </div>
        </div>
      </div>

      <!-- Model name display -->
      <p class="text-sm font-light text-center mb-5">{{ modelName }}</p>

      <div class="mx-auto w-full">
        <div class="flex-center">
          <!-- List of color options -->
          <ul class="color-container">
            <li
              class="size-6 rounded-full mx-2 cursor-pointer"
              :style="{ 'background-color': model.color[0] }"
              v-for="model in models"
              @click="changeModel(model.modelColor, model.title, model.id)"
              :key="model.id"></li>
            <!-- TODO add dot under the line for selected color -->
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

  const selectedModel = ref(true);
  const currentId = ref(4);

  // Ref for storing the current model name
  const modelName = ref('iPhone 15 Pro in Natural Titanium');

  // Ref for storing the selected size
  const selectedSize = ref('small');

  // Refs for different elements in the template
  const iPhone_sm = ref(null);
  const iPhone_lg = ref(null);
  const model = ref(null);
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

    // if (size == 'large') {
    //   // store.rotateR = true;
    //   // store.rotateL = false;
    // } else {
    //   // store.rotateR = false;
    //   // store.rotateL = true;
    // }
  };

  // Lifecycle hook to run when the component is mounted
  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to('#three-d-heading', {
      y: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: '#three-d-heading',
        start: 'top bottom',
        end: 'bottom 80%',
        scrub: 1,
        toggleActions: 'play none none reset',
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
    console.log('lg: ', lg, 'sm: ', sm);
    console.log('iPhone_lg: ', iPhone_lg.value, 'iPhone_sm: ', iPhone_sm.value);
    console.log('size: ', size);

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
