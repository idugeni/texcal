'use client';

import { useEffect, useRef, useState } from 'react';

type AnimationOptions = {
  threshold?: number;
  rootMargin?: string;
  repeat?: boolean;
  delay?: number;
  initiallyVisible?: boolean; // Added new option to control initial visibility
};

/**
 * A hook that applies animations when an element enters the viewport
 * @param options Configuration options for the intersection observer
 * @returns An object containing the ref to attach to the element and animation state
 */
export function useViewportAnimation(options: AnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    repeat = false,
    delay = 0,
    initiallyVisible = false // Default to false for backward compatibility
  } = options;
  
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(initiallyVisible); // Initialize with initiallyVisible
  const [hasAnimated, setHasAnimated] = useState(initiallyVisible); // Initialize hasAnimated accordingly
  
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          // If repeat is false and element has already animated, don't animate again
          if (!repeat && hasAnimated) return;
          
          // Add delay if specified
          if (delay > 0) {
            setTimeout(() => {
              setIsInView(true);
              setHasAnimated(true);
            }, delay);
          } else {
            setIsInView(true);
            setHasAnimated(true);
          }
        } else if (repeat) {
          // Only reset animation if repeat is true
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(currentRef);
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, repeat, delay, hasAnimated]);
  
  return { ref, isInView };
}