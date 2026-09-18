import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function createMuseumTodayAnimation(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const select = gsap.utils.selector(root);
  const transition = root.querySelector<HTMLElement>('[data-museum-transition]')!;
  const museum = root.querySelector<HTMLElement>('[data-museum-section]')!;
  const media = gsap.matchMedia();
  let disposed = false;

  const context = gsap.context(() => {
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const transitionPaths = Array.from(
        root.querySelectorAll<SVGPathElement>('[data-transition-ornament] path')
      );
      transitionPaths.forEach((path) => path.setAttribute('pathLength', '1'));

      gsap.set(select('[data-transition-textile]'), {
        autoAlpha: 1,
        scale: 1.025,
        filter: 'saturate(0.98) contrast(0.98)',
      });
      gsap.set(select('[data-transition-shade]'), { autoAlpha: 0.24 });
      gsap.set(select('[data-transition-ornament]'), { autoAlpha: 0.86 });
      gsap.set(select('[data-transition-image]'), {
        clipPath: 'inset(0 0 0 100%)',
        autoAlpha: 0.2,
      });
      gsap.set(select('[data-transition-copy]'), { autoAlpha: 0 });
      gsap.set(select('[data-transition-copy] span'), { yPercent: 105 });
      gsap.set(select('[data-transition-grid-vertical]'), {
        scaleY: 0,
        transformOrigin: '50% 0%',
      });
      gsap.set(select('[data-transition-grid-horizontal]'), {
        scaleX: 0,
        transformOrigin: '0% 50%',
      });
      gsap.set(select('[data-transition-grid-node]'), { scale: 0, rotate: 45 });

      const transitionTimeline = gsap.timeline({ defaults: { ease: 'none' } });
      transitionTimeline.to({}, { duration: 16 });
      transitionTimeline.to(
        select('[data-transition-secondary]'),
        { strokeDashoffset: 1, autoAlpha: 0, duration: 22, stagger: 1.5 },
        15
      );
      transitionTimeline.to(
        select('[data-transition-textile]'),
        { yPercent: -2.5, scale: 1.01, filter: 'saturate(0.66) contrast(0.72)', duration: 42 },
        21
      );
      transitionTimeline.to(
        select('[data-transition-shade]'),
        { autoAlpha: 0.88, duration: 40 },
        24
      );
      transitionTimeline.to(
        select('[data-transition-spine]'),
        { strokeDashoffset: 1, duration: 20 },
        30
      );
      transitionTimeline.to(select('[data-transition-node]'), { scale: 0.44, duration: 19 }, 33);
      transitionTimeline.to(
        select('[data-transition-rule]'),
        { stroke: '#8a7258', autoAlpha: 0.58, duration: 25 },
        36
      );
      transitionTimeline.to(
        select('[data-transition-grid-vertical]'),
        { scaleY: 1, duration: 20, ease: 'power2.out' },
        43
      );
      transitionTimeline.to(
        select('[data-transition-grid-horizontal]'),
        { scaleX: 1, duration: 22, ease: 'power2.out' },
        48
      );
      transitionTimeline.to(
        select('[data-transition-grid-node]'),
        { scale: 1, duration: 14, ease: 'back.out(1.35)' },
        52
      );
      transitionTimeline.to(
        select('[data-transition-image]'),
        { clipPath: 'inset(0 0 0 0%)', autoAlpha: 1, duration: 30, ease: 'power2.inOut' },
        55
      );
      transitionTimeline.to(select('[data-transition-copy]'), { autoAlpha: 1, duration: 16 }, 61);
      transitionTimeline.to(
        select('[data-transition-copy] span'),
        { yPercent: 0, duration: 18, ease: 'power3.out' },
        64
      );
      transitionTimeline.to(
        select('[data-transition-textile]'),
        { autoAlpha: 0.12, duration: 26 },
        68
      );
      transitionTimeline.to(
        select('[data-transition-ornament]'),
        { autoAlpha: 0.18, duration: 22 },
        72
      );
      transitionTimeline.to({}, { duration: 8 });

      ScrollTrigger.create({
        id: 'savitsky-museum-transition',
        trigger: transition,
        animation: transitionTimeline,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.55,
        invalidateOnRefresh: true,
      });

      gsap.set(select('[data-title-line]'), { yPercent: 112 });
      gsap.set(select('[data-museum-kicker], [data-museum-copy], [data-museum-cta]'), {
        autoAlpha: 0,
        y: 18,
      });
      gsap.set(select('[data-museum-main-image] .imageFrame'), {
        clipPath: 'inset(0 0 0 100%)',
      });
      gsap.set(select('[data-museum-aside], [data-museum-note]'), { autoAlpha: 0 });
      gsap.set(select('[data-story-card]'), { autoAlpha: 0, y: 38 });

      const reveal = gsap.timeline({ defaults: { ease: 'power3.out' } });
      reveal.to(select('[data-title-line]'), { yPercent: 0, duration: 1, stagger: 0.12 }, 0);
      reveal.to(
        select('[data-museum-kicker], [data-museum-copy], [data-museum-cta]'),
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09 },
        0.24
      );
      reveal.to(
        select('[data-museum-main-image] .imageFrame'),
        { clipPath: 'inset(0 0 0 0%)', duration: 1.15, ease: 'power2.inOut' },
        0.12
      );
      reveal.to(
        select('[data-museum-aside], [data-museum-note]'),
        { autoAlpha: 1, duration: 0.7 },
        0.65
      );
      reveal.to(
        select('[data-story-card]'),
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.15 },
        0.74
      );

      ScrollTrigger.create({
        id: 'savitsky-museum-today-reveal',
        trigger: museum,
        animation: reveal,
        start: 'top 78%',
        end: 'top 18%',
        scrub: 0.42,
        invalidateOnRefresh: true,
      });

      const parallaxItems = root.querySelectorAll<HTMLElement>(
        '[data-museum-main-image] img, [data-story-card] img'
      );
      parallaxItems.forEach((image) => {
        const trigger = image.closest<HTMLElement>('figure, article') ?? image;
        gsap.fromTo(
          image,
          { yPercent: -2 },
          {
            yPercent: 2,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          }
        );
      });
    });

    media.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(select('[data-transition-secondary]'), { autoAlpha: 0.34 });
      gsap.set(select('[data-transition-image]'), { clipPath: 'inset(0 0 0 100%)' });
      gsap.to(select('[data-transition-image]'), {
        clipPath: 'inset(0 0 0 0%)',
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: transition,
          start: 'top 86%',
          end: 'bottom 30%',
          scrub: 0.45,
        },
      });

      const mobileReveal = gsap.from(
        select('[data-museum-kicker], [data-museum-copy], [data-museum-cta], [data-story-card]'),
        {
          autoAlpha: 0,
          y: 22,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: museum,
            start: 'top 72%',
            once: true,
          },
        }
      );

      return () => mobileReveal.kill();
    });

    ScrollTrigger.create({
      id: 'savitsky-museum-today-nav',
      trigger: root,
      start: 'top 45%',
      end: 'bottom 15%',
      onToggle: ({ isActive }) => {
        document.documentElement.toggleAttribute('data-museum-today', isActive);
      },
    });
  }, root);

  const images = Array.from(root.querySelectorAll('img'));
  Promise.allSettled([...images.map((image) => image.decode()), document.fonts.ready]).then(() => {
    if (!disposed) ScrollTrigger.refresh();
  });

  return () => {
    disposed = true;
    document.documentElement.removeAttribute('data-museum-today');
    media.revert();
    context.revert();
  };
}
