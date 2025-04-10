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

### React/Next.js

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Utiliser `useState` pour des données dérivées | Calculer les valeurs dans le rendu | Ne stocker dans l'état que ce qui ne peut pas être dérivé |
| Appels API dans les composants | Utiliser SWR ou React Query | Centraliser la logique de données avec des hooks dédiés |
| Logique complexe dans les composants | Custom hooks | Extraire la logique complexe dans des hooks personnalisés |
| Ignorer les clés dans les listes | Utiliser des clés uniques et stables | Les clés aident React à identifier les éléments modifiés |
| Mélanger les approches SSR et CSR | Choisir consciemment | Comprendre quand utiliser getServerSideProps, getStaticProps, etc. |
| Ignorer les types | Typer correctement | Utiliser TypeScript correctement pour éviter les erreurs à l'exécution |
| Oublier d'ajouter "use client" | Ajouter "use client" aux composants interactifs | Les composants qui utilisent des hooks ou des événements doivent être marqués "use client" |
| Ne pas utiliser forwardRef pour les composants de formulaire | Utiliser forwardRef | Permet l'utilisation avec des bibliothèques de formulaires comme React Hook Form |

### Composants UI

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Hardcoder les styles dans les composants | Utiliser des props pour la personnalisation | Rendre les composants flexibles et réutilisables |
| Ignorer l'accessibilité | Ajouter des attributs ARIA | Rendre les composants accessibles aux technologies d'assistance |
| Ne pas gérer les états de chargement | Ajouter des états de chargement | Améliorer l'expérience utilisateur pendant les opérations asynchrones |
| Composants trop spécifiques | Créer des composants génériques | Concevoir des composants réutilisables dans différents contextes |
| Ignorer les props de base HTML | Étendre les interfaces de props | Permettre de passer des attributs HTML standard aux composants |
| Ne pas documenter les props | Documenter clairement les props | Faciliter l'utilisation des composants par d'autres développeurs |
| Ne pas utiliser forwardRef pour les composants de formulaire | Utiliser forwardRef | Permettre l'utilisation avec des bibliothèques de formulaires comme React Hook Form |
| Générer des IDs aléatoires pour les champs de formulaire | Utiliser des IDs stables basés sur le nom ou le label | Éviter les erreurs d'hydratation dues à des IDs différents entre le serveur et le client |
| Ne pas gérer les états d'erreur dans les composants de formulaire | Ajouter des props pour gérer les erreurs | Permettre d'afficher des messages d'erreur et de styliser les champs en erreur |
| Créer des composants sans variantes | Ajouter des props pour les variantes | Permettre de personnaliser l'apparence des composants sans dupliquer le code |
| Ne pas gérer les états désactivés | Ajouter des props pour les états désactivés | Permettre de désactiver les composants interactifs |
| Ne pas créer de composants composables | Utiliser le pattern de composition | Permettre de combiner les composants de manière flexible |
| Oublier d'ajouter "use client" aux composants interactifs | Ajouter "use client" | Les composants qui utilisent des hooks ou des événements doivent être marqués "use client" |
| Ne pas exporter les composants dans un fichier index | Créer un fichier index.ts pour exporter tous les composants | Faciliter l'importation des composants |
| Styles globaux qui entrent en conflit | Utiliser des classes CSS modulaires ou Tailwind | Éviter les conflits de style avec une approche modulaire |

### Layouts et navigation

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Hardcoder les routes | Utiliser des constantes pour les routes | Faciliter la maintenance et éviter les erreurs de frappe |
| Ignorer les rôles utilisateur | Adapter la navigation selon le rôle | Afficher uniquement les routes pertinentes pour chaque utilisateur |
| Oublier les états de chargement | Ajouter des états de chargement | Améliorer l'expérience utilisateur pendant les transitions |
| Négliger la navigation mobile | Concevoir pour mobile d'abord | Assurer une expérience utilisateur cohérente sur tous les appareils |
| Oublier d'importer des hooks utilisés | Vérifier tous les imports nécessaires | Éviter les erreurs de compilation et les comportements inattendus |
| Ne pas fournir de fil d'Ariane | Ajouter un composant Breadcrumb | Aider les utilisateurs à comprendre où ils se trouvent dans l'application |
| Créer des layouts non réutilisables | Concevoir des composants modulaires | Permettre la réutilisation des éléments de layout dans différentes parties de l'application |
| Ne pas gérer les clics en dehors des menus déroulants | Ajouter des gestionnaires de clics extérieurs | Améliorer l'expérience utilisateur en fermant les menus lorsque l'utilisateur clique ailleurs |
| Ne pas standardiser les titres de page | Créer un composant PageTitle | Assurer une présentation cohérente des titres de page dans toute l'application |
| Oublier d'ajouter un footer | Ajouter un composant Footer | Fournir des informations importantes comme les droits d'auteur et les liens utiles |

