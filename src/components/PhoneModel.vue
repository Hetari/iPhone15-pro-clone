<template>
  <!-- Main section containing the 3D model and options -->
  <section
    id="model"
    ref="modelRef"
    class="common-padding">
    <div class="screen-max-width">
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
              @click="changeModel(model.modelColor, model.title)"
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
  // Import necessary components and libraries
  import Model3D from './Model3D.vue';
  import { onMounted, ref } from 'vue';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { store } from '../store.ts';
  import { gsap } from 'gsap';

  gsap.registerPlugin(ScrollTrigger);

  // Ref for storing the current model name
  const modelName = ref('iPhone 15 Pro in Natural Titanium');

  // Ref for storing the selected size
  const selectedSize = ref('small');

  // List of available sizes
  const sizes = ref([
    { label: '6.1"', value: 'small' },
    { label: '6.7"', value: 'large' },
  ]);

  // Refs for different elements in the template
  const iPhone_sm = ref(null);
  const iPhone_lg = ref(null);
  const model = ref(null);
  const models_wrapper = ref(null);

  // List of available models with their details
  const models = ref([
    {
      id: 1,
      title: 'iPhone 15 Pro in Natural Titanium',
      color: ['#8F8A81', '#ffe7b9', '#6f6c64'],
      modelColor: 'yellow',
    },
    {
      id: 2,
      title: 'iPhone 15 Pro in Blue Titanium',
      color: ['#53596E', '#6395ff', '#21242e'],
      modelColor: 'blue',
    },
    {
      id: 3,
      title: 'iPhone 15 Pro in White Titanium',
      color: ['#C9C8C2', '#ffffff', '#C9C8C2'],
      modelColor: 'white',
    },
    {
      id: 4,
      title: 'iPhone 15 Pro in Black Titanium',
      color: ['#454749', '#3b3b3b', '#181819'],
      modelColor: 'black',
    },
  ]);

  // Function to change the phone model color and title
  const changeModel = (modelColor: string, title: string) => {
    // Set the phone color in the store
    store.phoneColor = modelColor;
    // Update the current model name
    modelName.value = title;
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
      duration: 0.3,
      ease: 'sine.inOut',
    });
  };

  const animatePhoneSizes = (size: string, iPhone_lg: any, iPhone_sm: any) => {
    const lgX = size === 'small' ? -100 : 0;
    const smX = size === 'small' ? 0 : 100;

    const smPhone = iPhone_sm.value;
    const lgPhone = iPhone_lg.value;

    gsap.to(lgPhone, {
      xPercent: lgX,
      duration: 1,
      ease: 'power2.inOut',
    });
    gsap.to(smPhone, {
      xPercent: smX,
      duration: 1,
      ease: 'power2.inOut',
    });
  };
</script>
