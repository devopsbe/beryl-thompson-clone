'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ParallaxHero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle mouse movement for interactive parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { clientWidth, clientHeight } = heroRef.current;
        const centerX = clientWidth / 2;
        const centerY = clientHeight / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        setMousePosition({
          x: mouseX / centerX,
          y: mouseY / centerY
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Calculate parallax transformations
  const calculateTransform = (depth: number) => {
    const scrollFactor = scrollY * 0.1 * depth;
    const mouseFactorX = mousePosition.x * 15 * depth;
    const mouseFactorY = mousePosition.y * 15 * depth;
    
    return {
      transform: `translate3d(${mouseFactorX}px, ${mouseFactorY - scrollFactor}px, 0)`
    };
  };

  return (
    <section 
      ref={heroRef}
      className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background gradient that moves slightly with mouse */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary opacity-90 animate-gradient"
        style={calculateTransform(0.2)}
      ></div>
      
      {/* Pattern overlay with parallax effect */}
      <div 
        className="absolute inset-0 bg-[url('/pattern.png')] bg-repeat opacity-10"
        style={calculateTransform(0.5)}
      ></div>
      
      {/* Portal effects - circular gradients that expand and contract */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] portal-circle animate-depth-pulse"
          style={calculateTransform(-0.3)}
        ></div>
      </div>
      
      {/* Expanding circles - creating a sense of moving inward */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="absolute w-10 h-10 rounded-full bg-white/20 animate-circle-expand"
            style={{ 
              animationDelay: `${i}s`,
              ...calculateTransform(-0.2 * (i + 1))
            }}
          ></div>
        ))}
      </div>
      
      {/* Central meditation ripple */}
      <div 
        className="absolute h-24 w-24 rounded-full bg-primary-light/20 meditation-ripple"
        style={calculateTransform(-0.1)}
      ></div>
      
      {/* Content that moves slightly against the background */}
      <div 
        className="container-custom relative z-10 animate-float-in"
        style={calculateTransform(-0.3)}
      >
        <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-wider leading-tight hero-text">
          A JOURNEY TO<br />THE SELF
        </h1>
        <p className="text-xl md:text-3xl tracking-wide mb-10 max-w-3xl mx-auto">
          TRUST WHAT YOU HEAR WHEN YOU LISTEN
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/appointments" className="btn btn-primary btn-lg pulse-animation">
            Book a Session
          </Link>
          <Link href="/book" className="btn btn-outline">
            Explore Our Book
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce"
        style={calculateTransform(-0.4)}
      >
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default ParallaxHero; 