### Tableaux de bord

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Ne pas adapter l'interface au rôle de l'utilisateur | Filtrer les éléments d'interface selon le rôle | Chaque utilisateur doit voir uniquement ce qui est pertinent pour lui |
| Créer des tableaux de bord génériques | Personnaliser les tableaux de bord par rôle | Les différents types d'utilisateurs ont des besoins différents |
| Utiliser des données statiques dans les composants | Préparer les composants pour des données dynamiques | Les données réelles viendront de la base de données |
| Surcharger le tableau de bord avec trop d'informations | Prioriser les informations importantes | Trop d'informations rend l'interface confuse et difficile à utiliser |
| Navigation non intuitive | Organiser la navigation de manière logique | La navigation doit être claire et facile à comprendre |
| Ignorer les états vides | Gérer les états vides avec des messages explicatifs | Indiquer clairement à l'utilisateur quand il n'y a pas de données |

### CSS/Tailwind

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| CSS global excessif | CSS modulaire ou Tailwind | Éviter les conflits de style avec une approche modulaire |
| Classes Tailwind trop longues | Extraire en composants | Utiliser @apply ou créer des composants pour le code répétitif |
| Mélanger unités (px, rem, em) | Standardiser les unités | Utiliser rem pour la typographie, px pour les bordures, etc. |
| Media queries incohérentes | Utiliser les breakpoints Tailwind | Maintenir la cohérence des points de rupture |
| Styles en ligne | Utiliser Tailwind ou CSS modules | Éviter les styles en ligne sauf pour les valeurs dynamiques |

## Erreurs d'authentification et de sécurité

