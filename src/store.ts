import { reactive } from 'vue';

const store = reactive({
  phoneColor: 'yellow',
  rotateL: true,
  rotateR: false,
  isLinkHovered: false,
  isHovered: false,
  hoverCol: '',
});

export { store };
