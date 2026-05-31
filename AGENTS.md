# AGENTS.md — Recettes

## État du projet

Stade de spécification. Aucun code généré, aucun commit dans le dépôt git.
Dépôt initialisé (git vide, branche `master` sans commit).

## Sources du projet

| Fichier | Rôle |
|---|---|
| `cahier_des_charges_application_recettes_ia.md` | Spécification unique faisant autorité (589 lignes) |
| `design/artisan-culinary-platform.md` | Prototype HTML/Tailwind/Alpine.js du design (non Next.js) |
| `RECETTES et transferts à partir Des recettes de cedric.doc` | Contenu source des recettes (format Word) |
| `app/` | Répertoire cible pour la génération Next.js (vide) |

## Stack spécifiée (cahier des charges)

Next.js, React, Tailwind CSS, PWA (next-pwa), Tauri, JSON (local), Fuse.js, Gemini API + Vision, Web Speech API, Zustand, Framer Motion, Zod, Vercel.

## Architecture clé

- Architecture documentaire, côté client — pas de backend, pas de base SQL
- Recettes : fichiers JSON sous `/data/recipes/`
- Triplet de cibles : web (Vercel) + desktop (Tauri .exe/.AppImage/.dmg) + mobile (PWA)
- Fonctionnement partiellement hors ligne via service workers

## Design existant

- Le prototype dans `design/` utilise Tailwind CDN + Alpine.js (pas React/Next.js)
- Palette : tons chauds (oklch), typographie Playfair Display + Inter
- Layout bento, mode production, calcul de proportions

## Conventions (cahier des charges)

- Langue du projet : français (interface, documentation, messages de commit)
- Langue du code : anglais (variables, fonctions, composants)
- Pas de données sensibles — pas de gestion d'utilisateurs au stade MVP

## Commandes (à confirmer lors de la génération)

Aucun `package.json` ou outil de build n'existe encore. Les commandes (`npm run dev`, `npm run build`, `npm run tauri build`) seront à vérifier après l'initialisation du projet Next.js.

## Références

- Avant toute implémentation, consulter `cahier_des_charges_application_recettes_ia.md` pour la stack, la structure JSON et les fonctionnalités prévues.
- Avant de coder l'UI, consulter `design/artisan-culinary-platform.md` pour les choix visuels.