### Supabase Auth

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Utiliser directement les méthodes d'authentification sans gestion d'erreurs | Capturer et afficher les erreurs | Les erreurs d'authentification doivent être explicites pour améliorer l'expérience utilisateur |
| Ne pas gérer la session Supabase | Utiliser `onAuthStateChange` | Écouter les changements d'état d'authentification pour mettre à jour l'UI |
| Utiliser directement les méthodes Supabase dans les composants | Créer un hook personnalisé | Centraliser la logique d'authentification dans un hook réutilisable |
| Oublier de typer les réponses de Supabase | Créer des types personnalisés | Définir des types pour les utilisateurs et les profils |
| Utiliser la même redirection pour tous les rôles | Rediriger en fonction du rôle | Chaque type d'utilisateur doit être redirigé vers son tableau de bord spécifique |
| Ne pas vérifier les rôles dans le middleware | Implémenter des vérifications de rôles | Protéger les routes en fonction des rôles des utilisateurs |
| Exposer la clé de service Supabase côté client | N'utiliser que la clé anonyme côté client | La clé de service donne des droits d'administration et ne doit jamais être exposée |
| Ne pas configurer les redirections dans Supabase Auth | Configurer les URLs de redirection | Définir les URLs de redirection pour les différentes actions d'authentification |
| Exiger des variables d'environnement non essentielles | Rendre optionnelles les variables non critiques | Utiliser un paramètre `required` pour les variables d'environnement |
| Utiliser des groupes de routes avec parenthèses | Utiliser des dossiers normaux pour les routes | Les groupes de routes peuvent causer des problèmes avec la navigation |
| Utiliser une fonction personnalisée pour accéder aux variables d'environnement | Accéder directement à `process.env` | Les fonctions personnalisées peuvent causer des problèmes avec Next.js |
| Oublier de définir les variables d'environnement dans `next.config.js` | Définir les variables d'environnement dans `next.config.js` | Assure que les variables sont disponibles pendant le build et le runtime |
| Ne pas gérer la persistance de session | Utiliser `supabase.auth.getSession()` | Vérifier la session au chargement de l'application |
| Oublier de configurer les politiques RLS | Configurer les politiques RLS | Protéger les données avec Row Level Security |
| Configurer des politiques RLS circulaires | Éviter les dépendances circulaires dans les politiques RLS | Les politiques qui dépendent mutuellement l'une de l'autre peuvent empêcher l'insertion de données |
| Ne pas gérer les tokens expirés | Implémenter un rafraîchissement automatique | Utiliser les fonctionnalités de rafraîchissement de token de Supabase |
| Configurer des politiques RLS trop permissives | Limiter l'accès aux données en fonction du rôle | Par exemple, seuls les administrateurs devraient pouvoir voir tous les profils |
| Ne pas tester les politiques RLS | Créer des scripts de test pour vérifier les politiques RLS | Vérifier que chaque rôle a accès uniquement aux données auxquelles il est autorisé |
| Oublier de créer des pages pour toutes les fonctionnalités d'authentification | Créer des pages pour chaque fonctionnalité | Implémenter des pages pour la connexion, l'inscription, la déconnexion et la réinitialisation de mot de passe |
| Ne pas tester le système d'authentification | Créer des tests unitaires | Tester les fonctions d'authentification, le middleware et les pages d'authentification |
| Tester uniquement le "happy path" | Tester également les cas d'erreur | S'assurer que les erreurs sont correctement gérées et affichées |
| Tester directement les hooks React | Tester les fonctions sous-jacentes | Les hooks React ne peuvent être appelés que dans des composants React |
| Utiliser des tests trop complexes | Simplifier les tests | Des tests simples sont plus faciles à maintenir et à déboguer |
| Utiliser session?.user?.name directement | Utiliser user?.email | Supabase Auth ne fournit pas directement le nom de l'utilisateur |
| Utiliser signOut avec callbackUrl | Gérer la redirection manuellement | Supabase Auth ne prend pas en charge callbackUrl pour signOut |
| Laisser des références à NextAuth.js après la migration | Supprimer toutes les références | Vérifier tous les fichiers pour s'assurer qu'il n'y a plus de références à NextAuth.js |
| Oublier de supprimer les fichiers de configuration NextAuth.js | Supprimer les fichiers inutiles | Supprimer les fichiers auth-options.ts et autres fichiers spécifiques à NextAuth.js |
| Utiliser pathname.startsWith() pour vérifier les routes | Utiliser pathname === route || pathname.startsWith(`${route}/`) | Vérifier exactement la route ou si elle commence par la route suivie d'un slash |
| Ne pas configurer correctement le matcher du middleware | Ajouter des routes spécifiques au matcher | S'assurer que le matcher capture toutes les routes protégées |
| Ne pas gérer les erreurs de récupération de profil | Ajouter une gestion d'erreur complète | Vérifier le code d'erreur et créer un profil par défaut si nécessaire |
| Utiliser console.error sans détails | Inclure l'erreur complète dans les logs | Facilite le débogage en fournissant plus d'informations sur l'erreur |
| Oublier de gérer les exceptions lors de la création de profil | Utiliser try/catch | Permet de capturer les erreurs inattendues lors de la création de profil |
| Ne pas vérifier si la session est mise à jour après la connexion | Vérifier explicitement la session | S'assurer que la session est correctement mise à jour après la connexion |
| Afficher des messages d'erreur génériques | Afficher des messages d'erreur spécifiques | Permet à l'utilisateur de comprendre ce qui s'est passé et comment résoudre le problème |
| Créer des politiques RLS récursives | Éviter les références circulaires dans les politiques | Les politiques récursives peuvent causer des erreurs 'infinite recursion' |
| Ne pas gérer les erreurs de récursion infinie | Ajouter une gestion spécifique pour ces erreurs | Permet d'éviter de bloquer l'application en cas d'erreur de récursion infinie |
| Ne pas mettre en place de mécanisme de secours | Prévoir un comportement par défaut en cas d'erreur | Permet à l'application de continuer à fonctionner même en cas d'erreur |
| Utiliser router.push immédiatement après la connexion | Ajouter un délai et utiliser window.location.href | Permet de s'assurer que la session est correctement établie avant la redirection |
| Ne pas configurer correctement le client Supabase | Configurer explicitement les options d'authentification | S'assurer que les sessions sont correctement persistées |
| Ne pas vérifier les cookies de session | Ajouter des logs pour vérifier les cookies | Permet de comprendre si les cookies de session sont correctement définis |
| Ne pas gérer les erreurs d'hydratation React | Utiliser useEffect et useState pour éviter les problèmes d'hydratation | Évite les erreurs d'hydratation qui peuvent bloquer le rendu de l'application |
| Utiliser des composants qui dépendent de window/document directement | Utiliser useEffect pour s'assurer que le code s'exécute uniquement côté client | Évite les erreurs d'hydratation liées à l'accès à window/document |
| Ne pas ajouter d'en-têtes Cache-Control dans les réponses | Ajouter des en-têtes Cache-Control pour éviter les problèmes de mise en cache | Évite les problèmes d'hydratation liés à la mise en cache |
| Ne pas utiliser le localStorage pour stocker la session | Utiliser le localStorage pour stocker la session en plus des cookies | Permet de s'assurer que la session est correctement persistée |
| Ne pas configurer le stockage personnalisé pour Supabase | Configurer un stockage personnalisé pour Supabase | Permet de contrôler précisément comment les sessions sont stockées |
| Ne pas ajouter d'en-têtes CORS | Ajouter des en-têtes CORS pour éviter les problèmes de cookies | Permet aux cookies d'être correctement définis et lus |
| Utiliser un système d'authentification trop complexe | Simplifier l'authentification en utilisant directement le localStorage | Évite les problèmes de persistance de session et de redirection |
| Dépendre uniquement des cookies pour l'authentification | Utiliser une combinaison de cookies et localStorage | Offre une solution de secours en cas de problème avec les cookies |
| Utiliser un contexte React pour l'authentification | Utiliser des fonctions d'authentification simples et directes | Évite les problèmes de synchronisation entre le contexte et l'état réel |
| Ne pas tester l'authentification avec différents rôles | Créer des scripts de test pour chaque rôle | Permet de s'assurer que le contrôle d'accès basé sur les rôles fonctionne correctement |
| Ne pas vérifier les informations utilisateur après la connexion | Vérifier explicitement les informations utilisateur dans le localStorage | Permet de s'assurer que les informations utilisateur sont correctement stockées |
| Ne pas tester l'accès aux pages protégées | Tester l'accès aux pages protégées pour chaque rôle | Permet de s'assurer que le contrôle d'accès fonctionne correctement |
| Avoir plusieurs systèmes d'authentification | Unifier le système d'authentification | Évite les conflits et les incohérences entre différents systèmes d'authentification |
| Ne pas nettoyer les cookies et le localStorage avant la connexion | Nettoyer les cookies et le localStorage avant la connexion | Évite les conflits entre différentes sessions |
| Ne pas centraliser le traitement des sessions | Créer une fonction dédiée pour traiter les sessions | Facilite la maintenance et la cohérence du code |
| Utiliser window.location.href pour les redirections | Utiliser le router Next.js pour les redirections normales, mais window.location.href pour les redirections après connexion | Le router Next.js est plus fluide, mais window.location.href est plus fiable pour les redirections après connexion |
| Générer des IDs aléatoires pour les champs de formulaire | Utiliser des IDs stables basés sur le nom ou le label du champ | Évite les erreurs d'hydratation dues à des IDs différents entre le serveur et le client |
| Ne pas ajouter de délai avant la redirection après connexion | Ajouter un délai avec setTimeout avant la redirection | Permet de s'assurer que la session est bien établie avant la redirection |
| Ne pas vérifier les pages publiques dans le middleware | Vérifier si l'utilisateur est déjà sur une page publique avant de rediriger | Évite les boucles infinies de redirection |
| Utiliser uniquement la clé par défaut pour stocker la session | Stocker la session avec plusieurs clés dans le localStorage | Certaines versions de Supabase utilisent des clés différentes pour stocker la session |
| Ne pas stocker l'URL de redirection dans le localStorage | Stocker l'URL de redirection dans le localStorage | Permet de conserver l'URL de redirection même après un rechargement de page |
| Ne pas mettre à jour directement l'état de session après la connexion | Mettre à jour directement l'état de session après la connexion | Évite les problèmes de synchronisation entre le localStorage et l'état de l'application |
| Essayer d'insérer des données dans une table avec des politiques RLS restrictives | Créer des objets en mémoire si l'insertion échoue à cause des politiques RLS | Permet à l'application de continuer à fonctionner même si les politiques RLS sont mal configurées |
| Ne pas gérer les erreurs de politique RLS | Intercepter et gérer les erreurs de politique RLS | Évite les blocages de l'application en cas d'erreur de politique RLS |
| Ne pas déterminer automatiquement le rôle de l'utilisateur | Déterminer le rôle en fonction de l'email ou d'autres attributs | Assure la cohérence des rôles même si le profil n'existe pas dans la base de données |
| Utiliser single() pour récupérer un enregistrement qui pourrait ne pas exister | Utiliser maybeSingle() pour éviter les erreurs si aucun résultat n'est trouvé | Évite les erreurs de type "multiple (or no) rows returned" |
| Ne pas vérifier la validité des paramètres avant d'exécuter une fonction | Vérifier la validité des paramètres au début de la fonction | Évite les erreurs dues à des paramètres invalides ou manquants |
| Créer un profil par défaut uniquement dans la fonction getProfile | Créer un profil par défaut à plusieurs endroits stratégiques | Assure qu'un profil par défaut est toujours disponible même en cas d'erreur |
| Utiliser le même nom pour un paramètre et une variable locale | Utiliser des noms différents pour les paramètres et les variables locales | Évite les erreurs de référence comme "Cannot access variable before initialization" |
| Ne pas vérifier les conflits de noms de variables | Utiliser des noms descriptifs et uniques pour chaque variable | Améliore la lisibilité du code et évite les erreurs de référence |
| Utiliser router.push() pour les redirections après authentification | Utiliser window.location.replace() pour les redirections après authentification | Force un rechargement complet de la page et assure une redirection plus fiable |
| Ne pas ajouter de délai avant la redirection | Ajouter un délai suffisant (1000ms) avec setTimeout avant la redirection | Permet de s'assurer que la session est bien établie avant la redirection |
| Ne pas stocker l'URL de redirection dans le localStorage | Stocker l'URL de redirection dans le localStorage | Permet de récupérer l'URL de redirection même après un rechargement de page |
| Ne pas stocker le rôle de l'utilisateur dans le localStorage | Stocker le rôle de l'utilisateur dans le localStorage | Permet d'accéder au rôle même si la session Supabase n'est pas complètement chargée |
| Faire une requête à la base de données pour déterminer le rôle dans le middleware | Déterminer le rôle en fonction de l'email dans le middleware | Plus rapide et plus fiable, surtout en cas de problèmes avec les politiques RLS |
| Utiliser des mécanismes de redirection complexes | Utiliser une approche directe avec redirection immédiate vers la page cible | Évite les problèmes de synchronisation entre l'authentification et la redirection |
| Compter uniquement sur le contexte d'authentification pour le rôle | Stocker le rôle dans le localStorage avant même la connexion | Permet d'accéder au rôle même si le contexte d'authentification n'est pas encore chargé |
| Utiliser des middleware trop restrictifs pendant le développement | Désactiver temporairement certaines protections pour déboguer | Permet d'identifier plus facilement les problèmes de redirection et d'authentification |
| Importer des modules qui n'existent pas | Vérifier l'existence des modules avant de les importer ou les créer si nécessaire | Évite les erreurs de build du type "Module not found" |
| Utiliser uniquement des hooks d'authentification complexes | Créer des modules d'authentification simplifiés pour les composants qui n'ont pas besoin de toutes les fonctionnalités | Améliore la performance et simplifie le code des composants |
| Compter uniquement sur le système d'authentification de Supabase | Utiliser des mécanismes d'authentification alternatifs comme les cookies | Permet de contourner les problèmes de session Supabase |
| Stocker les informations d'authentification uniquement dans le localStorage | Stocker les informations d'authentification à la fois dans le localStorage et les cookies | Permet au middleware d'accéder aux informations d'authentification |
| Vérifier l'authentification uniquement avec Supabase dans le middleware | Accepter plusieurs méthodes d'authentification dans le middleware | Offre plus de flexibilité et de robustesse en cas de problèmes avec une méthode |
| Utiliser le même système d'authentification dans tous les composants | Créer un module d'authentification simplifiée et l'utiliser de manière cohérente dans tous les composants | Évite les incohérences et les problèmes de synchronisation |
| Ne pas vérifier tous les composants qui utilisent l'authentification | Vérifier tous les composants qui utilisent l'authentification lors du débogage | Permet d'identifier les problèmes d'authentification dans tous les composants |
| Se concentrer uniquement sur le middleware pour résoudre les problèmes d'authentification | Vérifier tous les points de contrôle d'authentification (middleware, layout, composants) | Permet d'identifier tous les points de blocage dans le flux d'authentification |
| Ignorer les logs du serveur et du client lors du débogage | Analyser attentivement les logs du serveur et du client pour identifier les problèmes | Fournit des informations précieuses sur le flux d'exécution et les erreurs |
| Supposer que les modifications du middleware s'appliquent immédiatement | Redémarrer l'application après avoir modifié le middleware | Le middleware est chargé au démarrage de l'application et nécessite un redémarrage pour appliquer les modifications |
| Utiliser un système d'authentification complexe pour le développement | Créer un système d'authentification ultra-simplifié pour le développement | Permet de se concentrer sur le développement des fonctionnalités sans être bloqué par des problèmes d'authentification |
| Dépendre de Supabase pour l'authentification pendant le développement | Utiliser le localStorage pour stocker les informations d'authentification pendant le développement | Simplifie le processus d'authentification et évite les problèmes de session |

