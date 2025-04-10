import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; // Importer un indicateur de chargement

interface UserData {
  id: string | number;
  email: string;
  name: string;
  role: string;
}

interface ProtectedRouteProps {
  allowedRoles: string[]; // Ex: ['ADMIN', 'SUPERADMIN']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('authToken');
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`;

      if (!token) {
        setIsAuthenticated(false);
        setIsAuthorized(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const userData: UserData = await response.json();
          setIsAuthenticated(true);
          // Vérifier si le rôle de l'utilisateur est dans les rôles autorisés
          if (userData.role && allowedRoles.includes(userData.role)) {
            setIsAuthorized(true);
          } else {
            setIsAuthorized(false);
            console.warn(`Accès non autorisé pour le rôle: ${userData.role}`);
          }
        } else {
          // Gérer les erreurs d'authentification (token invalide, expiré, utilisateur non trouvé)
          console.error(`Erreur d'authentification: ${response.status}`);
          localStorage.removeItem('authToken'); // Supprimer le token invalide
          setIsAuthenticated(false);
          setIsAuthorized(false);
          if (response.status === 401 || response.status === 403) {
             setError('Session invalide ou expirée.');
          } else {
             setError('Erreur lors de la vérification de l\'authentification.');
          }
        }
      } catch (err) {
        console.error("Erreur réseau ou autre lors de la vérification:", err);
        localStorage.removeItem('authToken'); // Supprimer en cas d'erreur majeure
        setIsAuthenticated(false);
        setIsAuthorized(false);
        setError('Impossible de vérifier l\'authentification.');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [allowedRoles]); // Dépendance à allowedRoles

  if (isLoading) {
    // Afficher un indicateur de chargement pendant la vérification
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Non authentifié, rediriger vers la page de login
    // Passer l'erreur en state si on veut l'afficher sur la page de login
    return <Navigate to="/login" state={{ error }} replace />;
  }

  if (!isAuthorized) {
    // Authentifié mais non autorisé pour cette route, rediriger vers l'accueil
    // On pourrait aussi rediriger vers une page spécifique "Non Autorisé"
    return <Navigate to="/" replace />;
  }

  // Authentifié et autorisé : afficher le contenu de la route enfant
  return <Outlet />;
};

export default ProtectedRoute;