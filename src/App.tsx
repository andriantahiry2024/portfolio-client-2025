import { Suspense, lazy, useState, useEffect } from "react";
// import { initFacebookSDK } from "./lib/facebook"; // Temporairement commenté
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "./components/ui/toaster";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ApiTest from "./components/ApiTest"; // Importer notre composant de test
import OfflineNotification from "./components/OfflineNotification"; // Importer la notification hors ligne
import CookieConsent from "./components/CookieConsent"; // Importer le composant de consentement aux cookies

// Fonction de préchargement pour les composants importants
const preloadComponent = (importFn: () => Promise<any>) => {
  const Component = lazy(importFn);
  // Déclencher le préchargement
  importFn();
  return Component;
};

// Regroupement des composants par fonctionnalité
// Composants de blog
const BlogPage = lazy(() => import("./components/BlogPage"));
const BlogPostDetail = lazy(() => import("./components/BlogPostDetail"));

// Composants d'administration (préchargés après le chargement initial)
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

// Composants d'authentification (préchargés pour une expérience utilisateur fluide)
const CreateUserPage = preloadComponent(() => import("./pages/CreateUserPage"));
const LoginPage = preloadComponent(() => import("./pages/LoginPage"));

// Pages légales
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));

// Composants de protection des routes
import ProtectedRoute from "./components/ProtectedRoute";

// Composant Loader simplifié
const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  // Simuler le chargement des ressources avec une progression simple
  useEffect(() => {
    // Mettre à jour la progression toutes les 100ms
    const interval = setInterval(() => {
      setProgress(prev => {
        // Augmenter progressivement jusqu'à 100%
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Terminer le chargement
          setTimeout(onComplete, 300);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    // Nettoyer l'intervalle
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black bg-white dark:text-white" // Supprimer text-black
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center w-64">
        <motion.div
          className="mx-auto mb-4 h-12 w-12 rounded-full border-4 dark:border-white/20 dark:border-t-white border-black/20 border-t-black"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <p className="text-foreground mb-2">Chargement de votre expérience...</p>

        {/* Barre de progression */}
        <div className="w-full dark:bg-gray-800 bg-gray-200 rounded-full h-2.5 mb-2">
          <div
            className="dark:bg-white bg-black h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-foreground text-sm">{progress}%</p>
      </div>
    </motion.div>
  );
};

function App() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // Initialiser le thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "dark";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setTheme(savedTheme);
  }, []);

  // // Initialiser Facebook SDK lorsque le composant est monté - Temporairement commenté
  // useEffect(() => {
  //   // Initialiser Facebook SDK uniquement après le chargement complet de la page
  //   if (!showLoader) {
  //     initFacebookSDK();
  //   }
  // }, [showLoader]);

  // Suspense fallback component simplifié
  const LoadingFallback = () => {
    return (
      <div className="flex h-screen w-full items-center justify-center dark:bg-black/50 bg-white/50 backdrop-blur-sm">
        <div className="text-center p-4 rounded-lg dark:bg-black/70 bg-white/70 shadow-lg max-w-xs">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 dark:border-white border-black mx-auto mb-4"></div>
          <p className="dark:text-white text-black">Chargement...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="app" data-theme={theme}>
      <AnimatePresence mode="wait">
        {showLoader && (
          <Loader onComplete={() => setShowLoader(false)} />
        )}
      </AnimatePresence>

      {/* Contenu principal */}
        {!showLoader && (
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
                <Route path="/api-test" element={<ApiTest />} errorElement={<ErrorBoundary />} /> {/* Route de test API */}
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} errorElement={<ErrorBoundary />} /> {/* Politique de confidentialité */}
                <Route path="/terms-of-service" element={<TermsOfServicePage />} errorElement={<ErrorBoundary />} /> {/* Conditions d'utilisation */}
                {import.meta.env.VITE_TEMPO === "true" && (
                  <Route path="/tempobook/*" />
                )}
              </Routes>
              {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

              {/* Nous utilisons uniquement ScrollToTopButton */}
            </Suspense>
        )}
      <ScrollToTopButton />
      <Toaster />
      <OfflineNotification />
      <CookieConsent />
    </div>
  );
}

export default App;
