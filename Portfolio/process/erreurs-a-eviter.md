# Erreurs à éviter dans le développement du Portfolio

Ce document recense les erreurs courantes à éviter lors du développement de l'application Portfolio. Avant toute action de développement, consultez ce guide pour éviter de reproduire des erreurs connues et suivre les bonnes pratiques.

## Erreurs de commandes Shell

### Commandes Windows PowerShell

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| `dir /s /b` | `dir -Recurse` | PowerShell utilise des paramètres avec tiret, pas des commutateurs slash comme cmd |
| `dir app /s` | `Get-ChildItem -Path app -Recurse` | Utiliser la syntaxe PowerShell complète pour les commandes complexes |
| `cd ./chemin/avec/slash` | `cd .\chemin\avec\backslash` | Utiliser des backslashes (\) dans les chemins Windows |
| `mkdir dossier1 dossier2` | `New-Item -ItemType Directory -Path dossier1, dossier2` | Créer plusieurs dossiers en une commande |
| `rm -rf dossier` | `Remove-Item -Recurse -Force dossier` | Ne pas utiliser la syntaxe Unix pour supprimer des dossiers |
| `mkdir app\api app\lib` | `mkdir app\api` puis `mkdir app\lib` | PowerShell ne peut pas créer plusieurs dossiers avec la commande mkdir simple |
| `mkdir "app\(auth)\login" "app\(auth)\register"` | Créer les dossiers un par un | Les caractères spéciaux comme les parenthèses peuvent causer des problèmes |

### Chemins d'accès

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Utiliser des chemins absolus codés en dur | Utiliser des chemins relatifs | Les chemins absolus ne fonctionneront pas sur d'autres machines |
| Ignorer les espaces dans les chemins | `"C:\Chemin avec espaces\"` | Toujours mettre entre guillemets les chemins contenant des espaces |
| Mélanger / et \ dans les chemins | Utiliser uniquement \ pour Windows | Cohérence dans l'utilisation des séparateurs de chemin |
| Ignorer la casse des noms de fichiers | Respecter la casse exacte | Même si Windows est insensible à la casse, maintenir la cohérence |

## Erreurs de syntaxe et de codage

### JavaScript/TypeScript

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| `var` pour les variables | `const` ou `let` | Éviter `var` qui a une portée de fonction et peut causer des fuites |
| `==` pour les comparaisons | `===` | Toujours utiliser l'égalité stricte pour éviter les conversions implicites |
| Fonctions anonymes partout | Fonctions nommées | Nommer les fonctions pour faciliter le débogage |
| Promesses imbriquées | Async/await | Éviter l'enfer des callbacks avec async/await |
| `console.log` en production | Logger structuré | Utiliser un système de logging approprié en production |
| Manipulation directe du DOM | Utiliser les hooks React | Ne pas mélanger React avec des manipulations DOM directes |

### React/TypeScript

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Utiliser `useState` pour des données dérivées | Calculer les valeurs dans le rendu | Ne stocker dans l'état que ce qui ne peut pas être dérivé |
| Appels API dans les composants | Utiliser SWR ou React Query | Centraliser la logique de données avec des hooks dédiés |
| Logique complexe dans les composants | Custom hooks | Extraire la logique complexe dans des hooks personnalisés |
| Ignorer les clés dans les listes | Utiliser des clés uniques et stables | Les clés aident React à identifier les éléments modifiés |
| Mélanger les approches CSR et SSR | Choisir consciemment | Comprendre quand utiliser le rendu côté client ou serveur |
| Ignorer les types | Typer correctement | Utiliser TypeScript correctement pour éviter les erreurs à l'exécution |
| Types `any` | Types spécifiques | Éviter `any` et utiliser des types précis ou `unknown` si nécessaire |
| Oublier de typer les props | Interfaces pour les props | Définir des interfaces pour toutes les props des composants |

### Tailwind CSS

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Classes CSS en ligne trop longues | Extraire en composants | Utiliser des composants ou des classes composées pour le code répétitif |
| Ignorer les breakpoints | Design mobile-first | Commencer par le mobile puis ajouter des styles pour les écrans plus grands |
| Styles personnalisés en dehors de Tailwind | Étendre Tailwind | Configurer tailwind.config.js pour ajouter des styles personnalisés |
| Duplication de styles | Utiliser @apply | Utiliser @apply dans les classes CSS pour réutiliser des styles |
| Oublier de purger les classes inutilisées | Configurer PurgeCSS | S'assurer que PurgeCSS est correctement configuré pour la production |

