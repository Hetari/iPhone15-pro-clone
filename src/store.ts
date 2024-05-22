import { reactive } from 'vue';

const store = reactive({
  phoneColor: 'yellow',
  rotateL: true,
  rotateR: false,
  isLinkHovered: false,
  isBtnHovered: false,
  isHovered: false,
  isVideoHovered: false,
  hoveredCircleSize: 1,
});

export { store };
