import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CursorFollower: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        if (cursor) {
          cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
      });
    };
    
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed w-8 h-8 pointer-events-none z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        translateX: '-50%',
        translateY: '-50%',
        background: 'radial-gradient(circle, rgba(99,179,237,0.3) 0%, rgba(99,179,237,0) 70%)',
      }}
    />
  );
};

export default CursorFollower;