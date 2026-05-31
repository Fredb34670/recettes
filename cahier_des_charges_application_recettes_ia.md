# Cahier des charges — Application pédagogique de recettes métier assistée par IA

## 1. Présentation du projet

### Objectif
Créer une application web moderne permettant de transformer un cahier de recettes métier (actuellement au format Word) en assistant pédagogique interactif destiné à des utilisateurs non professionnels.

L’application devra permettre :

- la consultation des recettes,
- l’apprentissage des techniques,
- l’assistance étape par étape,
- l’aide contextuelle par IA,
- la visualisation vidéo/animation des gestes,
- l’utilisation mobile et tablette,
- l’utilisation desktop multiplateforme,
- le fonctionnement cross-platform,
- l’accès hors ligne partiel.

Le projet doit rester :

- gratuit à développer,
- sans outil no-code,
- sans backend complexe,
- sans base de données externe obligatoire.

---

# 2. Architecture technique retenue

## Stack principale

| Domaine | Technologie |
|---|---|
| Frontend | Next.js |
| UI | React + Tailwind CSS |
| Progressive Web App | next-pwa |
| Desktop multiplateforme | Tauri |
| Données | JSON locaux |
| Recherche | Fuse.js |
| IA conversationnelle | Gemini API |
| Vision IA | Gemini Vision |
| Voix | Web Speech API + Gemini |
| Médias | vidéos locales + animations IA |
| Hébergement | Vercel |

---

# 3. Philosophie technique du projet

Le projet repose sur une architecture documentaire et non transactionnelle.

Les recettes étant majoritairement statiques :

- aucune base SQL n’est nécessaire au démarrage,
- aucun backend métier n’est requis,
- les données sont stockées localement sous forme de fichiers JSON,
- l’application fonctionne principalement côté client.

Cette approche permet :

- simplicité,
- une seule codebase pour toutes les plateformes,
- rapidité,
- gratuité,
- maintenance réduite,
- fonctionnement offline partiel,
- très bonnes performances.

---

# 4. Structure générale du projet

## Arborescence cible

```txt
/app
/components
/data
    /recipes
    /techniques
    /families
/public
    /images
    /videos
    /audio
/styles
/utils
/lib
/src-tauri
/public
    /icons
    /pwa
```

---

# 5. Gestion des données

## Source initiale

Le document Word d’origine sera converti en données structurées JSON.

## Exemple de structure JSON

```json
{
  "id": "ganache-framboise",
  "family": "Ganaches",
  "title": "Ganache framboise",
  "difficulty": "Intermédiaire",
  "ingredients": [
    {
      "name": "Pulpe de framboise",
      "quantity": 250,
      "unit": "g"
    },
    {
      "name": "Chocolat blanc",
      "quantity": 500,
      "unit": "g"
    }
  ],
  "steps": [
    {
      "title": "Faire bouillir",
      "description": "Porter la pulpe à légère ébullition"
    },
    {
      "title": "Verser sur le chocolat",
      "description": "Mélanger délicatement sans incorporer d’air"
    }
  ],
  "tips": [
    "Ne pas fouetter trop rapidement"
  ],
  "videos": [
    "/videos/ganache-framboise-step1.mp4"
  ]
}
```

---

# 6. Fonctionnalités principales

# 6.1 Consultation des recettes

## Fonctionnalités

- affichage des recettes par familles,
- navigation par catégories,
- affichage détaillé,
- mode étape par étape,
- mode production,
- mode débutant,
- mode expert.

## Familles techniques prévues

- Ganaches
- Mousses
- Sauces
- Crèmes
- Appareils
- Pâtes
- Glaces
- Biscuiterie
- Viennoiserie

---

# 6.2 Recherche intelligente

## Technologie

Fuse.js

## Fonctionnalités

- recherche floue,
- correction approximative,
- recherche par ingrédients,
- recherche par techniques,
- recherche par difficulté,
- recherche contextuelle.

## Exemples

```txt
mousse chocolat
```

→ retrouve :

- mousse chocolat noir,
- mousse légère chocolat,
- mousse praliné chocolat.

---

# 6.3 Adaptation automatique des quantités

## Fonctionnalités

- augmentation/réduction des portions,
- recalcul automatique,
- conversion unités,
- gestion des ratios.

## Exemple

```txt
12 portions → 48 portions
```

L’ensemble des ingrédients doit être recalculé automatiquement.

---

# 6.4 Assistant IA

## Technologie

Gemini API

## Fonctionnalités

- réponses contextuelles,
- simplification pédagogique,
- explication des techniques,
- reformulation métier,
- aide aux erreurs fréquentes.

## Exemples de questions

```txt
Pourquoi ma ganache tranche ?
```

```txt
Comment éviter une mousse trop liquide ?
```

```txt
À quoi sert la température dans cette étape ?
```

---

# 6.5 Vision IA

## Technologie

Gemini Vision

## Fonctionnalités