### Supabase

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Exposer la clé secrète | Utiliser la clé anonyme côté client | N'utiliser la clé secrète que côté serveur |
| Ignorer les politiques RLS | Configurer RLS | Toujours configurer Row Level Security pour protéger les données |
| Requêtes SQL non paramétrées | Utiliser des paramètres | Éviter les injections SQL en utilisant des requêtes paramétrées |
| Ignorer les indexes | Créer des indexes | Optimiser les performances avec des indexes sur les colonnes fréquemment utilisées |
| Stocker des données sensibles en clair | Chiffrer les données sensibles | Utiliser des méthodes de chiffrement pour les données sensibles |

## Erreurs de conception

### Architecture

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Monolithe sans séparation des préoccupations | Architecture modulaire | Séparer clairement les responsabilités entre les modules |
| Couplage fort entre composants | Interfaces bien définies | Utiliser des interfaces pour découpler les composants |
| Logique métier dans les composants UI | Séparation UI/logique | Extraire la logique métier dans des services ou hooks |
| Duplication de code | DRY (Don't Repeat Yourself) | Factoriser le code commun en fonctions ou composants réutilisables |
| Ignorer les patterns établis | Suivre les bonnes pratiques | Utiliser des patterns comme Container/Presentational, Custom Hooks, etc. |

### Expérience utilisateur

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Ignorer les états de chargement | Afficher des loaders | Toujours indiquer visuellement les états de chargement |
| Absence de gestion d'erreurs | UI pour les erreurs | Prévoir des UI spécifiques pour les différents cas d'erreur |
| Formulaires sans validation | Validation côté client | Implémenter une validation côté client pour un feedback immédiat |
| Ignorer l'accessibilité | Suivre WCAG | Respecter les normes d'accessibilité (contraste, alt, aria, etc.) |
| Design non responsive | Mobile-first | Concevoir d'abord pour mobile puis adapter aux écrans plus grands |

## Erreurs de performance

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Images non optimisées | Optimiser et dimensionner | Compresser les images et utiliser des formats modernes (WebP) |
| Chargement synchrone de ressources lourdes | Lazy loading | Charger les ressources à la demande |
| Bundle JavaScript monolithique | Code splitting | Diviser le code en chunks chargés à la demande |
| Rendu inutile de composants | Mémoisation | Utiliser React.memo, useMemo et useCallback pour éviter les rendus inutiles |
| CSS non optimisé | Purger les styles inutilisés | Utiliser PurgeCSS pour éliminer les styles non utilisés |

## Erreurs de sécurité

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Stockage de données sensibles côté client | Stocker côté serveur | Ne jamais stocker d'informations sensibles dans localStorage ou sessionStorage |
| Absence de validation côté serveur | Valider toutes les entrées | Toujours valider les données côté serveur, même avec validation côté client |
| Tokens JWT sans expiration | Configurer l'expiration | Définir une durée de vie raisonnable pour les tokens |
| Absence de protection CSRF | Implémenter des tokens CSRF | Protéger les formulaires et requêtes avec des tokens CSRF |
| Exposer des informations de débogage | Environnements séparés | Utiliser des configurations différentes pour dev et prod |

## Erreurs de déploiement

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Déployer sans tests | CI/CD avec tests | Mettre en place des tests automatisés avant déploiement |
| Variables d'environnement en dur | Utiliser .env et Vercel | Configurer correctement les variables d'environnement |
| Ignorer les erreurs de build | Corriger avant déploiement | Ne jamais déployer avec des warnings ou erreurs de build |
| Absence de monitoring | Mettre en place des outils | Utiliser des outils comme Sentry pour suivre les erreurs en production |
| Déploiement big bang | Déploiement progressif | Préférer les déploiements progressifs ou canary |

## Erreurs de gestion de projet

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Absence de versionnement | Utiliser Git | Toujours versionner le code avec des commits atomiques |
| Commits trop gros | Commits atomiques | Faire des commits petits et ciblés sur une seule fonctionnalité |
| Messages de commit vagues | Messages descriptifs | Écrire des messages de commit clairs et informatifs |
| Travailler directement sur main | Utiliser des branches | Créer des branches pour les fonctionnalités et corrections |
| Ignorer la documentation | Documenter le code | Maintenir une documentation à jour pour faciliter la maintenance |
