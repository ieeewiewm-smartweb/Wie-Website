import { useEffect, useRef, useCallback, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { type Event as ContentEvent } from "@/types/content";
import EventCard from "./EventCard";

interface RecentEventSliderProps {
  events: ContentEvent[];
}

export default function RecentEventSlider({ events }: RecentEventSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const offsetRef = useRef(0);
  const isPausedRef = useRef(false);
  const lastTimeRef = useRef(0);
  const [, forceRender] = useState(0);

  // Card width + gap (320px card + 32px gap = 352px)
  const CARD_WIDTH = 352;
  const SPEED = 0.8; // Reduced speed for better performance

  // Duplicate events for seamless looping
  const duplicatedEvents = [...events, ...events];
  const halfWidth = events.length * CARD_WIDTH;

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPausedRef.current && delta < 100) {
        offsetRef.current -= SPEED * (delta / 20); // Slower animation

        // When we've scrolled past the first set, instantly reset
        if (Math.abs(offsetRef.current) >= halfWidth) {
          offsetRef.current += halfWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    },
    [halfWidth]
  );

  useEffect(() => {
    if (events.length === 0) return;
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [animate, events.length]);

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    isPausedRef.current = false;
    lastTimeRef.current = 0; // prevent delta spike
  };

  const slideByOne = (direction: number) => {
    // Temporarily pause, shift by one card width, then resume
    isPausedRef.current = true;
    const target = offsetRef.current + direction * CARD_WIDTH;

    const start = offsetRef.current;
    const startTime = performance.now();
    const duration = 400; // ms

    const animateSlide = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      offsetRef.current = start + (target - start) * eased;

      // Wrap around
      if (Math.abs(offsetRef.current) >= halfWidth) {
        offsetRef.current += halfWidth;
      }
      if (offsetRef.current > 0) {
        offsetRef.current -= halfWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }

      if (progress < 1) {
        requestAnimationFrame(animateSlide);
      } else {
        isPausedRef.current = false;
        lastTimeRef.current = 0;
      }
    };

    requestAnimationFrame(animateSlide);
  };

  if (events.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto">
        {/* Carousel container */}
        <div
          className="overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={trackRef}
            className="flex gap-8"
            style={{ willChange: "transform" }}
          >
            {duplicatedEvents.map((event, i) => (
              <Link
                to={`/event/${event.id}`}
                key={`${event.id}-${i}`}
                className="flex-shrink-0"
              >
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => slideByOne(1)}
            className="p-3 rounded-full bg-[#7C3AED] text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-purple-800 hover:shadow-lg"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => slideByOne(-1)}
            className="p-3 rounded-full bg-[#7C3AED] text-white shadow-md transition-all duration-300 hover:scale-110 hover:bg-purple-800 hover:shadow-lg"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
