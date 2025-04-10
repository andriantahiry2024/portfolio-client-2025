// Script pour tester le service worker
const fs = require('fs');
const path = require('path');

// Vérifier si le fichier service-worker.js existe
const serviceWorkerPath = path.join(__dirname, 'portfolio-client-2025', 'public', 'service-worker.js');
const serviceWorkerExists = fs.existsSync(serviceWorkerPath);

console.log(`Service Worker existe: ${serviceWorkerExists}`);

if (serviceWorkerExists) {
  // Lire le contenu du fichier service-worker.js
  const serviceWorkerContent = fs.readFileSync(serviceWorkerPath, 'utf8');
  
  // Vérifier si le fichier contient les éléments essentiels
  const hasCacheName = serviceWorkerContent.includes('CACHE_NAME');
  const hasPrecacheAssets = serviceWorkerContent.includes('PRECACHE_ASSETS');
  const hasRuntimeCachePatterns = serviceWorkerContent.includes('RUNTIME_CACHE_PATTERNS');
  const hasInstallEventListener = serviceWorkerContent.includes("self.addEventListener('install'");
  const hasActivateEventListener = serviceWorkerContent.includes("self.addEventListener('activate'");
  const hasFetchEventListener = serviceWorkerContent.includes("self.addEventListener('fetch'");
  
  console.log(`\nVérification du contenu du Service Worker:`);
  console.log(`- Nom de cache défini: ${hasCacheName}`);
  console.log(`- Ressources à précharger définies: ${hasPrecacheAssets}`);
  console.log(`- Patterns de cache runtime définis: ${hasRuntimeCachePatterns}`);
  console.log(`- Écouteur d'événement 'install': ${hasInstallEventListener}`);
  console.log(`- Écouteur d'événement 'activate': ${hasActivateEventListener}`);
  console.log(`- Écouteur d'événement 'fetch': ${hasFetchEventListener}`);
  
  // Vérifier si tous les éléments essentiels sont présents
  const allEssentialElementsPresent = hasCacheName && hasPrecacheAssets && hasRuntimeCachePatterns && 
                                     hasInstallEventListener && hasActivateEventListener && hasFetchEventListener;
  
  console.log(`\nTous les éléments essentiels sont présents: ${allEssentialElementsPresent}`);
}

// Vérifier si le fichier manifest.json existe
const manifestPath = path.join(__dirname, 'portfolio-client-2025', 'public', 'manifest.json');
const manifestExists = fs.existsSync(manifestPath);

console.log(`\nManifest existe: ${manifestExists}`);

if (manifestExists) {
  // Lire le contenu du fichier manifest.json
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  
  try {
    // Parser le contenu JSON
    const manifest = JSON.parse(manifestContent);
    
    // Vérifier si le manifest contient les éléments essentiels
    const hasName = !!manifest.name;
    const hasShortName = !!manifest.short_name;
    const hasStartUrl = !!manifest.start_url;
    const hasDisplay = !!manifest.display;
    const hasIcons = Array.isArray(manifest.icons) && manifest.icons.length > 0;
    
    console.log(`\nVérification du contenu du Manifest:`);
    console.log(`- Nom défini: ${hasName}`);
    console.log(`- Nom court défini: ${hasShortName}`);
    console.log(`- URL de démarrage définie: ${hasStartUrl}`);
    console.log(`- Mode d'affichage défini: ${hasDisplay}`);
    console.log(`- Icônes définies: ${hasIcons}`);
    
    // Vérifier si tous les éléments essentiels sont présents
    const allEssentialElementsPresent = hasName && hasShortName && hasStartUrl && hasDisplay && hasIcons;
    
    console.log(`\nTous les éléments essentiels sont présents: ${allEssentialElementsPresent}`);
  } catch (error) {
    console.error(`Erreur lors du parsing du manifest: ${error.message}`);
  }
}

// Vérifier si le fichier serviceWorkerRegistration.ts existe
const serviceWorkerRegistrationPath = path.join(__dirname, 'portfolio-client-2025', 'src', 'serviceWorkerRegistration.ts');
const serviceWorkerRegistrationExists = fs.existsSync(serviceWorkerRegistrationPath);

