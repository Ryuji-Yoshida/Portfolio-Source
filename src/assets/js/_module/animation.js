// animation.js
import { htmlTag, win } from './constants';
import { refreshLenis } from './lenis';

export default function animation() {
  const html = document.documentElement;

  // ファーストビュー/初回イントロ
  const visit = sessionStorage.getItem('visit');
  if (visit === null) {
    html.classList.add('is-init');

    const logoCls1 = document.querySelector('#logo .cls-1');
    if (logoCls1) {
      const handleLogoEnd = () => {
        html.classList.remove('is-init');
        html.classList.add('is-anime');
        sessionStorage.setItem('visit', 'true');
        refreshLenis();
      };
      logoCls1.addEventListener('animationend', handleLogoEnd);
      logoCls1.addEventListener('webkitAnimationEnd', handleLogoEnd);
    }

    const header = document.querySelector('.header--site');
    if (header) {
      const handleHeaderEnd = () => {
        html.classList.remove('is-anime');
      };
      header.addEventListener('transitionend', handleHeaderEnd);
      header.addEventListener('webkitTransitionEnd', handleHeaderEnd);
    }
  } else if (visit) {
    html.classList.add('is-visit');
    document.querySelectorAll('[data-js-anime="sec"]').forEach((el) => {
      el.removeAttribute('data-js-anime');
    });
    window.lenis?.start();
  }

  // スクロールアニメーション
  window.addEventListener('scroll', () => {
    const elem = '[data-js-anime="sec"]';
    const pos = window.scrollY || document.documentElement.scrollTop;
    const winH = window.innerHeight;

    document.querySelectorAll(elem).forEach((target) => {
      const offset = target.getBoundingClientRect().top + pos;
      const animeStart = pos + winH / 1.2 > offset;
      if (animeStart) {
        target.classList.add('is-anime');
      }
    });
  });
}