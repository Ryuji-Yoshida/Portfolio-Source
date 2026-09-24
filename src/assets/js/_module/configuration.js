// configuration.js
import { bodyTag } from './constants';

export default function configuration() {
  // DOM Ready（DOMContentLoaded）
  document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;

    // ブラウザ IE判定
    const regexpIE = /msie|trident/i;
    if (regexpIE.test(navigator.userAgent)) {
      body.classList.add('ua-ie');
    }

    // SP判定（メディアクエリ & UA）
    const winSize = window.matchMedia('(max-width: 1024px)');
    const handleMQ = (mq) => {
      if (mq.matches) {
        body.classList.add('mq-sp');
      } else {
        body.classList.remove('mq-sp');
      }
    };
    winSize.addListener(handleMQ);
    handleMQ(winSize);

    const regexpSP = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    if (regexpSP.test(navigator.userAgent)) {
      body.classList.add('ua-sp');
    }

    // target="_blank" rel属性付与
    document.querySelectorAll('a[target="_blank"]').forEach((a) => {
      a.setAttribute('rel', 'noopener noreferrer');
    });
  });
}