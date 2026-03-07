import { useEffect, useRef } from "react";

interface UseScrollRevealProps {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number; // ms delay between each element
}

/**
 * Hook for scroll-triggered reveal animation.
 * Elements fade in and slide up from below when they enter the viewport.
 *
 * Usage:
 * const elementsRef = useScrollReveal({ staggerDelay: 100 });
 * <div ref={el => elementsRef.current[0] = el}>Item 1</div>
 * <div ref={el => elementsRef.current[1] = el}>Item 2</div>
 */
export const useScrollReveal = ({
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  staggerDelay = 100,
}: UseScrollRevealProps = {}) => {
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Show all elements immediately
      elementsRef.current.forEach((el) => {
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }
      });
      return;
    }

    // Filter out null elements
    const elements = elementsRef.current.filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    // Track which elements have been animated
    const animatedSet = new Set<HTMLElement>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !animatedSet.has(entry.target as HTMLElement)) {
          animatedSet.add(entry.target as HTMLElement);
          const element = entry.target as HTMLElement;
          const staggerIndex = elements.indexOf(element);

          // Trigger animation after stagger delay
          setTimeout(() => {
            element.style.transition =
              "opacity 650ms ease-out, transform 650ms ease-out";
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
          }, staggerIndex * staggerDelay);

          // Stop observing after animation is triggered (only once)
          observer.unobserve(element);
        }
      });
    }, {
      threshold,
      rootMargin,
    });

    // Set initial styles and observe all elements
    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(40px)";
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, staggerDelay]);

  return elementsRef;
};
