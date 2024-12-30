"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import InnovationSection from './InnovationSection';
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
  const animationFrameRef = useRef<number>(0);

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

        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.x -= dx * 0.03;
          particle.y -= dy * 0.03;
        }

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(99, 179, 237, 0.3)';
        ctx.fill();

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
  actualBrandName: string;
  description: string;
  delay?: number;
}

const BrandCard: React.FC<BrandCardProps> = ({ logo, title, actualBrandName, description, delay = 0 }) => {
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
        <div className="relative">
          <h3 className="text-xl font-semibold text-blue-300 mb-2 blur-sm select-none">
            {actualBrandName}
          </h3>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-blue-300 font-semibold">Coming Soon</span>
          </div>
        </div>
        <p className="text-blue-100/80">{description}</p>
      </div>
    </motion.div>
  );
};

const EnhancedLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <ParticleField />
      <Navigation links={[
        { href: '#home', text: 'Home' },
        { href: '#about', text: 'About' },
        { href: '#innovation', text: 'Innovation' },
        { href: '#portfolio', text: 'Portfolio' },
        { href: '#contact', text: 'Contact' }
      ]} />
      
      <HeroSection />

      <section id="about" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient glow">
              About Us
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src="/dorian-photo.jpg"
                    alt="Dorian Sadellari"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass p-4 text-center rounded-2xl">
                    <div className="text-2xl font-bold text-blue-400">12+</div>
                    <div className="text-sm text-blue-200/70">Active Projects</div>
                  </div>
                  <div className="glass p-4 text-center rounded-2xl">
                    <div className="text-2xl font-bold text-blue-400">10+</div>
                    <div className="text-sm text-blue-200/70">AI/ML Integrations</div>
                  </div>
                  <div className="glass p-4 text-center rounded-2xl">
                    <div className="text-2xl font-bold text-blue-400">6+</div>
                    <div className="text-sm text-blue-200/70">CRE Tools</div>
                  </div>
                  <div className="glass p-4 text-center rounded-2xl">
                    <div className="text-2xl font-bold text-blue-400">1-3</div>
                    <div className="text-sm text-blue-200/70">Days Ship Velocity</div>
                  </div>
                  <div className="glass p-4 text-center rounded-2xl">
                    <div className="text-2xl font-bold text-blue-400">15</div>
                    <div className="text-sm text-blue-200/70">Years in Banking</div>
                  </div>
                  <div className="glass p-4 text-center rounded-2xl">
                    <div className="text-2xl font-bold text-blue-400">3</div>
                    <div className="text-sm text-blue-200/70">AI C-Suite Agents</div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="glass p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-blue-300 mb-4">Vision & Leadership</h3>
                  <p className="text-blue-200/90 leading-relaxed mb-6">
                    With over a decade of experience in commercial banking at institutions like Bank of America 
                    and Huntington National Bank, Dorian Sadellari developed a deep understanding of financial 
                    markets and business operations.
                  </p>
                  <p className="text-blue-200/90 leading-relaxed mb-6">
                    This foundation paved the way for his entrepreneurial journey with Alliance Business Advisors in 2021. 
                    While the venture provided more lessons than successes, it was a transformative experience 
                    that strengthened his ability to innovate, adapt, and persevere.
                  </p>
                  <p className="text-blue-200/90 leading-relaxed mb-6">
                    Building on these lessons and everything learned during an intensive six-month journey 
                    mastering advanced AI/ML technologies and cloud-based systems, Dorian is now 
                    leveraging his expertise to pioneer the world's first fully AI-driven and DAO-operated 
                    holding company. 
                  </p>  
                  <p className="text-blue-200/90 leading-relaxed mb-6">
                    In a groundbreaking development, he has assembled an advanced AI 
                    C-Suite team, featuring specialized agents for CEO, CFO, and CTO roles, each designed to 
                    autonomously manage and optimize their respective domains within the organization.
                    This innovative approach represents a fundamental shift in how businesses can be
                    operated, combining traditional business acumen with cutting-edge artificial
                    intelligence and machine learning technologies. 
                  </p>
                  <p className="text-blue-200/90 leading-relaxed">
                    Through Sadellari Enterprises, we're building a revolutionary ecosystem of brands: 
                    <span className="blur-sm select-none">ABARE</span> for commercial real estate analysis,{' '}
                    <span className="blur-sm select-none">AiStaff</span> for AI agent deployment, and{' '}
                    <span className="blur-sm select-none">DorianAI</span> for strategic consulting. Each brand represents a convergence of traditional 
                    business acumen with cutting-edge AI tech.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <InnovationSection />

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
              title="ABARE"
              actualBrandName="ABARE"
              description="An innovative CRE analysis platform combining advanced financial modeling with AI-driven insights. Streamlines deal evaluation, market analysis, and investment decisions."
              delay={0.2}
            />
            <BrandCard
              logo="/aistaff-logo.png.jpg"
              title="AiStaff"
              actualBrandName="AiStaff"
              description="A next-generation AI agent marketplace revolutionizing enterprise operations. Deploy customized AI solutions for workflow automation, data analysis, and business process optimization."
              delay={0.4}
            />
            <BrandCard
              logo="/dorianai-logo.png.jpg"
              title="DorianAI"
              actualBrandName="DorianAI"
              description="Expert AI consulting and system integration services, transforming businesses through custom ML solutions, strategic automation, and advanced analytics implementations."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <blockquote className="glass p-8 border-l-4 border-blue-500 max-w-4xl mx-auto">
            <p className="text-xl text-blue-200/90 italic leading-relaxed">
              "Our mission is to democratize access to sophisticated AI solutions while maintaining 
              the highest standards of performance and reliability. We're not just building products; 
              we're shaping the future of business automation and decision-making."
            </p>
            <footer className="mt-4 text-blue-300 font-semibold">
              — Dorian Sadellari, Founder
            </footer>
          </blockquote>
        </div>
      </section>


      <section id="contact" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join the Waitlist
          </motion.h2>
          <div className="max-w-md mx-auto bg-white/5 p-8 rounded-xl backdrop-blur-lg border border-white/10">
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const email = formData.get('email');
              
              try {
                const response = await fetch('/api/waitlist', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ email }),
                });

                if (response.ok) {
                  alert('Thank you! You have been added to the waitlist.');
                  e.currentTarget.reset();
                } else {
                  throw new Error('Failed to submit');
                }
              } catch {
                alert('Something went wrong. Please try again.');
              }
            }}>
              <div className="flex flex-col space-y-4">
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-slate-800 border border-blue-500/20 rounded-lg focus:outline-none focus:border-blue-500 text-blue-100"
                  placeholder="Enter your email"
                />
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-2xl font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Join Waitlist
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedLanding;
