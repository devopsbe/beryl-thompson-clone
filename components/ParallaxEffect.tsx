'use client';

import { useEffect } from 'react';

export default function ParallaxEffect() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Select all elements with parallax-layer class
      const parallaxLayers = document.querySelectorAll('.parallax-layer');
      
      // Update their positions based on scroll
      parallaxLayers.forEach((layer) => {
        const element = layer as HTMLElement;
        if (element.classList.contains('depth-1')) {
          element.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        } else if (element.classList.contains('depth-2')) {
          element.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        } else if (element.classList.contains('depth-3')) {
          element.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Calculate mouse position relative to center
      const mouseXPercent = (clientX / windowWidth - 0.5) * 2;
      const mouseYPercent = (clientY / windowHeight - 0.5) * 2;
      
      // Select all elements with parallax-layer class
      const parallaxLayers = document.querySelectorAll('.parallax-layer');
      
      // Update their positions based on mouse
      parallaxLayers.forEach((layer) => {
        const element = layer as HTMLElement;
        const baseTransform = element.style.transform || '';
        
        if (element.classList.contains('depth-1')) {
          element.style.transform = `${baseTransform} translate(${mouseXPercent * -5}px, ${mouseYPercent * -5}px)`;
        } else if (element.classList.contains('depth-2')) {
          element.style.transform = `${baseTransform} translate(${mouseXPercent * -10}px, ${mouseYPercent * -10}px)`;
        } else if (element.classList.contains('depth-3')) {
          element.style.transform = `${baseTransform} translate(${mouseXPercent * -15}px, ${mouseYPercent * -15}px)`;
        }
      });
    };

    // Create portal effect
    const createJourneyPortal = () => {
      const portalContainer = document.createElement('div');
      portalContainer.className = 'fixed inset-0 pointer-events-none z-50 opacity-0 transition-opacity duration-1000';
      portalContainer.style.pointerEvents = 'none';
      
      // This function creates the journey effect on click of the CTA
      const activateJourney = () => {
        const primaryCTA = document.querySelector('.pulse-animation');
        
        if (primaryCTA) {
          primaryCTA.addEventListener('click', (e) => {
            // Prevent immediate navigation
            e.preventDefault();
            
            // Show the portal effect
            portalContainer.style.opacity = '1';
            
            // Create the portal animation
            const portal = document.createElement('div');
            portal.className = 'absolute inset-0 flex items-center justify-center';
            
            // Create expanding circles
            for (let i = 0; i < 5; i++) {
              const circle = document.createElement('div');
              circle.className = 'absolute rounded-full bg-primary-light';
              circle.style.width = '20px';
              circle.style.height = '20px';
              circle.style.animation = `circleExpand 3s ease-out forwards ${i * 0.2}s`;
              circle.style.opacity = '0.8';
              
              portal.appendChild(circle);
            }
            
            portalContainer.appendChild(portal);
            
            // Navigate after animation completes
            setTimeout(() => {
              const href = (primaryCTA as HTMLAnchorElement).href;
              window.location.href = href;
            }, 1500);
          });
        }
      };
      
      document.body.appendChild(portalContainer);
      activateJourney();
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    // Initialize effects
    handleScroll();
    createJourneyPortal();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // This component doesn't render anything
  return null;
} 