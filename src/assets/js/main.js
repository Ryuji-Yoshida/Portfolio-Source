// main.js
// jQueryは library.js 側で window.$ に登録されているため import 不要
import configuration from './_module/configuration';
import common from './_module/common';
import animation from './_module/animation';
import { bodyTag } from './_module/constants';
import { refreshLenis } from './_module/lenis';

// DOM Ready後に各モジュールを実行（グローバルの $ を使用）
$(function () {
  configuration();
  common();

  if ($(bodyTag).hasClass('page-home')) {
    animation();
  }
  if ($(bodyTag).hasClass('page-cp')) {
    const initCookiePolicy = () => {
      const observer = new MutationObserver(() => {
        const declaration = document.querySelector('.CookieDeclaration');
        if (!declaration) return;
        observer.disconnect();
        refreshLenis();
      });
      observer.observe(document.querySelector('.sec__inner'), {
        childList: true,
        subtree: true,
      });
    };
    // Cookiebotによる高さ変動に対応する処理
    initCookiePolicy();
  }
});