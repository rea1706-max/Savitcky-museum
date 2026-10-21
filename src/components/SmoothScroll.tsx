'use client';

import { useEffect } from 'react';
import { setSmoothScroller } from '@/lib/smoothScroll';

// Wheel and trackpad scrolling eases into place instead of jumping tick by tick, and
// every ScrollTrigger reads the same eased position. Touch keeps the native momentum.
export default function SmoothScroll() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches)
      return;

    let disposed = false;
    let cleanup: (() => void) | undefined;
    void Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
        const tick = (time: number) => lenis.raf(time * 1000);
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        setSmoothScroller(lenis);
        cleanup = () => {
          gsap.ticker.remove(tick);
          gsap.ticker.lagSmoothing(500, 33);
          setSmoothScroller(null);
          lenis.destroy();
        };
      }
    );

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
