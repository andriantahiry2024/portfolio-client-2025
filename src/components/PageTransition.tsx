import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  initialRender?: boolean;
  onAfterRender?: () => void;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  initialRender = false,
  onAfterRender
}) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  
  // Déterminer si on est sur les routes sensibles
  const isSpecialRoute = location.pathname === '/admin' || 
                        location.pathname === '/blog' ||
                        location.pathname.startsWith('/blog/');
  
  // Simplifier considérablement l'effet
  useEffect(() => {
    // Ne mettre à jour displayLocation que si la route change réellement
    if (location.pathname !== displayLocation.pathname) {
      // Pour les routes spéciales, transition immédiate
      if (isSpecialRoute) {
        setDisplayLocation(location);
        if (onAfterRender) onAfterRender();
        return;
      }
      
      // Pour les autres routes, utiliser un délai très court
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        
        // Appeler le callback onAfterRender après le changement de page
        if (onAfterRender) {
          onAfterRender();
        }
      }, 50); // Délai minimal

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation, onAfterRender, isSpecialRoute]);

  // Choisir des transitions différentes selon le type de route
  const getVariants = () => {
    if (isSpecialRoute) {
      // Transitions instantanées pour les routes spéciales
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 }
      };
    }
    
    // Transitions normales pour les autres routes
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 }
    };
  };
  
  const variants = getVariants();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={displayLocation.pathname}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={variants.transition}
        className="page-content min-h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition; 