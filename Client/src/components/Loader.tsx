import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
  minDisplayTime?: number;
}

const Loader = ({ onComplete, minDisplayTime = 1500 }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let startTime = Date.now();
    let progressInterval: NodeJS.Timeout;
    let allResourcesLoaded = false;

    // Fonction pour vérifier l'état de chargement des ressources
    const checkResourcesLoaded = () => {
      // Vérifier les images
      const images = document.images;
      const totalImages = images.length;
      let loadedImages = 0;

      // Compter les images chargées
      for (let i = 0; i < totalImages; i++) {
        if (images[i].complete) {
          loadedImages++;
        }
      }

      // Vérifier si toutes les ressources externes sont chargées
      const externalResourcesLoaded = document.readyState === 'complete';

      // Calculer la progression réelle des ressources
      let resourceProgress = totalImages === 0 ? 100 : Math.floor((loadedImages / totalImages) * 100);

      // Limiter à 99% jusqu'à ce que document.readyState soit 'complete'
      if (!externalResourcesLoaded) {
        resourceProgress = Math.min(resourceProgress, 99);
      } else if (resourceProgress >= 100) {
        allResourcesLoaded = true;
      }

      return resourceProgress;
    };

    // Mettre à jour la progression de manière progressive
    const updateProgress = () => {
      const currentResourceProgress = checkResourcesLoaded();
      const timeElapsed = Date.now() - startTime;

      // Progression basée sur le temps pour éviter les blocages
      // Utilisé comme filet de sécurité, monte progressivement jusqu'à 99%
      const timeProgress = Math.min(timeElapsed / 10000 * 99, 99);

      // La progression finale est le max des deux, avec une transition douce
      setProgress(prevProgress => {
        // Calculer la nouvelle progression cible
        const targetProgress = Math.max(currentResourceProgress, timeProgress);

        // Augmenter progressivement pour une transition douce
        // Plus rapide en début de chargement, plus lent vers la fin
        const incrementFactor = prevProgress < 60 ? 0.2 : 0.1;
        const smoothProgress = Math.min(
          prevProgress + (targetProgress - prevProgress) * incrementFactor,
          allResourcesLoaded ? 100 : 99
        );

        return smoothProgress;
      });

      // Si toutes les ressources sont chargées et que le temps minimum est écoulé
      if (allResourcesLoaded && timeElapsed >= minDisplayTime) {
        // Terminer la progression
        setProgress(100);

        // Attendre que l'animation de la barre atteigne 100%, puis animer la sortie complète
        setTimeout(() => {
          setIsComplete(true);
          // Attendre la fin complète de l'animation de sortie (opacity: 0)
          setTimeout(onComplete, 600); // 500ms pour l'animation exit + 100ms de marge
        }, 500); // Temps pour que la barre atteigne visuellement 100%

        // Nettoyer l'intervalle
        clearInterval(progressInterval);
      }
    };

    // Mettre à jour la progression toutes les 100ms
    progressInterval = setInterval(updateProgress, 100);

    // Écouter l'événement 'load' pour un chargement complet
    window.addEventListener('load', () => {
      allResourcesLoaded = true;
    }, { once: true });

    return () => {
      clearInterval(progressInterval);
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
          transition={{ duration: 0.5, exit: { duration: 0.5 } }}
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
              transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
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