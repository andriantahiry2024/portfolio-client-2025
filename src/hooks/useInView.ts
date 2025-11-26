import { useState, useEffect, useRef, RefObject } from 'react';

interface InViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

/**
 * Hook personnalisé qui détecte quand un élément entre dans le viewport
 * 
 * @param options Options pour l'Intersection Observer
 * @returns Un tuple contenant une ref à attacher à l'élément et un boolean indiquant si l'élément est visible
 */
const useInView = <T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  triggerOnce = false,
  rootMargin = '0px',
}: InViewOptions = {}): [RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const seenOnce = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        const isVisible = entry.isIntersecting;

        // Si on a déjà vu l'élément et qu'on ne veut déclencher qu'une fois, on ne fait rien
        if (seenOnce.current && triggerOnce) return;

        // Sinon, on met à jour l'état
        if (isVisible) {
          setIsInView(true);
          seenOnce.current = true;
          
          // Si on ne veut déclencher qu'une fois, on déconnecte l'observer
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          // Si l'élément n'est plus visible et qu'on peut déclencher plusieurs fois
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce, rootMargin]);

  return [ref, isInView];
};

export default useInView; 