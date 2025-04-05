import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  // Référence au conteneur externe
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Obtenir la position de défilement et la hauteur de la page
  const { scrollY } = useScroll();
  const scrollYSpring = useSpring(scrollY, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001,
  });
  
  // Référence à l'élément dont nous voulons transformer la position
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Hauteur initiale du contenu
  const [contentHeight, setContentHeight] = React.useState(0);
  
  // Mettre à jour la hauteur du contenu quand elle change
  useEffect(() => {
    if (!contentRef.current) return;
    
    // Initialiser la hauteur
    setContentHeight(contentRef.current.scrollHeight);
    
    // Observer les changements de taille du contenu
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        setContentHeight(entry.target.scrollHeight);
      }
    });
    
    resizeObserver.observe(contentRef.current);
    
    return () => {
      if (contentRef.current) {
        resizeObserver.unobserve(contentRef.current);
      }
    };
  }, []);
  
  // Appliquer la hauteur du contenu au conteneur externe
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = `${contentHeight}px`;
    }
  }, [contentHeight]);
  
  // Transformer la position Y du contenu basé sur le défilement
  const y = useTransform(scrollYSpring, [0, contentHeight], [0, -contentHeight]);
  
  return (
    <div ref={containerRef} className="smooth-scroll-container relative w-full">
      <motion.div
        ref={contentRef}
        style={{ y, position: 'fixed', width: '100%', top: 0, left: 0 }}
        className="smooth-scroll-content"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SmoothScroll; 