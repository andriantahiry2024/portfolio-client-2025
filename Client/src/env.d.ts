/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Aucune variable d'environnement spécifique requise pour le frontend
  // Le backend gère maintenant la clé API OpenRouter
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 