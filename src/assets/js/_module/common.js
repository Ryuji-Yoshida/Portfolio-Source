// common.js
import { click } from './constants';

export default function common() {
  // グローバルナビ
  const elem = '[data-js-elem="header"]';
  const trigger = '[data-js-trigger="gnav"]';
  const menu = '[data-js-trigger="menu"]';

  if (document.querySelectorAll(trigger).length) {
    // メニュー開閉
    document.addEventListener(click, (e) => {
      const openTarget = e.target.closest(`[data-js-elem="header"]:not(.is-active) ${menu}`);
      if (openTarget) {
        document.querySelectorAll(elem).forEach((el) => el.classList.add('is-active'));
      }

      const closeTarget = e.target.closest(`.is-active[data-js-elem="header"] ${menu}`);
      if (closeTarget) {
        document.querySelectorAll(elem).forEach((el) => el.classList.remove('is-active'));
      }
    });

    // スムーススクロール（Gnav）
    window.addEventListener('load', () => {
      document.addEventListener(click, (e) => {
        const triggerEl = e.target.closest(trigger);
        if (!triggerEl) return;

        e.preventDefault();
        const href = triggerEl.getAttribute('href');
        const target = (href === '#' || href === '') ? document.documentElement : document.querySelector(href);
        if (!target) return;

        const pos = target.getBoundingClientRect().top + window.scrollY;

        // GSAP ScrollToPlugin が使える場合はアニメーション処理（元の $.animate 相当）
        if (window.gsap) {
          window.gsap.to(window, { duration: 0.4, scrollTo: pos, ease: 'power1.inOut' });
        } else {
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      });
    });

    // ヘッダー縮小・アクティブ解除
    const handleHeaderScroll = () => {
      const thisPos = window.scrollY || document.documentElement.scrollTop;
      document.querySelectorAll(elem).forEach((el) => {
        if (thisPos > 200) {
          el.classList.add('is-small');
        } else {
          el.classList.remove('is-small');
        }
        if (el.classList.contains('is-active')) {
          el.classList.remove('is-active');
        }
      });
    };

    window.addEventListener('load', handleHeaderScroll);
    window.addEventListener('scroll', handleHeaderScroll);
  }

  // アンカーリンク
  const anchorTrigger = '[data-js-trigger="anchor"]';
  document.addEventListener(click, (e) => {
    const anchorEl = e.target.closest(anchorTrigger);
    if (!anchorEl) return;

    e.preventDefault();
    const href = anchorEl.getAttribute('href');
    const target = (href === '#' || href === '') ? document.documentElement : document.querySelector(href);
    if (!target) return;

    const position = target.getBoundingClientRect().top + window.scrollY;

    if (window.gsap) {
      window.gsap.to(window, { duration: 0.4, scrollTo: position, ease: 'power1.inOut' });
    } else {
      window.scrollTo({ top: position, behavior: 'smooth' });
    }
  });

  // 追従メニュー（元の計算ロジックそのまますげ替え）
  window.addEventListener('scroll', () => {
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.innerHeight + (window.scrollY || document.documentElement.scrollTop);
    const footer = document.querySelector('.footer--site');
    const footerHeight = footer ? footer.offsetHeight : 0;

    const floatMenu = document.querySelector('[data-js-elem="floatmenu"]');
    if (!floatMenu) return;

    if (documentHeight - scrollPosition <= footerHeight) {
      floatMenu.classList.add('is-stop');
    } else {
      floatMenu.classList.remove('is-stop');
    }
  });
}