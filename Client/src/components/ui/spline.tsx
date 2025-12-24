'use client'

import { Suspense, lazy, useRef, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string;
  className?: string;
  allowScroll?: boolean;
  onLoad?: () => void;
}

export function SplineScene({
  scene,
  className,
  allowScroll = true,
  onLoad,
}: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Ancien code de gestion custom du scroll supprimé pour laisser le navigateur gérer
  // le défilement de façon native (plus fluide).

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
            <span className="loader"></span>
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
          onLoad={onLoad}
        />
      </Suspense>
    </div>
  );
} 