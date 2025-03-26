import { Suspense, lazy, useState, useEffect, useRef } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import { AnimatePresence, motion } from "framer-motion";
import useDocumentReady from "./hooks/useDocumentReady";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
// On ne va pas utiliser SmoothScroll pour l'instant car cela peut causer des problèmes sur certains navigateurs
// import SmoothScroll from "./components/SmoothScroll";

// Lazy load components for better performance
const BlogPage = lazy(() => import("./components/BlogPage"));
const BlogPostDetail = lazy(() => import("./components/BlogPostDetail"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

function App() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [forcedDelay, setForcedDelay] = useState(false);
  const initialRenderRef = useRef(true);
  
  // Utiliser notre hook personnalisé avec un délai de sécurité plus long
  const isDocumentReady = useDocumentReady(1500);
  
  // Vérifier si toutes les images sont chargées, mais une seule fois au début
  useEffect(() => {
    // Flag pour éviter les vérifications multiples
    let isDone = false;
    
    const checkImagesLoaded = () => {
      if (isDone) return;
      
      const images = document.querySelectorAll('img');
      if (images.length === 0) {
        setAllImagesLoaded(true);
        isDone = true;
        return;
      }
      
      const loadedCount = Array.from(images).filter(img => img.complete).length;
      
      // Ne pas spammer la console
      if (loadedCount === images.length || !showLoader) {
        console.log(`Images chargées: ${loadedCount}/${images.length}`);
        setAllImagesLoaded(true);
        isDone = true;
      }
    };
    
    // Vérifier immédiatement
    checkImagesLoaded();
    
    // Écouter l'événement 'load' une seule fois
    window.addEventListener('load', checkImagesLoaded, { once: true });
    
    // Vérifier quelques fois seulement, pas en continu
    let checkCount = 0;
    const interval = setInterval(() => {
      checkImagesLoaded();
      checkCount++;
      
      // Arrêter après 10 vérifications maximum
      if (checkCount >= 10 || isDone) {
        clearInterval(interval);
        // Forcer l'état chargé après 10 tentatives
        if (checkCount >= 10) {
          setAllImagesLoaded(true);
        }
      }
    }, 500);
    
    return () => {
      clearInterval(interval);
    };
  }, [showLoader]);

  // Ajouter un délai forcé même après le chargement complet
  useEffect(() => {
    // Définir un délai minimum absolu pour le loader
    const timer = setTimeout(() => {
      setForcedDelay(true);
    }, 5000); // Afficher le loader au moins 5 secondes
    
    return () => clearTimeout(timer);
  }, []);

  // Gérer la fermeture du loader une fois que le document est prêt
  useEffect(() => {
    // Seulement si les trois conditions sont remplies
    if (isDocumentReady && allImagesLoaded && forcedDelay && showLoader) {
      // Un délai plus long pour s'assurer que le loader montre une progression suffisante
      const minLoaderTime = 6000; // 6 secondes minimum pour le loader
      const startTime = sessionStorage.getItem('appLoadStartTime') 
        ? parseInt(sessionStorage.getItem('appLoadStartTime') || '0') 
        : Date.now();
      
      const timeElapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoaderTime - timeElapsed);
      
      // Éviter les logs répétés
      console.log(`Document prêt ! Temps restant pour le loader: ${remainingTime}ms`);
      
      if (remainingTime > 0) {
        setTimeout(() => {
          handleEnterSite();
        }, remainingTime);
      } else {
        handleEnterSite();
      }
    }
  }, [isDocumentReady, allImagesLoaded, forcedDelay, showLoader]);
  
  // Enregistrer le temps de démarrage au premier chargement
  useEffect(() => {
    if (!sessionStorage.getItem('appLoadStartTime')) {
      sessionStorage.setItem('appLoadStartTime', Date.now().toString());
    }
    
    // Nettoyer lors du démontage
    return () => {
      // Si vous souhaitez réinitialiser le timer à chaque fermeture de l'app
      // sessionStorage.removeItem('appLoadStartTime');
    };
  }, []);

  // Gérer la fermeture du loader
  const handleEnterSite = () => {
    // Vérification finale supplémentaire
    // Attendre encore un peu pour s'assurer que tout est prêt
    setTimeout(() => {
      // Vérification finale que le document est prêt
      if (document.readyState !== 'complete') {
        const checkAndComplete = () => {
          if (document.readyState === 'complete') {
            completeLoading();
          } else {
            // Réessayer après un court délai
            setTimeout(checkAndComplete, 500);
          }
        };
        checkAndComplete();
      } else {
        completeLoading();
      }
    }, 1000);
  };
  
  // Fonction pour terminer le chargement
  const completeLoading = () => {
    setShowLoader(false);
    // Définir le contenu comme chargé après la transition du loader
    setTimeout(() => {
      setContentLoaded(true);
    }, 800); // Délai pour laisser l'animation se terminer
  };

  // Contenu à afficher une fois le chargement terminé
  const renderContent = () => (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white">Chargement des ressources...</p>
          </div>
        </div>
      }
    >
      <PageTransition
        // Passer l'état initialRender pour empêcher le double défilement au premier rendu
        initialRender={initialRenderRef.current}
        onAfterRender={() => {
          initialRenderRef.current = false;
        }}
      >
        <>
          <Routes>
            <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
            <Route path="/blog" element={<BlogPage />} errorElement={<ErrorBoundary />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} errorElement={<ErrorBoundary />} />
            <Route path="/admin" element={<AdminDashboard />} errorElement={<ErrorBoundary />} />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          
          {/* Bouton de retour en haut */}
          <ScrollToTop />
        </>
      </PageTransition>
    </Suspense>
  );

  return (
    <>
      <AnimatePresence>
        {showLoader && <Loader onComplete={handleEnterSite} minDisplayTime={5000} />}
      </AnimatePresence>
      
      <AnimatePresence mode="sync">
        {!showLoader && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full min-h-screen"
          >
            {renderContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
