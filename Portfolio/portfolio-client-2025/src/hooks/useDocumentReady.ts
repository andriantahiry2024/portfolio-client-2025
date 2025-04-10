import { useState, useEffect, useRef } from 'react';

/**
 * Hook personnalisé pour détecter quand le document et les ressources principales sont chargés
 * @param delay Délai additionnel après le chargement (en ms)
 * @returns Boolean indiquant si le document est prêt
 */
const useDocumentReady = (delay: number = 0): boolean => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const checkedRef = useRef<boolean>(false);
  
  useEffect(() => {
    // Si déjà vérifié ou déjà prêt, ne pas recommencer
    if (checkedRef.current || isReady) return;
    
    // Marquer comme vérifié pour éviter les doubles appels
    checkedRef.current = true;
    
    // Fonction pour vérifier si toutes les images sont chargées
    const checkImagesLoaded = (): boolean => {
      try {
        const images = document.querySelectorAll('img');
        if (images.length === 0) return true;
        
        const loadedImages = Array.from(images).filter((img: HTMLImageElement) => img.complete);
        return loadedImages.length === images.length;
      } catch (error) {
        // En cas d'erreur, considérer que les images sont chargées
        console.error("Erreur lors de la vérification des images:", error);
        return true;
      }
    };

    // Fonction principale pour vérifier la disponibilité
    const checkReadiness = () => {
      // Si déjà prêt, ne pas continuer
      if (isReady) return;
      
      const isDomReady = ['complete', 'interactive'].includes(document.readyState);
      const areImagesReady = checkImagesLoaded();
      
      if (isDomReady && areImagesReady) {
        if (delay > 0) {
          // Appliquer le délai supplémentaire si spécifié
          setTimeout(() => setIsReady(true), delay);
        } else {
          setIsReady(true);
        }
      }
    };

    // Vérifier immédiatement
    checkReadiness();
    
    // Limiter le nombre d'écouteurs d'événements
    let imageEventAdded = false;

    // Configurer les écouteurs d'événements si le document n'est pas encore prêt
    if (!isReady) {
      // Pour le DOM
      const handleDOMReady = () => checkReadiness();
      document.addEventListener('DOMContentLoaded', handleDOMReady, { once: true });
      window.addEventListener('load', handleDOMReady, { once: true });

      // Pour les images - uniquement s'il y a des images non chargées
      if (!checkImagesLoaded() && !imageEventAdded) {
        imageEventAdded = true;
        const images = document.querySelectorAll('img');
        images.forEach((img: HTMLImageElement) => {
          if (!img.complete) {
            img.addEventListener('load', checkReadiness, { once: true });
            img.addEventListener('error', checkReadiness, { once: true });
          }
        });
      }

      // Observer limité pour les nouvelles images
      const observer = new MutationObserver((mutations) => {
        let hasNewImages = false;
        
        // Recherche optimisée de nouvelles images
        for (const mutation of mutations) {
          for (const node of Array.from(mutation.addedNodes)) {
            if (node.nodeName === 'IMG' || 
                (node instanceof Element && node.querySelector('img'))) {
              hasNewImages = true;
              break;
            }
          }
          if (hasNewImages) break;
        }
        
        if (hasNewImages && !imageEventAdded) {
          imageEventAdded = true;
          // Limiter aux nouvelles images uniquement
          const newImages = document.querySelectorAll('img:not([data-observed])');
          newImages.forEach((img: HTMLImageElement) => {
            if (!img.complete) {
              // Marquer l'image comme observée
              img.setAttribute('data-observed', 'true');
              img.addEventListener('load', checkReadiness, { once: true });
              img.addEventListener('error', checkReadiness, { once: true });
            }
          });
          
          checkReadiness();
        }
      });
      
      // Observer avec moins d'options pour réduire les notifications
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: false,
        characterData: false
      });

      // Nettoyage
      return () => {
        document.removeEventListener('DOMContentLoaded', handleDOMReady);
        window.removeEventListener('load', handleDOMReady);
        observer.disconnect();
      };
    }
  }, [delay, isReady]);

  return isReady;
};

export default useDocumentReady; 