/**
 * Configuration centralisée pour les appels API
 * Ce fichier permet de gérer l'URL du backend de manière cohérente dans toute l'application
 */

// Définir l'URL du backend selon l'environnement
// En production, utiliser une URL fixe pour éviter les problèmes de variables d'environnement
export const API_BASE_URL = import.meta.env.MODE === 'production'
  ? 'https://backend.teckforgeek.com'
  : import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

// URL complète pour les appels API
export const API_URL = `${API_BASE_URL}/api`;

// Proxy CORS pour contourner les problèmes CORS en production
// Utiliser https://corsproxy.io/ comme proxy CORS public
export const CORS_PROXY = 'https://corsproxy.io/?';

// Fonction pour déterminer si nous devons utiliser le proxy CORS
// En production, utiliser le proxy CORS pour contourner les problèmes CORS
export const shouldUseProxy = false; // Désactiver définitivement le proxy CORS

// Fonction utilitaire pour construire une URL d'API
export const getApiUrl = (endpoint: string): string => {
  // S'assurer que l'endpoint commence par '/' si ce n'est pas déjà le cas
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // URL de base de l'API
  const baseApiUrl = `${API_URL}${formattedEndpoint}`;

  // En production, utiliser le proxy CORS pour contourner les problèmes CORS
  return shouldUseProxy ? `${CORS_PROXY}${encodeURIComponent(baseApiUrl)}` : baseApiUrl;
};

// Fonction utilitaire pour les appels API avec gestion du token d'authentification
export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = localStorage.getItem('authToken');

  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (!headers.has('Content-Type') && !options.body) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(getApiUrl(endpoint), {
    ...options,
    headers
  });
};

// Fonction pour les appels API sans authentification
export const fetchApi = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !options.body) {
    headers.set('Content-Type', 'application/json');
  }

  return fetch(getApiUrl(endpoint), {
    ...options,
    headers
  });
};

// Exporter la configuration pour le débogage
console.log('API Configuration:');
console.log('- Mode:', import.meta.env.MODE);
console.log('- Base URL:', API_BASE_URL);
console.log('- API URL:', API_URL);
console.log('- Using CORS Proxy:', shouldUseProxy);
if (shouldUseProxy) {
  console.log('- Example proxied URL:', getApiUrl('/chat'));
}

export default {
  API_BASE_URL,
  API_URL,
  getApiUrl,
  fetchWithAuth,
  fetchApi
}
