<template>
  <TresCanvas
    alpha
    preset="realistic">
    <TresPerspectiveCamera
      visible
      :position="[0, 0, 1]"
      :look-at="[0, 0, 0]" />
    <OrbitControls
      :enableZoom="false"
      :rotateSpeed="0.5"
      :enableDamping="true"
      :dampingFactor="0.1"
      :enablePan="false"
      :autoRotate="true"
      :autoRotateSpeed="100" />
    <Suspense timeout="0">
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
  import { OrbitControls, CameraControls } from '@tresjs/cientos';
  import IphoneModel from './IphoneModel.vue';
  import { gsap } from 'gsap';
  import { store } from '../store';

  const rotationY = ref(0);

  const rotate = (direction) => {
    let angle;
    direction === 'left'
      ? (angle = rotationY.value + 6.3)
      : (angle = rotationY.value - 6.3);
    gsap.to(rotationY, { value: angle, duration: 1, ease: 'power1.inOut' });
  };
</script>
