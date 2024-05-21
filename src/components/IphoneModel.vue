<template>
  <primitive :object="scene" />
</template>

<script setup>
  import { store } from '@/store';
  import { useGLTF } from '@tresjs/cientos';
  import { ref, onMounted, watch } from 'vue';
  const { scene, materials } = await useGLTF('./models/scene.glb', {
    draco: true,
  });

  const cameraNotch = ref(null);
  const dispBorder = ref(null);
  const screen = ref(null);
  const cameras = ref(null);
  const flashBorder = ref(null);
  const lato = ref(null);
  const slot = ref(null);
  const back = ref(null);
  const back2 = ref(null);
  const back3 = ref(null);
  const back4 = ref(null);
  const logo = ref(null);
  const fret1 = ref(null);
  const fret2 = ref(null);
  const fret3 = ref(null);

  watch(
    () => store.phoneColor,
    (newColor) => {
      setColor(colors[newColor]);
    }
  );

  const colors = {
    black: { col1: '#454749', col2: '#000000' },
    yellow: { col1: '#8F8A81', col2: '#0a0906' },
    blue: { col1: '#53596E', col2: '#04051D' },
    white: { col1: '#C9C8C2', col2: '#000000' },
  };

  onMounted(() => {
    cameraNotch.value = materials['ujsvqBWRMnqdwPx'];
    dispBorder.value = materials['zFdeDaGNRwzccye'];
    screen.value = materials['pIJKfZsazmcpEiU'];
    cameras.value = materials['hUlRcbieVuIiOXG'];
    flashBorder.value = materials['PaletteMaterial001'];
    lato.value = materials['eShKpuMNVJTRrgg'];
    slot.value = materials['jpGaQNgTtEGkTfo'];
    back.value = materials['oZRkkORNzkufnGD'];
    back2.value = materials['yhcAXNGcJWCqtIS'];
    back3.value = materials['bCgzXjHOanGdTFV'];
    back4.value = materials['vhaEJjZoqGtyLdo'];
    fret1.value = materials['PaletteMaterial002'];
    logo.value = materials['PaletteMaterial003'];
    fret2.value = materials['jlzuBkUzuJqgiAK'];
    fret3.value = materials['HGhEhpqSBZRnjHC'];

    setColor(colors[store.phoneColor]);
  });

  const setColor = (newColor) => {
    cameraNotch.value.color.set(newColor.col2);
    dispBorder.value.color.set(newColor.col2);
    screen.value.color.set(newColor.col2);
    screen.value.roughness = 1;
    screen.value.refractionRatio = 0.9;
    screen.value.metalness = 0.5;
    flashBorder.value.color.set(newColor.col1);
    lato.value.color.set(newColor.col1);
    lato.value.metalness = 0.9;
    slot.value.color.set(newColor.col1);
    back.value.color.set(newColor.col1);
    back2.value.color.set(newColor.col1);
    back3.value.color.set(newColor.col1);
    back4.value.color.set(newColor.col1);
    back4.value.roughness = 0;
    fret1.value.color.set(newColor.col2);
    fret2.value.color.set(newColor.col2);
    fret3.value.color.set(newColor.col2);
  };
</script>
