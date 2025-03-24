'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Scene3DProps {
  className?: string;
}

const Scene3D = ({ className = '' }: Scene3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const dampenedX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const dampenedY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Transformations pour les cartes
  const rotateX = useTransform(dampenedY, [-300, 300], [15, -15]);
  const rotateY = useTransform(dampenedX, [-300, 300], [-15, 15]);
  const rotateCards = useTransform(dampenedX, [-300, 300], [-5, 5]);
  const translateZ = useTransform(dampenedY, [-300, 300], [50, -50]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const centerX = rect.x + rect.width / 2;
      const centerY = rect.y + rect.height / 2;
      
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div 
      ref={containerRef}
      className={cn('relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-gradient-to-b from-background/80 to-background', className)}
    >
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: 1000,
          rotateX,
          rotateY,
        }}
      >
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          {/* Cartes flottantes */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute inset-0"
              style={{
                rotateX: rotateCards,
                rotateY: rotateCards,
                translateZ: translateZ,
                zIndex: -index,
              }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, index % 2 === 0 ? 2 : -2, 0],
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            >
              <div className={cn(
                "w-full h-full rounded-2xl border border-white/20 backdrop-blur-sm p-6",
                "bg-gradient-to-br shadow-2xl shadow-black/50",
                index === 0 ? "from-blue-500/20 to-purple-500/20" :
                index === 1 ? "from-emerald-500/20 to-blue-500/20" :
                "from-purple-500/20 to-pink-500/20"
              )}>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 [mask-image:radial-gradient(transparent_65%,black)]" />
                
                {/* Contenu de la carte */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white/90">
                      {index === 0 ? "Frontend" : index === 1 ? "Backend" : "Design"}
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      {index === 0 ? "React • Next.js • TypeScript" :
                       index === 1 ? "Node.js • Python • SQL" :
                       "Figma • Tailwind • UI/UX"}
                    </p>
                  </div>
                  
                  <div className="flex justify-end">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-white/10"
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Texte flottant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-x-0 bottom-10 flex justify-center"
      >
        <div className="text-center">
          <motion.h2 
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
            animate={{ 
              backgroundPosition: ['0%', '100%'],
              filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)']
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            Développeur Full Stack
          </motion.h2>
        </div>
      </motion.div>
    </div>
  );
};

export default Scene3D;
