import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// This module is loaded by the opening's client effect, never during SSR.
export function createOpeningAnimation(root: HTMLDivElement) {
  gsap.registerPlugin(ScrollTrigger);
  // The phone address bar showing or hiding must not re-measure the pins mid-scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });
  const select = gsap.utils.selector(root);
  const hero = root.querySelector<HTMLElement>('#opening-hero')!;
  let disposed = false;
  let media: gsap.MatchMedia;

  const context = gsap.context(() => {
    media = gsap.matchMedia();
    media.add(
      {
        desktop: '(min-width: 1024px)',
        tablet: '(min-width: 640px) and (max-width: 1023px)',
        mobile: '(max-width: 639px)',
        reduced: '(prefers-reduced-motion: reduce)',
      },
      (match) => {
        const { desktop, tablet, mobile, reduced } = match.conditions!;
        // The accessible fallback is the normal, unpinned hero.
        if (reduced) return;

        const ornament = root.querySelector<SVGSVGElement>('[data-ornament]')!;
        const aperture = root.querySelector<HTMLElement>('[data-aperture]')!;
        const portrait = root.querySelector<HTMLElement>('[data-portrait-plane]')!;
        const border = root.querySelector<SVGPathElement>('[data-aperture-border]')!;
        // Dimensionless stages survive refresh without retaining stale pixel radii.
        const proxy = { stage: 0 };
        let width = 0;
        let height = 0;
        let initialRadius = 0;
        let paths: SVGPathElement[] = [];

        const setPath = (name: string, d: string) => {
          root.querySelector<SVGPathElement>(`[data-path="${name}"]`)!.setAttribute('d', d);
        };
        const diamond = (x: number, y: number, r: number) =>
          `M ${x} ${y - r} L ${x + r} ${y} L ${x} ${y + r} L ${x - r} ${y} Z`;

        const renderAperture = () => {
          const portraitRadius = Math.min(width * 0.46, height * 0.23);
          const wideRadius = Math.max(width, height) * 0.49;
          // A 45-degree diamond covers every corner at (width + height) / 2.
          const fullRadius = (width + height) * 0.515;
          const r =
            proxy.stage <= 1
              ? gsap.utils.interpolate(initialRadius, portraitRadius, proxy.stage)
              : proxy.stage <= 2
                ? gsap.utils.interpolate(portraitRadius, wideRadius, proxy.stage - 1)
                : gsap.utils.interpolate(wideRadius, fullRadius, proxy.stage - 2);
          const x = width / 2;
          const y = height / 2;
          aperture.style.clipPath = `polygon(${x}px ${y - r}px, ${x + r}px ${y}px, ${x}px ${y + r}px, ${x - r}px ${y}px)`;
          border.setAttribute('d', diamond(x, y, r));
          // Each arm follows its own aperture corner. The SVG itself never scales.
          const travel = Math.max(0, r - initialRadius);
          root
            .querySelector('[data-arm="left"]')!
            .setAttribute('transform', `translate(${-travel} 0)`);
          root
            .querySelector('[data-arm="right"]')!
            .setAttribute('transform', `translate(${travel} 0)`);
          root
            .querySelector('[data-arm="top"]')!
            .setAttribute('transform', `translate(0 ${-travel})`);
          root
            .querySelector('[data-arm="bottom"]')!
            .setAttribute('transform', `translate(0 ${travel})`);
        };

        const measure = () => {
          width = hero.clientWidth;
          height = hero.clientHeight;
          initialRadius = Math.min(width, height) * 0.065;
          const x = width / 2;
          const y = height / 2;
          const r = initialRadius;
          const reach = width * (mobile ? 0.43 : 0.36);
          const node = Math.min(width, height) * 0.012;
          ornament.setAttribute('viewBox', `0 0 ${width} ${height}`);

          setPath('spine-top', `M ${x} ${height * 0.11} V ${y - r}`);
          setPath('spine-bottom', `M ${x} ${y + r} V ${height * 0.89}`);
          setPath('node-top', diamond(x, height * 0.17, node * 0.8));
          setPath('node-upper', diamond(x, height * 0.32, node * 1.4));
          setPath('center', diamond(x, y, r));
          setPath('node-lower', diamond(x, height * 0.68, node * 1.4));
          setPath('node-bottom', diamond(x, height * 0.83, node * 0.8));
          setPath(
            'upper-connection',
            `M ${x} ${height * 0.17 + node} L ${x + height * 0.08} ${height * 0.25} L ${x} ${height * 0.32 - node * 1.4}`
          );
          setPath(
            'lower-connection',
            `M ${x} ${height * 0.68 + node * 1.4} L ${x - height * 0.065} ${height * 0.76} L ${x} ${height * 0.83 - node}`
          );

          for (const [side, sign] of [
            ['left', -1],
            ['right', 1],
          ] as const) {
            const start = x + sign * r;
            const middle = x + sign * reach * 0.58;
            const end = x + sign * reach;
            setPath(`${side}-line`, `M ${start} ${y} H ${end}`);
            setPath(
              `${side}-upper`,
              `M ${start} ${y} L ${middle} ${y - height * 0.13} L ${end} ${y}`
            );
            setPath(
              `${side}-lower`,
              `M ${start} ${y} L ${middle} ${y + height * (side === 'left' ? 0.16 : 0.1)} L ${end} ${y}`
            );
            setPath(`${side}-node`, diamond(middle, y, node));
            setPath(`${side}-end`, diamond(end, y, node * 0.7));
            setPath(`${side}-junction`, diamond(middle, y - height * 0.13, node * 0.6));
          }
          // Frame the face and embroidered headpiece within the first aperture.
          // Scale from the supplied photograph's native aspect ratio so it covers
          // every viewport without stretching as the diamond opens.
          const ratio = 1227 / 1281;
          const focalX = 0.585;
          const focalY = 0.315;
          const portraitWidth = Math.max(
            width / (2 * focalX),
            width / (2 * (1 - focalX)),
            (height / (2 * focalY)) * ratio,
            (height / (2 * (1 - focalY))) * ratio
          );
          Object.assign(portrait.style, {
            width: `${portraitWidth}px`,
            height: `${portraitWidth / ratio}px`,
            left: `${x - portraitWidth * focalX}px`,
            top: `${y - (portraitWidth / ratio) * focalY}px`,
          });
          paths = Array.from(ornament.querySelectorAll<SVGPathElement>('[data-draw]'));
          paths.forEach((path) => {
            // Normalized dash lengths remain valid after responsive remeasurement.
            path.setAttribute('pathLength', '1');
            path.style.strokeDasharray = '1 1';
          });
          renderAperture();
        };

        measure();
        gsap.set(paths, { strokeDashoffset: 1 });
        gsap.set(ornament, { autoAlpha: 1 });

        const timeline = gsap.timeline({ defaults: { ease: 'none' } });
        timeline.addLabel('hero', 0);
        timeline.addLabel('spine', 12);
        timeline.addLabel('ornament', 20);
        timeline.addLabel('portrait', 42);
        timeline.addLabel('opening', 55);
        timeline.addLabel('beyond-viewport', 76);
        timeline.addLabel('environment', 94);

        // Exact logical units: this final tween ends at 100. No sequential delays.
        timeline.to(select('[data-landscape]'), { scale: 1.012, duration: 12 }, 0);
        timeline.to(select('[data-landscape]'), { scale: 1.045, duration: 82 }, 12);
        timeline.to(select('[data-hero-title]'), { autoAlpha: 0, y: -24, duration: 16 }, 12);
        timeline.to(select('[data-hero-detail]'), { autoAlpha: 0, y: -12, duration: 14 }, 10);
        timeline.to(select('[data-scroll-cue]'), { autoAlpha: 0, duration: 12 }, 8);
        if (desktop) {
          timeline.to(
            select('[aria-label="Main navigation"]'),
            { opacity: 0.32, duration: 20 },
            24
          );
          timeline.to(select('[aria-label="Main navigation"]'), { opacity: 1, duration: 6 }, 94);
        }

        const draw = (group: string, start: number, end: number) => {
          const elements = select(`[data-draw="${group}"]`);
          const stagger = elements.length > 1 ? 2 / (elements.length - 1) : 0;
          timeline.to(
            elements,
            { strokeDashoffset: 0, duration: end - start - (elements.length > 1 ? 2 : 0), stagger },
            start
          );
        };
        draw('spine', 12, 25);
        draw('diamonds', 20, 33);
        draw('diagonals', 26, 39);
        draw('horizontals', 31, 42);
        draw('nodes', 36, 45);

        // Panel 03's ivory comes through gradually, preserving the landscape's
        // texture until the portrait itself occludes it. No blank intermediate frame.
        timeline.to(select('[data-ivory]'), { opacity: 0.78, duration: 18 }, 42);
        timeline.to(ornament, { color: '#B77A32', duration: 14 }, 44);
        timeline.to(select('[data-center-outline]'), { opacity: 0, duration: 8 }, 42);
        timeline.to(border, { opacity: 0.92, duration: 8 }, 42);
        timeline.to(aperture, { opacity: 1, duration: 10 }, 42);
        timeline.to(select('[data-portrait-veil]'), { opacity: 0.025, duration: 52 }, 42);
        timeline.to(
          proxy,
          {
            stage: 1,
            duration: 13,
            onUpdate: renderAperture,
          },
          42
        );
        timeline.to(
          proxy,
          {
            stage: 2,
            duration: 23,
            onUpdate: renderAperture,
          },
          55
        );
        timeline.to(
          proxy,
          {
            stage: 3,
            duration: 16,
            onUpdate: renderAperture,
          },
          78
        );
        timeline.to(ornament, { autoAlpha: 0, duration: 12 }, 88);
        timeline.to(select('[data-art-caption]'), { autoAlpha: 1, duration: 10 }, 48);
        timeline.to(select('[data-art-caption]'), { autoAlpha: 0, duration: 10 }, 68);

        const trigger = ScrollTrigger.create({
          id: 'savitsky-opening',
          trigger: hero,
          animation: timeline,
          start: 'top top',
          end: () => `+=${hero.clientHeight * (desktop ? 2.8 : tablet ? 2.2 : 1.5)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          markers:
            process.env.NODE_ENV === 'development' &&
            new URLSearchParams(window.location.search).has('openingDebug'),
          // Measure after ScrollTrigger restores the pin's new dimensions.
          // refreshInit still sees the previous inline height during a resize.
          onRefresh: measure,
        });
        trigger.refresh();

        return () => {
          aperture.style.removeProperty('clip-path');
          ornament
            .querySelectorAll('[data-arm]')
            .forEach((arm) => arm.removeAttribute('transform'));
        };
      },
      root
    );
  }, root);

  const images = Array.from(hero.querySelectorAll('img'));
  Promise.allSettled([...images.map((image) => image.decode()), document.fonts.ready]).then(() => {
    if (!disposed) ScrollTrigger.refresh();
  });

  return () => {
    disposed = true;
    media?.revert();
    context.revert();
  };
}
