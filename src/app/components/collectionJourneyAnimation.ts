import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function createCollectionJourney(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  // The phone address bar showing or hiding must not re-measure the pins mid-scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });
  const select = gsap.utils.selector(root);
  const stage = root.querySelector<HTMLElement>('[data-journey-stage]')!;
  const track = root.querySelector<HTMLElement>('[data-journey-track]')!;
  const culture = root.querySelector<HTMLElement>('[data-material-chapter]')!;
  const media = gsap.matchMedia();
  let disposed = false;
  let collectionProgress = 0.84;

  const context = gsap.context(() => {
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const bridgePaths = Array.from(
          root.querySelectorAll<SVGPathElement>('[data-static-path], [data-static-node]')
        );
        const redPlane = select('[data-feature-red-mask]');
        const redField = select('[data-feature-red]');
        const bridgePopova = select('[data-bridge-popova]');
        const bridgeVolkov = select('[data-bridge-volkov]');
        const volkovMask = select('[data-volkov-mask]');
        const vesselMask = select('[data-vessel-mask]');
        const hinge = select('[data-static-hinge]');

        // Everything below moves with opacity and transform only. Animating
        // clip-path between polygons is what produced the sudden slices.
        const ease = 'sine.inOut';

        bridgePaths.forEach((node) => node.setAttribute('pathLength', '1'));
        gsap.set(bridgePaths, { strokeDasharray: '1 1', strokeDashoffset: 1 });
        gsap.set(select('[data-mineral-bridge] h2 span'), { autoAlpha: 0, x: 46 });
        gsap.set(select('[data-bridge-note]'), { autoAlpha: 0, y: 10 });
        gsap.set(bridgePopova, { xPercent: -10, autoAlpha: 0.7 });
        gsap.set(bridgeVolkov, { xPercent: 12, autoAlpha: 0 });
        gsap.set(hinge, { autoAlpha: 0, xPercent: -6, transformOrigin: '0% 50%' });
        gsap.set(select('[data-collection-label]'), { autoAlpha: 0 });
        gsap.set(select('[data-collection-title]'), { yPercent: 112 });
        gsap.set(volkovMask, { autoAlpha: 0, yPercent: 10 });
        gsap.set(vesselMask, { autoAlpha: 0, yPercent: 10 });
        gsap.set(select('[data-volkov-caption], [data-vessel-caption]'), { autoAlpha: 0 });
        gsap.set(select('[data-collection-copy], [data-collection-cta]'), { autoAlpha: 0 });
        gsap.set(select('[data-archive-rule] > span'), { scaleX: 0 });
        gsap.set(select('[data-archive-rule] small'), { autoAlpha: 0 });

        const timeline = gsap.timeline({ defaults: { ease: 'none' } });
        timeline.to(track, { x: () => -(track.scrollWidth - stage.clientWidth), duration: 84 }, 0);
        timeline.to(
          select('[data-feature-image]'),
          { scale: 0.985, opacity: 0.62, duration: 23, ease },
          2
        );
        timeline.to(
          select('[data-feature-reveal="title"]'),
          { scale: 0.975, opacity: 0.73, transformOrigin: '0 50%', duration: 22, ease },
          4
        );
        timeline.to(redPlane, { xPercent: 19, duration: 26, ease }, 5);
        timeline.to(redField, { backgroundColor: '#81493b', duration: 26, ease }, 5);
        timeline.to(bridgePopova, { xPercent: 0, autoAlpha: 0.92, duration: 20, ease }, 12);
        timeline.to(bridgeVolkov, { xPercent: 0, autoAlpha: 1, duration: 25, ease }, 26);
        timeline.fromTo(
          select('[data-bridge-earth]'),
          { xPercent: 18 },
          { xPercent: -4, duration: 33, ease },
          13
        );
        timeline.fromTo(
          select('[data-bridge-paper]'),
          { xPercent: 28 },
          { xPercent: -5, duration: 36, ease },
          20
        );
        timeline.to(
          select('[data-mineral-bridge] h2 span'),
          { autoAlpha: 1, x: 0, duration: 9, stagger: 1.35, ease: 'power2.out' },
          21
        );
        timeline.to(hinge, { autoAlpha: 0.85, xPercent: 0, duration: 17, ease }, 21);
        timeline.to(bridgePaths, { strokeDashoffset: 0, duration: 16, stagger: 2 }, 27);
        timeline.to(
          select('[data-bridge-note]'),
          { autoAlpha: 1, y: 0, duration: 9, ease: 'power2.out' },
          31
        );
        timeline.to(
          hinge,
          { backgroundColor: '#8a7258', autoAlpha: 0.72, scaleX: 1.04, duration: 20, ease },
          40
        );
        timeline.to(bridgePopova, { xPercent: -12, autoAlpha: 0.48, duration: 22, ease }, 43);
        timeline.to(bridgeVolkov, { xPercent: -5, duration: 20, ease }, 46);
        // Only one Volkov at a time: the bridge copy dissolves as the gateway painting arrives.
        timeline.to(bridgeVolkov, { autoAlpha: 0, duration: 12, ease }, 58);
        timeline.to(select('[data-collection-label]'), { autoAlpha: 1, duration: 6, ease }, 53);
        timeline.to(
          select('[data-collection-title]'),
          { yPercent: 0, duration: 8, stagger: 1.6, ease: 'power3.out' },
          56
        );
        timeline.to(volkovMask, { autoAlpha: 1, yPercent: 0, duration: 12, ease }, 62);
        timeline.to(select('[data-volkov-caption]'), { autoAlpha: 1, duration: 6, ease }, 68);
        timeline.to(vesselMask, { autoAlpha: 1, yPercent: 0, duration: 12, ease }, 69);
        timeline.to(select('[data-vessel-caption]'), { autoAlpha: 1, duration: 6, ease }, 74);
        timeline.to(select('[data-collection-copy]'), { autoAlpha: 1, duration: 8, ease }, 70);
        timeline.to(select('[data-collection-cta]'), { autoAlpha: 1, duration: 8, ease }, 75);
        timeline.to(
          select('[data-archive-rule] > span'),
          { scaleX: 1, duration: 8, ease: 'power2.out' },
          78
        );
        timeline.to(select('[data-archive-rule] small'), { autoAlpha: 1, duration: 5, ease }, 82);
        timeline.addLabel('collection-ready', 87);
        timeline.to({}, { duration: 16 });
        collectionProgress = timeline.labels['collection-ready'] / timeline.duration();

        const publishCollectionTarget = (trigger: ScrollTrigger) => {
          root.dataset.collectionScrollTarget = String(
            trigger.start + (trigger.end - trigger.start) * collectionProgress
          );
        };

        const journeyTrigger = ScrollTrigger.create({
          id: 'savitsky-collection-journey',
          trigger: stage,
          animation: timeline,
          start: 'top top',
          end: () => `+=${stage.clientHeight * 2.5}`,
          pin: true,
          pinSpacing: true,
          // A little inertia keeps the track gliding instead of tracking the wheel tick by tick.
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.toggleAttribute('data-light-stage', self.progress > 0.59);
          },
          onRefresh: (self) => {
            publishCollectionTarget(self);
            root.toggleAttribute('data-light-stage', self.progress > 0.59);
          },
        });
        publishCollectionTarget(journeyTrigger);

        return () => {
          delete root.dataset.collectionScrollTarget;
          root.removeAttribute('data-light-stage');
        };
      },
      root
    );

    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const weavePaths = Array.from(
          root.querySelectorAll<SVGPathElement>('[data-woven-ornament] path')
        );
        const weaveRule = root.querySelector<SVGPathElement>('[data-weave-rule]')!;
        const weavePoint = root.querySelector<SVGCircleElement>('[data-weave-point]')!;
        const drawnPaths = weavePaths.filter((path) => path !== weaveRule);
        const ease = 'sine.inOut';

        weavePaths.forEach((path) => path.setAttribute('pathLength', '1'));
        gsap.set(weavePaths, { strokeDasharray: '1 1', strokeDashoffset: 1 });
        gsap.set(weaveRule, { strokeDashoffset: 0 });
        gsap.set(weavePoint, { scale: 0, transformOrigin: '50% 50%' });
        gsap.set(select('[data-textile-field]'), { autoAlpha: 0.18, scale: 1.05, xPercent: 6 });
        gsap.set(select('[data-red-fiber]'), { autoAlpha: 0 });
        gsap.set(select('[data-fiber-tone]'), { autoAlpha: 0 });
        gsap.set(select('[data-culture-grain]'), { autoAlpha: 0 });
        gsap.set(select('[data-culture-copy]'), { autoAlpha: 0, x: -26 });
        gsap.set(select('[data-culture-aside]'), { autoAlpha: 0, x: 24 });

        const material = gsap.timeline({ defaults: { ease: 'none' } });
        material.to({}, { duration: 12 });
        material.to(weavePoint, { scale: 1, duration: 8, ease: 'back.out(1.7)' }, 9);
        material.to(weaveRule, { stroke: '#9d3028', duration: 16, ease }, 11);
        material.to(select('[data-weave-node]'), { strokeDashoffset: 0, duration: 11, ease }, 17);
        material.to(weavePoint, { scale: 0, duration: 6, ease: 'power2.in' }, 22);
        material.to(select('[data-weave-thread]'), { strokeDashoffset: 0, duration: 13, ease }, 23);
        // The dark textile now fades and drifts in, rather than being cut in by a clip wipe.
        material.to(
          select('[data-textile-field]'),
          { autoAlpha: 1, scale: 1.015, xPercent: 0, duration: 34, ease },
          0
        );
        material.to(
          select('[data-weave-connection]'),
          { strokeDashoffset: 0, duration: 13, ease },
          29
        );
        material.to(
          select('[data-weave-diagonal]'),
          { strokeDashoffset: 0, duration: 15, ease },
          36
        );
        material.to(select('[data-red-fiber]'), { autoAlpha: 0.2, duration: 18, ease }, 39);
        material.to(select('[data-weave-second]'), { strokeDashoffset: 0, duration: 14, ease }, 44);
        material.to(select('[data-weave-finish]'), { strokeDashoffset: 0, duration: 16, ease }, 51);
        material.to(select('[data-weave-red]'), { strokeDashoffset: 0, duration: 12, ease }, 57);
        material.to(select('[data-textile-field]'), { scale: 1, duration: 30, ease }, 49);
        material.to(select('[data-fiber-tone]'), { autoAlpha: 0.9, duration: 25, ease }, 59);
        material.to(select('[data-culture-grain]'), { autoAlpha: 0.7, duration: 16, ease }, 65);
        material.to(drawnPaths, { stroke: '#d3c4ae', duration: 17, stagger: 0.3, ease }, 62);
        material.to(select('[data-weave-red]'), { stroke: '#b54235', duration: 12, ease }, 68);
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
          scrub: 0.9,
          invalidateOnRefresh: true,
        });

        // The dark header follows the dark textile and hands over to Museum Today
        // at the exact scroll point where that section takes it ('top 45%').
        ScrollTrigger.create({
          id: 'savitsky-material-culture-nav',
          trigger: culture,
          start: 'top 30%',
          end: 'bottom 45%',
          onToggle: ({ isActive }) => {
            document.documentElement.toggleAttribute('data-museum-culture', isActive);
          },
        });
      },
      root
    );

    media.add(
      '(max-width: 0px) and (prefers-reduced-motion: no-preference)',
      () => {
        const bridge = root.querySelector<HTMLElement>('[data-mineral-bridge]')!;
        const overview = root.querySelector<HTMLElement>('[data-collection-overview]')!;
        const bridgePaths = Array.from(
          bridge.querySelectorAll<SVGPathElement>('[data-static-path], [data-static-node]')
        );

        bridgePaths.forEach((path) => path.setAttribute('pathLength', '1'));
        gsap.set(bridgePaths, { strokeDasharray: '1 1', strokeDashoffset: 1 });

        const bridgeReveal = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'savitsky-collection-bridge-responsive',
            trigger: bridge,
            start: 'top 88%',
            end: 'bottom 28%',
            scrub: 0.42,
            invalidateOnRefresh: true,
          },
        });
        bridgeReveal.fromTo(
          select('[data-bridge-popova]'),
          { xPercent: -9, opacity: 0.34 },
          { xPercent: 0, opacity: 0.62, duration: 1 },
          0
        );
        bridgeReveal.fromTo(
          select('[data-bridge-volkov]'),
          {
            xPercent: 14,
            opacity: 0.08,
            clipPath: 'polygon(18% 18%, 100% 18%, 100% 84%, 86% 84%, 0 84%, 0 22%)',
          },
          {
            xPercent: 0,
            opacity: 0.86,
            clipPath: 'polygon(18% 0, 100% 0, 100% 84%, 86% 100%, 0 100%, 0 22%)',
            duration: 1,
            ease: 'power2.inOut',
          },
          0.08
        );
        bridgeReveal.fromTo(
          select('[data-mineral-bridge] h2 span'),
          { autoAlpha: 0, x: 22 },
          { autoAlpha: 1, x: 0, duration: 0.48, stagger: 0.07, ease: 'power2.out' },
          0.16
        );
        bridgeReveal.fromTo(
          select('[data-static-hinge]'),
          { scaleX: 0.58, transformOrigin: '0% 50%' },
          { scaleX: 1, duration: 0.7 },
          0.18
        );
        bridgeReveal.to(bridgePaths, { strokeDashoffset: 0, duration: 0.62, stagger: 0.08 }, 0.24);
        bridgeReveal.fromTo(
          select('[data-bridge-note]'),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.42, ease: 'power2.out' },
          0.5
        );

        const collectionReveal = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'savitsky-collection-overview-responsive',
            trigger: overview,
            start: 'top 88%',
            end: 'top 18%',
            scrub: 0.42,
            invalidateOnRefresh: true,
          },
        });
        collectionReveal.fromTo(
          select('[data-collection-label]'),
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.24 },
          0
        );
        collectionReveal.fromTo(
          select('[data-collection-title]'),
          { yPercent: 108 },
          { yPercent: 0, duration: 0.46, ease: 'power3.out' },
          0.08
        );
        collectionReveal.fromTo(
          select('[data-collection-copy], [data-collection-cta]'),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.34, stagger: 0.08, ease: 'power2.out' },
          0.24
        );
        collectionReveal.fromTo(
          select('[data-volkov-mask]'),
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 88%, 93% 100%, 0 100%)',
            duration: 0.48,
            ease: 'power2.inOut',
          },
          0.34
        );
        collectionReveal.fromTo(
          select('[data-vessel-mask]'),
          { clipPath: 'polygon(50% 48%, 50% 48%, 50% 52%, 50% 52%, 50% 52%)' },
          {
            clipPath: 'polygon(0 7%, 8% 0, 100% 0, 100% 100%, 0 100%)',
            duration: 0.46,
            ease: 'power2.inOut',
          },
          0.48
        );
        collectionReveal.fromTo(
          select('[data-volkov-caption], [data-vessel-caption]'),
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.1, ease: 'power2.out' },
          0.56
        );
        collectionReveal.fromTo(
          select('[data-archive-rule] > span'),
          { scaleX: 0, transformOrigin: '0% 50%' },
          { scaleX: 1, duration: 0.34, ease: 'power2.out' },
          0.66
        );

        const responsiveWeavePaths = Array.from(
          culture.querySelectorAll<SVGPathElement>('[data-woven-ornament] path')
        );
        responsiveWeavePaths.forEach((path) => path.setAttribute('pathLength', '1'));
        gsap.set(responsiveWeavePaths, { strokeDasharray: '1 1', strokeDashoffset: 1 });

        const cultureReveal = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'savitsky-material-culture-responsive',
            trigger: culture,
            start: 'top 86%',
            end: 'top 18%',
            scrub: 0.42,
            invalidateOnRefresh: true,
          },
        });
        cultureReveal.to(
          responsiveWeavePaths,
          { strokeDashoffset: 0, duration: 0.62, stagger: 0.018 },
          0
        );
        cultureReveal.fromTo(
          select('[data-culture-copy]'),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.38, ease: 'power2.out' },
          0.35
        );

        ScrollTrigger.create({
          id: 'savitsky-material-culture-responsive-nav',
          trigger: culture,
          start: 'top 45%',
          end: 'bottom 15%',
          onToggle: ({ isActive }) => {
            document.documentElement.toggleAttribute('data-museum-culture', isActive);
          },
        });

        return () => {
          document.documentElement.removeAttribute('data-museum-culture');
        };
      },
      root
    );
  }, root);
  root.dataset.collectionNavigationReady = 'true';

  const images = Array.from(root.querySelectorAll('img'));
  Promise.allSettled([...images.map((image) => image.decode()), document.fonts.ready]).then(() => {
    if (!disposed) ScrollTrigger.refresh();
  });

  return () => {
    disposed = true;
    delete root.dataset.collectionNavigationReady;
    delete root.dataset.collectionScrollTarget;
    document.documentElement.removeAttribute('data-museum-culture');
    media.revert();
    context.revert();
  };
}
