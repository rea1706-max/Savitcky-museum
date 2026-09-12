'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, type MouseEvent, type ComponentProps } from 'react';
import styles from './exhibitionEnvironment.module.css';

function apertureOrigin(link: HTMLAnchorElement) {
  const geometry = link
    .closest('#whats-on')
    ?.querySelector<SVGSVGElement>('[data-feature-geometry]');
  const matrix = geometry?.getScreenCTM();
  // The two existing diamond nodes, in the ornament's SVG coordinates.
  if (matrix) {
    for (const [x, y] of [
      [504, 326],
      [1224, 440],
    ]) {
      const point = new DOMPoint(x, y).matrixTransform(matrix);
      if (point.x > 0 && point.x < innerWidth && point.y > 80 && point.y < innerHeight)
        return point;
    }
  }
  // On narrow screens the artwork may have scrolled away before its final CTA.
  const bounds = link.getBoundingClientRect();
  return new DOMPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
}

export default function ExhibitionTransitionLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const router = useRouter();
  const running = useRef(false);
  useEffect(() => {
    router.prefetch('/exhibitions');
    const hall = new Image();
    hall.src = '/images/exhibitions/museum-hall.png';
  }, [router]);

  const navigate = async (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.currentTarget.target === '_blank' ||
      typeof href !== 'string' ||
      matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return;
    event.preventDefault();
    if (running.current || document.querySelector('[data-exhibition-transition]')) return;
    running.current = true;
    const { x, y } = apertureOrigin(event.currentTarget);
    const radius = Math.max(x, innerWidth - x) + Math.max(y, innerHeight - y) + 32;
    const diamond = (r: number) =>
      `polygon(${x}px ${y - r}px, ${x + r}px ${y}px, ${x}px ${y + r}px, ${x - r}px ${y}px)`;
    const plane = document.createElement('div');
    plane.dataset.exhibitionTransition = '';
    plane.setAttribute('aria-hidden', 'true');
    plane.className = `${styles.aperture} ${styles.environment}`;
    plane.style.clipPath = diamond(8);
    const hero = document.createElement('div');
    hero.className = styles.hero;
    const hall = document.createElement('div');
    hall.className = styles.hall;
    hero.append(hall);
    plane.append(hero);
    document.body.append(plane);
    let release: () => void = () => {};
    const ready = new Promise<void>((resolve) => {
      release = resolve;
    });
    window.addEventListener('savitsky:exhibitions-ready', release, { once: true });
    let fallback: ReturnType<typeof setTimeout> | undefined;
    const animations: Animation[] = [];
    try {
      const expansion = plane.animate([{ clipPath: diamond(8) }, { clipPath: diamond(radius) }], {
        duration: 470,
        easing: 'cubic-bezier(.45,0,.15,1)',
        fill: 'forwards',
      });
      animations.push(expansion);
      await expansion.finished;
      router.push(href, { scroll: false });
      fallback = setTimeout(release, 1600);
      await ready;
      // Reveal the page only after its matching hero has painted at the top.
      window.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );
      const resolve = plane.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 260,
        easing: 'ease-out',
        fill: 'forwards',
      });
      animations.push(resolve);
      await resolve.finished;
    } finally {
      clearTimeout(fallback);
      window.removeEventListener('savitsky:exhibitions-ready', release);
      animations.forEach((animation) => animation.cancel());
      plane.remove();
      running.current = false;
    }
  };
  return <Link {...props} href={href} onClick={navigate} />;
}
