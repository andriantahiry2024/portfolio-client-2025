import { useState } from 'react';
import { clearBrowserCache, clearServiceWorkerCache } from '../lib/clearCache';

/**
 * Composant pour gérer les erreurs liées au service worker
 * Affiche un bouton pour nettoyer le cache et recharger la page
 */
const ServiceWorkerErrorHandler = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [clearingResult, setClearingResult] = useState<string | null>(null);

  const handleClearCache = async () => {
    setIsClearing(true);
    setClearingResult(null);
    
    try {
      // Nettoyer le cache du service worker
      const swCacheCleared = await clearServiceWorkerCache();
      
      // Nettoyer le cache du navigateur
      const browserCacheCleared = await clearBrowserCache();
      
      if (swCacheCleared && browserCacheCleared) {
        setClearingResult('success');
        // Recharger la page après un court délai
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setClearingResult('partial');
      }
    } catch (error) {
      console.error('Erreur lors du nettoyage du cache:', error);
      setClearingResult('error');
    } finally {
      setIsClearing(false);
    }
  };

  const handleHardReload = () => {
    // Forcer un rechargement complet en contournant le cache
    window.location.href = window.location.href + '?nocache=' + Date.now();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Problème de chargement détecté</h2>
        
        <p className="mb-4 dark:text-gray-300">
          Il semble y avoir un problème avec le cache du navigateur ou le service worker.
          Essayez de nettoyer le cache pour résoudre ce problème.
        </p>
        
        {clearingResult === 'success' && (
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded mb-4 text-green-800 dark:text-green-200">
            Cache nettoyé avec succès. Rechargement de la page...
          </div>
        )}
        
        {clearingResult === 'partial' && (
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded mb-4 text-yellow-800 dark:text-yellow-200">
            Le cache a été partiellement nettoyé. Essayez de recharger la page manuellement.
          </div>
        )}
        
        {clearingResult === 'error' && (
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded mb-4 text-red-800 dark:text-red-200">
            Une erreur s'est produite lors du nettoyage du cache. Essayez de recharger la page manuellement.
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleClearCache}
            disabled={isClearing}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex-1"
          >
            {isClearing ? (
              <>
                <span className="inline-block animate-spin mr-2">⟳</span>
                Nettoyage en cours...
              </>
            ) : (
              'Nettoyer le cache et recharger'
            )}
          </button>
          
          <button
            onClick={handleHardReload}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex-1"
          >
            Forcer le rechargement
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceWorkerErrorHandler;
