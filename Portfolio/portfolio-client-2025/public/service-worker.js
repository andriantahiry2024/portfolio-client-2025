// Service Worker pour le Portfolio
const CACHE_NAME = 'portfolio-cache-v1';

// Ressources à mettre en cache immédiatement lors de l'installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/vite.svg',
  '/manifest.json'
];

// Ressources à mettre en cache lors de leur première utilisation
const RUNTIME_CACHE_PATTERNS = [
  /\.(js|css)$/,  // Tous les fichiers JS et CSS
  /\.(png|jpg|jpeg|svg|webp|avif)$/,  // Toutes les images
  /^https:\/\/fonts\.googleapis\.com/,  // Polices Google
  /^https:\/\/fonts\.gstatic\.com/,  // Polices Google
];

// Installation du service worker
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation');

  // Mettre en cache les ressources essentielles
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des ressources essentielles');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du service worker
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation');

  // Supprimer les anciens caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non GET
  if (event.request.method !== 'GET') return;

  // Ignorer les requêtes de l'API backend
  if (event.request.url.includes('/api/')) return;

  // Ignorer les extensions Chrome
  try {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.protocol === 'chrome-extension:') return;
  } catch (error) {
    console.error('[Service Worker] Erreur lors de la vérification de l\'URL:', error);
    return;
  }

  // Stratégie de mise en cache pour les ressources statiques
  const shouldCacheResource = RUNTIME_CACHE_PATTERNS.some(pattern =>
    pattern.test(event.request.url)
  );

  if (shouldCacheResource) {
    // Stratégie "Cache First, Network Fallback" pour les ressources statiques
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Ressource trouvée dans le cache
            return cachedResponse;
          }

          // Ressource non trouvée dans le cache, la récupérer depuis le réseau
          return fetch(event.request)
            .then((networkResponse) => {
              // Vérifier si la réponse est valide
              if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                return networkResponse;
              }

              // Vérifier si l'URL est valide pour la mise en cache (pas d'extensions Chrome)
              const requestUrl = new URL(event.request.url);
              if (requestUrl.protocol === 'chrome-extension:') {
                return networkResponse;
              }

              // Mettre en cache la nouvelle ressource
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  try {
                    cache.put(event.request, responseToCache);
                  } catch (error) {
                    console.error('[Service Worker] Erreur lors de la mise en cache:', error);
                  }
                });

              return networkResponse;
            });
        })
    );
  } else {
    // Stratégie "Network First, Cache Fallback" pour les autres ressources
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request);
        })
    );
  }
});

// Gestion des messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Mise à jour périodique du cache
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-cache') {
    event.waitUntil(updateCache());
  }
});

// Fonction pour mettre à jour le cache
async function updateCache() {
  const cache = await caches.open(CACHE_NAME);

  // Mettre à jour les ressources essentielles
  for (const url of PRECACHE_ASSETS) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        await cache.put(url, response);
      }
    } catch (error) {
      console.error(`[Service Worker] Erreur lors de la mise à jour du cache pour ${url}:`, error);
    }
  }
}
