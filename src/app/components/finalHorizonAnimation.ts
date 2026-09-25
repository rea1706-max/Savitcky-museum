import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function createFinalHorizonAnimation(scene: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const select = gsap.utils.selector(scene);
  const media = gsap.matchMedia();
  let disposed = false;

  const context = gsap.context(() => {
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const enter = gsap.timeline({ defaults: { ease: 'none' } });
      enter.fromTo(
        select('[data-horizon-aperture]'),
        { clipPath: 'inset(14% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1 },
        0
      );
      enter.fromTo(
        select('[data-horizon-bleed]'),
        { opacity: 1 },
        { opacity: 0.72, duration: 1 },
        0
      );
      ScrollTrigger.create({
        id: 'savitsky-final-horizon-aperture',
        trigger: scene,
        animation: enter,
        start: 'top bottom',
        end: 'top 12%',
        scrub: 0.5,
        invalidateOnRefresh: true,
      });

      gsap.fromTo(
        select('[data-horizon-image]'),
        { scale: 1 },
        {
          scale: 1.02,
          ease: 'none',
          scrollTrigger: {
            id: 'savitsky-final-horizon-drift',
            trigger: scene,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        }
      );

      const copy = gsap.timeline({ defaults: { ease: 'power2.out' } });
      copy.fromTo(
        select('[data-horizon-title]'),
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.16 },
        0
      );
      copy.fromTo(
        select('[data-horizon-meta]'),
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 },
        0.38
      );
      ScrollTrigger.create({
        id: 'savitsky-final-horizon-copy',
        trigger: scene,
        animation: copy,
        start: 'top 55%',
        end: 'top 6%',
        scrub: 0.45,
        invalidateOnRefresh: true,
      });
    });

    media.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      const reveal = gsap.timeline({ defaults: { ease: 'none' } });
      reveal.fromTo(
        select('[data-horizon-aperture]'),
        { clipPath: 'inset(9% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1 },
        0
      );
      reveal.fromTo(
        select('[data-horizon-image]'),
        { scale: 1.035, yPercent: -1.5 },
        { scale: 1, yPercent: 0, duration: 1 },
        0
      );
      reveal.fromTo(
        select('[data-horizon-title]'),
        { yPercent: 108 },
        { yPercent: 0, duration: 0.56, stagger: 0.1, ease: 'power2.out' },
        0.24
      );
      reveal.fromTo(
        select('[data-horizon-meta]'),
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.08, ease: 'power2.out' },
        0.5
      );

      ScrollTrigger.create({
        id: 'savitsky-final-horizon-responsive',
        trigger: scene,
        animation: reveal,
        start: 'top 88%',
        end: 'top 20%',
        scrub: 0.42,
        invalidateOnRefresh: true,
      });
    });
  }, scene);

  const image = scene.querySelector<HTMLImageElement>('[data-horizon-image]');
  const refresh = () => {
    if (!disposed) ScrollTrigger.refresh();
  };
  image?.addEventListener('load', refresh);
  void document.fonts.ready.then(refresh);
  refresh();

  return () => {
    disposed = true;
    image?.removeEventListener('load', refresh);
    media.revert();
    context.revert();
  };
}
