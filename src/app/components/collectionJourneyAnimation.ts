import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Timeline units for the horizontal track (What's On → seam → Collection).
const TRACK_UNITS = 100;
// A short tail lets the last reveal settle before vertical scrolling resumes.
const TAIL_UNITS = 8;
const TOTAL_UNITS = TRACK_UNITS + TAIL_UNITS;

export function createCollectionJourney(root: HTMLElement) {
  gsap.registerPlugin(ScrollTrigger);
  // The phone address bar showing or hiding must not re-measure the pins mid-scroll.
  ScrollTrigger.config({ ignoreMobileResize: true });
  const select = gsap.utils.selector(root);
  const stage = root.querySelector<HTMLElement>('[data-journey-stage]')!;
  const track = root.querySelector<HTMLElement>('[data-journey-track]')!;
  const overview = root.querySelector<HTMLElement>('[data-collection-overview]')!;
  const culture = root.querySelector<HTMLElement>('[data-material-chapter]')!;
  const media = gsap.matchMedia();
  let disposed = false;

  const prepareStrokes = (paths: Element[]) => {
    paths.forEach((path) => path.setAttribute('pathLength', '1'));
    gsap.set(paths, { strokeDasharray: '1 1', strokeDashoffset: 1 });
  };

  const context = gsap.context(() => {
    // Every screen size travels sideways inside one pinned stage; phones get their
    // own panel layouts in CSS. Only opacity and transforms move — shapes keep a
    // fixed clip, so no frame is ever cut into slices mid-scroll.
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const label = select('[data-collection-label]');
        const title = select('[data-collection-title]');
        const copy = select('[data-collection-copy], [data-collection-cta]');
        const artworks = select('[data-volkov-mask], [data-vessel-mask]');
        const captions = select('[data-volkov-caption], [data-vessel-caption]');
        const ease = 'sine.inOut';
        const distance = () => Math.max(0, track.scrollWidth - stage.clientWidth);
        // The point where the collection panel covers half the screen.
        const overviewHalfway = () => {
          const travel = distance() || 1;
          return Math.min(1, (overview.offsetLeft - stage.clientWidth / 2) / travel);
        };

        prepareStrokes(select('[data-seam-line]'));
        gsap.set(label, { autoAlpha: 0 });
        gsap.set(title, { yPercent: 108 });
        gsap.set(copy, { autoAlpha: 0, y: 14 });
        gsap.set(artworks, { autoAlpha: 0, y: 28 });
        gsap.set(captions, { autoAlpha: 0 });
        gsap.set(select('[data-archive-rule] > span'), { scaleX: 0 });
        gsap.set(select('[data-archive-rule] small'), { autoAlpha: 0 });

        const timeline = gsap.timeline({ defaults: { ease: 'none' } });
        timeline.to(track, { x: () => -distance(), duration: TRACK_UNITS }, 0);

        // What's On recedes softly as it leaves.
        timeline.to(select('[data-feature-artwork]'), { opacity: 0.72, duration: 50, ease }, 0);
        timeline.to(
          select('[data-feature-reveal="title"]'),
          { opacity: 0.72, duration: 46, ease },
          0
        );
        timeline.to(select('[data-feature-red-mask]'), { xPercent: 14, duration: 70 }, 0);

        // The seam's bands slide at different speeds, so the dark opens up in depth.
        timeline.fromTo(
          select('[data-seam-layer="earth"]'),
          { xPercent: 22 },
          { xPercent: -6, duration: TRACK_UNITS },
          0
        );
        timeline.fromTo(
          select('[data-seam-layer="clay"]'),
          { xPercent: 38 },
          { xPercent: -10, duration: TRACK_UNITS },
          0
        );
        timeline.fromTo(
          select('[data-seam-layer="sand"]'),
          { xPercent: 56 },
          { xPercent: -14, duration: TRACK_UNITS },
          0
        );
        timeline.to(select('[data-seam-line]'), { strokeDashoffset: 0, duration: 46 }, 18);

        // Collection: content lands while the panel is still gliding in.
        timeline.to(label, { autoAlpha: 1, duration: 10, ease }, 52);
        timeline.to(title, { yPercent: 0, duration: 20, ease: 'power3.out' }, 52);
        timeline.to(
          artworks,
          { autoAlpha: 1, y: 0, duration: 24, stagger: 8, ease: 'power2.out' },
          58
        );
        timeline.to(copy, { autoAlpha: 1, y: 0, duration: 16, stagger: 3, ease: 'power2.out' }, 66);
        timeline.to(captions, { autoAlpha: 1, duration: 12, ease }, 80);
        timeline.to(
          select('[data-archive-rule] > span'),
          { scaleX: 1, duration: 16, ease: 'power2.out' },
          82
        );
        timeline.to(select('[data-archive-rule] small'), { autoAlpha: 1, duration: 8, ease }, 94);
        timeline.to({}, { duration: TOTAL_UNITS - timeline.duration() });

        const readyAt = TRACK_UNITS / TOTAL_UNITS;
        let lightAt = (overviewHalfway() * TRACK_UNITS) / TOTAL_UNITS;
        const publishCollectionTarget = (trigger: ScrollTrigger) => {
          root.dataset.collectionScrollTarget = String(
            trigger.start + (trigger.end - trigger.start) * readyAt
          );
        };

        const journeyTrigger = ScrollTrigger.create({
          id: 'savitsky-collection-journey',
          trigger: stage,
          animation: timeline,
          start: 'top top',
          // One pixel of scroll equals one pixel of sideways travel, so the speed
          // carries straight over from vertical to horizontal with no jolt.
          end: () => `+=${distance() * (TOTAL_UNITS / TRACK_UNITS)}`,
          pin: true,
          pinSpacing: true,
          // Touch scrolling is native, so let the pin engage a frame early there.
          anticipatePin: ScrollTrigger.isTouch ? 1 : 0,
          // Smoothing comes from the page-wide smooth scroll; scrub stays locked to it,
          // so the track never keeps sliding after the pin releases.
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            root.toggleAttribute('data-light-stage', self.progress > lightAt);
          },
          onRefresh: (self) => {
            lightAt = (overviewHalfway() * TRACK_UNITS) / TOTAL_UNITS;
            publishCollectionTarget(self);
            root.toggleAttribute('data-light-stage', self.progress > lightAt);
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

    // Karakalpak arts. The ornament is the doorway: it weaves itself on the ivory
    // while the section rises, the textile then opens out of its red knot, and only
    // then does the copy arrive. Nothing new appears once the frame is held.
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const frame = culture.querySelector<HTMLElement>('[data-culture-frame]')!;
        const ornament = culture.querySelector<SVGSVGElement>('[data-woven-ornament]')!;
        const knot = culture.querySelector<SVGPathElement>('[data-weave-red]')!;
        const point = culture.querySelector<SVGCircleElement>('[data-weave-point]')!;
        const paths = Array.from(ornament.querySelectorAll('path'));
        const textile = select('[data-textile-field]');
        const copyParts = select(
          '[data-culture-heading], [data-culture-statement], [data-culture-desc], [data-culture-link]'
        );

        // Where the textile opens from, and how far it must grow to fill the frame.
        const knotCentre = () => {
          const box = frame.getBoundingClientRect();
          const knotBox = knot.getBoundingClientRect();
          return {
            x: knotBox.left + knotBox.width / 2 - box.left,
            y: knotBox.top + knotBox.height / 2 - box.top,
            radius: Math.hypot(box.width, box.height),
          };
        };
        const circle = (scale: number) => () => {
          const { x, y, radius } = knotCentre();
          return `circle(${(radius * scale).toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`;
        };

        prepareStrokes(paths);
        gsap.set(point, { scale: 0, transformOrigin: '50% 50%' });
        gsap.set(textile, { clipPath: circle(0), scale: 1.12 });
        gsap.set(copyParts, { autoAlpha: 0, y: 30 });

        const weave = gsap.timeline({ defaults: { ease: 'none' } });
        // 0 → 0.42: the ornament draws itself on the ivory as the section rises.
        weave.to(select('[data-weave-rule]'), { strokeDashoffset: 0, duration: 0.14 }, 0);
        weave.to(point, { scale: 1, duration: 0.05, ease: 'back.out(1.7)' }, 0.05);
        weave.to(select('[data-weave-node]'), { strokeDashoffset: 0, duration: 0.07 }, 0.08);
        weave.to(select('[data-weave-thread]'), { strokeDashoffset: 0, duration: 0.07 }, 0.13);
        weave.to(select('[data-weave-connection]'), { strokeDashoffset: 0, duration: 0.08 }, 0.18);
        weave.to(select('[data-weave-diagonal]'), { strokeDashoffset: 0, duration: 0.08 }, 0.23);
        weave.to(select('[data-weave-second]'), { strokeDashoffset: 0, duration: 0.08 }, 0.28);
        weave.to(select('[data-weave-finish]'), { strokeDashoffset: 0, duration: 0.09 }, 0.32);
        weave.to(select('[data-weave-red]'), { strokeDashoffset: 0, duration: 0.06 }, 0.37);
        weave.to(point, { scale: 0, duration: 0.04, ease: 'power2.in' }, 0.4);
        // 0.4 → 0.6: the textile opens out of the red knot and the threads turn pale.
        weave.fromTo(
          textile,
          { clipPath: circle(0), scale: 1.12 },
          { clipPath: circle(1), scale: 1.04, duration: 0.2, ease: 'power2.inOut' },
          0.4
        );
        weave.to(
          paths.filter((path) => !path.hasAttribute('data-weave-red')),
          { stroke: '#e3d6c0', duration: 0.12 },
          0.46
        );
        weave.to(select('[data-red-fiber]'), { autoAlpha: 0.18, duration: 0.14 }, 0.5);
        // 0.58 → 0.78: the copy lands on the dark once the opening has passed it.
        weave.to(
          copyParts,
          { autoAlpha: 1, y: 0, duration: 0.11, stagger: 0.03, ease: 'power2.out' },
          0.58
        );
        // Held frame: only a slow settle of the cloth, and the ornament quiets down.
        weave.fromTo(
          textile,
          { scale: 1.04 },
          { scale: 1, duration: 0.38, immediateRender: false },
          0.62
        );
        weave.to(ornament, { opacity: 0.55, duration: 0.2 }, 0.8);

        ScrollTrigger.create({
          id: 'savitsky-material-culture',
          trigger: culture,
          animation: weave,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
        });

        // The header turns dark only once the textile fills the screen beneath it.
        ScrollTrigger.create({
          id: 'savitsky-material-culture-nav',
          trigger: culture,
          start: 'top top',
          end: 'bottom 72px',
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
