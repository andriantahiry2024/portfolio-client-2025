/*
// Configuration pour Facebook Business SDK

// Initialisation du SDK Facebook
export const initFacebookSDK = () => {
  // Vérifier si le consentement aux cookies marketing a été donné
  const cookieSettings = localStorage.getItem('cookie-settings');
  let marketingConsent = false;

  if (cookieSettings) {
    try {
      const settings = JSON.parse(cookieSettings);
      marketingConsent = settings.marketing === true;
    } catch (error) {
      console.error('Erreur lors de la lecture des paramètres de cookies:', error);
    }
  }

  // Ne pas initialiser Facebook SDK si le consentement n'a pas été donné
  if (!marketingConsent) {
    console.log('Facebook SDK non initialisé : consentement marketing non accordé');
    return;
  }

  // Charger le SDK Facebook de manière asynchrone
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s) as HTMLScriptElement;
    js.id = id;
    js.src = "https://connect.facebook.net/fr_FR/sdk.js";
    fjs.parentNode?.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Initialiser le SDK Facebook
  window.fbAsyncInit = function() {
    FB.init({
      appId: import.meta.env.VITE_FACEBOOK_APP_ID || '962947109331742',
      cookie: true,
      xfbml: true,
      version: 'v18.0' // Utiliser la version la plus récente
    });

    console.log('Facebook SDK initialisé avec l\'App ID:', import.meta.env.VITE_FACEBOOK_APP_ID || '962947109331742');
    FB.AppEvents.logPageView();
  };
};

// Fonction pour suivre un événement Facebook
export const trackFacebookEvent = (eventName: string, parameters?: object) => {
  // Vérifier si le consentement aux cookies marketing a été donné
  const cookieSettings = localStorage.getItem('cookie-settings');
  let marketingConsent = false;

  if (cookieSettings) {
    try {
      const settings = JSON.parse(cookieSettings);
      marketingConsent = settings.marketing === true;
    } catch (error) {
      console.error('Erreur lors de la lecture des paramètres de cookies:', error);
    }
  }

  // Ne pas suivre l'événement si le consentement n'a pas été donné
  if (!marketingConsent) {
    console.log(`Événement Facebook "${eventName}" non suivi : consentement marketing non accordé`);
    return;
  }

  // Vérifier si FB est disponible
  if (typeof FB !== 'undefined') {
    FB.AppEvents.logEvent(eventName, null, parameters);
  } else {
    console.warn('Facebook SDK non disponible pour suivre l\'événement:', eventName);
  }
};

// Déclaration des types pour TypeScript
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (params: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      AppEvents: {
        logPageView: () => void;
        logEvent: (eventName: string, valueToSum: number | null, parameters?: object) => void;
      };
    };
  }
}
*/
// Fichier temporairement vidé pour résoudre les erreurs de build
export {}; // Assurer que le fichier est traité comme un module
