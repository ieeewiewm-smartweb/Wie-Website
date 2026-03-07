# Event Animations Implementation

## What Was Added

Your existing events section in `src/pages/Index.tsx` now has two new animations applied:

### 1. **Scroll-Triggered Entry Animation** (`useScrollReveal` hook)
- **Trigger**: When each event card enters the viewport
- **Effect**: Fade in (opacity 0→1) + slide up (translateY 30px→0)
- **Duration**: 600ms with ease-out
- **Stagger**: 100ms delay between each card
- **How it works**:
  - Uses native `IntersectionObserver` API for performance
  - Only triggers animation once per element
  - Respects user's `prefers-reduced-motion` setting
  - Located in: `src/hooks/useScrollReveal.ts`

### 2. **Auto-Rotating Carousel** (`useCarousel` hook)
- **Behavior**: Shows one event at a time, cycles through all events
- **Rotation Speed**: 4.5 seconds per event
- **Transition**: 400ms smooth crossfade (opacity fade) between events
- **Loop**: Automatically loops back to first event
- **No Controls**: No visible dots, arrows, or manual controls (as requested)
- **How it works**:
  - Uses CSS opacity and visibility to show/hide cards
  - Carousel container maintains layout structure
  - Respects `prefers-reduced-motion` setting
  - Located in: `src/hooks/useCarousel.ts`

## Updated Files

1. **`src/pages/Index.tsx`**
   - Removed old GSAP animation logic
   - Added `useScrollReveal` and `useCarousel` hooks
   - Wrapped event cards in carousel container divs
   - Ref handling updated to use new animation hook

2. **`src/hooks/useScrollReveal.ts`** (NEW)
   - Custom hook for intersection observer-based animations
   - Fade-in + slide-up effect on scroll

3. **`src/hooks/useCarousel.ts`** (NEW)
   - Custom hook for auto-rotating carousel
   - Handles cycling, transitions, and motion preferences

## No Layout Changes

- ✅ Event cards structure unchanged
- ✅ Event content unchanged
- ✅ All existing styles preserved
- ✅ Responsive design maintained
- ✅ Mobile/tablet/desktop support unchanged

## Accessibility

Both animations respect user preferences:
- ✅ Checks `prefers-reduced-motion` media query
- ✅ Shows elements instantly if reduced motion is preferred
- ✅ No animation barriers for users with motion sensitivity

## How to Customize

### Change carousel speed:
```tsx
const { currentIndex: carouselIndex } = useCarousel({
  itemCount: events.length,
  interval: 5000, // Change to desired ms (default: 4500)
  transitionDuration: 400,
});
```

### Change scroll animation speed:
```tsx
const eventRefsForAnimation = useScrollReveal({
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
  staggerDelay: 150, // Change delay between cards (default: 100)
});
```

### Adjust scroll trigger point:
```tsx
// rootMargin: "0px 0px -50px 0px"
// This triggers 50px before the card enters viewport
// Adjust the -50 value to trigger earlier/later
```

## Browser Support

- Modern browsers with `IntersectionObserver` support (all modern browsers)
- Graceful fallback for older browsers (shows elements without animation)
