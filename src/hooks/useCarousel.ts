import { useState, useEffect, useRef, useCallback } from "react";

interface UseCarouselProps {
  itemCount: number;
  interval?: number; // ms between rotations (default 4500ms = 4.5s)
  transitionDuration?: number; // ms for crossfade (default 400ms)
}

/**
 * Hook for auto-rotating carousel functionality.
 * Cycles through items with smooth crossfade transitions.
 *
 * Usage:
 * const { currentIndex, isTransitioning, handleNext, handlePrev } = useCarousel({
 *   itemCount: events.length,
 *   interval: 4500,
 * });
 *
 * return (
 *   <>
 *     {events.map((event, i) => (
 *       <div
 *         key={i}
 *         style={{
 *           opacity: i === currentIndex ? 1 : 0,
 *           transition: `opacity ${transitionDuration}ms ease-in-out`,
 *         }}
 *       >
 *         {event}
 *       </div>
 *     ))}
 *   </>
 * );
 */
export const useCarousel = ({
  itemCount,
  interval = 4500,
  transitionDuration = 400,
}: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // recursive timeout-based rotation (never stops, no interval resets)
  useEffect(() => {
    if (prefersReducedMotion || itemCount <= 1) return;

    let cancelled = false;

    const rotate = () => {
      if (cancelled) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % itemCount);
        setIsTransitioning(false);
        if (!cancelled) {
          setTimeout(rotate, interval);
        }
      }, transitionDuration);
    };

    rotate();

    return () => {
      cancelled = true;
    };
  }, [itemCount, interval, transitionDuration, prefersReducedMotion]);

  // Manual next/prev controls (optional)
  const handleNext = useCallback(() => {
    if (prefersReducedMotion) {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % itemCount);
      setIsTransitioning(false);
    }, transitionDuration);
    // note: interval continues uninterrupted
  }, [itemCount, transitionDuration, prefersReducedMotion]);

  const handlePrev = useCallback(() => {
    if (prefersReducedMotion) {
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
      setIsTransitioning(false);
    }, transitionDuration);
    // note: interval continues uninterrupted
  }, [itemCount, transitionDuration, prefersReducedMotion]);

  return {
    currentIndex,
    isTransitioning,
    handleNext,
    handlePrev,
  };
};
