import { Suspense, lazy, useState, useEffect } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load components for better performance
const BlogPage = lazy(() => import("./components/BlogPage"));
const BlogPostDetail = lazy(() => import("./components/BlogPostDetail"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  // Simuler la vérification de chargement des ressources de l'application
  useEffect(() => {
    // Attendre que le DOM soit complètement chargé
    const onLoad = () => {
      // Attendre un délai supplémentaire pour s'assurer que tout est bien chargé
      // Dans un cas réel, vous pourriez vérifier que certaines ressources sont chargées
      setTimeout(() => {
        setIsAppReady(true);
      }, 2000); // Délai de 2 secondes, à ajuster selon vos besoins
    };

    // Si le DOM est déjà chargé
    if (document.readyState === 'complete') {
      onLoad();
    } else {
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  // Gérer la fermeture du loader
  const handleEnterSite = () => {
    if (isAppReady) {
      setShowLoader(false);
      // Définir le contenu comme chargé après la transition du loader
      setTimeout(() => {
        setContentLoaded(true);
      }, 500); // Petit délai pour laisser l'animation se terminer
    }
  };

  return (
    <>
      
      
        <Suspense
          fallback={
            <div className="flex h-screen w-full items-center justify-center">
              <p>Loading...</p>
            </div>
          }
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
          </>
        </Suspense>
      
    </>
  );
}

export default App;
