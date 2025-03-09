'use client';

import { useEffect, useRef, useState } from 'react';
import SwirlingBackground from './SwirlingBackground';

interface JourneyDeeperParallaxProps {
  children: React.ReactNode;
}

const JourneyDeeperParallax = ({ children }: JourneyDeeperParallaxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    // Set initial viewport and document height
    setViewportHeight(window.innerHeight);
    setDocumentHeight(document.body.scrollHeight);

    // Handle window resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
      setDocumentHeight(document.body.scrollHeight);
    };

    // Handle scroll for parallax effect
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollY(window.scrollY);
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    // Initial call
    handleScroll();
    
    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Add dynamic parallax elements
    if (containerRef.current) {
      // Clear existing elements first
      const existingElements = containerRef.current.querySelectorAll('.journey-depth-element');
      existingElements.forEach(el => el.remove());

      // Create overlapping circles that move at different rates
      // Reduced from 10 to 6 elements for less interference
      for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        // Reduced opacity from 5% to 3% in light mode and 10% to 6% in dark mode
        element.className = `journey-depth-element absolute rounded-full bg-primary/3 dark:bg-primary/6`;
        
        // Reduced base size from 50px to 30px
        const size = 30 + (i * 15);
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Position elements more toward the edges to avoid text
        // Use modulo to alternate left/right positioning
        const leftPosition = i % 2 === 0 
          ? Math.random() * 20 // Left side (0-20%)
          : 80 + (Math.random() * 20); // Right side (80-100%)
        
        const top = 15 + (i * 15); // More spread out vertically
        element.style.left = `${leftPosition}%`;
        element.style.top = `${top}%`;
        
        // Set z-index to create layering
        element.style.zIndex = `${-i}`;
        
        // Add to the container
        containerRef.current.appendChild(element);
      }
    }
  }, [viewportHeight]); // Re-create elements when viewport changes

  useEffect(() => {
    // Update the parallax effect based on scroll position
    const parallaxElements = document.querySelectorAll('.journey-depth-element');
    
    parallaxElements.forEach((element, index) => {
      const el = element as HTMLElement;
      // Reduced speed slightly for more subtle movement
      const speed = 0.03 + (index * 0.03);
      const yPos = -(scrollY * speed);
      // Reduced scale factor from 0.0005 to 0.0003
      const scale = 1 + (scrollY * 0.0003 * (index + 1));
      el.style.transform = `translateY(${yPos}px) scale(${scale})`;
      
      // Reduced maximum opacity from 0.5 to 0.3 and factor from 0.0004 to 0.0002
      const opacity = 0.05 + Math.min(0.3, scrollY * 0.0002 * (index + 1));
      el.style.opacity = `${opacity}`;
    });

    // Update section elements with more subtle effects
    const sections = document.querySelectorAll('.journey-section');
    sections.forEach((section, index) => {
      const el = section as HTMLElement;
      const rect = el.getBoundingClientRect();
      
      // Only apply effects to sections in or near the viewport
      if (rect.top < viewportHeight + 200 && rect.bottom > -200) {
        const distanceFromCenter = (viewportHeight / 2) - (rect.top + rect.height / 2);
        // Reduced opacity change from 0.5 to 0.2 for more consistent visibility
        const opacity = Math.min(1, 0.8 + (Math.abs(distanceFromCenter) / viewportHeight) * 0.2);
        
        // Elements that are closer to center of viewport are more visible
        el.style.opacity = `${opacity}`;
        
        // Reduced scale effect from 0.95-1.0 to 0.98-1.0
        const scale = 0.98 + (0.02 * opacity);
        el.style.transform = `scale(${scale})`;
      }
    });
  }, [scrollY, viewportHeight]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Swirling background effect */}
      <SwirlingBackground scrollY={scrollY} documentHeight={documentHeight} />
      
      {/* This will wrap around the entire content and provide a container for our parallax elements */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Reduced opacity of background gradient from 50% to 30% */}
      <div 
        className="fixed inset-0 bg-gradient-radial from-background to-background-alt dark:from-background-dark dark:to-background-darkAlt opacity-30 pointer-events-none z-0"
        style={{ 
          transform: `translateY(${scrollY * 0.03}px)`, // Reduced from 0.05 to 0.03
          backgroundSize: `${100 + scrollY * 0.05}% ${100 + scrollY * 0.05}%`, // Reduced from 0.1 to 0.05
          backgroundPosition: 'center',
        }}
      />
    </div>
  );
};

export default JourneyDeeperParallax; 