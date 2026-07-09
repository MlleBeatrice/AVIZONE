# AVIZONE — Application web (v2 : authentification, marché, gamification)

Application web réelle construite avec **Vue 3 (Composition API)**, **Vue Router**, **Pinia**
et **Tailwind CSS** (installation locale via npm, aucun CDN). Cette version répond point par
point à l'analyse critique de l'existant : authentification complète, marché ouvert, identité
visuelle chaleureuse, animations/feedback partout, navigation à 5 onglets, et une couche de
gamification légère.

## Arborescence

```
avizone-app/
├── package.json / vite.config.js / tailwind.config.js / postcss.config.js
├── index.html
├── netlify.toml, public/_redirects   → déploiement Netlify (SPA + build auto)
└── src/
    ├── main.js / App.vue             → point d'entrée, cadre général
    ├── assets/main.css               → Tailwind + animations signature
    ├── router/index.js               → routes + garde d'authentification
    ├── stores/
    │   ├── auth.js                   → connexion, inscription 3 étapes, comptes démo
    │   └── avizone.js                → catalogue, commandes, panier, gamification, actualités
    ├── constants/icons.js            → jeu d'icônes SVG maison (zéro émoji)
    ├── components/                   → AppHeader, BottomNav, ProductCard, OrderCard,
    │                                    GrowthRing, OrderFlowModal, RoleCard, ToastStack,
    │                                    Mascot, IconSvg
    └── views/
        ├── SplashView.vue            → page de garde (image plein écran + CTA)
        ├── OnboardingView.vue        → inscription en 3 étapes (rôle, identité, SMS+profil)
        ├── DashboardView.vue         → tableau de bord enrichi (conseil, tendances, actions)
        ├── MarketView.vue            → marché ouvert (recherche, filtres, panier)
        ├── CartView.vue              → panier
        ├── OrdersView.vue            → historique des commandes
        ├── ProfitabilityView.vue     → simulateur (bouton Calculer, graphique en barres)
        └── AccountView.vue           → profil (infos / avis / badges / paramètres)
```

## Environnement à installer sur votre PC (une seule fois)

1. **Node.js** version 20 ou plus récente (inclut npm) : https://nodejs.org/fr (version "LTS").
   Vérifiez ensuite : `node -v` et `npm -v` dans un terminal.
2. Un éditeur de code, par exemple **Visual Studio Code** (gratuit) : https://code.visualstudio.com
3. Rien d'autre à installer : Vite, Vue, Tailwind et Pinia s'installent automatiquement via npm.

## Lancer l'application en local

```bash
npm install     # une seule fois (ou après modification de package.json)
npm run dev     # démarre http://localhost:5173/ avec rechargement à chaud
```

## Générer et déployer

```bash
npm run build     # crée dist/ (HTML/CSS/JS optimisés)
npm run preview    # vérifie dist/ localement avant mise en ligne
```

Le fichier `netlify.toml` et `public/_redirects` sont déjà configurés pour un déploiement
Netlify direct (drag-and-drop de `dist/`, ou connexion GitHub avec build automatique).

## Comptes de démonstration (accessibles depuis le bouton "Démo" de la page de garde)

| Nom | Rôle | Ville |
|---|---|---|
| SEGNIAGBETO Adjowa Béatrice | Éleveuse | Calavi |
| SOKINDJI Mawussé Gabin | Fournisseur | Cotonou |
| Djokpoui Odile | Livreuse | Ouidah |

**Limitation assumée** : conformément à la consigne initiale ("interface conçue en priorité
pour le Petit Éleveur"), les trois comptes démo atterrissent tous sur le même tableau de bord
orienté éleveur. Des tableaux de bord dédiés Fournisseur et Livreur sont une itération future
distincte, hors du périmètre actuel.

Le code de vérification SMS est simulé : saisissez **1234** à l'étape 3 de l'inscription.

## Ce qui est fonctionnel dans cette v2

- **Authentification complète** : page de garde, inscription en 3 étapes (rôle → identité +
  téléphone → code SMS simulé + ville/cheptel), garde de navigation (`router.beforeEach`) qui
  bloque l'accès aux écrans internes tant qu'on n'est pas connecté.
- **Marché ouvert enrichi** : barre de recherche, filtres rapides (zone, disponibilité,
  vérifié), catégories, note/avis, panier avec badge de comptage, bouton "Contacter".
- **Tableau de bord enrichi** : conseil du jour, indicateurs avec tendance, 4 actions rapides,
  objectif du mois, fil d'actualités, bouton "Contacter le livreur".
- **Simulateur de rentabilité** : bouton "Calculer" avec chargement simulé, 4 indicateurs,
  graphique de répartition des coûts en CSS pur (aucune librairie externe), historique des
  simulations enregistrées.
- **Profil à onglets** : infos, avis reçus, badges, paramètres (dont déconnexion).
- **Gamification légère** : points et niveaux (Débutant → Expert), mascotte SVG animée qui
  félicite l'utilisateur, badges de profil.
- **Palette et typographie** conformes à la charte (vert profond #1B6B3A, orange #F9A826, jaune
  #FFD54F, fond crème #FDF9F0), police Plus Jakarta Sans, motif discret en filigrane sur la
  page de garde.

## Prochaine étape naturelle

Remplacer les données simulées des stores par de vrais appels à l'API AVIZONE (PHP/Python) :
`stores/auth.js` pour l'authentification réelle (jetons, vrai SMS), `stores/avizone.js` pour
le catalogue et les commandes. La structure (state / getters / actions) est déjà conçue pour
que chaque action ressemble à ce qu'elle deviendra une fois branchée sur le réseau.
