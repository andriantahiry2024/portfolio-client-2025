// Utilitaire centralisé pour les appels API côté client
// Permet de construire automatiquement l'URL du backend à partir de VITE_BACKEND_URL

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

/**
 * Wrapper léger autour de fetch pour appeler l'API du backend.
 * - `path` : chemin relatif de l'API (ex: "/contact", "/api/posts")
 * - `options` : options standard de `fetch` (méthode, headers, body, etc.)
 */
export const fetchApi = (
  path: string,
  options: RequestInit = {}
): Promise<Response> => {
  const isAbsoluteUrl = /^https?:\/\//i.test(path);
  const url = isAbsoluteUrl ? path : `${backendUrl}${path}`;

  return fetch(url, {
    // On laisse la possibilité de surcharger complètement les options
    ...options,
  });
};


