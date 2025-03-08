'use client';

import { useEffect, useRef } from 'react';

interface SwirlingBackgroundProps {
  scrollY: number;
  documentHeight: number;
}

const SwirlingBackground = ({ scrollY, documentHeight }: SwirlingBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number | null>(null);

  // Define particle class for the swirling effect
  class Particle {
    x: number;
    y: number;
    size: number;
    baseX: number;
    baseY: number;
    density: number;
    color: string;
    age: number;
    maxAge: number;
    angle: number;
    angularVelocity: number;
    radius: number;
    glowEffect: boolean;

    constructor(x: number, y: number, canvas: HTMLCanvasElement, color: string) {
      this.x = x;
      this.y = y;
      this.baseX = x;
      this.baseY = y;
      // Increase size range from 1-4px to 2-7px
      this.size = Math.random() * 5 + 2; 
      this.density = (Math.random() * 15) + 5; // Increased movement speed
      this.color = color;
      this.age = 0;
      this.maxAge = 300 + Math.random() * 200; // Increased lifecycle
      this.angle = Math.random() * Math.PI * 2; // Random starting angle
      // Increase angular velocity for more noticeable movement
      this.angularVelocity = (Math.random() * 0.003) + 0.001; 
      // Increase radius of circular path
      this.radius = Math.random() * 150 + 70; 
      // Randomly assign glow effect to some particles
      this.glowEffect = Math.random() > 0.6;
    }

    draw(ctx: CanvasRenderingContext2D) {
      // Draw the swirling particle with enhanced visual effects
      ctx.beginPath();
      
      if (this.glowEffect) {
        // Add glowing effect to some particles
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'rgba(155, 133, 87, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      } else {
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      }
      
      ctx.closePath();
      ctx.fill();
    }

    update(scrollFactor: number) {
      // Update position based on swirling motion
      this.age++;
      
      // Adjust angular velocity based on scroll position
      const adjustedAngularVelocity = this.angularVelocity * (1 + scrollFactor * 0.8);
      
      // Update angle for circular motion
      this.angle += adjustedAngularVelocity;
      
      // Calculate position along circular path
      this.x = this.baseX + Math.cos(this.angle) * this.radius;
      this.y = this.baseY + Math.sin(this.angle) * this.radius;
      
      // Add more pronounced natural movement
      this.x += Math.sin(this.age / 20) * 0.8;
      this.y += Math.cos(this.age / 30) * 0.8;
    }

    getOpacity(scrollY: number, documentHeight: number) {
      // Calculate opacity based on scroll position and particle age
      const scrollFactor = Math.min(1, scrollY / (documentHeight * 0.4)); // Normalize to 0-1 faster
      const fadeFactor = Math.max(0, 1 - (scrollY - documentHeight * 0.7) / (documentHeight * 0.2)); // Fade out in last 20%
      
      // Age-based opacity (fade in and out during lifecycle)
      const ageFactor = Math.min(this.age / 30, (this.maxAge - this.age) / 50);
      const ageOpacity = Math.min(1, Math.max(0, ageFactor));
      
      // Increase base opacity from 0.5 to 0.8
      return Math.min(0.8, ageOpacity * scrollFactor * fadeFactor * 0.7);
    }
  }

  // Initialize canvas and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 2; // Make canvas taller for scrolling
      }
    };

    // Create initial particles
    const initParticles = () => {
      particlesRef.current = [];
      const width = canvas.width;
      const height = canvas.height;
      
      // Enhanced colors with more contrast and vibrancy
      const colors = [
        'rgba(185, 160, 100, 0.9)', // Brighter gold
        'rgba(205, 180, 120, 0.85)', // Light gold
        'rgba(145, 125, 70, 0.85)', // Darker gold
        'rgba(120, 100, 50, 0.8)', // Deep gold
        'rgba(220, 200, 140, 0.8)', // Very light gold
      ];

      // Increase particle count from 80 to 120
      for (let i = 0; i < 120; i++) {
        // Position particles in clusters
        const cluster = Math.floor(Math.random() * 5); // 5 clusters
        let x, y;

        switch (cluster) {
          case 0: // Top cluster
            x = Math.random() * width;
            y = Math.random() * (height * 0.2);
            break;
          case 1: // Middle-top cluster
            x = Math.random() * width;
            y = (height * 0.2) + Math.random() * (height * 0.2);
            break;
          case 2: // Middle cluster
            x = Math.random() * width;
            y = (height * 0.4) + Math.random() * (height * 0.2);
            break;
          case 3: // Middle-bottom cluster
            x = Math.random() * width;
            y = (height * 0.6) + Math.random() * (height * 0.2);
            break;
          case 4: // Bottom cluster
            x = Math.random() * width;
            y = (height * 0.8) + Math.random() * (height * 0.2);
            break;
          default:
            x = Math.random() * width;
            y = Math.random() * height;
        }
        
        // Choose a random color from our enhanced palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particlesRef.current.push(new Particle(x, y, canvas, color));
      }
    };

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate scroll factor (0 to 1)
      const scrollFactor = Math.min(1, scrollY / (documentHeight * 0.4));
      
      // Enable blending for glow effects
      ctx.globalCompositeOperation = 'lighter';
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Replace old particles
        if (particle.age > particle.maxAge) {
          const colors = [
            'rgba(185, 160, 100, 0.9)', // Brighter gold
            'rgba(205, 180, 120, 0.85)', // Light gold
            'rgba(145, 125, 70, 0.85)', // Darker gold
            'rgba(120, 100, 50, 0.8)', // Deep gold
            'rgba(220, 200, 140, 0.8)', // Very light gold
          ];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          // Position new particles more toward the bottom as scrolling progresses
          const y = Math.random() * canvas.height * (0.4 + scrollFactor * 0.6);
          particlesRef.current[index] = new Particle(
            Math.random() * canvas.width,
            y,
            canvas,
            color
          );
        } else {
          // Update and draw existing particles
          particle.update(scrollFactor);
          
          // Set opacity based on scroll position
          const opacity = particle.getOpacity(scrollY, documentHeight);
          if (opacity > 0) {
            ctx.globalAlpha = opacity;
            particle.draw(ctx);
          }
        }
      });
      
      // Reset blend mode
      ctx.globalCompositeOperation = 'source-over';
      
      // Request next frame
      requestRef.current = requestAnimationFrame(animate);
    };

    // Setup canvas and start animation
    handleResize();
    window.addEventListener('resize', handleResize);
    initParticles();
    requestRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollY, documentHeight]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }} // Increased from 0.8 to 1
    />
  );
};

export default SwirlingBackground; 