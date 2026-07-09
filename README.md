# AVIZONE — Application web éleveur (MVP fonctionnel)

Application web réelle (et non une simple maquette) construite avec **Vue 3**, **Vue Router**, **Pinia** et **Tailwind CSS**, pensée exclusivement pour le profil Petit Éleveur d'AVIZONE.

## Ce que contient le projet

```
avizone-app/
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── src/
    ├── main.js                 → point d'entrée (Vue + Pinia + Router)
    ├── App.vue                 → cadre général, navigation basse, tunnel de commande
    ├── assets/main.css         → Tailwind + styles d'animation signature
    ├── router/index.js         → 5 routes (Accueil, Marché, Commandes, Rentabilité, Compte)
    ├── stores/avizone.js       → état central Pinia (utilisateur, commandes, catalogue)
    ├── constants/icons.js      → jeu d'icônes SVG maison (aucun émoji, aucune dépendance)
    ├── components/             → AppHeader, BottomNav, ProductCard, OrderCard, GrowthRing, OrderFlowModal, IconSvg
    └── views/                  → DashboardView, MarketView, OrdersView, ProfitabilityView, AccountView
```

## Environnement à installer sur votre PC (une seule fois)

1. **Node.js** version 20 ou plus récente (inclut npm) : téléchargez l'installeur officiel sur
   https://nodejs.org/fr (choisissez la version "LTS"). Vérifiez ensuite dans un terminal :
   ```
   node -v
   npm -v
   ```
2. Un éditeur de code, par exemple **Visual Studio Code** (gratuit) : https://code.visualstudio.com
3. Aucun autre logiciel n'est nécessaire : Vite, Vue, Tailwind et Pinia sont tous installés
   automatiquement par npm à l'étape suivante, et tout tourne en local sans compte ni licence.

## Lancer l'application en local

Ouvrez un terminal dans le dossier `avizone-app`, puis :

```bash
# 1. Installer les dépendances (à faire une seule fois, ou après chaque modif de package.json)
npm install

# 2. Démarrer le serveur de développement (rechargement à chaud)
npm run dev
```

Le terminal affiche une adresse du type `http://localhost:5173/` — ouvrez-la dans votre navigateur.
Toute modification d'un fichier `.vue` se répercute instantanément dans le navigateur.

## Générer la version de production

```bash
npm run build      # crée le dossier dist/ optimisé (HTML/CSS/JS minifiés)
npm run preview    # sert le dossier dist/ pour vérifier le rendu final avant mise en ligne
```

Le contenu de `dist/` est ensuite déposable tel quel sur n'importe quel hébergement statique
gratuit (InfinityFree, GitHub Pages, Netlify, Vercel...), cohérent avec votre contrainte de
budget zéro.

## Ce qui est déjà fonctionnel dans ce MVP

- **Tableau de bord** : cheptel actif, trésorerie estimée, commandes en cours avec barre de
  progression animée par étape.
- **Marché ouvert** : catalogue filtrable par zone (Calavi / Cotonou) et catégorie, badge
  "Fournisseur Vérifié", note, dégradation propre si une image distante ne charge pas.
- **Tunnel de commande animé** : sélection → livraison (calcul de frais en direct) → paiement
  → confirmation, avec transitions et checkmark tracé à la validation.
- **Historique des commandes** : filtre Toutes / En cours / Terminées.
- **Simulateur de rentabilité** : curseurs réactifs, marge recalculée en direct via des
  propriétés `computed`, jauge "anneau de croissance" animée.
- **Compte éleveur** : profil, menu d'actions (à brancher sur de vrais écrans ultérieurement).

## Prochaine étape naturelle

Remplacer les données simulées de `src/stores/avizone.js` par de vrais appels à l'API AVIZONE
(PHP/Python, cf. le document de modélisation) : la structure du store (state / getters /
actions) est déjà conçue pour que chaque action ressemble à ce qu'elle deviendra une fois
branchée sur le réseau (ex. `creerCommande` → futur `POST /api/v1/commandes`).
