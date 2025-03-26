import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
  minDisplayTime?: number; // Durée minimale d'affichage du loader (en ms)
}

const Loader = ({ onComplete, minDisplayTime = 5000 }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    let startTime = Date.now();
    let progressInterval: NodeJS.Timeout;
    let minTimeTimeout: NodeJS.Timeout;
    let loadedResources = false;
    let minTimeElapsed = false;
    let lastLogTime = 0; // Pour limiter la fréquence des logs
    
    // Pour éviter de répéter les mêmes logs
    const throttledLog = (message: string) => {
      const now = Date.now();
      if (now - lastLogTime > 2000) { // Espacer les logs d'au moins 2 secondes
        console.log(message);
        lastLogTime = now;
      }
    };
    
    // Progression plus lente au début, puis accélération à la fin
    progressInterval = setInterval(() => {
      // Calcul basé sur la vitesse de chargement réelle
      const elapsed = Date.now() - startTime;
      const imagesTotal = document.images.length;
      const imagesLoaded = Array.from(document.images).filter(img => img.complete).length;
      
      // Ralentir la progression basée sur les ressources (seulement 60% du total)
      const resourcesProgress = imagesTotal ? (imagesLoaded / imagesTotal) * 60 : 60;
      
      // Progression basée sur le temps (seulement 35% du total)
      const timeProgress = Math.min(elapsed / minDisplayTime * 35, 35);
      
      // Progression totale (max 95% jusqu'à ce que tout soit confirmé comme chargé)
      const totalProgress = Math.min(resourcesProgress + timeProgress, 95);
      
      setProgress(prev => {
        // Progression douce et plus lente
        const incrementFactor = prev < 50 ? 0.8 : 1.2; // Plus lent au début, plus rapide à la fin
        const smoothProgress = Math.max(prev, Math.min(prev + (totalProgress - prev) * 0.05 * incrementFactor, 95));
        
        // Vérifier si toutes les ressources sont chargées
        if (imagesLoaded === imagesTotal && !loadedResources) {
          loadedResources = true;
          throttledLog('Toutes les images sont chargées');
        }
        
        return smoothProgress;
      });
    }, 300); // Intervalle plus long pour une progression plus lente et moins de vérifications

    // Timer pour assurer le temps d'affichage minimal
    minTimeTimeout = setTimeout(() => {
      throttledLog('Temps minimum écoulé');
      minTimeElapsed = true;
      checkCompletion();
    }, minDisplayTime);

    // Fonction pour vérifier si les deux conditions sont remplies
    const checkCompletion = () => {
      if (loadedResources && minTimeElapsed) {
        clearInterval(progressInterval);
        
        // Terminer la progression à 100%
        throttledLog('Complétion du loader');
        setProgress(100);
        
        // Attendre un peu plus longtemps après avoir atteint 100%
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            // Vérification supplémentaire des ressources avant de compléter
            if (document.readyState === 'complete') {
              throttledLog('Document prêt, fermeture du loader');
              onComplete();
            } else {
              throttledLog('Document pas encore prêt, attente...');
              // Si le document n'est toujours pas prêt, attendre encore
              window.addEventListener('load', () => {
                throttledLog('Événement load déclenché, fermeture du loader');
                onComplete();
              }, { once: true });
            }
          }, 1000); // Attendre plus longtemps avant de déclencher onComplete
        }, 800); // Attendre plus longtemps à 100%
      }
    };

    // Observer les changements pour détecter la fin
    const observer = new MutationObserver(() => {
      // Limiter la fréquence des vérifications sur les mutations
      if (loadedResources) return; // Éviter les vérifications inutiles
      
      const imagesTotal = document.images.length;
      const imagesLoaded = Array.from(document.images).filter(img => img.complete).length;
      
      if (imagesLoaded === imagesTotal && !loadedResources) {
        loadedResources = true;
        throttledLog('Mutation: toutes les images sont chargées');
        checkCompletion();
      }
    });
    
    // Option pour réduire les notifications de mutation
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: false, // Ignorer les mutations d'attributs
      characterData: false // Ignorer les mutations de texte
    });

    // Vérifier si le document est déjà chargé
    if (document.readyState === 'complete') {
      loadedResources = true;
      throttledLog('Document déjà prêt');
      checkCompletion();
    } else {
      window.addEventListener('load', () => {
        loadedResources = true;
        throttledLog('Événement load global');
        checkCompletion();
      }, { once: true }); // S'assurer que l'événement ne se déclenche qu'une fois
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minTimeTimeout);
      observer.disconnect();
    };
  }, [minDisplayTime, onComplete]);

  // Animation pour les points qui rebondissent
  const dotVariants = {
    animate: (i: number) => ({
      y: [0, -12, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
          delay: i * 0.15,
        }
      }
    })
  };

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="mb-8"
          >
            <motion.div 
              className="text-4xl md:text-5xl font-bold tracking-tighter text-white"
            >
              Portfolio
            </motion.div>
          </motion.div>
          
          <div className="relative w-64 md:w-80 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            />
          </div>
          
          <motion.div 
            className="mt-4 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {Math.round(progress)}%
          </motion.div>
          
          <div className="absolute bottom-10 flex space-x-4 items-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                custom={i}
                variants={dotVariants}
                animate="animate"
                className="w-3 h-3 rounded-full bg-white"
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader; 