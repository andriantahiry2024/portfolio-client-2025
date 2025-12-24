import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import ErrorBoundary from "./components/ErrorBoundary";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "./components/ScrollToTop";

// Lazy load components
const BlogPage = lazy(() => import("./components/BlogPage"));
const BlogPostDetail = lazy(() => import("./components/BlogPostDetail"));
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const CreateUserPage = lazy(() => import("./pages/CreateUserPage")); // Importer la nouvelle page
const LoginPage = lazy(() => import("./pages/LoginPage")); // Importer la page de login
const BlogPostDetailPage = lazy(() => import("./components/BlogPostDetail"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
import ProtectedRoute from "./components/ProtectedRoute"; // Importer ProtectedRoute

function App() {
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
        {/* Plus de loader global bloquant ; on se repose sur les fallbacks et loaders locaux */}
      </AnimatePresence>

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Redirection de l'ancien chemin GitHub Pages /Portfolio-2025/ vers la racine */}
          <Route path="/Portfolio-2025/*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
          <Route path="/blog" element={<BlogPage />} errorElement={<ErrorBoundary />} />
          {/* Modifier la route pour utiliser :slug au lieu de :id */}
          <Route path="/blog/:slug" element={<BlogPostDetail />} errorElement={<ErrorBoundary />} />
          {/* Route Admin protégée */}
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN']} />}>
            <Route path="/admin" element={<AdminDashboard />} errorElement={<ErrorBoundary />} />
            {/* Ajoutez d'autres routes admin ici si nécessaire */}
          </Route>
          <Route path="/create-user" element={<CreateUserPage />} errorElement={<ErrorBoundary />} />
          <Route path="/login" element={<LoginPage />} errorElement={<ErrorBoundary />} />
          <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} errorElement={<ErrorBoundary />} />
          <Route path="/conditions-utilisation" element={<TermsOfService />} errorElement={<ErrorBoundary />} />
        </Routes>

        <ScrollToTop />
      </Suspense>
    </>
  );
}

export default App;
