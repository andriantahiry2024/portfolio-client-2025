'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';


// Types pour les cookies
type CookieCategory = 'necessary' | 'functional' | 'analytics' | 'marketing';

interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  // État pour suivre si l'utilisateur a déjà donné son consentement
  const [consentGiven, setConsentGiven] = useState<boolean>(false);

  // État pour la boîte de dialogue des paramètres
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  // État pour les paramètres de cookies
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true, // Toujours activé
    functional: false,
    analytics: false,
    marketing: false,
  });

  // Vérifier si l'utilisateur a déjà donné son consentement
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setConsentGiven(false);
    } else {
      setConsentGiven(true);
      // Charger les paramètres sauvegardés
      try {
        const savedSettings = JSON.parse(localStorage.getItem('cookie-settings') || '{}');
        setCookieSettings({
          necessary: true, // Toujours activé
          functional: savedSettings.functional || false,
          analytics: savedSettings.analytics || false,
          marketing: savedSettings.marketing || false,
        });
      } catch (error) {
        console.error('Erreur lors du chargement des paramètres de cookies:', error);
      }
    }
  }, []);

  // Fonction pour accepter tous les cookies
  const acceptAllCookies = () => {
    const settings = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };

    saveCookieSettings(settings);
  };

  // Fonction pour refuser les cookies non nécessaires
  const rejectNonEssentialCookies = () => {
    const settings = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };

    saveCookieSettings(settings);
  };

  // Fonction pour sauvegarder les paramètres de cookies
  const saveCookieSettings = (settings: CookieSettings) => {
    localStorage.setItem('cookie-consent', 'true');
    localStorage.setItem('cookie-settings', JSON.stringify(settings));

    setCookieSettings(settings);
    setConsentGiven(true);
    setSettingsOpen(false);

    // Appliquer les paramètres de cookies
    applyCookieSettings(settings);

    // Afficher un message de confirmation
    console.log('Paramètres de cookies sauvegardés:', settings);
  };

  // Fonction pour réinitialiser les paramètres de cookies (pour les tests)
  const resetCookieSettings = () => {
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-settings');
    setConsentGiven(false);
    setCookieSettings({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    });
    console.log('Paramètres de cookies réinitialisés');
  };

  // Fonction pour appliquer les paramètres de cookies
  const applyCookieSettings = (settings: CookieSettings) => {
    // Cookies nécessaires - toujours activés

    // Cookies fonctionnels
    if (settings.functional) {
      // Activer les cookies fonctionnels
      // Exemple : localStorage.setItem('theme', 'dark');
    } else {
      // Désactiver les cookies fonctionnels
      // Exemple : localStorage.removeItem('theme');
    }

    // Cookies analytiques
    if (settings.analytics) {
      // Activer Google Analytics ou autre outil d'analyse
      enableAnalytics();
    } else {
      // Désactiver Google Analytics ou autre outil d'analyse
      disableAnalytics();
    }

    // Cookies marketing
    if (settings.marketing) {
      // Activer les cookies marketing (Facebook, etc.)
      enableMarketingCookies();
    } else {
      // Désactiver les cookies marketing
      disableMarketingCookies();
    }
  };

  // Fonctions pour activer/désactiver les outils d'analyse
  const enableAnalytics = () => {
    // Code pour activer Google Analytics
    // Exemple : window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
  };

  const disableAnalytics = () => {
    // Code pour désactiver Google Analytics
    // Exemple : window.gtag('consent', 'update', { 'analytics_storage': 'denied' });
  };

  // Fonctions pour activer/désactiver les cookies marketing
  const enableMarketingCookies = () => {
    // Code pour activer les cookies marketing (Facebook, etc.)
    // Exemple : window.fbq('consent', 'grant');
  };

  const disableMarketingCookies = () => {
    // Code pour désactiver les cookies marketing
    // Exemple : window.fbq('consent', 'revoke');
  };

  // Fonction pour mettre à jour un paramètre spécifique
  const updateCookieSetting = (category: CookieCategory, value: boolean) => {
    setCookieSettings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <>
      {/* Bannière de consentement aux cookies */}
      <AnimatePresence>
        {!consentGiven && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-background dark:bg-black border-t border-border shadow-lg"
          >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base font-semibold mb-1">Ce site utilise des cookies</h3>
                <p className="text-xs text-muted-foreground">
                  Pour améliorer votre expérience et analyser le trafic. Vous pouvez personnaliser vos préférences.
                </p>
              </div>
              <div className="flex flex-wrap gap-1 mt-2 md:mt-0">
                <Button variant="outline" size="sm" className="h-8 text-xs px-2 dark:text-white dark:hover:text-white dark:border-white/20" onClick={() => setSettingsOpen(true)}>
                  <Settings className="h-3 w-3 mr-1" />
                  Options
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs px-2 dark:text-white dark:hover:text-white dark:border-white/20" onClick={rejectNonEssentialCookies}>
                  Refuser
                </Button>
                <Button variant="default" size="sm" className="h-8 text-xs px-2 dark:text-white" onClick={acceptAllCookies}>
                  Accepter
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Boîte de dialogue des paramètres de cookies */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto dark:bg-black dark:text-white dark:border-white/10">
          <DialogHeader>
            <DialogTitle>Paramètres des cookies</DialogTitle>
            <DialogDescription className="dark:text-white/80">
              Personnalisez vos préférences en matière de cookies. Vous pouvez activer ou désactiver différentes catégories de cookies.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="cookies" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 text-sm dark:text-white/90 dark:bg-gray-800">
              <TabsTrigger value="cookies" className="dark:data-[state=active]:bg-accent dark:data-[state=active]:text-accent-foreground dark:text-white/90">Cookies</TabsTrigger>
              <TabsTrigger value="about" className="dark:data-[state=active]:bg-accent dark:data-[state=active]:text-accent-foreground dark:text-white/90">À propos</TabsTrigger>
            </TabsList>

            <TabsContent value="cookies" className="space-y-4 mt-4">
              {/* Cookies nécessaires */}
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium dark:text-white">Cookies nécessaires</h4>
                  <p className="text-xs text-muted-foreground dark:text-white/70">
                    Essentiels au fonctionnement du site.
                  </p>
                </div>
                <Switch checked={cookieSettings.necessary} disabled /> {/* Rely on default disabled styles */}
              </div>

              {/* Cookies fonctionnels */}
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium dark:text-white">Cookies fonctionnels</h4>
                  <p className="text-xs text-muted-foreground dark:text-white/70">
                    Améliorent les fonctionnalités et la personnalisation.
                  </p>
                </div>
                <Switch
                  checked={cookieSettings.functional}
                  onCheckedChange={(checked) => updateCookieSetting('functional', checked)}
                  id="functional-cookies"
                  /* Rely on default switch styles */
                />
              </div>

              {/* Cookies analytiques */}
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium dark:text-white">Cookies analytiques</h4>
                  <p className="text-xs text-muted-foreground dark:text-white/70">
                    Analysent l'utilisation du site pour améliorer les performances.
                  </p>
                </div>
                <Switch
                  checked={cookieSettings.analytics}
                  onCheckedChange={(checked) => updateCookieSetting('analytics', checked)}
                  id="analytics-cookies"
                  /* Rely on default switch styles */
                />
              </div>

              {/* Cookies marketing */}
              <div className="flex items-center justify-between py-3 border-b">
                <div>
                  <h4 className="font-medium dark:text-white">Cookies marketing</h4>
                  <p className="text-xs text-muted-foreground dark:text-white/70">
                    Pour afficher des contenus pertinents et personnalisés.
                  </p>
                </div>
                <Switch
                  checked={cookieSettings.marketing}
                  onCheckedChange={(checked) => updateCookieSetting('marketing', checked)}
                  id="marketing-cookies"
                  /* Rely on default switch styles */
                />
              </div>
            </TabsContent>

            <TabsContent value="about" className="space-y-4 mt-4">
              <div className="prose prose-sm dark:prose-invert text-sm dark:text-white/90 dark:bg-black">
                <h3 className="text-base dark:text-white">Qu'est-ce que les cookies ?</h3>
                <p className="text-xs dark:text-white/80">
                  Petits fichiers texte stockés sur votre appareil qui permettent aux sites web de mémoriser vos actions et préférences.
                </p>

                <h3 className="text-base mt-3 dark:text-white">Types de cookies</h3>
                <ul className="text-xs space-y-1 dark:text-white/80 dark:bg-transparent">
                  <li><strong>Nécessaires</strong> : Essentiels au fonctionnement du site.</li>
                  <li><strong>Fonctionnels</strong> : Mémorisent vos préférences.</li>
                  <li><strong>Analytiques</strong> : Analysent l'utilisation du site.</li>
                  <li><strong>Marketing</strong> : Pour contenus personnalisés.</li>
                </ul>

                <p className="text-xs mt-3 dark:text-white/80">
                  Pour plus d'informations, consultez notre <a href="/privacy-policy" className="text-primary hover:underline">Politique de Confidentialité</a>.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 mt-4">
            <Button variant="outline" size="sm" className="text-xs px-2 h-8" onClick={() => setSettingsOpen(false)}> {/* Rely on index.css for dark outline */}
              Annuler
            </Button>
            <div className="flex flex-wrap sm:flex-row gap-1 mb-2 sm:mb-0">
              <Button variant="outline" size="sm" className="text-xs px-2 h-8" onClick={rejectNonEssentialCookies}> {/* Rely on index.css for dark outline */}
                Refuser
              </Button>
              <Button variant="default" size="sm" className="text-xs px-2 h-8 dark:hover:bg-primary/80" onClick={acceptAllCookies}> {/* Rely on default variant */}
                Accepter
              </Button>
              <Button size="sm" className="text-xs px-2 h-8 dark:hover:bg-primary/80" onClick={() => saveCookieSettings(cookieSettings)}> {/* Rely on default variant */}
                Enregistrer
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bouton flottant pour ouvrir les paramètres de cookies (visible uniquement après consentement) */}
      {consentGiven && (
        <>
          <button
            onClick={() => setSettingsOpen(true)}
            className="fixed bottom-4 left-4 z-40 p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full shadow-md transition-all duration-200"
            aria-label="Paramètres des cookies"
          >
            <Settings className="h-5 w-5" />
          </button>
          {/* Bouton caché pour réinitialiser les paramètres de cookies (pour les tests) */}
          <button
            onClick={resetCookieSettings}
            className="fixed bottom-4 left-16 z-40 p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full shadow-md transition-all duration-200 opacity-30 hover:opacity-100"
            aria-label="Réinitialiser les paramètres de cookies"
            title="Réinitialiser les paramètres de cookies (pour les tests)"
          >
            <X className="h-5 w-5" />
          </button>
        </>
      )}
    </>
  );
};

export default CookieConsent;
