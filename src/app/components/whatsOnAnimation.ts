import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function createWhatsOnAnimation(section: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const select = gsap.utils.selector(section);
  const journey = section.closest<HTMLElement>('[data-collection-journey]');
  const previous = section.previousElementSibling ?? journey?.previousElementSibling;
  const photo = previous?.querySelector('[data-about-photo]');
  let disposed = false;
  const media = gsap.matchMedia();

  const context = gsap.context(() => {
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        section.dataset.featureReady = 'false';
        const timeline = gsap.timeline({ defaults: { ease: 'none' } });
        // Only the exit of the archive photo is touched. Its approved entrance,
        // placement and crop are owned by About; this context restores its styles.
        if (photo)
          timeline.fromTo(photo, { y: 0, opacity: 1 }, { y: -12, opacity: 0.86, duration: 25 }, 0);
        const paths = section.querySelectorAll<SVGPathElement>('[data-feature-geometry] path');
        gsap.set(paths, { strokeDasharray: '1 1', strokeDashoffset: 1 });
        paths.forEach((path) => path.setAttribute('pathLength', '1'));
        timeline.to(select('[data-feature-spine]'), { strokeDashoffset: 0, duration: 32 }, 6);
        timeline.to(select('[data-feature-diagonal]'), { strokeDashoffset: 0, duration: 34 }, 25);
        timeline.to(select('[data-feature-node]'), { strokeDashoffset: 0, duration: 22 }, 35);
        timeline.fromTo(
          select('[data-feature-red-mask]'),
          { clipPath: 'polygon(2% 0, 2% 0, 62% 100%, 62% 100%)' },
          {
            clipPath: () =>
              matchMedia('(max-width: 767px)').matches
                ? 'polygon(0% 0, 34% 0, 100% 100%, 75% 100%)'
                : 'polygon(2% 0, 42% 0, 98% 100%, 62% 100%)',
            duration: 32,
          },
          35
        );
        timeline.fromTo(
          select('[data-feature-mask]'),
          { clipPath: 'polygon(48% 38%, 48% 38%, 53% 58%, 53% 58%, 50.5% 48%, 49.25% 43%)' },
          {
            clipPath: 'polygon(14% 0%, 100% 0%, 100% 85%, 86% 100%, 0% 100%, 0% 16%)',
            duration: 37,
          },
          48
        );
        const reveal = (name: string, start: number, duration = 14) =>
          timeline.fromTo(
            select(`[data-feature-reveal="${name}"]`),
            { autoAlpha: 0, y: 9 },
            { autoAlpha: 1, y: 0, duration, ease: 'power2.out' },
            start
          );
        reveal('label', 61);
        reveal('title', 65, 19);
        reveal('subtitle', 71);
        reveal('dates', 73);
        reveal('status', 77);
        reveal('copy', 81);
        reveal('credit', 82);
        reveal('actions', 86);
        ScrollTrigger.create({
          id: 'savitsky-whats-on',
          trigger: section,
          animation: timeline,
          start: 'top 92%',
          end: 'top 12%',
          scrub: 0.25,
          pin: false,
          refreshPriority: -20,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (self.progress < 0.995) section.dataset.featureReady = 'false';
          },
          onScrubComplete: () => {
            section.dataset.featureReady = String(timeline.progress() >= 0.995);
          },
          onRefresh: () => {
            section.dataset.featureReady = String(timeline.progress() >= 0.995);
          },
        });
        return () => {
          delete section.dataset.featureReady;
        };
      },
      section
    );
  }, section);

  const updateContrast = () => {
    const bounds = section.getBoundingClientRect();
    const edge = document.querySelector('nav[aria-label="Main navigation"]')?.clientHeight ?? 80;
    document.documentElement.toggleAttribute(
      'data-museum-feature',
      bounds.top <= edge && bounds.bottom > edge && !journey?.hasAttribute('data-light-stage')
    );
  };
  const refresh = () => {
    if (!disposed) {
      ScrollTrigger.refresh();
      updateContrast();
    }
  };
  const image = section.querySelector('img')!;
  image.addEventListener('load', refresh);
  window.addEventListener('scroll', updateContrast, { passive: true });
  window.addEventListener('resize', updateContrast);
  void document.fonts.ready.then(refresh);
  refresh();
  return () => {
    disposed = true;
    image.removeEventListener('load', refresh);
    window.removeEventListener('scroll', updateContrast);
    window.removeEventListener('resize', updateContrast);
    document.documentElement.removeAttribute('data-museum-feature');
    media.revert();
    context.revert();
  };
}
