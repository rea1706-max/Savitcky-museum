import type Lenis from 'lenis';

// The page-wide smooth scroller, when one is running (mouse and trackpad only).
let instance: Lenis | null = null;

export function setSmoothScroller(lenis: Lenis | null) {
  instance = lenis;
}

/**
 * Scrolls the page through the smooth scroller when present, so the two never fight.
 * `duration` (seconds) gives an eased glide of fixed length instead of the default lerp.
 */
export function scrollToPosition(top: number, immediate = false, duration?: number) {
  const target = Math.max(0, top);
  if (instance) {
    // Pins and late images change the page height; re-measure so the target is not clamped.
    instance.resize();
    instance.scrollTo(
      target,
      immediate
        ? { immediate: true, force: true }
        : {
            force: true,
            duration,
            easing: duration ? (t: number) => 1 - Math.pow(1 - t, 3) : undefined,
          }
    );
    return;
  }
  window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
}

export function pauseSmoothScroll(paused: boolean) {
  if (paused) instance?.stop();
  else instance?.start();
}