### Tests

| ❌ Erreur | ✅ Correction | 📝 Explication |
|------------|--------------|---------------|
| Ne pas tester l'authentification | Créer des scripts de test pour l'authentification | Permet de s'assurer que l'authentification fonctionne correctement |
| Ne pas tester avec différents rôles | Créer des utilisateurs de test avec différents rôles | Permet de s'assurer que le contrôle d'accès basé sur les rôles fonctionne correctement |
| Ne pas tester la création de profil | Vérifier que le profil est correctement créé lors de l'inscription | Permet de s'assurer que les profils sont correctement créés |
| Ne pas tester la persistance de la session | Vérifier que la session est correctement persistée après la connexion | Permet de s'assurer que l'utilisateur reste connecté |

### Formulaires et validation

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Validation uniquement côté client | Valider également côté serveur | La validation côté client peut être contourée, toujours valider côté serveur |
| Messages d'erreur génériques | Messages d'erreur spécifiques | Les messages d'erreur doivent être clairs et indiquer précisément le problème |
| Afficher des informations sensibles dans les erreurs | Messages d'erreur génériques pour les erreurs sensibles | Ne pas révéler d'informations sensibles dans les messages d'erreur |
| Ne pas désactiver les boutons pendant le chargement | Ajouter un état de chargement | Prévenir les soumissions multiples en désactivant les boutons pendant le chargement |

