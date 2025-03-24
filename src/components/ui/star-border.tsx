import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StarBorderProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  borderWidth?: number;
  glowIntensity?: number;
  animationDuration?: number;
}

export const StarBorder = ({ 
  children, 
  className,
  borderWidth = 2,
  glowIntensity = 0.5,
  animationDuration = 8,
  ...props 
}: StarBorderProps) => {
  return (
    <motion.div
      className={cn(
        "relative inline-block overflow-hidden rounded-lg",
        className
      )}
      {...props}
    >
      <div className="relative z-10 p-1">
        {children}
      </div>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(
            from 0deg at 50% 50%,
            rgba(59, 130, 246, ${glowIntensity}) 0deg,
            rgba(139, 92, 246, ${glowIntensity}) 90deg,
            rgba(236, 72, 153, ${glowIntensity}) 180deg,
            rgba(239, 68, 68, ${glowIntensity}) 270deg,
            rgba(59, 130, 246, ${glowIntensity}) 360deg
          )`,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.02, 1],
        }}
        transition={{
          rotate: {
            duration: animationDuration,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: animationDuration / 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
      <div 
        className="absolute z-[1] bg-background"
        style={{
          inset: `${borderWidth}px`,
          borderRadius: 'calc(0.5rem - 2px)',
        }}
      />
    </motion.div>
  );
}; 