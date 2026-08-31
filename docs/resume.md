# Artisan — Recettes : Résumé rapide

## Stack
- **Next.js 16** (React 19, Tailwind CSS 4, Zustand, Framer Motion)
- **next-pwa** (service worker pour le cache offline)
- **Google Gen AI** (Gemini 2.5 Flash, clé dans `.env.local`)
- **Web Speech API** (assistant vocal, navigateur)

## Commandes utiles
```bash
cd app
npm install          # Installer les dépendances
npm run build --webpack  # Build production (next-pwa nécessite webpack)
npm start            # Lancer le serveur production (PWA active)
npm run dev          # Lancer le serveur dev (PWA désactivée)
```

## Structure des dossiers
```
app/
├── public/
│   ├── images/recipes/    # 53 images générées par IA (800px, ~7MB total)
│   ├── pwa/               # Icônes PWA (192x192, 512x512)
│   └── manifest.json      # Métadonnées PWA
├── src/
│   ├── app/
│   │   ├── api/assistant/    # Route API Gemini
│   │   └── recipes/[id]/      # Détail recette (RecipeDetailClient)
│   ├── components/            # Composants réutilisables
│   │   ├── recipe-card.tsx
│   │   ├── recipe-image.tsx    # next/image optimisé
│   │   ├── production-mode.tsx # Mode production (étapes, timers)
│   │   ├── assistant-chat.tsx # Float IA Gemini
│   │   ├── voice-assistant.tsx# Web Speech API
│   │   ├── step-timer.tsx
│   │   ├── step-view.tsx
│   │   └── production-nav.tsx
│   └── lib/                   # Utilitaires
│       ├── format.ts          # Formatage quantités + conversion kg/L
│       ├── share.ts           # Web Share API + copie presse-papier
│       ├── store.ts           # Zustand (mode, favoris)
│       └── recipes-registry.ts # 53 recettes importées
└── data/recipes/               # Fichiers JSON des recettes
```

## 53 recettes
**Familles :** Crèmes, Sauces, Ganaches, Mousses, Pâtes, Appareils, Biscuiterie, Viennoiserie

**Chaque recette a :**
- `image` : `/images/recipes/{id}.jpg` (générée par IA)
- `technicalSpecs` : 7 recettes avec données physico-chimiques (température, ratio, etc.)
- `steps[].gestureVideo` : 7 recettes avec lien YouTube (placeholders)
- `steps[].tip` : 26 recettes avec astuces

## Configuration requise
- **`app/.env.local`** : `GEMINI_API_KEY=votre_clé` (pour l'assistant IA)
- **Build** : `npm run build --webpack` (next-pwa nécessite webpack, pas Turbopack)
- **PWA** : service worker désactivé en dev (`npm run dev`), activé en prod (`npm start`)

## Vidéos
Les `gestureVideo` sont des **placeholders** (`https://www.youtube.com/watch?v=dQw4w9WgXcQ`) — à remplacer par des liens réels de chaînes françaises (ex: Le Meilleur du Chef).

## Pour régénérer les images IA
1. Lancer ComfyUI :
   ```
   cd F:\AI\StabilityMatrix\Packages\ComfyUI
   venv\Scripts\python.exe main.py --listen 127.0.0.1 --port 8188
   ```
2. Soumettre un workflow via l'API `/prompt` avec le modèle `realisticVisionV60B1_v51HyperVAE.safetensors`
3. Redimensionner avec Pillow (800px max, JPEG quality 85)
4. Copier dans `app/public/images/recipes/`

## Modes
- **Débutant** : vidéos de gestes + astuces (bouton 🎥 visible)
- **Expert** : analyses physico-chimiques + notes techniques (panneau noir visible)

## Features implémentées
- ✅ Images IA (53 recettes)
- ✅ Mode Production (étapes, timers, navigation tactile)
- ✅ PWA + Offline (installable, service worker, cache)
- ✅ Accessibilité (WCAG AA : ARIA, clavier, lecteurs d'écran)
- ✅ Impression / Partage (A4, Web Share API, portions dynamiques)
- ✅ Assistant IA (Gemini 2.5 Flash)
- ✅ Assistant Vocal (Web Speech API)
- ✅ Adaptation quantités (ratio, conversion, boutons rapides ×2/÷2/Reset)