- analyse photo,
- analyse texture,
- reconnaissance d’étape,
- aide corrective.

## Cas d’usage

L’utilisateur photographie :

- une pâte,
- une mousse,
- une cuisson,
- une texture.

L’IA analyse :

- aspect,
- texture,
- homogénéité,
- erreurs probables.

---

# 6.6 Assistant vocal

## Technologies

- Web Speech API
- Gemini API

## Fonctionnalités

- commandes vocales,
- lecture des étapes,
- navigation mains libres,
- réponses vocales.

## Exemples

```txt
Étape suivante
```

```txt
Répète la consigne
```

```txt
Pourquoi cette étape est importante ?
```

---

# 6.7 Médias pédagogiques

## Types de médias

- vidéos locales,
- animations IA,
- illustrations,
- schémas,
- motion design.

## Objectifs

- vulgarisation,
- compréhension visuelle,
- transmission des gestes,
- réduction des erreurs.

---

# 7. Interface utilisateur

## Principes UX

L’interface doit être :

- simple,
- très visuelle,
- utilisable sur tablette,
- utilisable en laboratoire/cuisine,
- lisible rapidement,
- pensée pour les débutants.

---

# 7.1 Layout général

## Structure

- sidebar navigation,
- contenu principal,
- panneau IA,
- panneau média,
- mode plein écran.

---

# 7.2 Mode production

## Fonctionnalités

- navigation étape par étape,
- validation des étapes,
- timers,
- checklist,
- gros boutons,
- écran tactile.

---

# 7.3 Responsive

## Compatibilité

- desktop Windows,
- desktop Linux,
- desktop macOS,
- tablette Android,
- tablette iPadOS,
- smartphone Android,
- smartphone iOS,
- navigateurs modernes.

L’interface devra être entièrement responsive et tactile.

---

# 7.4 Progressive Web App (PWA)

## Technologies

- next-pwa
- Service Workers

## Fonctionnalités

- installation depuis navigateur,
- fonctionnement offline partiel,
- cache intelligent,
- icône application,
- splashscreen,
- comportement proche d’une application native.

## Objectifs

Permettre l’installation de l’application sur :

- Android,
- iPhone,
- iPad,
- desktop.

Sans passage obligatoire par un store applicatif.

---

# 8. Compatibilité multiplateforme

## Desktop

Support prévu via Tauri pour :

- Windows,
- Linux,
- macOS.

## Objectifs desktop

- application installable,
- mode hors ligne avancé,
- accès direct aux fichiers locaux,
- performances natives,
- faible consommation mémoire.

---

## Mobile

## Android

Support complet prévu via :

- navigateur,
- Progressive Web App (PWA).

## iOS

Support via :

- navigateur,
- Progressive Web App (PWA).

---

# 9. Fonctionnement hors ligne

## Objectifs

L’application doit rester partiellement utilisable hors connexion.

## Fonctionnement offline

Disponibles offline :

- recettes,
- données JSON,
- médias locaux,
- interface utilisateur,
- vidéos locales,
- recherche,
- navigation.

Nécessitent internet :

- Gemini API,
- Gemini Vision,
- IA conversationnelle.

---

# 10. Déploiement

## Déploiement web

### Hébergement

Vercel

## Pipeline

```bash
npm install
npm run build
npm run deploy
```

---

## Déploiement desktop

### Technologie

Tauri

### Génération des applications natives

```bash
npm run tauri build
```

## Plateformes générées

- Windows (.exe)
- Linux (.AppImage)
- macOS (.dmg)

---

## Déploiement mobile

### Approche retenue

Progressive Web App (PWA)

### Installation utilisateur

- Android : installation depuis Chrome
- iOS : ajout à l’écran d’accueil depuis Safari

---

# 11. Sécurité

## Contraintes

- aucune donnée sensible,
- pas de gestion utilisateurs au MVP,
- pas de stockage cloud obligatoire.

---

# 12. Évolutions futures possibles

## Phase 2

- comptes utilisateurs,
- favoris,
- historique,
- progression pédagogique,
- certifications,
- analytics.

## Phase 3

- reconnaissance vidéo temps réel,
- assistant IA temps réel,
- génération automatique de tutoriels,
- création automatique de vidéos pédagogiques,
- mode multilingue.

---

# 13. Technologies complémentaires recommandées

| Usage | Outil |
|---|---|
| UI Icons | Lucide React |
| Animations | Framer Motion |
| Validation | Zod |
| Markdown | react-markdown |
| PWA | next-pwa |
| Desktop cross-platform | Tauri |
| Service Worker | Workbox |
| État global | Zustand |
| Lecteur vidéo | react-player |

---

# 14. Objectif produit final

Créer un assistant pédagogique métier intelligent permettant de transformer un corpus professionnel complexe en expérience d’apprentissage interactive, visuelle et accessible aux non-professionnels.

Le produit final devra se situer entre :

- une application de recettes,
- un assistant métier,
- un outil de formation,
- une base de connaissance augmentée par IA.

