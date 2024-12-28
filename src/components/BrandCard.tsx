"use client"

import React from 'react';
import { motion } from 'framer-motion';

interface BrandCardProps {
  title: string;
  description: string;
  image: string;
}

export const BrandCard = ({ title, description, image }: BrandCardProps) => {
  return (
    <motion.div
      className="group relative p-6 backdrop-blur-lg bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/50 overflow-hidden transition-all duration-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-24 h-24 mx-auto mb-6 relative group">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full filter blur-xl group-hover:blur-2xl transition-all duration-500" />
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain relative z-10 animate-float"
          />
        </div>
        <h3 className="text-2xl mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-bold">
          {title}
        </h3>
        <p className="text-blue-100 text-base">{description}</p>
      </div>
    </motion.div>
  );
};

export default BrandCard;