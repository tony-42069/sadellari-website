import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface NavLink {
  href: string;
  text: string;
}

interface NavigationProps {
  links: NavLink[];
}

const Navigation: React.FC<NavigationProps> = ({ links }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/90 backdrop-blur-lg py-2' : 'bg-transparent py-4'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="relative h-12 w-12"
            whileHover={{ scale: 1.05 }}
          >
            <Image 
              src="/holdco-logo.png.jpg" 
              alt="Sadellari Enterprises" 
              fill
              className="object-contain rounded-lg"
            />
          </motion.div>
          
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-blue-200 hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              >
                {link.text}
              </motion.a>
            ))}
          </div>

          <motion.button
            className="md:hidden text-blue-200 hover:text-blue-400"
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
