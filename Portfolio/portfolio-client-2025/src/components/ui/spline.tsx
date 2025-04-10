'use client'

import { Suspense, lazy, useRef, useEffect, useState } from 'react'

// Lazy load simplifié
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  allowScroll?: boolean
}

export function SplineScene({ scene, className, allowScroll = true }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Désactiver la capture des événements de défilement
  useEffect(() => {
    if (!allowScroll || !containerRef.current) return;

    const container = containerRef.current;

    // Fonction pour gérer le défilement tout en permettant l'interaction
    const handleWheel = (e: WheelEvent) => {
      // Permettre le défilement de la page
      window.scrollBy({
        top: e.deltaY
      });
    };

    // Écouter les événements wheel
    container.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [allowScroll]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        touchAction: 'pan-y',
        position: 'relative',
        zIndex: 1
      }}
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        }
      >
        <Spline
          scene={scene}
          style={{
            pointerEvents: 'auto',
            width: '100%',
            height: '100%'
          }}
        />
      </Suspense>
    </div>
  );
}