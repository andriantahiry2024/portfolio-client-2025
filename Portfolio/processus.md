# Processus de développement pour EduConnect

## Avant chaque action

1. **Consulter les documents de référence** :
   - Tu rajoutes dans ta mémoire toutes les informations que tu reçois durant toutes les actions que tu vas mener par rapport au développement de cette application. 

Que ce soit les erreurs, les pages que tu as créées, les fonctionnalités, tout ce que tu as fait. Note bien que tu dois tous les structurer bien distinctement. . 
   - Vérifier le plan.md pour comprendre les besoins
   - Consulter les instructions.md pour suivre les directives d'implémentation
   - Revoir les erreurs-a-eviter.md pour éviter les erreurs connues
   - Pour l'authentification et la gestion de la base de données, consulter le plan-supabase-auth.md

2. **Planifier les modifications** :
   - Établir un plan détaillé des fichiers à créer/modifier
   - Identifier les dépendances et les impacts potentiels
   - Vérifier la cohérence avec l'architecture existante

3. **Utiliser les outils appropriés** :
   - Utiliser Supabase MCP pour interagir avec la base de données
   - Uilise toujours les outils mcp a ta disposition 
   - Utiliser Supabase Auth pour l'authentification
   - Utiliser Next.js et React pour le frontend
   - Utiliser Tailwind CSS pour les styles

## Pendant le développement

1. **Suivre les bonnes pratiques** :
   - Écrire du code propre et bien commenté
   - Respecter les conventions de nommage
   - Utiliser TypeScript pour le typage statique
   - Créer des composants réutilisables
   - Suivre les principes SOLID

2. **Tester régulièrement** :
   - Tester les fonctionnalités au fur et à mesure
   - Utilise Pupeteer pour chaque test,
   - fais des capture avant d'executer des actions pour savoir quel elements cibler, ou pour voir le design si c'est bon ou pas.
   - Vérifier la compatibilité avec différents navigateurs
   - S'assurer que l'interface utilisateur est responsive

3. **Gérer les erreurs** :
   - Uilise le mcp THINKING pour la résolution des problèmes
   - Implémenter une gestion d'erreurs robuste
   - Afficher des messages d'erreur explicites
   - Logger les erreurs pour le débogage

## Après chaque action

1. **Documenter les modifications** :
   - Mettre à jour taches.md pour refléter l'avancement
   - Documenter les erreurs rencontrées dans erreurs-a-eviter.md
   - Mettre à jour les instructions si nécessaire

2. **Vérifier la qualité** :
   - S'assurer que le code est propre et bien formaté
   - Vérifier que les fonctionnalités fonctionnent comme prévu
   - S'assurer que l'interface utilisateur est cohérente

3. **Planifier les prochaines étapes** :
   - Identifier les tâches restantes
   - Prioriser les tâches en fonction des besoins
   - Mettre à jour le plan si nécessaire
