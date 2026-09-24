// common.js
import { gsap } from 'gsap';

export default function common() {
  const headerElem = document.querySelector('[data-js-elem="header"]');
  const trigger = document.querySelector('[data-js-trigger="gnav"]');

  // グローバルナビ
  if (trigger && headerElem) {
    // メニュー開閉（イベント委任）
    document.addEventListener('click', (e) => {
      const menuBtn = e.target.closest('[data-js-trigger="menu"]');
      if (!menuBtn) return;

      if (!headerElem.classList.contains('is-active')) {
        headerElem.classList.add('is-active');
      } else {
        headerElem.classList.remove('is-active');
      }
    });

    // スムーススクロール関数
    const scrollToTarget = (href) => {
      const target = href === '#' || href === '' ? 'html' : href;
      if (window.lenis) {
        window.lenis.scrollTo(target, { duration: 1.2 });
      } else {
        gsap.to(window, { duration: 0.4, scrollTo: target, ease: 'power2.out' });
      }
    };

    // Gnav トリガー
    document.addEventListener('click', (e) => {
      const gnavLink = e.target.closest('[data-js-trigger="gnav"]');
      if (!gnavLink) return;

      e.preventDefault();
      const href = gnavLink.getAttribute('href');
      scrollToTarget(href);
    });

    // ヘッダーの縮小・アクティブ解除（Lenisのスクロールイベント利用）
    const handleScroll = () => {
      const currentPos = window.scrollY || document.documentElement.scrollTop;

      if (currentPos > 200) {
        headerElem.classList.add('is-small');
      } else {
        headerElem.classList.remove('is-small');
      }

      if (headerElem.classList.contains('is-active')) {
        headerElem.classList.remove('is-active');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // 汎用アンカーリンク
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('[data-js-trigger="anchor"]');
    if (!anchor) return;

    e.preventDefault();
    const href = anchor.getAttribute('href');
    const target = href === '#' || href === '' ? 'html' : href;

    if (window.lenis) {
      window.lenis.scrollTo(target, { duration: 1.2 });
    } else {
      gsap.to(window, { duration: 0.4, scrollTo: target, ease: 'power2.out' });
    }
  });

  // 追従メニュー処理
  const floatMenu = document.querySelector('[data-js-elem="floatmenu"]');
  const footer = document.querySelector('.footer--site');

  if (floatMenu && footer) {
    const checkFloatMenu = () => {
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.innerHeight + window.scrollY;
      const footerHeight = footer.offsetHeight || 0;

      if (documentHeight - scrollPosition <= footerHeight) {
        floatMenu.classList.add('is-stop');
      } else {
        floatMenu.classList.remove('is-stop');
      }
    };

    window.addEventListener('scroll', checkFloatMenu, { passive: true });
  }
}