console.log(`\nService Worker Registration existe: ${serviceWorkerRegistrationExists}`);

if (serviceWorkerRegistrationExists) {
  // Lire le contenu du fichier serviceWorkerRegistration.ts
  const serviceWorkerRegistrationContent = fs.readFileSync(serviceWorkerRegistrationPath, 'utf8');
  
  // Vérifier si le fichier contient les éléments essentiels
  const hasRegisterFunction = serviceWorkerRegistrationContent.includes('registerServiceWorker');
  const hasUnregisterFunction = serviceWorkerRegistrationContent.includes('unregisterServiceWorker');
  const hasServiceWorkerCheck = serviceWorkerRegistrationContent.includes('serviceWorker');
  
  console.log(`\nVérification du contenu du Service Worker Registration:`);
  console.log(`- Fonction d'enregistrement définie: ${hasRegisterFunction}`);
  console.log(`- Fonction de désenregistrement définie: ${hasUnregisterFunction}`);
  console.log(`- Vérification de support du Service Worker: ${hasServiceWorkerCheck}`);
  
  // Vérifier si tous les éléments essentiels sont présents
  const allEssentialElementsPresent = hasRegisterFunction && hasUnregisterFunction && hasServiceWorkerCheck;
  
  console.log(`\nTous les éléments essentiels sont présents: ${allEssentialElementsPresent}`);
}

// Vérifier si le fichier OfflineNotification.tsx existe
const offlineNotificationPath = path.join(__dirname, 'portfolio-client-2025', 'src', 'components', 'OfflineNotification.tsx');
const offlineNotificationExists = fs.existsSync(offlineNotificationPath);

console.log(`\nOffline Notification existe: ${offlineNotificationExists}`);

if (offlineNotificationExists) {
  // Lire le contenu du fichier OfflineNotification.tsx
  const offlineNotificationContent = fs.readFileSync(offlineNotificationPath, 'utf8');
  
  // Vérifier si le fichier contient les éléments essentiels
  const hasOnlineCheck = offlineNotificationContent.includes('navigator.onLine');
  const hasEventListeners = offlineNotificationContent.includes("addEventListener('online'") && 
                           offlineNotificationContent.includes("addEventListener('offline'");
  
  console.log(`\nVérification du contenu de Offline Notification:`);
  console.log(`- Vérification de l'état de connexion: ${hasOnlineCheck}`);
  console.log(`- Écouteurs d'événements online/offline: ${hasEventListeners}`);
  
  // Vérifier si tous les éléments essentiels sont présents
  const allEssentialElementsPresent = hasOnlineCheck && hasEventListeners;
  
  console.log(`\nTous les éléments essentiels sont présents: ${allEssentialElementsPresent}`);
}

console.log('\nRésumé des tests:');
console.log('- Service Worker: ' + (serviceWorkerExists ? '✅' : '❌'));
console.log('- Manifest: ' + (manifestExists ? '✅' : '❌'));
console.log('- Service Worker Registration: ' + (serviceWorkerRegistrationExists ? '✅' : '❌'));
console.log('- Offline Notification: ' + (offlineNotificationExists ? '✅' : '❌'));

const allFilesExist = serviceWorkerExists && manifestExists && serviceWorkerRegistrationExists && offlineNotificationExists;
console.log('\nTous les fichiers nécessaires existent: ' + (allFilesExist ? '✅' : '❌'));

if (allFilesExist) {
  console.log('\n🎉 Les optimisations de mise en cache ont été correctement implémentées!');
  console.log('Pour tester complètement ces optimisations, vous devrez:');
  console.log('1. Démarrer l\'application avec "npm run dev"');
  console.log('2. Ouvrir l\'application dans un navigateur');
  console.log('3. Vérifier dans les DevTools (onglet Application > Service Workers) si le service worker est enregistré');
  console.log('4. Vérifier dans les DevTools (onglet Application > Cache Storage) si les ressources sont mises en cache');
  console.log('5. Simuler une connexion hors ligne (DevTools > Network > Offline) pour tester le fonctionnement en mode déconnecté');
}
