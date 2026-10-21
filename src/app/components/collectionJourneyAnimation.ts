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

        // The seam's soft light drifts a little slower than the track, for depth.
        timeline.fromTo(
          select('[data-seam-glow]'),
          { xPercent: -14 },
          { xPercent: 14, duration: TRACK_UNITS },
          0
        );

        // Collection: content lands while the panel is still gliding in.
        timeline.to(label, { autoAlpha: 1, duration: 12, ease }, 58);
        timeline.to(title, { yPercent: 0, duration: 22, ease: 'power3.out' }, 58);
        timeline.to(
          artworks,
          { autoAlpha: 1, y: 0, duration: 24, stagger: 8, ease: 'power2.out' },
          64
        );
        timeline.to(copy, { autoAlpha: 1, y: 0, duration: 16, stagger: 3, ease: 'power2.out' }, 72);
        timeline.to(captions, { autoAlpha: 1, duration: 12, ease }, 84);
        timeline.to(
          select('[data-archive-rule] > span'),
          { scaleX: 1, duration: 14, ease: 'power2.out' },
          84
        );
        timeline.to(select('[data-archive-rule] small'), { autoAlpha: 1, duration: 8, ease }, 94);
        timeline.to({}, { duration: TOTAL_UNITS - timeline.duration() });

        const readyAt = TRACK_UNITS / TOTAL_UNITS;
        let lightAt = (overviewHalfway() * TRACK_UNITS) / TOTAL_UNITS;
        const publishCollectionTarget = (trigger: ScrollTrigger) => {
          // Navigation opens What's On at the pin start and Collection where it fills the screen.
          root.dataset.journeyStart = String(trigger.start);
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
          delete root.dataset.journeyStart;
          root.removeAttribute('data-light-stage');
        };
      },
      root
    );

    // Karakalpak arts. The ornament is the doorway, and everything moves at one
    // steady pace with the scroll: while the ornament weaves itself, the textile
    // seeps in around its red knot through a soft, feathered edge, and the copy
    // surfaces as the cloth settles. Phases overlap, so there is never a jump.
    media.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        const frame = culture.querySelector<HTMLElement>('[data-culture-frame]')!;
        const ornament = culture.querySelector<SVGSVGElement>('[data-woven-ornament]')!;
        const knot = culture.querySelector<SVGPathElement>('[data-weave-red]')!;
        const point = culture.querySelector<SVGCircleElement>('[data-weave-point]')!;
        const textileField = culture.querySelector<HTMLElement>('[data-textile-field]')!;
        const paths = Array.from(ornament.querySelectorAll('path'));
        const copyParts = select(
          '[data-culture-heading], [data-culture-statement], [data-culture-desc], [data-culture-link]'
        );
        let fullRadius = 1;

        // The opening is centred on the red knot and must reach the farthest corner.
        const placeOpening = () => {
          const box = frame.getBoundingClientRect();
          const knotBox = knot.getBoundingClientRect();
          const x = knotBox.left + knotBox.width / 2 - box.left;
          const y = knotBox.top + knotBox.height / 2 - box.top;
          fullRadius = Math.max(
            Math.hypot(x, y),
            Math.hypot(box.width - x, y),
            Math.hypot(x, box.height - y),
            Math.hypot(box.width - x, box.height - y)
          );
          textileField.style.setProperty('--opening-x', `${x.toFixed(1)}px`);
          textileField.style.setProperty('--opening-y', `${y.toFixed(1)}px`);
          textileField.style.setProperty(
            '--opening-feather',
            `${(fullRadius * 0.35).toFixed(1)}px`
          );
        };
        placeOpening();

        prepareStrokes(paths);
        gsap.set(point, { scale: 0, transformOrigin: '50% 50%' });
        gsap.set(copyParts, { autoAlpha: 0, y: 24 });

        const weave = gsap.timeline({ defaults: { ease: 'none' } });
        // 0 → 0.56: the ornament weaves itself, thread after thread, at an even pace.
        weave.to(point, { scale: 1, duration: 0.06, ease: 'sine.out' }, 0);
        const threads = [
          '[data-weave-rule]',
          '[data-weave-node]',
          '[data-weave-thread]',
          '[data-weave-connection]',
          '[data-weave-diagonal]',
          '[data-weave-second]',
          '[data-weave-finish]',
          '[data-weave-red]',
        ];
        threads.forEach((thread, index) =>
          weave.to(select(thread), { strokeDashoffset: 0, duration: 0.12 }, 0.02 + index * 0.055)
        );
        weave.to(point, { scale: 0, duration: 0.08, ease: 'sine.in' }, 0.48);
        // 0.16 → 0.76, in parallel: the textile seeps in from the knot through a feathered edge.
        weave.fromTo(
          textileField,
          // Starts a full feather inside zero, so nothing shows before the weave reaches it.
          { '--opening-radius': () => `${(-fullRadius * 0.35).toFixed(1)}px`, scale: 1.1 },
          {
            '--opening-radius': () => `${fullRadius.toFixed(1)}px`,
            scale: 1.03,
            duration: 0.6,
          },
          0.16
        );
        // The threads pale from earth to bone while the dark fills in behind them.
        weave.to(
          paths.filter((path) => !path.hasAttribute('data-weave-red')),
          { stroke: '#e3d6c0', duration: 0.34 },
          0.32
        );
        weave.to(select('[data-red-fiber]'), { autoAlpha: 0.18, duration: 0.3 }, 0.4);
        // 0.56 → 0.88: the copy surfaces line by line as the cloth settles.
        weave.to(
          copyParts,
          { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.04, ease: 'sine.out' },
          0.56
        );
        // Held frame: a slow settle of the cloth; the ornament quiets down.
        weave.fromTo(
          textileField,
          { scale: 1.03 },
          { scale: 1, duration: 0.24, immediateRender: false },
          0.76
        );
        weave.to(ornament, { opacity: 0.6, duration: 0.24 }, 0.76);

        const weaveTrigger = ScrollTrigger.create({
          id: 'savitsky-material-culture',
          trigger: culture,
          animation: weave,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: placeOpening,
        });

        // The header turns dark once the textile has filled the screen beneath it.
        ScrollTrigger.create({
          id: 'savitsky-material-culture-nav',
          trigger: culture,
          start: () => weaveTrigger.start + (weaveTrigger.end - weaveTrigger.start) * 0.74,
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
    delete root.dataset.journeyStart;
    document.documentElement.removeAttribute('data-museum-culture');
    media.revert();
    context.revert();
  };
}
