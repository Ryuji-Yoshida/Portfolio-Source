// configuration.js
export default function configuration() {
  const body = document.body;

  // IE判定（必要に応じて維持）
  const regexpIE = /msie|trident/i;
  if (regexpIE.test(navigator.userAgent)) {
    body.classList.add('ua-ie');
  }

  // SP判定（メディアクエリ）
  const winSize = window.matchMedia('(max-width: 1024px)');
  const handleMQ = (e) => {
    if (e.matches) {
      body.classList.add('mq-sp');
    } else {
      body.classList.remove('mq-sp');
    }
  };

  // Modern syntax
  if (winSize.addEventListener) {
    winSize.addEventListener('change', handleMQ);
  } else {
    winSize.addListener(handleMQ); // レガシー対応
  }
  handleMQ(winSize);

  // SP UA判定
  const regexpSP = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  if (regexpSP.test(navigator.userAgent)) {
    body.classList.add('ua-sp');
  }

  // target="_blank" に rel 属性を自動付与
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    a.setAttribute('rel', 'noopener noreferrer');
  });
}