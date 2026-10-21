import { scrollToPosition } from '@/lib/smoothScroll';

// Home page sections the navigation can open directly.
export const HOME_SECTIONS = ['hero', 'about', 'whats-on', 'collection', 'stories'] as const;

const navigationHeight = () =>
  document.querySelector<HTMLElement>('[data-site-navigation]')?.offsetHeight ?? 72;

/** Where a home section begins, accounting for the pinned horizontal journey. */
function sectionTop(id: string): number | null {
  if (id === 'hero') return 0;
  const journey = document.querySelector<HTMLElement>('[data-collection-journey]');
  // What's On and Collection live inside the pinned track: open the exact frame
  // where each one fills the screen, not the place their boxes happen to sit.
  if (id === 'whats-on' && journey?.dataset.journeyStart)
    return Number(journey.dataset.journeyStart);
  if (id === 'collection' && journey?.dataset.collectionScrollTarget)
    return Number(journey.dataset.collectionScrollTarget);
  const element = id === 'whats-on' ? journey : document.getElementById(id);
  if (!element) return null;
  return window.scrollY + element.getBoundingClientRect().top - navigationHeight();
}

let request = 0;

/**
 * Opens a home section instantly — no scrolling through everything in between.
 * Re-aligns once more after late layout (images, fonts, pin measurements).
 */
export function jumpToSection(id: string) {
  const current = ++request;
  const jump = () => {
    if (current !== request) return;
    const top = sectionTop(id);
    if (top !== null && Number.isFinite(top)) scrollToPosition(top, true);
  };
  const journeyReady = () =>
    document.querySelector<HTMLElement>('[data-collection-journey]')?.dataset
      .collectionNavigationReady === 'true';

  // The pinned journey publishes its positions once its animation is built.
  const waitForJourney = (attempt = 0) => {
    if (current !== request) return;
    if (journeyReady() || attempt > 40) {
      jump();
      window.setTimeout(jump, 160);
      window.setTimeout(jump, 600);
      return;
    }
    window.setTimeout(() => waitForJourney(attempt + 1), 75);
  };
  waitForJourney();
}

/** Splits "/#about" into the home section id, or returns null for other links. */
export function homeSectionFromHref(href: string): string | null {
  const match = /^\/#([\w-]+)$/.exec(href);
  return match && (HOME_SECTIONS as readonly string[]).includes(match[1]) ? match[1] : null;
}
