<template>
  <TresCanvas
    alpha
    preset="realistic">
    <TresPerspectiveCamera
      visible
      :position="[0, 0, 1]"
      :look-at="[0, 0, 0]" />
    <OrbitControls
      ref="orbitControlsRef"
      :enableZoom="false"
      :rotateSpeed="0.5"
      :enableDamping="true"
      :dampingFactor="0.1"
      :enablePan="false" />
    <Suspense>
      <IphoneModel
        :rotation="[0, rotationY, 0]"
        ref="iphoneModelRef"
        :scale="4" />
    </Suspense>
    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight
      cast-shadow
      :position="[10, 0, 0]"
      :intensity="2" />

    <!-- Additional lights -->
    <TresDirectionalLight
      :position="[-10, -10, -10]"
      :intensity="0.5" />
    <TresDirectionalLight
      :position="[0, 10, -10]"
      :intensity="2" />
    <TresDirectionalLight
      :position="[0, -10, 10]"
      :intensity="0.5" />
  </TresCanvas>
</template>

<script setup>
  import { ref, watch } from 'vue';
  import { TresCanvas } from '@tresjs/core';
  import { OrbitControls } from '@tresjs/cientos';
  import IphoneModel from './IphoneModel.vue';
  import { gsap } from 'gsap';
  import { store } from '../store.js';

  const rotationY = ref(0);

  // watch(
  //   () => store.rotateL,
  //   (newVal) => newVal && rotate('left')
  // );

  // watch(
  //   () => store.rotateR,
  //   (newVal) => newVal && rotate('right')
  // );
</script>
