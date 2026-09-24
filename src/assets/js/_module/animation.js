// animation.js
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
        logoCls1.removeEventListener('animationend', handleLogoEnd);
      };
      logoCls1.addEventListener('animationend', handleLogoEnd);
    }

    const header = document.querySelector('.header--site');
    if (header) {
      const handleHeaderEnd = () => {
        html.classList.remove('is-anime');
        header.removeEventListener('transitionend', handleHeaderEnd);
      };
      header.addEventListener('transitionend', handleHeaderEnd);
    }
  } else if (visit) {
    html.classList.add('is-visit');
    document.querySelectorAll('[data-js-anime="sec"]').forEach((el) => {
      el.removeAttribute('data-js-anime');
    });
    window.lenis?.start();
  }

  // スクロールアニメーション（IntersectionObserverで発火）
  const animeTargets = document.querySelectorAll('[data-js-anime="sec"]');
  if (animeTargets.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-anime');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -20% 0px', }
    );

    animeTargets.forEach((target) => observer.observe(target));
  }
}