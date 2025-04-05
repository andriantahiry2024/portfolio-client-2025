import { Suspense, lazy, useState } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load components
const BlogPage = lazy(() => import("./components/BlogPage"));
const BlogPostDetail = lazy(() => import("./components/BlogPostDetail"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const CreateUserPage = lazy(() => import("./pages/CreateUserPage")); // Importer la nouvelle page
const LoginPage = lazy(() => import("./pages/LoginPage")); // Importer la page de login
const BlogPostDetailPage = lazy(() => import("./components/BlogPostDetail")); // Utiliser le composant existant ou créer une nouvelle page
import ProtectedRoute from "./components/ProtectedRoute"; // Importer ProtectedRoute

// Composant Loader optimisé
const Loader = ({ onComplete }: { onComplete: () => void }) => {
  // Utiliser requestAnimationFrame pour une animation fluide
  const startLoader = () => {
    requestAnimationFrame(() => {
      setTimeout(onComplete, 2000); // Durée fixe de 2 secondes
    });
  };

  // Démarrer le loader immédiatement
  startLoader();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <motion.div
          className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-white/20 border-t-white"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <p className="text-white">Chargement de votre expérience...</p>
      </div>
    </motion.div>
  );
};

function App() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  // Suspense fallback component
  const LoadingFallback = () => (
    <div className="flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white">Chargement...</p>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <Loader onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      {/* <AnimatePresence mode="wait"> {/* Temporairement commenté pour isoler le problème de scroll */}
        {!showLoader && (
          // <motion.div {/* Temporairement supprimé pour tester l'animation de transition */}
          //   key={location.pathname}
          //   initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          //   exit={{ opacity: 0 }}
          //   transition={{ duration: 0.3 }}
          //   className="w-full min-h-screen"
          // >
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
                <Route path="/blog" element={<BlogPage />} errorElement={<ErrorBoundary />} />
                {/* Modifier la route pour utiliser :slug au lieu de :id */}
                <Route path="/blog/:slug" element={<BlogPostDetail />} errorElement={<ErrorBoundary />} />
                {/* Route Admin protégée */}
                <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']} />}>
                  <Route path="/admin" element={<AdminDashboard />} errorElement={<ErrorBoundary />} />
                  {/* Ajoutez d'autres routes admin ici si nécessaire */}
                </Route>
                <Route path="/create-user" element={<CreateUserPage />} errorElement={<ErrorBoundary />} /> {/* Ajouter la route */}
                <Route path="/login" element={<LoginPage />} errorElement={<ErrorBoundary />} /> {/* Ajouter la route de login */}
                {import.meta.env.VITE_TEMPO === "true" && (
                  <Route path="/tempobook/*" />
                )}
              </Routes>
              {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
              
              <ScrollToTop />
            </Suspense>
          // </motion.div> {/* Temporairement supprimé pour tester l'animation de transition */}
        )}
      {/* </AnimatePresence> {/* Temporairement commenté pour isoler le problème de scroll */}
    </>
  );
}

export default App;
