import type Lenis from 'lenis';

// The page-wide smooth scroller, when one is running (mouse and trackpad only).
let instance: Lenis | null = null;

export function setSmoothScroller(lenis: Lenis | null) {
  instance = lenis;
}

/** Scrolls the page through the smooth scroller when present, so the two never fight. */
export function scrollToPosition(top: number, immediate = false) {
  const target = Math.max(0, top);
  if (instance) {
    instance.scrollTo(target, immediate ? { immediate: true, force: true } : { force: true });
    return;
  }
  window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
}

export function pauseSmoothScroll(paused: boolean) {
  if (paused) instance?.stop();
  else instance?.start();
}
