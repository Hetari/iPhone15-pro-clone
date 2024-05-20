<template>
  <TresCanvas
    alpha
    preset="realistic">
    <TresPerspectiveCamera
      :position="[0, 0, 1]"
      :look-at="[0, 0, 0]" />
    <OrbitControls
      ref="orbitControlsRef"
      :enableZoom="false"
      :rotateSpeed="0.5"
      :enableDamping="true"
      :dampingFactor="0.1"
      :enablePan="false" />
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
      :position="[-100, -10, 40]"
      :intensity="0.5" />
    <TresDirectionalLight
      :position="[0, 20, -10]"
      :intensity="2" />
    <TresDirectionalLight
      :position="[0, -10, 10]"
      :intensity="0.8" />
  </TresCanvas>
</template>

<script setup>
  // lang="ts"

  import { ref } from 'vue';
  import { TresCanvas } from '@tresjs/core';
  import { OrbitControls } from '@tresjs/cientos';
  import IphoneModel from './IphoneModel.vue';
  const rotationY = ref(0);

  import { gsap } from 'gsap';

  // const rotate = (direction) => {
  //   let angle;
  //   direction === 'left'
  //     ? (angle = rotationY.value + 6.3)
  //     : (angle = rotationY.value - 6.3);
  //   gsap.to(rotationY, { value: angle, duration: 1, ease: 'power1.inOut' });
  // };

  // const onStart = () => {
  //   console.log('start');
  // };

  // const onEnd = () => {
  //   console.log('end');
  // };
</script>
