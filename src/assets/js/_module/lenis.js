// lenis.js
// ページの高さが可変してマウスホイールでのスクロールが動作しない場合の追加処理
export const refreshLenis = () => {
  requestAnimationFrame(() => {
    window.lenis?.resize();
    window.lenis?.start();
  });
};