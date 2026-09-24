// library.js
import Cookies from 'js-cookie';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// GSAPプラグインの登録
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// グローバル公開
window.Cookies = Cookies;
window.Lenis = Lenis;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

// 画面初期化
document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis({
    smoothWheel: true,
  });
  window.lenis = lenis;

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});