## Erreurs d'architecture et de conception

### Structure du projet

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Tout dans un seul dossier | Structure modulaire | Organiser le code selon les modules fonctionnels |
| Composants trop grands | Décomposer en sous-composants | Suivre le principe de responsabilité unique |
| Duplication de code | DRY (Don't Repeat Yourself) | Extraire le code commun dans des fonctions utilitaires |
| Ignorer les tests | TDD ou tests après développement | Écrire des tests pour garantir la qualité du code |
| Mélanger la logique métier et UI | Séparation des préoccupations | Séparer la logique métier de l'interface utilisateur |
| Créer tous les dossiers en une seule commande | Créer les dossiers par groupes logiques | Facilite le débogage et la vérification de la structure |
| Ignorer les caractères spéciaux dans les noms de dossiers | Mettre les noms de dossiers avec caractères spéciaux entre guillemets | Les parenthèses et autres caractères spéciaux peuvent causer des problèmes |
| Ne pas vérifier la création des dossiers | Vérifier après chaque étape importante | S'assurer que la structure est correctement mise en place |

### Erreurs spécifiques à Next.js 13+

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Ignorer les conventions de nommage des dossiers spéciaux | Utiliser correctement les parenthèses pour les groupes de routes | Les dossiers comme `(auth)` et `(dashboard)` sont des groupes de routes dans Next.js |
| Placer les composants au mauvais niveau | Suivre la structure recommandée | Les composants réutilisables doivent être dans `/components`, pas dans les dossiers de routes |
| Mélanger les fichiers de page et les composants | Séparer clairement les pages des composants | Les fichiers `page.tsx` sont spéciaux dans Next.js App Router |

### Base de données

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Requêtes SQL brutes sans paramètres | Utiliser les fonctions paramétrées de Supabase | Éviter les injections SQL et faciliter la maintenance |
| Schémas de base de données non normalisés | Normaliser les données | Éviter la redondance et les incohérences |
| Ignorer les politiques de sécurité RLS | Configurer Row Level Security | Contrôler l'accès aux données au niveau des lignes |
| Configurer des politiques RLS trop restrictives | Permettre aux utilisateurs d'insérer leur propre profil | Éviter le problème où un utilisateur ne peut pas créer son profil car il n'a pas encore de profil |
| Ne pas tester les politiques RLS | Tester les politiques RLS avec différents rôles | S'assurer que les politiques fonctionnent correctement pour tous les cas d'utilisation |
| Exposer les clés Supabase | Utiliser uniquement la clé publique côté client | Ne jamais exposer la clé de service (service_role) côté client |
| Oublier les index | Créer des index pour les colonnes fréquemment utilisées | Améliorer les performances des requêtes |
| Ne pas utiliser les fonctionnalités temps réel | Configurer les canaux de réaltime | Profiter des fonctionnalités de synchronisation en temps réel |
| Transactions manquantes | Utiliser des transactions | Assurer l'intégrité des données pour les opérations complexes |

### API et Backend

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Endpoints non RESTful | Suivre les principes REST | Utiliser les méthodes HTTP appropriées (GET, POST, PUT, DELETE) |
| Validation côté client uniquement | Valider côté serveur | Toujours valider les données côté serveur |
| Ignorer la gestion des erreurs | Gérer toutes les erreurs | Retourner des codes d'erreur HTTP appropriés |
| Exposer des informations sensibles | Filtrer les données sensibles | Ne jamais exposer de mots de passe, tokens, etc. |
| Ignorer la pagination | Implémenter la pagination | Limiter la taille des réponses pour les grandes collections |

## Erreurs de sécurité

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Stockage de secrets en clair | Utiliser des variables d'environnement | Ne jamais committer de secrets dans le code source |
| Committer des fichiers .env | Utiliser .gitignore et .env.example | Exclure les fichiers .env* et inclure uniquement .env.example |
| Accéder directement à process.env | Utiliser un module de configuration | Centraliser l'accès aux variables d'environnement pour faciliter la maintenance |
| Ne pas valider les variables d'environnement | Vérifier la présence des variables requises | Lancer une erreur explicite si une variable requise est manquante |
| Ne pas documenter les variables d'environnement | Créer un README pour la configuration | Expliquer l'utilisation et le format de chaque variable |
| Ignorer HTTPS | Forcer HTTPS | Toujours utiliser HTTPS en production |
| Ignorer les injections XSS | Échapper les données utilisateur | Utiliser des bibliothèques comme DOMPurify |
| Ignorer CSRF | Utiliser des tokens CSRF | Protéger contre les attaques CSRF |
| Ignorer les en-têtes de sécurité | Configurer les en-têtes | Utiliser Helmet.js ou équivalent |
| Permissions trop larges | Principe du moindre privilège | Limiter les permissions au strict nécessaire |

## Erreurs de performance

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Images non optimisées | Utiliser next/image | Optimiser automatiquement les images |
| Bundle JS trop grand | Code splitting | Diviser le code en chunks plus petits |
| Rendu côté client excessif | SSR/SSG quand possible | Utiliser le rendu côté serveur quand approprié |
| Ignorer le caching | Implémenter le caching | Mettre en cache les données statiques ou qui changent peu |
| Re-renders inutiles | Utiliser memo, useMemo, useCallback | Optimiser les rendus avec la mémorisation |
| Chargement synchrone | Chargement asynchrone | Utiliser le lazy loading pour les composants lourds |

## Erreurs de gestion de dépendances

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Trop de dépendances | Évaluer la nécessité | N'ajouter que les dépendances vraiment nécessaires |
| Versions obsolètes | Mettre à jour régulièrement | Maintenir les dépendances à jour pour la sécurité |
| Ignorer les vulnérabilités | Auditer régulièrement | Exécuter `npm audit` et corriger les problèmes |
| Dépendances de développement en production | Séparer dev et prod | Utiliser correctement devDependencies et dependencies |
| Ignorer le verrouillage des versions | Utiliser package-lock.json | S'assurer que les versions sont cohérentes |

## Erreurs de déploiement

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Déployer sans tests | CI/CD avec tests | Automatiser les tests avant le déploiement |
| Ignorer les variables d'environnement | Configurer correctement | S'assurer que toutes les variables d'environnement sont définies |
| Déployer directement en production | Utiliser des environnements de staging | Tester d'abord dans un environnement similaire à la production |
| Ignorer le monitoring | Mettre en place des outils de monitoring | Surveiller les performances et les erreurs |
| Ignorer les sauvegardes | Sauvegarder régulièrement | Mettre en place une stratégie de sauvegarde |

## Bonnes pratiques à adopter

### Développement général

1. **Toujours consulter la documentation** avant d'utiliser une nouvelle bibliothèque ou API
2. **Écrire des tests** pour les fonctionnalités critiques
3. **Utiliser un linter et un formateur de code** pour maintenir la cohérence
4. **Faire des commits fréquents** avec des messages descriptifs
5. **Revoir le code** avant de le soumettre

### Next.js spécifique

1. **Comprendre les différents modes de rendu** (SSR, SSG, ISR, CSR)
2. **Utiliser les composants optimisés** (Image, Link, etc.)
3. **Structurer les routes** selon la documentation officielle
4. **Optimiser pour le SEO** quand nécessaire
5. **Utiliser les API routes** pour les fonctionnalités backend

### React spécifique

1. **Penser en composants** et favoriser la réutilisation
2. **Utiliser les hooks correctement** et comprendre leur cycle de vie
3. **Éviter les effets de bord** dans les composants
4. **Gérer l'état global** avec des outils appropriés (Context, Redux, Zustand, etc.)
5. **Optimiser les rendus** pour éviter les performances médiocres

## Procédure avant de coder

1. **Consulter le plan.md** pour comprendre le contexte
2. **Lire les instructions.md** pour connaître l'architecture
3. **Vérifier ce document** pour éviter les erreurs connues
4. **Planifier l'approche** avant de commencer à coder
5. **Préparer les tests** si possible avant l'implémentation

## Erreurs liées à Supabase

### Création et gestion des tables

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Créer des tables sans vérifier les tables existantes | Lister les tables existantes avant d'en créer de nouvelles | Éviter les conflits et les doublons |
| Oublier d'activer Row Level Security (RLS) | Activer RLS sur toutes les tables | Assurer la sécurité des données |
| Créer des contraintes sans vérifier leur validité | Tester les contraintes avant de les appliquer | Éviter les erreurs lors de l'insertion de données |
| Ignorer les types de données | Définir précisément les types de données | Assurer l'intégrité des données |
| Oublier les valeurs par défaut | Définir des valeurs par défaut appropriées | Faciliter l'insertion de données |

### Migrations et modifications de schéma

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Modifier directement les tables en production | Utiliser des migrations | Garder une trace des modifications et pouvoir les annuler |
| Créer des migrations sans les tester | Tester les migrations sur un environnement de développement | Éviter les erreurs en production |
| Ignorer les dépendances entre tables | Respecter l'ordre des migrations | Éviter les erreurs de contraintes de clé étrangère |
| Oublier de vérifier les colonnes existantes | Vérifier la structure des tables avant de les modifier | Éviter les erreurs lors des modifications |
| Ignorer les erreurs de migration | Gérer les erreurs et les corriger | Éviter les états inconsistants |

### Insertion de données

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Insérer des données sans vérifier les contraintes | Vérifier les contraintes avant l'insertion | Éviter les erreurs d'insertion |
| Ignorer les clés étrangères | S'assurer que les données référencées existent | Maintenir l'intégrité référentielle |
| Insérer des données en masse sans transaction | Utiliser des transactions pour les insertions en masse | Assurer l'atomicité des opérations |
| Ignorer les erreurs d'insertion | Gérer les erreurs et les corriger | Éviter les états inconsistants |
| Insérer des données sans vérifier leur validité | Valider les données avant l'insertion | Assurer la qualité des données |

### Client Supabase

| ❌ Erreur | ✅ Correction | 📝 Explication |
|----------|--------------|---------------|
| Exposer la clé secrète dans le code client | Utiliser uniquement la clé anonyme côté client | Protéger les informations sensibles |
| Ignorer la gestion des erreurs | Gérer les erreurs de manière appropriée | Améliorer l'expérience utilisateur |
| Répéter les mêmes requêtes | Utiliser la mise en cache et SWR | Optimiser les performances |
| Ignorer les types TypeScript | Définir des types précis pour les tables | Éviter les erreurs à l'exécution |
| Créer plusieurs instances du client | Réutiliser la même instance | Éviter les fuites de mémoire |

Ce document est évolutif et sera mis à jour au fur et à mesure que de nouvelles erreurs sont identifiées ou que de nouvelles bonnes pratiques émergent.
