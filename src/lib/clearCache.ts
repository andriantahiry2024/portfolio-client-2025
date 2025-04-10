/**
 * Fonction pour nettoyer le cache du navigateur
 * Utile pour résoudre les problèmes liés au service worker
 */
export async function clearBrowserCache() {
  if ('caches' in window) {
    try {
      // Liste tous les caches disponibles
      const cacheNames = await caches.keys();
      
      // Supprime chaque cache
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      
      console.log('Cache du navigateur nettoyé avec succès');
      return true;
    } catch (error) {
      console.error('Erreur lors du nettoyage du cache:', error);
      return false;
    }
  } else {
    console.log('API Cache non disponible dans ce navigateur');
    return false;
  }
}

/**
 * Fonction pour nettoyer spécifiquement le cache du service worker
 */
export async function clearServiceWorkerCache() {
  if ('serviceWorker' in navigator) {
    try {
      // Récupère tous les service workers enregistrés
      const registrations = await navigator.serviceWorker.getRegistrations();
      
      // Désactive chaque service worker
      await Promise.all(
        registrations.map(registration => registration.unregister())
      );
      
      console.log('Service workers désactivés avec succès');
      
      // Nettoie également le cache
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('Cache du service worker nettoyé avec succès');
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors du nettoyage du service worker:', error);
      return false;
    }
  } else {
    console.log('Service Worker API non disponible dans ce navigateur');
    return false;
  }
}

export default {
  clearBrowserCache,
  clearServiceWorkerCache
};
