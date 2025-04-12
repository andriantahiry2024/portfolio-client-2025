import { useEffect } from 'react';

const useDevToolsBlocker = (enabled: boolean = false): void => {
  useEffect(() => {
    // Fonction pour empêcher l'action par défaut (ex: clic droit)
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };

    // Fonction pour gérer les pressions de touches
    const handleKeyDown = (e: KeyboardEvent) => {
      // Bloquer F12
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
      }
      // Bloquer Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) {
         e.preventDefault();
      }
       // Bloquer Ctrl+U (Voir code source)
      if (e.ctrlKey && e.key.toUpperCase() === 'U') {
        e.preventDefault();
      }
    };

    if (!enabled) {
      // Si désactivé, ne rien faire et nettoyer les éventuels écouteurs précédents
      const cleanup = () => {
        document.removeEventListener('contextmenu', preventDefault);
        document.removeEventListener('keydown', handleKeyDown);
        // Arrêter la détection si elle était active
        // (Nécessite une variable pour stocker l'intervalle/timeout si utilisé)
      };
      cleanup(); // Appeler immédiatement au cas où l'état enabled change
      return cleanup; // Retourner la fonction de nettoyage pour useEffect
    }

    // --- Détection de l'ouverture des DevTools (méthode simple) ---
    // Cette méthode est basique et peut être contournée.
    // Elle repose sur le fait que l'instruction 'debugger' arrête l'exécution
    // uniquement si les DevTools sont ouverts.
    const checkDevTools = () => {
      const threshold = 160; // Seuil de temps en ms pour détecter le ralentissement dû au debugger
      const start = performance.now();

      // eslint-disable-next-line no-debugger
      debugger; // Cette instruction ne fait rien si les DevTools ne sont pas ouverts

      const end = performance.now();

      if (end - start > threshold) {
        // Les DevTools sont probablement ouverts
        console.warn("Les outils de développement ont été détectés.");
        // Ici, vous pourriez ajouter une action, comme rediriger l'utilisateur
        // ou afficher un message, mais c'est souvent plus ennuyeux qu'utile.
        // Exemple : document.body.innerHTML = "Inspection non autorisée.";
      }
    };

    // Vérifier périodiquement (peut impacter les performances)
    // const intervalId = setInterval(checkDevTools, 1000); // Désactivé par défaut car potentiellement lourd

    // Ajouter les écouteurs d'événements
    document.addEventListener('contextmenu', preventDefault);
    document.addEventListener('keydown', handleKeyDown);
    // Lancer une vérification initiale
    // checkDevTools(); // Désactivé par défaut

    // Fonction de nettoyage pour supprimer les écouteurs lorsque le composant est démonté
    // ou lorsque 'enabled' devient false
    return () => {
      document.removeEventListener('contextmenu', preventDefault);
      document.removeEventListener('keydown', handleKeyDown);
      // clearInterval(intervalId); // Nettoyer l'intervalle si activé
    };
  }, [enabled]); // Ré-exécuter l'effet si l'état 'enabled' change
};

export default useDevToolsBlocker;