import React from 'react';
import { motion } from 'framer-motion';
import useInView from '../hooks/useInView';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  distance?: number;
  style?: React.CSSProperties;
}

const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  direction = 'up',
  threshold = 0.1,
  triggerOnce = true,
  className = '',
  distance = 50,
  style = {},
}) => {
  // Utiliser notre hook personnalisé
  const [ref, isInView] = useInView({
    threshold,
    triggerOnce,
    rootMargin: '0px',
  });

  // Calculer les variations initiales selon la direction
  const getInitialVariant = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance };
      case 'down':
        return { opacity: 0, y: -distance };
      case 'left':
        return { opacity: 0, x: distance };
      case 'right':
        return { opacity: 0, x: -distance };
      case 'none':
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  // Calculer les variants pour l'animation
  const variants = {
    hidden: getInitialVariant(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Cubic bezier pour une animation fluide
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

export default FadeInView; 