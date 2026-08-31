# Configuration du Projet Recettes

## Stack Technique
- **Langage** : JavaScript (Node.js)
- **Framework** : Express.js
- **Gestionnaire de paquets** : npm
- **Version Node.js** : Vérifier avec `node --version`

## Conventions de Style
- Indentation : 2 espaces
- Encodage : UTF-8
- Nommage : camelCase pour variables/fonctions, PascalCase pour classes
- Point-virgule obligatoire
- Guillemets simples préférés

## Commandes Utiles

### Installation et démarrage
```bash
# Installer les dépendances
npm install

# Démarrer l'application
npm start

# Mode développement (si configuré)
npm run dev
```

### Tests et qualité
```bash
# Lancer les tests
npm test

# Vérifier la sécurité des dépendances
npm audit

# Corriger les vulnérabilités (si possible)
npm audit fix
```

### Maintenance
```bash
# Mettre à jour les dépendances
npm update

# Voir les dépendances obsolètes
npm outdated
```

## Structure des Fichiers Importants
- `package.json` : Configuration du projet et dépendances
- `package-lock.json` : Verrouillage exact des versions
- `app/` : Code source principal de l'application
- `design/` : Maquettes et ressources de design
- `Les_recettes/` : Données des recettes

## Règles de Développement
1. Toujours exécuter `npm audit` avant un commit important
2. Maintenir les dépendances à jour régulièrement
3. Suivre les conventions de style définies
4. Documenter les nouvelles fonctionnalités

## Notes
- Le fichier `package-lock.json` ne doit pas être modifié manuellement
- Les variables d'environnement doivent être dans un fichier `.env` (non commité)
- Les logs de l'application sont dans le dossier `logs/` (si configuré)