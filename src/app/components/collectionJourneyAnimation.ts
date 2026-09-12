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
        const path = Array.from(
          root.querySelectorAll<SVGPathElement>('[data-static-path], [data-static-node]')
        );
        const redPlane = select('[data-feature-red-mask]');
        const redField = select('[data-feature-red]');
        path.forEach((node) => node.setAttribute('pathLength', '1'));
        gsap.set(path, { strokeDasharray: '1 1', strokeDashoffset: 1 });
        gsap.set(select('[data-bridge-label]'), { autoAlpha: 0 });
        gsap.set(select('[data-mineral-bridge] h2 span'), { autoAlpha: 0, x: 46 });
        gsap.set(select('[data-bridge-note]'), { autoAlpha: 0, y: 10 });
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
        timeline.to(path, { strokeDashoffset: 0, duration: 16, stagger: 2 }, 27);
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
              'polygon(45% 0, 55% 0, 56% 44%, 100% 48%, 100% 52%, 56% 56%, 55% 100%, 45% 100%, 44% 56%, 0 52%, 0 48%, 44% 44%)',
            scaleX: 0.72,
            duration: 20,
          },
          40
        );
        timeline.to(select('[data-collection-label]'), { autoAlpha: 1, duration: 6 }, 57);
        timeline.to(
          select('[data-collection-title]'),
          { yPercent: 0, duration: 8, stagger: 1.6, ease: 'power3.out' },
          59
        );
        timeline.to(
          select('[data-volkov-mask]'),
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 88%, 93% 100%, 0 100%)',
            duration: 10,
            ease: 'power2.inOut',
          },
          65
        );
        timeline.to(select('[data-volkov-caption]'), { autoAlpha: 1, duration: 5 }, 69);
        timeline.to(
          select('[data-vessel-mask]'),
          {
            clipPath: 'polygon(0 7%, 8% 0, 100% 0, 100% 100%, 0 100%)',
            duration: 10,
            ease: 'power2.inOut',
          },
          70
        );
        timeline.to(select('[data-vessel-caption]'), { autoAlpha: 1, duration: 5 }, 74);
        timeline.to(select('[data-collection-copy]'), { autoAlpha: 1, duration: 7 }, 73);
        timeline.to(select('[data-collection-cta]'), { autoAlpha: 1, duration: 7 }, 77);
        timeline.to({}, { duration: 16 });

        const trigger = ScrollTrigger.create({
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
        });
        trigger.refresh();

        return () => {
          root.removeAttribute('data-light-stage');
        };
      },
      root
    );

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const weavePaths = Array.from(
        root.querySelectorAll<SVGPathElement>('[data-woven-ornament] path')
      );
      weavePaths.forEach((path) => path.setAttribute('pathLength', '1'));
      gsap.set(weavePaths, { strokeDasharray: '1 1', strokeDashoffset: 1 });
      gsap.set(select('[data-textile-window]'), {
        scale: 0.3,
        transformOrigin: '100% 45%',
      });
      gsap.set(select('[data-fiber-space]'), {
        scale: 0.1,
        xPercent: 36,
        yPercent: 40,
        transformOrigin: '100% 100%',
      });
      gsap.set(select('[data-culture-copy]'), { autoAlpha: 0, x: -16 });

      const material = gsap.timeline({ defaults: { ease: 'none' } });
      material.to(select('[data-weave-rule]'), { strokeDashoffset: 0, duration: 13 }, 0);
      material.to(select('[data-weave-thread]'), { strokeDashoffset: 0, duration: 10 }, 10);
      material.to(select('[data-weave-node]'), { strokeDashoffset: 0, duration: 8 }, 18);
      material.to(select('[data-weave-connection]'), { strokeDashoffset: 0, duration: 10 }, 24);
      material.to(select('[data-weave-diagonal]'), { strokeDashoffset: 0, duration: 12 }, 32);
      material.to(select('[data-weave-second]'), { strokeDashoffset: 0, duration: 11 }, 42);
      material.to(select('[data-weave-finish]'), { strokeDashoffset: 0, duration: 10 }, 52);
      material.to(
        select('[data-textile-window]'),
        {
          scale: 1,
          duration: 39,
          ease: 'power2.inOut',
        },
        20
      );
      material.to(
        select('[data-fiber-space]'),
        {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          duration: 44,
        },
        18
      );
      material.to(
        select('[data-culture-copy]'),
        { autoAlpha: 1, x: 0, duration: 14, ease: 'power2.out' },
        39
      );
      ScrollTrigger.create({
        id: 'savitsky-material-culture',
        trigger: culture,
        animation: material,
        start: 'top 78%',
        end: 'bottom bottom',
        scrub: 0.55,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          document.documentElement.toggleAttribute(
            'data-museum-culture',
            self.progress > 0.42 && self.progress < 0.99
          );
        },
        onLeave: () => document.documentElement.removeAttribute('data-museum-culture'),
        onLeaveBack: () => document.documentElement.removeAttribute('data-museum-culture'),
      });
    });
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
