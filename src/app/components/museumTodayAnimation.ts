import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function createMuseumTodayAnimation(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const select = gsap.utils.selector(root);
  const media = gsap.matchMedia();
  let disposed = false;

  const context = gsap.context(() => {
    media.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const transitionArea = root.querySelector<HTMLElement>('[data-today-transition]');
        const mainSection = root.querySelector<HTMLElement>('[data-today-main]');
        if (!transitionArea || !mainSection) return;

        // Elements
        const textile = select('[data-transition-textile]');
        const spineSecondary = select('[data-spine-secondary]');
        const spineCore = select('[data-spine-core]');
        const transitionCopy = select('[data-transition-copy]');
        const scrollCue = select('[data-transition-cue]');

        const topRule = select('[data-top-rule]');
        const mainTitleLines = select('[data-title-line]');
        const subtitle = select('[data-today-subtitle]');
        const copy = select('[data-today-copy]');
        const cta = select('[data-today-cta]');
        const heroImg = select('[data-hero-img]');
        const rightMeta = select('[data-right-meta]');
        const leftGuide = select('[data-left-guide]');
        const storyCards = select('[data-story-card]');
        const bottomBridge = select('[data-bottom-bridge]');

        // Initial setup for smooth vertical flow
        gsap.set(spineSecondary, { autoAlpha: 1 });
        gsap.set(spineCore, { autoAlpha: 1, scaleY: 1 });
        gsap.set(transitionCopy, { autoAlpha: 0, y: 15 });
        gsap.set(scrollCue, { autoAlpha: 0.8 });

        gsap.set(topRule, { scaleX: 0.85, autoAlpha: 0.4, transformOrigin: '0% 50%' });
        gsap.set(mainTitleLines, { yPercent: 110 });
        gsap.set([subtitle, copy, cta], { autoAlpha: 0, y: 20 });
        gsap.set(heroImg, {
          clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          scale: 1.05,
        });
        gsap.set(rightMeta, { autoAlpha: 0, x: 20 });
        gsap.set(leftGuide, { autoAlpha: 0, y: 25 });
        gsap.set(storyCards, { autoAlpha: 0, y: 35 });
        gsap.set(bottomBridge, { autoAlpha: 0 });

        // Coordinated Transition Timeline (Reference B)
        const transitionTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'savitsky-today-transition',
            trigger: transitionArea,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });

        // 0–20%: Stable, text appears
        transitionTl.to(transitionCopy, { autoAlpha: 1, y: 0, duration: 15 }, 0);
        // 15–35%: Secondary ornament paths fade, textile moves upward & softens
        transitionTl.to(
          textile,
          {
            yPercent: -12,
            opacity: 0.08,
            filter: 'contrast(0.5) saturate(0.3) brightness(0.5)',
            duration: 35,
          },
          10
        );
        transitionTl.to(spineSecondary, { autoAlpha: 0, duration: 20 }, 15);
        // 35–60%: Ornament simplifies to vertical core rule, cues fade out
        transitionTl.to(transitionCopy, { autoAlpha: 0, y: -10, duration: 15 }, 35);
        transitionTl.to(scrollCue, { autoAlpha: 0, duration: 10 }, 35);
        transitionTl.to(spineCore, { scaleY: 1.15, transformOrigin: '50% 100%', duration: 25 }, 35);

        // Coordinated Main Section Timeline (Reference A)
        const mainTl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'savitsky-today-main',
            trigger: mainSection,
            start: 'top 75%',
            end: 'top 15%',
            scrub: 0.55,
            invalidateOnRefresh: true,
          },
        });

        // 50–70%: Museum Today grid begins forming
        mainTl.to(topRule, { scaleX: 1, autoAlpha: 1, duration: 20 }, 0);
        mainTl.to(leftGuide, { autoAlpha: 1, y: 0, duration: 22 }, 5);

        // 55–80%: Main documentary image reveals with clip-path mask from right-to-left
        mainTl.to(
          heroImg,
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            scale: 1,
            duration: 35,
            ease: 'power2.inOut',
          },
          8
        );

        // 65–85%: MUSEUM TODAY title appears line-by-line
        mainTl.to(
          mainTitleLines,
          {
            yPercent: 0,
            duration: 24,
            stagger: 6,
            ease: 'power3.out',
          },
          12
        );

        mainTl.to(subtitle, { autoAlpha: 1, y: 0, duration: 16, ease: 'power2.out' }, 20);
        mainTl.to(
          [copy, cta],
          { autoAlpha: 1, y: 0, duration: 18, stagger: 4, ease: 'power2.out' },
          24
        );
        mainTl.to(rightMeta, { autoAlpha: 1, x: 0, duration: 20, ease: 'power2.out' }, 28);

        // 75–100%: Story teasers and bottom bridge resolve
        mainTl.to(
          storyCards,
          {
            autoAlpha: 1,
            y: 0,
            duration: 25,
            stagger: 8,
            ease: 'power2.out',
          },
          35
        );
        mainTl.to(bottomBridge, { autoAlpha: 1, duration: 15 }, 50);
      },
      root
    );

    // Tablet & Mobile viewport logic (< 1024px)
    media.add('(max-width: 1023px)', () => {
      const storyCards = select('[data-story-card]');
      const heroImg = select('[data-hero-img]');
      const titleLines = select('[data-title-line]');

      gsap.set(titleLines, { yPercent: 0 });
      gsap.set(heroImg, { clipPath: 'none', scale: 1 });
      gsap.set(storyCards, { autoAlpha: 1, y: 0 });

      ScrollTrigger.batch(storyCards, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => {
          gsap.from(batch, {
            autoAlpha: 0,
            y: 24,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
          });
        },
      });
    });

    // Prefers-reduced-motion fallback
    media.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(select('[data-title-line]'), { yPercent: 0 });
      gsap.set(select('[data-hero-img]'), { clipPath: 'none', scale: 1 });
      gsap.set(
        select(
          '[data-today-subtitle], [data-today-copy], [data-today-cta], [data-story-card], [data-bottom-bridge], [data-right-meta], [data-left-guide], [data-top-rule]'
        ),
        { autoAlpha: 1, y: 0, x: 0, scaleX: 1 }
      );
      gsap.set(select('[data-transition-copy]'), { autoAlpha: 1, y: 0 });
    });
  }, root);

  const images = Array.from(root.querySelectorAll('img'));
  Promise.allSettled([
    ...images.map((img) => (img.complete ? Promise.resolve() : img.decode())),
    document.fonts.ready,
  ]).then(() => {
    if (!disposed) ScrollTrigger.refresh();
  });

  return () => {
    disposed = true;
    media.revert();
    context.revert();
  };
}
