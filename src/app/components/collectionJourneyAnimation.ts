import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function createCollectionJourney(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  const select = gsap.utils.selector(root);
  const stage = root.querySelector<HTMLElement>('[data-journey-stage]')!;
  const track = root.querySelector<HTMLElement>('[data-journey-track]')!;
  const culture = root.querySelector<HTMLElement>('[data-material-chapter]')!;
  const media = gsap.matchMedia();
  let disposed = false;

  const context = gsap.context(() => {
    media.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const bridgePaths = Array.from(
          root.querySelectorAll<SVGPathElement>('[data-static-path], [data-static-node]')
        );
        const redPlane = select('[data-feature-red-mask]');
        const redField = select('[data-feature-red]');
        const bridgePopova = select('[data-bridge-popova]');
        const bridgeVolkov = select('[data-bridge-volkov]');

        bridgePaths.forEach((node) => node.setAttribute('pathLength', '1'));
        gsap.set(bridgePaths, { strokeDasharray: '1 1', strokeDashoffset: 1 });
        gsap.set(select('[data-bridge-label]'), { autoAlpha: 0 });
        gsap.set(select('[data-mineral-bridge] h2 span'), { autoAlpha: 0, x: 46 });
        gsap.set(select('[data-bridge-note]'), { autoAlpha: 0, y: 10 });
        gsap.set(bridgePopova, {
          xPercent: -14,
          opacity: 0.78,
          clipPath: 'polygon(0 0, 72% 0, 58% 100%, 0 100%)',
        });
        gsap.set(bridgeVolkov, {
          xPercent: 18,
          opacity: 0,
          clipPath: 'polygon(100% 20%, 100% 20%, 100% 80%, 100% 80%)',
        });
        gsap.set(select('[data-static-hinge]'), {
          scaleX: 0.52,
          transformOrigin: '0% 50%',
          clipPath: 'polygon(0 34%, 55% 12%, 100% 50%, 52% 88%, 0 66%)',
        });
        gsap.set(select('[data-collection-label]'), { autoAlpha: 0 });
        gsap.set(select('[data-collection-title]'), { yPercent: 112 });
        gsap.set(select('[data-volkov-mask]'), {
          clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
        });
        gsap.set(select('[data-vessel-mask]'), {
          clipPath: 'polygon(50% 48%, 50% 48%, 50% 52%, 50% 52%)',
        });
        gsap.set(select('[data-volkov-caption], [data-vessel-caption]'), { autoAlpha: 0 });
        gsap.set(select('[data-collection-copy], [data-collection-cta]'), { autoAlpha: 0 });
        gsap.set(select('[data-archive-rule] > span'), { scaleX: 0 });
        gsap.set(select('[data-archive-rule] small'), { autoAlpha: 0 });

        const timeline = gsap.timeline({ defaults: { ease: 'none' } });
        timeline.to(track, { x: () => -(track.scrollWidth - stage.clientWidth), duration: 84 }, 0);
        timeline.to(
          select('[data-feature-image]'),
          { scale: 0.985, opacity: 0.62, duration: 23 },
          2
        );
        timeline.to(
          select('[data-feature-reveal="title"]'),
          { scale: 0.975, opacity: 0.73, transformOrigin: '0 50%', duration: 22 },
          4
        );
        timeline.to(redPlane, { xPercent: 19, duration: 26 }, 5);
        timeline.to(redField, { backgroundColor: '#81493b', duration: 26 }, 5);
        timeline.to(
          bridgePopova,
          {
            xPercent: 0,
            opacity: 0.92,
            clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)',
            duration: 20,
          },
          12
        );
        timeline.to(
          bridgeVolkov,
          {
            xPercent: 0,
            opacity: 1,
            clipPath: 'polygon(18% 0, 100% 0, 100% 84%, 86% 100%, 0 100%, 0 22%)',
            duration: 25,
            ease: 'power2.inOut',
          },
          26
        );
        timeline.fromTo(
          select('[data-bridge-earth]'),
          { xPercent: 18 },
          { xPercent: -4, duration: 33 },
          13
        );
        timeline.fromTo(
          select('[data-bridge-paper]'),
          { xPercent: 28 },
          { xPercent: -5, duration: 36 },
          20
        );
        timeline.to(select('[data-bridge-label]'), { autoAlpha: 1, duration: 8 }, 18);
        timeline.to(
          select('[data-mineral-bridge] h2 span'),
          { autoAlpha: 1, x: 0, duration: 9, stagger: 1.35, ease: 'power2.out' },
          21
        );
        timeline.to(
          select('[data-static-hinge]'),
          {
            scaleX: 1,
            clipPath: 'polygon(0 22%, 48% 0, 100% 50%, 46% 100%, 0 78%)',
            duration: 17,
          },
          21
        );
        timeline.to(bridgePaths, { strokeDashoffset: 0, duration: 16, stagger: 2 }, 27);
        timeline.to(
          select('[data-bridge-note]'),
          { autoAlpha: 1, y: 0, duration: 9, ease: 'power2.out' },
          31
        );
        timeline.to(
          select('[data-static-hinge]'),
          {
            backgroundColor: '#8a7258',
            clipPath:
              'polygon(0% 48.5%, 45% 48.5%, 50% 38%, 55% 48.5%, 100% 48.5%, 100% 51.5%, 55% 51.5%, 50% 62%, 45% 51.5%, 0% 51.5%)',
            scaleX: 1.28,
            opacity: 0.72,
            duration: 20,
          },
          40
        );
        timeline.to(bridgePopova, { xPercent: -12, opacity: 0.48, duration: 22 }, 43);
        timeline.to(bridgeVolkov, { xPercent: -5, duration: 20 }, 46);
        timeline.to(select('[data-collection-label]'), { autoAlpha: 1, duration: 6 }, 53);
        timeline.to(
          select('[data-collection-title]'),
          { yPercent: 0, duration: 8, stagger: 1.6, ease: 'power3.out' },
          56
        );
        timeline.to(
          select('[data-volkov-mask]'),
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 88%, 93% 100%, 0 100%)',
            duration: 10,
            ease: 'power2.inOut',
          },
          62
        );
        timeline.to(select('[data-volkov-caption]'), { autoAlpha: 1, duration: 5 }, 67);
        timeline.to(
          select('[data-vessel-mask]'),
          {
            clipPath: 'polygon(0 7%, 8% 0, 100% 0, 100% 100%, 0 100%)',
            duration: 10,
            ease: 'power2.inOut',
          },
          69
        );
        timeline.to(select('[data-vessel-caption]'), { autoAlpha: 1, duration: 5 }, 73);
        timeline.to(select('[data-collection-copy]'), { autoAlpha: 1, duration: 7 }, 70);
        timeline.to(select('[data-collection-cta]'), { autoAlpha: 1, duration: 7 }, 75);
        timeline.to(
          select('[data-archive-rule] > span'),
          { scaleX: 1, duration: 8, ease: 'power2.out' },
          78
        );
        timeline.to(select('[data-archive-rule] small'), { autoAlpha: 1, duration: 5 }, 82);
        timeline.to({}, { duration: 16 });

        ScrollTrigger.create({
          id: 'savitsky-collection-journey',
          trigger: stage,
          animation: timeline,
          start: 'top top',
          end: () => `+=${stage.clientHeight * 2.5}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.58,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.toggleAttribute('data-light-stage', self.progress > 0.59);
          },
          onRefresh: (self) => {
            root.toggleAttribute('data-light-stage', self.progress > 0.59);
          },
        });

        return () => {
          root.removeAttribute('data-light-stage');
        };
      },
      root
    );

    media.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const weavePaths = Array.from(
          root.querySelectorAll<SVGPathElement>('[data-woven-ornament] path')
        );
        const weaveRule = root.querySelector<SVGPathElement>('[data-weave-rule]')!;
        const weavePoint = root.querySelector<SVGCircleElement>('[data-weave-point]')!;
        const drawnPaths = weavePaths.filter((path) => path !== weaveRule);

        weavePaths.forEach((path) => path.setAttribute('pathLength', '1'));
        gsap.set(weavePaths, { strokeDasharray: '1 1', strokeDashoffset: 1 });
        gsap.set(weaveRule, { strokeDashoffset: 0 });
        gsap.set(weavePoint, { scale: 0, transformOrigin: '50% 50%' });
        gsap.set(select('[data-textile-field]'), {
          autoAlpha: 0.12,
          scale: 1.04,
          clipPath: 'polygon(100% 16%, 100% 16%, 100% 86%, 100% 86%)',
          transformOrigin: '82% 50%',
        });
        gsap.set(select('[data-red-fiber]'), {
          autoAlpha: 0,
          clipPath: 'polygon(76% 0, 100% 0, 100% 100%, 94% 100%)',
        });
        gsap.set(select('[data-fiber-tone]'), {
          autoAlpha: 0,
          clipPath: 'polygon(66% 0, 66% 0, 58% 100%, 58% 100%)',
        });
        gsap.set(select('[data-culture-grain]'), { autoAlpha: 0 });
        gsap.set(select('[data-culture-copy]'), { autoAlpha: 0, x: -26 });
        gsap.set(select('[data-culture-aside]'), { autoAlpha: 0, x: 24 });

        const material = gsap.timeline({ defaults: { ease: 'none' } });
        material.to({}, { duration: 12 });
        material.to(weavePoint, { scale: 1, duration: 8, ease: 'back.out(1.7)' }, 9);
        material.to(weaveRule, { stroke: '#9d3028', duration: 16 }, 11);
        material.to(select('[data-weave-node]'), { strokeDashoffset: 0, duration: 11 }, 17);
        material.to(weavePoint, { scale: 0, duration: 6, ease: 'power2.in' }, 22);
        material.to(select('[data-weave-thread]'), { strokeDashoffset: 0, duration: 13 }, 23);
        material.to(
          select('[data-textile-field]'),
          {
            autoAlpha: 1,
            scale: 1.015,
            clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 52% 100%, 60% 68%, 59% 19%)',
            duration: 24,
            ease: 'power2.inOut',
          },
          27
        );
        material.to(select('[data-weave-connection]'), { strokeDashoffset: 0, duration: 13 }, 29);
        material.to(select('[data-weave-diagonal]'), { strokeDashoffset: 0, duration: 15 }, 36);
        material.to(
          select('[data-red-fiber]'),
          {
            autoAlpha: 0.2,
            clipPath: 'polygon(53% 0, 100% 0, 100% 100%, 69% 100%)',
            duration: 18,
          },
          39
        );
        material.to(select('[data-weave-second]'), { strokeDashoffset: 0, duration: 14 }, 44);
        material.to(select('[data-weave-finish]'), { strokeDashoffset: 0, duration: 16 }, 51);
        material.to(select('[data-weave-red]'), { strokeDashoffset: 0, duration: 12 }, 57);
        material.to(
          select('[data-textile-field]'),
          {
            scale: 1,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 30,
            ease: 'power2.inOut',
          },
          49
        );
        material.to(
          select('[data-fiber-tone]'),
          {
            autoAlpha: 0.9,
            clipPath: 'polygon(0 0, 70% 0, 53% 100%, 0 100%)',
            duration: 25,
            ease: 'power2.inOut',
          },
          59
        );
        material.to(select('[data-culture-grain]'), { autoAlpha: 0.7, duration: 16 }, 65);
        material.to(drawnPaths, { stroke: '#d3c4ae', duration: 17, stagger: 0.3 }, 62);
        material.to(select('[data-weave-red]'), { stroke: '#b54235', duration: 12 }, 68);
        material.to(
          select('[data-culture-copy]'),
          { autoAlpha: 1, x: 0, duration: 17, ease: 'power2.out' },
          68
        );
        material.to(
          select('[data-culture-aside]'),
          { autoAlpha: 1, x: 0, duration: 13, ease: 'power2.out' },
          78
        );
        material.to({}, { duration: 15 });

        ScrollTrigger.create({
          id: 'savitsky-material-culture',
          trigger: culture,
          animation: material,
          start: 'top 86%',
          end: 'bottom bottom',
          scrub: 0.55,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            document.documentElement.toggleAttribute('data-museum-culture', self.progress > 0.62);
          },
          onLeave: () => document.documentElement.removeAttribute('data-museum-culture'),
          onLeaveBack: () => document.documentElement.removeAttribute('data-museum-culture'),
        });
      },
      root
    );
  }, root);

  const images = Array.from(root.querySelectorAll('img'));
  Promise.allSettled([...images.map((image) => image.decode()), document.fonts.ready]).then(() => {
    if (!disposed) ScrollTrigger.refresh();
  });

  return () => {
    disposed = true;
    document.documentElement.removeAttribute('data-museum-culture');
    media.revert();
    context.revert();
  };
}
