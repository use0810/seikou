import { initInView } from './modules/inview.js';
import { initHamburger } from './modules/hamburger.js';

window.addEventListener('load', () => {
  initInView();
  initHamburger();
});

