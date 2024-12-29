"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Navigation from './Navigation';
import Image from 'next/image';

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
          className="relative w-24 h-24 mx-auto mb-4"
          animate={isHovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
        >
          <Image 
            src={logo} 
            alt={title} 
            fill
            className="object-contain" 
          />
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

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-gradient" />
      
      <motion.div
        className="container mx-auto px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6">
          <motion.h1 
            className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold w-full scale-90 sm:scale-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-row flex-nowrap items-center justify-center styled-letters bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] filter hover:brightness-110 transition-all w-full overflow-x-auto px-2">
              <div className="flex items-center justify-center min-w-max">
                <Image 
                  src="/s-logo-transparent.png"
                  alt="S Logo"
                  width={160}
                  height={160}
                  className="h-[1em] xs:h-[1.1em] sm:h-[1.2em] md:h-[1.3em] lg:h-[1.4em] w-auto object-contain mr-[-0.1em]"
                  priority
                />
                <Image 
                  src="/a-logo-1.png"
                  alt="A"
                  width={160}
                  height={160}
                  className="h-[1em] xs:h-[1.1em] sm:h-[1.2em] md:h-[1.3em] lg:h-[1.4em] w-auto object-contain mx-[-0.15em]"
                  priority
                />
                <Image 
                  src="/d-logo.png"
                  alt="D"
                  width={160}
                  height={160}
                  className="h-[1em] xs:h-[1.1em] sm:h-[1.2em] md:h-[1.3em] lg:h-[1.4em] w-auto object-contain mx-[-0.15em]"
                  priority
                />
                <Image 
                  src="/e-logo.png"
                  alt="E"
                  width={160}
                  height={160}
                  className="h-[1em] xs:h-[1.1em] sm:h-[1.2em] md:h-[1.3em] lg:h-[1.4em] w-auto object-contain mx-[-0.15em]"
                  priority
                />
                <Image 
                  src="/l-logo-1.png"
                  alt="L"
                  width={160}
                  height={160}
                  className="h-[1em] xs:h-[1.1em] sm:h-[1.2em] md:h-[1.3em] lg:h-[1.4em] w-auto object-contain mx-[-0.15em]"
                  priority
                />
                <Image 
                  src="/l-logo-2.png"
                  alt="L"
                  width={160}
                  height={160}
                  className="h-[1em] xs:h-[1.1em] sm:h-[1.2em] md:h-[1.3em] lg:h-[1.4em] w-auto object-contain mx-[-0.15em]"
                  priority
                />
                <Image 
                  src="/a-logo-2.png"
                  alt="A"
                  width={160}
                  height={160}
                  className="h-[1em] xs:h-[1.1em] sm:h-[1.2em] md:h-[1.3em] lg:h-[1.4em] w-auto object-contain mx-[-0.15em]"
                  priority
                />
                <Image 
                  src="/r-logo.png"
                  alt="R"
                  width={160}
                  height={160}
                  className="h-[1em] xs:h-[1.1em] sm:h-[1.2em] md:h-[1.3em] lg:h-[1.4em] w-auto object-contain mx-[-0.15em]"
                  priority
                />
                <Image 
                  src="/i-logo.png"
                  alt="I"
                  width={160}
                  height={160}
                  className="h-[1em] xs:h-[1.1em] sm:h-[1.2em] md:h-[1.3em] lg:h-[1.4em] w-auto object-contain mx-[-0.15em]"
                  priority
                />
              </div>
            </div>
          </motion.h1>

          <motion.p 
            className="text-lg md:text-xl text-blue-200/90 font-light tracking-wide relative inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="relative">
              <span className="absolute inset-0 blur-sm bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-lg"></span>
              <span className="relative glass px-3 py-1 rounded-lg">ENTERPRISES</span>
            </span>
          </motion.p>

          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-xl md:text-2xl text-blue-200 font-light leading-relaxed">
              Building Tomorrow&apos;s Enterprises Through Strategic AI/ML Innovation
            </p>

            <motion.a
              href="#portfolio"
              className="inline-block px-12 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-lg text-white font-semibold text-lg shadow-lg shadow-blue-500/20 border border-blue-400/20 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 button-shine shimmer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Waitlist
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const InnovationSection: React.FC = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-200 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient">
              The Innovation Lab
            </h2>
            <p className="text-blue-100/80 text-lg leading-relaxed">
              Our AI/ML Innovation Lab serves as a cutting-edge incubator where advanced 
              artificial intelligence and machine learning technologies converge with strategic execution. 
              Through our systematic approach, we develop intelligent solutions that transform 
              complex business challenges into opportunities for innovation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { phase: 'AI Research', desc: 'Deep Learning & Neural Networks' },
              { phase: 'ML Development', desc: 'Predictive Analytics & Automation' },
              { phase: 'Testing', desc: 'Performance & Accuracy Validation' },
              { phase: 'Launch', desc: 'Deployment & Optimization' }
            ].map((item, index) => (
              <motion.div
                key={item.phase}
                className="glass p-6 hover:bg-blue-500/5"
                whileHover={{ scale: 1.05, rotateY: index % 2 === 0 ? 5 : -5 }}
              >
                <div className="text-3xl text-blue-400 mb-2 font-bold">0{index + 1}</div>
                <div className="text-blue-200 font-semibold mb-2">{item.phase}</div>
                <div className="text-blue-200/70 text-sm">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const EnhancedLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <ParticleField />
      <Navigation />
      <HeroSection />
      <InnovationSection />
      
      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient glow"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Portfolio
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <BrandCard
              logo="/abare-logo.png.jpg"
              title="Brand 1 &ndash; Coming Soon"
              description="Reimagining commercial real estate analysis through advanced technology"
              delay={0.2}
            />
            <BrandCard
              logo="/aistaff-logo.png.jpg"
              title="Brand 2 &ndash; Coming Soon"
              description="Enhancing enterprise productivity through intelligent automation"
              delay={0.4}
            />
            <BrandCard
              logo="/dorianai-logo.png.jpg"
              title="Brand 3 &ndash; Coming Soon"
              description="Delivering strategic AI solutions for complex business challenges"
              delay={0.6}
            />
          </div>
        </div>
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
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient glow">
              About Us
            </h2>
            
            <div className="space-y-8">
              <motion.div 
                className="glass rounded-xl p-8 border border-blue-400/20"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-2xl font-semibold text-blue-300 mb-4">Welcome to Sadellari Enterprises</h3>
                <p className="text-lg text-blue-200/90 leading-relaxed mb-6">
                  Founded by Dorian Sadellari, we are the culmination of years of experience in banking, 
                  entrepreneurship, and innovation. Our mission is to blend expertise, creativity, and 
                  cutting-edge technology to challenge convention and deliver enduring value.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.div 
                  className="glass rounded-xl p-6 hover:bg-blue-500/5"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">Experience-Driven</h4>
                  <p className="text-blue-200/90">
                    Turning complexity into clarity through years of industry expertise.
                  </p>
                </motion.div>

                <motion.div 
                  className="glass rounded-xl p-6 hover:bg-purple-500/5"
                  whileHover={{ scale: 1.05, rotateY: -5 }}
                >
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">Innovation Lab</h4>
                  <p className="text-blue-200/90">
                    Driving change through cutting-edge AI and real estate solutions.
                  </p>
                </motion.div>

                <motion.div 
                  className="glass rounded-xl p-6 hover:bg-blue-500/5"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                >
                  <h4 className="text-xl font-semibold text-blue-300 mb-3">Results-Driven</h4>
                  <p className="text-blue-200/90">
                    Committed to excellence and delivering measurable outcomes.
                  </p>
                </motion.div>
              </div>

              <motion.div 
                className="glass rounded-xl p-8 border border-blue-400/20 relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-gradient"></div>
                <div className="relative">
                  <blockquote className="text-lg text-blue-200/90 leading-relaxed italic">
                    &ldquo;Sadellari Enterprises is more than a company&mdash;it&apos;s a reflection of my life&apos;s work and aspirations. 
                    With the Innovation Lab at our core, we&apos;re turning bold ideas into tangible results that shape industries.&rdquo;
                  </blockquote>
                  <p className="text-right mt-4 text-blue-300 font-semibold">&mdash; Dorian Sadellari, Founder</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
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
