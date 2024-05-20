<template>
  <TresCanvas
    alpha
    preset="realistic">
    <TresPerspectiveCamera
      visible
      :position="cameraPosition1"
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
      :position="lightPosition1"
      :intensity="2" />

    <!-- Additional lights -->
    <TresDirectionalLight
      :position="lightPosition2"
      :intensity="0.5" />
    <TresDirectionalLight
      :position="lightPosition3"
      :intensity="2" />
    <TresDirectionalLight
      :position="lightPosition4"
      :intensity="0.5" />
  </TresCanvas>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { TresCanvas } from '@tresjs/core';
  import { OrbitControls } from '@tresjs/cientos';
  import IphoneModel from './IphoneModel.vue';
  import { gsap } from 'gsap';
  import { store } from '../store';
  import { Vector3 } from 'three';

  // Define light positions using Vector3
  const cameraPosition1 = new Vector3(0, 0, 1);
  const lightPosition1 = new Vector3(10, 0, 0);
  const lightPosition2 = new Vector3(-10, -10, -10);
  const lightPosition3 = new Vector3(0, 10, -10);
  const lightPosition4 = new Vector3(0, -10, 10);

  const rotationY = ref(0);

  watch(
    () => store.rotateL,
    (newVal) => newVal && rotate('left')
  );
  watch(
    () => store.rotateR,
    (newVal) => newVal && rotate('right')
  );

  const rotate = (direction: 'left' | 'right') => {
    let angle: number;
    const rotationAmount: number = 2 * Math.PI; // Rotate by 360 degrees

    // Check the direction to determine the angle of rotation
    if (direction === 'left') {
      angle = rotationY.value + rotationAmount;
    } else {
      angle = rotationY.value - rotationAmount;
    }
    // Animate the rotation using GreenSock Animation Platform
    gsap.to(rotationY, { value: angle, duration: 1, ease: 'power1.inOut' });
  };
</script>
