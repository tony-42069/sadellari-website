"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import Navigation from './Navigation';
import { placeholderImages } from '@/lib/generatePlaceholder';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0); // Initialize with 0

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createParticles = () => {
      particlesRef.current = Array(50).fill(null).map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2
      }));
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse interaction
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.x -= dx * 0.03;
          particle.y -= dy * 0.03;
        }

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 179, 237, 0.3)';
        ctx.fill();

        // Connect particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(99, 179, 237, ${0.3 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
};

interface BrandCardProps {
  logo: string;
  title: string;
  description: string;
  delay?: number;
}

const BrandCard: React.FC<BrandCardProps> = ({ logo, title, description, delay = 0 }) => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3, delay }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
      <div className="relative p-6 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 overflow-hidden">
        <motion.div
          className="w-24 h-24 mx-auto mb-4"
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
        >
          <img src={logo} alt={title} className="w-full h-full object-contain" />
        </motion.div>
        <h3 className="text-xl font-semibold text-blue-300 mb-2">{title}</h3>
        <p className="text-blue-100/80">{description}</p>
      </div>
    </motion.div>
  );
};

const ContactForm: React.FC = () => {
  return (
    <motion.form
      className="max-w-md mx-auto bg-white/5 p-8 rounded-xl backdrop-blur-lg border border-white/10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-6">
        <label htmlFor="email" className="block text-blue-200 mb-2">Email</label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 bg-slate-800 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500 text-blue-100"
          placeholder="your@email.com"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-blue-200 mb-2">Message</label>
        <textarea
          id="message"
          rows={4}
          className="w-full px-4 py-2 bg-slate-800 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500 text-blue-100"
          placeholder="Your message..."
        />
      </div>
      <motion.button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Send Message
      </motion.button>
    </motion.form>
  );
};

const EnhancedLanding: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <ParticleField />
      <Navigation />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative z-10">
        <motion.div
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-8 relative w-40 h-40 mx-auto"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src="/holdco-logo.png.jpg" 
              alt="Sadellari Enterprises Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
              SADELLARI
            </h1>
            <p className="text-2xl md:text-3xl text-blue-200/80 font-light tracking-wide mb-8">
              ENTERPRISES
            </p>
            <p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-3xl mx-auto">
              Transforming Industries Through Innovation and Strategic Vision
            </p>
            <motion.a
              href="#contact"
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-lg text-white font-semibold text-lg shadow-lg shadow-blue-500/20 border border-blue-400/20 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Waitlist
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
              About Us
            </h2>
            
            <div className="space-y-12">
              {/* Welcome Section */}
              <div className="glass rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">Welcome to Sadellari Enterprises</h3>
                <p className="text-lg text-blue-200/90 leading-relaxed">
                  Sadellari Enterprises is the culmination of years of experience in banking, entrepreneurship, and a relentless passion for innovation. 
                  Founded by Dorian Sadellari, the company embodies a forward-thinking vision to create transformative businesses in technology, 
                  commercial real estate, and beyond.
                </p>
              </div>

              {/* Mission Section */}
              <div className="glass rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">Our Mission</h3>
                <p className="text-lg text-blue-200/90 leading-relaxed">
                  At Sadellari Enterprises, our mission is clear: to blend expertise, creativity, and innovation into ventures that challenge convention 
                  and deliver enduring value. By leveraging decades of insights and a knack for seeing opportunities where others see roadblocks, 
                  we aim to lead industries into the future.
                </p>
              </div>

              {/* Approach Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  className="glass rounded-xl p-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">Experience-Driven Leadership</h4>
                  <p className="text-blue-200/90">
                    With a solid foundation in banking and commercial real estate, we excel in turning complexity into clarity. 
                    Our strategic vision is shaped by years of navigating high-stakes industries.
                  </p>
                </motion.div>

                <motion.div 
                  className="glass rounded-xl p-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">Innovation at the Heart</h4>
                  <p className="text-blue-200/90">
                    Through the Sadellari Innovation Lab, we're not just reacting to change—we're driving it. From developing cutting-edge AI 
                    applications to redefining real estate strategies.
                  </p>
                </motion.div>

                <motion.div 
                  className="glass rounded-xl p-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">Precision Meets Purpose</h4>
                  <p className="text-blue-200/90">
                    Every initiative we undertake is aligned with a commitment to excellence. Our work is underpinned by a relentless pursuit of results.
                  </p>
                </motion.div>
              </div>

              {/* Founder's Note */}
              <motion.div 
                className="glass rounded-xl p-8 border border-blue-400/20"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">A Note from Our Founder</h3>
                <blockquote className="text-lg text-blue-200/90 leading-relaxed italic">
                  "Sadellari Enterprises is more than a company—it's a reflection of my life's work and aspirations. It's about leveraging everything 
                  I've learned in finance and entrepreneurship to create solutions that matter. With the Innovation Lab at our core, we're turning 
                  bold ideas into tangible results that shape industries and leave a lasting legacy."
                </blockquote>
                <p className="text-right mt-4 text-blue-300 font-semibold">— Dorian Sadellari, Founder</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Portfolio
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <BrandCard
              logo="/dorianai-logo.png.jpg"
              title="Brand 1 – Coming Soon"
              description="This brand is under development. Stay tuned for exciting innovations in the real estate space."
              delay={0.2}
            />
            <BrandCard
              logo="/aistaff-logo.png.jpg"
              title="Brand 2 – Coming Soon"
              description="Our next venture into AI-powered solutions is on the horizon. More details coming soon."
              delay={0.4}
            />
            <BrandCard
              logo="/holdco-logo.png.jpg"
              title="Brand 3 – Coming Soon"
              description="A revolutionary approach to technology integration. Watch this space for updates."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Get in Touch
          </motion.h2>
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default EnhancedLanding;