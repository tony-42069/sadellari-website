"use client"

import React from 'react';
import { motion } from 'framer-motion';

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
              { number: '01', phase: 'AI Research', desc: 'Deep Learning & Neural Networks' },
              { number: '02', phase: 'ML Development', desc: 'Predictive Analytics & Automation' },
              { number: '03', phase: 'Testing', desc: 'Performance & Accuracy Validation' },
              { number: '04', phase: 'Launch', desc: 'Deployment & Optimization' }
            ].map((item, index) => (
              <motion.div
                key={item.phase}
                className="glass p-6 hover:bg-blue-500/5 rounded-2xl"
                whileHover={{ scale: 1.05, rotateY: index % 2 === 0 ? 5 : -5 }}
              >
                <div className="text-2xl text-blue-400 mb-2 font-bold">{item.number}</div>
                <div className="text-xl text-blue-300 mb-2 font-semibold">{item.phase}</div>
                <div className="text-sm text-blue-200/80">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InnovationSection;
