// Client/src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[]; // Ex: ['ADMIN', 'SUPERADMIN']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  // --- Logique de vérification d'authentification et de rôle ---
  // Ceci est un exemple simple utilisant localStorage.
  // Remplacez par votre logique de contexte/store d'authentification.
  const token = localStorage.getItem('authToken');
  const userDataString = localStorage.getItem('userData');
  let userRole: string | null = null;

  if (userDataString) {
    try {
      const userData = JSON.parse(userDataString);
      userRole = userData?.role;
    } catch (e) {
      console.error("Erreur parsing userData:", e);
      // Gérer l'erreur, peut-être déconnecter l'utilisateur
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      return <Navigate to="/login" replace />;
    }
  }

  // Vérifier si l'utilisateur est connecté
  if (!token) {
    // Non connecté, rediriger vers la page de login
    return <Navigate to="/login" replace />;
  }

  // Vérifier si l'utilisateur a le rôle requis
  if (!userRole || !allowedRoles.includes(userRole)) {
    // Rôle non autorisé, rediriger vers une page d'erreur ou l'accueil
    // Vous pourriez créer une page spécifique "Non Autorisé"
    console.warn(`Accès non autorisé pour le rôle: ${userRole}`);
    return <Navigate to="/" replace />; // Redirige vers l'accueil par défaut
  }

  // Autorisé : afficher le contenu de la route enfant
  return <Outlet />;
};

export default ProtectedRoute;