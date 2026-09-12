import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Loaded by the About client effect. Stage 01 and its timeline remain independent.
export function createAboutAnimation(section: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const select = gsap.utils.selector(section);
  const infoStrip = section.previousElementSibling as HTMLElement | null;
  const entrance = infoStrip?.matches('[data-museum-info]') ? infoStrip : section;
  const navigation = document.querySelector<HTMLElement>('[aria-label="Main navigation"]');
  let disposed = false;
  let media: gsap.MatchMedia;

  // Contextual contrast only: the approved navigation component and layout are untouched.
  const updateNavigationContrast = () => {
    const edge = navigation?.offsetHeight ?? 0;
    const active =
      entrance.getBoundingClientRect().top <= edge && section.getBoundingClientRect().bottom > edge;
    document.documentElement.toggleAttribute('data-museum-archive', active);
  };

  const context = gsap.context(() => {
    media = gsap.matchMedia();
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const handoff = section.querySelector<HTMLElement>('[data-about-handoff]')!;
        const timeline = gsap.timeline({ defaults: { ease: 'none' } });
        const placements: {
          tween: gsap.core.Tween;
          position: () => number;
          duration: () => number;
        }[] = [];
        let viewport = handoff.clientHeight;
        let stripHeight = entrance === section ? 0 : entrance.offsetHeight;

        // offsetTop ignores animated transforms and stays reliable after font / viewport changes.
        const offset = (element: HTMLElement) => {
          let top = stripHeight;
          let current: HTMLElement | null = element;
          while (current && current !== section) {
            top += current.offsetTop;
            current = current.offsetParent as HTMLElement | null;
          }
          return top;
        };

        const add = (
          target: gsap.TweenTarget,
          from: gsap.TweenVars,
          to: gsap.TweenVars,
          position: () => number,
          duration: () => number
        ) => {
          gsap.set(target, from);
          timeline.fromTo(target, from, { ...to, duration: 1, immediateRender: false }, 0);
          placements.push({ tween: timeline.recent() as gsap.core.Tween, position, duration });
        };

        add(
          handoff,
          { autoAlpha: 0 },
          { autoAlpha: 1 },
          () => 0,
          () => viewport * 0.22
        );
        add(
          select('[data-about-carry]'),
          { strokeDasharray: '1 1', strokeDashoffset: 1 },
          { strokeDashoffset: 0 },
          () => viewport * 0.04,
          () => viewport * 0.4
        );
        add(
          select('[data-about-structure]'),
          { strokeDasharray: '1 1', strokeDashoffset: 1 },
          { strokeDashoffset: 0 },
          () => stripHeight + viewport * 0.08,
          () => viewport * 0.46
        );

        const reveal = (
          targetSelector: string,
          anchorSelector: string,
          delay: number,
          duration: number,
          y = 10
        ) => {
          const anchor = section.querySelector<HTMLElement>(anchorSelector)!;
          add(
            select(targetSelector),
            { autoAlpha: 0, y },
            { autoAlpha: 1, y: 0 },
            () => offset(anchor) + viewport * delay,
            () => viewport * duration
          );
        };
        reveal('[data-about-label]', '[data-about-label-mask]', 0.06, 0.16, 6);

        section.querySelectorAll<HTMLElement>('[data-about-title-mask]').forEach((mask) => {
          add(
            mask.querySelector('[data-about-title-line]'),
            { yPercent: 108 },
            { yPercent: 0, ease: 'power2.out' },
            () => offset(mask) + viewport * 0.04,
            () => viewport * 0.25
          );
        });

        const photoMask = section.querySelector<HTMLElement>('[data-about-photo-mask]')!;
        add(
          photoMask,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)' },
          () => offset(photoMask) + viewport * 0.12,
          () => Math.min(photoMask.offsetHeight * 0.82, viewport * 0.5)
        );

        section.querySelectorAll<HTMLElement>('[data-about-copy]').forEach((paragraph) => {
          add(
            paragraph,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0 },
            () => offset(paragraph) + viewport * 0.1,
            () => viewport * 0.2
          );
        });
        reveal('[data-about-links]', '[data-about-links-mask]', 0.1, 0.18, 6);
        reveal('[data-about-credit]', '[data-about-credit-mask]', 0.08, 0.18, 6);
        reveal('[data-about-established]', '[data-about-established-mask]', 0.08, 0.2, 6);
        reveal('[data-about-location]', '[data-about-location-mask]', 0.08, 0.2, 6);

        const layout = () => {
          viewport = handoff.clientHeight;
          stripHeight = entrance === section ? 0 : entrance.offsetHeight;
          section.style.setProperty('--about-strip-height', `${stripHeight}px`);
          placements.forEach(({ tween, position, duration }) => {
            tween.duration(duration());
            tween.startTime(position());
          });
        };
        layout();

        ScrollTrigger.create({
          id: 'savitsky-about',
          trigger: entrance,
          animation: timeline,
          // Exactly where the previous visual frame starts leaving the viewport.
          start: 'top bottom',
          end: () => `+=${timeline.duration()}`,
          scrub: 0.35,
          pin: false,
          refreshPriority: -10,
          invalidateOnRefresh: true,
          onRefreshInit: layout,
        });

        return () => section.style.removeProperty('--about-strip-height');
      },
      section
    );
  }, section);

  const refresh = () => {
    if (!disposed) {
      ScrollTrigger.refresh();
      updateNavigationContrast();
    }
  };
  const photo = section.querySelector<HTMLImageElement>('[data-about-photo]')!;
  photo.addEventListener('load', refresh);
  window.addEventListener('scroll', updateNavigationContrast, { passive: true });
  window.addEventListener('resize', updateNavigationContrast);
  void document.fonts.ready.then(refresh);
  refresh();

  return () => {
    disposed = true;
    photo.removeEventListener('load', refresh);
    window.removeEventListener('scroll', updateNavigationContrast);
    window.removeEventListener('resize', updateNavigationContrast);
    document.documentElement.removeAttribute('data-museum-archive');
    media?.revert();
    context.revert();
  };
}
