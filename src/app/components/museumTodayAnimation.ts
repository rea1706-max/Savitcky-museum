import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function createMuseumTodayAnimation(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const select = gsap.utils.selector(root);
  const museum = root.querySelector<HTMLElement>('[data-museum-section]')!;
  if (!museum) return () => {};

  const media = gsap.matchMedia();
  let disposed = false;

  const context = gsap.context(() => {
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.set(select('[data-title-line]'), { yPercent: 112 });
      gsap.set(select('[data-museum-kicker], [data-museum-copy], [data-museum-cta]'), {
        autoAlpha: 0,
        y: 18,
      });
      gsap.set(select('[data-museum-aside], [data-museum-note]'), { autoAlpha: 0 });
      gsap.set(select('[data-story-card]'), { autoAlpha: 0, y: 38 });

      const reveal = gsap.timeline({ defaults: { ease: 'power3.out' } });
      reveal.to(select('[data-title-line]'), { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0);
      reveal.to(
        select('[data-museum-kicker], [data-museum-copy], [data-museum-cta]'),
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
        0.12
      );
      reveal.to(
        select('[data-story-card]'),
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 },
        0.2
      );
      reveal.to(
        select('[data-museum-aside], [data-museum-note]'),
        { autoAlpha: 1, duration: 0.6 },
        0.35
      );

      ScrollTrigger.create({
        id: 'savitsky-museum-today-reveal',
        trigger: museum,
        animation: reveal,
        start: 'top 78%',
        end: 'top 25%',
        scrub: 0.42,
        invalidateOnRefresh: true,
      });

      const parallaxItems = root.querySelectorAll<HTMLElement>('[data-story-card] img');
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

      gsap.fromTo(
        select('[data-museum-exit-light]'),
        { opacity: 0.18 },
        {
          opacity: 0.95,
          ease: 'none',
          scrollTrigger: {
            id: 'savitsky-museum-to-horizon',
            trigger: museum,
            start: 'bottom bottom',
            end: 'bottom 10%',
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        }
      );
    });

    media.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      const mobileReveal = gsap.from(
        select(
          '[data-museum-kicker], [data-title-line], [data-museum-copy], [data-museum-cta], [data-story-card]'
        ),
        {
          autoAlpha: 0,
          y: 22,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: museum,
            start: 'top 75%',
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
