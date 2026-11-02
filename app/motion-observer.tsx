'use client';

import { useLayoutEffect } from 'react';

export function MotionObserver() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    const testimonialQuote = document.querySelector<HTMLElement>('.testimonial blockquote');
    const quoteWords = Array.from(document.querySelectorAll<HTMLElement>('.quote-word'));
    // Reveal individual text blocks instead of hiding whole sections or forms.
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => {
      if (element.dataset.reveal !== 'image') element.removeAttribute('data-reveal');
    });
    const textSelector = 'h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,summary,a,span,strong,.section-kicker,.eyebrow';
    const excluded = 'a,form,button,svg,.sr-only,[aria-hidden="true"],.site-header,.floating-book-tab,.mobile-inquire-bar,.mobile-inquire-sheet,.gallery-lightbox,.story-stack,.history-photo-layout,.event-accordion [data-slot="accordion-content"]';
    const candidates = Array.from(document.querySelectorAll<HTMLElement>(textSelector))
      .filter(element => element.textContent?.trim() && !element.closest(excluded));
    const textBlocks = new Set(candidates);
    const mobileEntrance = window.matchMedia('(max-width: 760px)').matches;
    const heroCopySelector = '.hero-content,.about-hero-copy,.interior-hero-copy,.event-gallery-intro';
    candidates.forEach(element => {
      // Mobile hero entrances begin in CSS on first paint, never replay on hydration.
      if (mobileEntrance && element.closest(heroCopySelector)) return;
      // Keep inline emphasis and icons attached to their parent text block.
      let parent = element.parentElement;
      while (parent) {
        if (textBlocks.has(parent) || parent.dataset.reveal === 'image') return;
        parent = parent.parentElement;
      }
      element.dataset.reveal = 'text';
      if (!element.dataset.delay) element.dataset.delay = '0';
    });
    document.querySelectorAll<HTMLElement>('.hero-brand').forEach(element => {
      if (!mobileEntrance) element.dataset.reveal = 'text';
    });
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const pageHero = document.querySelector<HTMLElement>('.hero,.about-hero,.interior-hero,.event-gallery-hero');
    const copySelector = '.hero-content,.about-hero-copy,.interior-hero-copy,.event-gallery-intro';
    const readingOrder = (a: HTMLElement, b: HTMLElement) => {
      const first = a.getBoundingClientRect();
      const second = b.getBoundingClientRect();
      return first.top - second.top || first.left - second.left;
    };
    // Keep the hero's opening sequence intentional without making the rest of the
    // page wait behind elements that may already be off-screen.
    const heroStarts = new Map<HTMLElement, number>();
    const startedAt = performance.now();
    let heroEnd = startedAt;
    const heroElements = elements.filter(element => pageHero?.contains(element));
    const copy = heroElements.filter(element => element.closest(copySelector)).sort(readingOrder);
    const supporting = heroElements.filter(element => !element.closest(copySelector)).sort(readingOrder);
    [copy, supporting].forEach(group => {
      if (!group.length) return;
      const groupStart = heroEnd + 120;
      group.forEach((element, index) => heroStarts.set(element, groupStart + index * 180));
      heroEnd = groupStart + (group.length - 1) * 180 + 900;
    });
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'));
    const countFrames = new Set<number>();
    const countTimers = new Set<number>();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reducedMotion = prefersReducedMotion || window.matchMedia('(max-width: 760px)').matches;
    let quoteFrame = 0;
    let lastQuoteScrollY = window.scrollY;
    let lastQuoteScrollAt = performance.now();
    let lastScrollVelocity = 0;
    const deferredBackgrounds = Array.from(document.querySelectorAll<HTMLElement>('[data-defer-bg]'));
    const backgroundObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-bg-ready');
        backgroundObserver.unobserve(entry.target);
      });
    }, { rootMargin: '400px 0px' });
    deferredBackgrounds.forEach(element => backgroundObserver.observe(element));

    let quoteVisible = false;
    quoteWords.forEach(word => { word.style.filter = 'none'; word.style.willChange = 'auto'; });
    const updateQuote = (downwardVelocity = 0) => {
      if (!quoteVisible && !prefersReducedMotion) return;
      cancelAnimationFrame(quoteFrame);
      quoteFrame = requestAnimationFrame(() => {
        if (!testimonialQuote || !quoteWords.length || prefersReducedMotion) {
          quoteWords.forEach(word => {
            word.style.opacity = '1';
            word.style.transform = 'none';
            word.style.filter = 'none';
          });
          return;
        }

        const rect = testimonialQuote.getBoundingClientRect();
        // Hold the quote below five-percent opacity until it is meaningfully in view,
        // then finish the full sentence as its centre approaches the viewport centre.
        const revealStart = window.innerHeight * .76;
        const revealEnd = window.innerHeight * .5 - rect.height * .5;
        const revealDistance = Math.max(1, revealStart - revealEnd);
        const positionProgress = Math.max(0, Math.min(1, (revealStart - rect.top) / revealDistance));
        // Fast downward scrolling shortens the visual catch-up and advances the
        // reveal slightly, while deliberate scrolling preserves the full stagger.
        const speed = Math.min(1, downwardVelocity / 2.4);
        const progress = Math.min(1, positionProgress + speed * .16);
        testimonialQuote.style.setProperty('--quote-opacity-duration', `${Math.round(550 - speed * 430)}ms`);
        testimonialQuote.style.setProperty('--quote-transform-duration', `${Math.round(700 - speed * 520)}ms`);
        const lastWord = Math.max(1, quoteWords.length - 1);

        quoteWords.forEach((word, index) => {
          const wordStart = (index / lastWord) * .25;
          const wordProgress = Math.max(0, Math.min(1, (progress - wordStart) / .75));
          const eased = 1 - Math.pow(1 - wordProgress, 3);
          word.style.opacity = String(.035 + eased * .965);
          word.style.transform = `translateY(${(1 - eased) * 18}px)`;
        });
      });
    };

    const updateOnScroll = () => {
      const now = performance.now();
      const elapsed = Math.max(8, now - lastQuoteScrollAt);
      const delta = window.scrollY - lastQuoteScrollY;
      const downwardVelocity = delta > 0 ? delta / elapsed : 0;
      lastScrollVelocity = downwardVelocity;
      lastQuoteScrollY = window.scrollY;
      lastQuoteScrollAt = now;
      updateQuote(downwardVelocity);
    };
    const updateQuoteOnResize = () => updateQuote();

    root.classList.add('motion-ready');
    elements.forEach((element) => {
      const delay = Number(element.dataset.delay ?? 0);
      element.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    // If someone scrolls before hydration finishes, never hide content they have
    // already reached just to replay its entrance animation.
    if (window.scrollY > 24) {
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top >= window.innerHeight * 1.2) return;
        element.dataset.revealComplete = 'true';
        element.classList.add('is-visible');
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const now = performance.now();
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => readingOrder(a.target as HTMLElement, b.target as HTMLElement));
        const speed = Math.min(1, lastScrollVelocity / 2.4);
        visibleEntries.forEach((entry, index) => {
          const element = entry.target as HTMLElement;
          const heroStart = heroStarts.get(element);
          const declaredDelay = Math.max(0, Number(element.dataset.delay ?? 0));
          const mobile = window.matchMedia('(max-width: 760px)').matches;
          const viewportDelay = (Math.min(declaredDelay, 80) + Math.min(index * (mobile ? 100 : 12), mobile ? 400 : 48)) * (1 - speed * .9);
          const delay = heroStart === undefined ? viewportDelay : Math.max(0, heroStart - now);
          element.style.setProperty('--reveal-delay', `${Math.round(delay)}ms`);
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px 20% 0px' },
    );

    elements.forEach((element) => {
      if (element.dataset.revealComplete !== 'true') observer.observe(element);
    });

    // Focus temporarily cancels entrance animations. Remember completion so blur cannot replay them.
    const completeReveal = (element: HTMLElement) => {
      element.dataset.revealComplete = 'true';
      element.classList.add('is-visible');
      observer.unobserve(element);
    };
    const onRevealEnd = (event: AnimationEvent) => {
      if (event.animationName === 'text-reveal-down' && event.target instanceof HTMLElement) {
        completeReveal(event.target);
      }
    };
    const onRevealFocus = (event: FocusEvent) => {
      let element = event.target instanceof HTMLElement ? event.target : null;
      while (element) {
        if (element.dataset.reveal === 'text') completeReveal(element);
        element = element.parentElement;
      }
    };
    document.addEventListener('animationend', onRevealEnd);
    document.addEventListener('focusin', onRevealFocus);

    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          const target = Number(element.dataset.countTo ?? 0);
          const suffix = element.dataset.countSuffix ?? '';
          const delay = Number(element.dataset.countDelay ?? 0);

          countObserver.unobserve(element);
          if (reducedMotion) {
            element.textContent = `${target}${suffix}`;
            return;
          }

          element.textContent = `0${suffix}`;
          const timer = window.setTimeout(() => {
            const startedAt = performance.now();
            const duration = 1750;
            const tick = (now: number) => {
              const progress = Math.min((now - startedAt) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 4);
              element.textContent = `${Math.round(target * eased)}${suffix}`;
              if (progress < 1) {
                const id = requestAnimationFrame(tick);
                countFrames.add(id);
              }
            };
            const id = requestAnimationFrame(tick);
            countFrames.add(id);
          }, delay);
          countTimers.add(timer);
        });
      },
      { threshold: 0.55 },
    );

    counters.forEach((counter) => countObserver.observe(counter));
    const quoteObserver = new IntersectionObserver(entries => {
      quoteVisible = entries[0]?.isIntersecting ?? false;
      if (quoteVisible) updateQuote();
    }, { rootMargin: '100px 0px' });
    if (testimonialQuote) quoteObserver.observe(testimonialQuote);
    updateQuote();
    window.addEventListener('scroll', updateOnScroll, { passive: true });
    window.addEventListener('resize', updateQuoteOnResize, { passive: true });
    return () => {
      cancelAnimationFrame(quoteFrame);
      observer.disconnect();
      document.removeEventListener('animationend', onRevealEnd);
      document.removeEventListener('focusin', onRevealFocus);
      backgroundObserver.disconnect();
      countObserver.disconnect();
      countFrames.forEach((id) => cancelAnimationFrame(id));
      countTimers.forEach((id) => window.clearTimeout(id));
      root.classList.remove('motion-ready');
      quoteObserver.disconnect();
      window.removeEventListener('scroll', updateOnScroll);
      window.removeEventListener('resize', updateQuoteOnResize);
    };
  }, []);

  return null;
}
