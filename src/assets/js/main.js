// main.js
import configuration from './_module/configuration';
import common from './_module/common';
import animation from './_module/animation';
import { refreshLenis } from './_module/lenis';

document.addEventListener('DOMContentLoaded', () => {
  configuration();
  common();

  if (document.body.classList.contains('page-home')) {
    animation();
  }

  if (document.body.classList.contains('page-cp')) {
    const initCookiePolicy = () => {
      const target = document.querySelector('.sec__inner');
      if (!target) return;

      const observer = new MutationObserver(() => {
        const declaration = document.querySelector('.CookieDeclaration');
        if (!declaration) return;
        observer.disconnect();
        refreshLenis();
      });

      observer.observe(target, {
        childList: true,
        subtree: true,
      });
    };
    initCookiePolicy();
  }
});