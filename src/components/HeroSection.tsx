"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative z-10 w-full overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-gradient" />
      
      <motion.div
        className="w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6 w-full">
          <motion.h1 
            className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-row items-center justify-center styled-letters bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 drop-shadow-[0_0_15px_rgba(147,51,234,0.5)] filter hover:brightness-110 transition-all max-w-full overflow-x-hidden px-4 gap-[0.03rem] sm:gap-[0.3rem] tracking-tight sm:text-[3rem]">
{['s-logo-final-crop', 'a3-final-cropped', 'd-logo-final-cropped', 'e-logo-final-cropped', 'l-logo-1-final-cropped', 'l-logo-2-final-cropped', 'a-logo-1-final-cropped', 'r-logo-final-cropped', 'i-logo-final-cropped'].map((logo, index) => (
                <div key={index} className={`flex justify-center items-center w-[12vh] ${logo === 'a-logo-1-final-cropped' ? 'h-[14vh]' : logo.includes('l-logo') ? 'h-[7vh]' : logo === 'i-logo-final-cropped' ? 'h-[8vh]' : 'h-[10vh]'} sm:w-[9vw] sm:h-[12vw] md:w-[7vw] md:h-[9vw] ${
                  logo.includes('a-logo') ? 'scale-115' : 
                  logo.includes('l-logo') ? 'scale-90' : 
                  logo === 'd-logo-final-cropped' ? 'scale-90' : 
                  logo === 'e-logo-final-cropped' ? 'scale-90' : 
                  logo === 'r-logo-final-cropped' ? 'scale-90' : 
                  logo === 'i-logo-final-cropped' ? 'scale-90' : ''
                }`}>
                  <Image 
                    src={`/${logo}${logo.includes('.jpg') ? '' : '.png'}`}
                    alt={logo[0].toUpperCase()}
                    width={160}
                    height={160}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              ))}
            </div>
          </motion.h1>

          <motion.p 
            className="text-sm md:text-lg text-blue-200/90 font-light tracking-wide mt-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Coming Soon
          </motion.p>

          <div className="max-w-3xl mx-auto space-y-8">
            <p className="text-lg md:text-xl text-blue-200 font-light leading-relaxed">
            </p>

            <motion.a
              href="#contact"
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

export default HeroSection;
