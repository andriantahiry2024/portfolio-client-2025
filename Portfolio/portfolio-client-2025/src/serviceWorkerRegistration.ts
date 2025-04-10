// Service Worker Registration
// Ce fichier gère l'enregistrement du service worker pour la mise en cache et les fonctionnalités PWA

// Fonction pour enregistrer le service worker
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('Service workers ne sont pas supportés par ce navigateur.');
    return;
  }

  try {
    const swUrl = '/service-worker.js';

    // Enregistrer le service worker
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('Service Worker enregistré avec succès:', registration.scope);
      })
      .catch((error) => {
        console.error('Erreur lors de l\'enregistrement du service worker:', error);
      });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement du service worker:', error);
  }
}

// Fonction pour désactiver le service worker
export function unregisterServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.ready
    .then((registration) => {
      registration.unregister();
    })
    .catch((error) => {
      console.error('Erreur lors de la désactivation du service worker:', error);
    });
}

// Exporter une fonction par défaut pour l'enregistrement
export default registerServiceWorker;
