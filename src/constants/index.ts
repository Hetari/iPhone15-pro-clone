import {
  blackImg,
  blueImg,
  highlightFirstVideo,
  highlightFourthVideo,
  highlightSecondVideo,
  highlightThirdVideo,
  whiteImg,
  yellowImg,
} from '../utils';

// types
type highlightSecondVideoType = {
  id: number;
  textLists: string[];
  video: string;
  videoDuration: number;
};

type modelsType = {
  id: number;
  title: string;
  color: string[];
  img: string;
  modelColor: string;
};

type sizesType = {
  label: string;
  value: string;
};

export const navLists: string[] = [
  'Store',
  'Mac',
  'iPhone',
  'Watch',
  'Vision',
  'AriPods',
  'TV & Home',
  'Entertainment',
  'Accessories',
  'Support',
];

export const highlightsSlides: highlightSecondVideoType[] = [
  {
    id: 1,
    textLists: [
      'Enter A17 Pro.',
      'Game‑changing chip.',
      'Groundbreaking performance.',
    ],
    video: highlightFirstVideo,
    videoDuration: 4,
  },
  {
    id: 2,
    textLists: ['Titanium.', 'So strong. So light. So Pro.'],
    video: highlightSecondVideo,
    videoDuration: 5,
  },
  {
    id: 3,
    textLists: [
      'iPhone 15 Pro Max has the',
      'longest optical zoom in',
      'iPhone ever. Far out.',
    ],
    video: highlightThirdVideo,
    videoDuration: 2,
  },
  {
    id: 4,
    textLists: ['All-new Action button.', 'What will yours do?.'],
    video: highlightFourthVideo,
    videoDuration: 3.63,
  },
];

export const models: modelsType[] = [
  {
    id: 1,
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#ffe7b9', '#6f6c64'],
    img: yellowImg,
    modelColor: 'yellow',
  },
  {
    id: 2,
    title: 'iPhone 15 Pro in Blue Titanium',
    color: ['#53596E', '#6395ff', '#21242e'],
    img: blueImg,
    modelColor: 'blue',
  },
  {
    id: 3,
    title: 'iPhone 15 Pro in White Titanium',
    color: ['#C9C8C2', '#ffffff', '#C9C8C2'],
    img: whiteImg,
    modelColor: 'white',
  },
  {
    id: 4,
    title: 'iPhone 15 Pro in Black Titanium',
    color: ['#454749', '#3b3b3b', '#181819'],
    img: blackImg,
    modelColor: 'black',
  },
];

export const sizes: sizesType[] = [
  { label: '6.1"', value: 'small' },
  { label: '6.7"', value: 'large' },
];

export const footerLinks: string[] = [
  'Privacy Policy',
  'Terms of Use',
  'Sales Policy',
  'Legal',
  'Site Map',
];
