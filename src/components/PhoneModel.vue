<template>
  <!-- <section class="w-full nav-height bg-black relative">
    <div class="w-screen overflow-hidden h-full common-padding">
      <div class="screen-max-width">Phone model</div>
    </div>
  </section> -->
  <section
    id="model"
    ref="modelRef"
    class="common-padding cursor-grab active:cursor-grabbing">
    <div class="screen-max-width">
      <h2
        id="three-d-heading"
        class="section-heading">
        Take a closer look
      </h2>

      <div
        ref="models_wrapper"
        class="flex flex-col items-center mt-5">
        <div
          ref="model"
          class="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
          <div class="size-full">
            <Model3D />
          </div>

          <!-- <div class="size-full"> -->
          <!-- <Model3D ref="iPhone_lg" /> -->
          <!-- </div> -->
        </div>
      </div>

      <div class="mx-auto w-full">
        <p class="text-sm font-light text-center mb-5">{{ modelName }}</p>

        <div class="flex-center">
          <ul class="color-container">
            <li
              @click="() => (modelName = model.title)"
              class="size-6 rounded-full mx-2 cursor-pointer"
              :style="{ 'background-color': model.color[0] }"
              v-for="model in models"
              :key="model.id"></li>
          </ul>

          <button class="size-btn-container">
            <!-- :class="selectedSizeClass(size)" -->
            <span
              v-for="size in sizes"
              :key="size.label"
              class="size-btn"
              :style="{
                'background-color':
                  selectedSize === size.value ? 'white' : 'transparent',
                color: selectedSize === size.value ? 'black' : 'white',
              }"
              @click="() => (selectedSize = size.value)">
              {{ size.label }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { blackImg, blueImg, whiteImg, yellowImg } from '@/utils';
  import Model3D from './Model3D.vue';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { onMounted, ref } from 'vue';

  // 3D
  const modelName = ref('iPhone 15 Pro in Black Titanium');
  // const selectedModel = ref(true);
  // const currentId = ref(4);
  // const sizeCircle = ref(null);
  // const title = ref(null);

  const selectedSize = ref('small');
  const sizes = ref([
    { label: '6.1"', value: 'small' },
    { label: '6.7"', value: 'large' },
  ]);
  // const iPhone_sm = ref(null);
  // const iPhone_lg = ref(null);
  const model = ref(null);
  const models_wrapper = ref(null);

  const models = ref([
    {
      id: 1,
      title: 'iPhone 15 Pro in Natural Titanium',
      color: ['#8F8A81', '#ffe7b9', '#6f6c64'],
      modelColor: yellowImg,
    },
    {
      id: 2,
      title: 'iPhone 15 Pro in Blue Titanium',
      color: ['#53596E', '#6395ff', '#21242e'],
      modelColor: blueImg,
    },
    {
      id: 3,
      title: 'iPhone 15 Pro in White Titanium',
      color: ['#C9C8C2', '#ffffff', '#C9C8C2'],
      modelColor: whiteImg,
    },
    {
      id: 4,
      title: 'iPhone 15 Pro in Black Titanium',
      color: ['#454749', '#3b3b3b', '#181819'],
      modelColor: blackImg,
    },
  ]);

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
</script>
