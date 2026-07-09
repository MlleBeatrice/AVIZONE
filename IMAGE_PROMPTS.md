# AVIZONE — Prompts de génération d'images IA

Ce document fournit les prompts détaillés pour générer, via Midjourney ou DALL-E, l'ensemble
des visuels demandés dans le cahier des charges (section 8). Toutes les images doivent partager
un style cohérent : réaliste, tons chauds, lumière naturelle douce, ambiance ouest-africaine
authentique (jamais stéréotypée ou misérabiliste).

**Style commun à ajouter en fin de chaque prompt Midjourney :**
`, warm natural lighting, realistic photography style, shallow depth of field, West African
rural context, dignified and modern tone, no text, no watermark --ar 9:16 --style raw --v 6`

---

## 1. Image de fond de la page de garde (Splash)

**Usage :** plein écran, avec dégradé vert foncé → orange superposé pour la lisibilité du texte.

**Prompt Midjourney :**
```
A smiling Beninese poultry farmer in his early 30s standing in a modern semi-open poultry
house, gently holding a single day-old chick close to his chest, warm afternoon light coming
through wooden slats, stacked feed bags (visibly branded "provende") softly blurred in the
background, a small delivery van with an open side door visible near the entrance, dozens of
healthy chicks on the ground around his feet, authentic West African rural architecture,
warm golden-hour lighting, realistic photography, documentary style, hopeful and dignified
expression, shallow depth of field, no text, no watermark --ar 9:16 --style raw --v 6
```

**Prompt DALL-E (description en langage naturel) :**
« Un éleveur avicole béninois souriant, la trentaine, se tient dans un poulailler moderne
semi-ouvert, tenant délicatement un poussin d'un jour contre lui. La lumière dorée de fin
d'après-midi traverse les lattes de bois. En arrière-plan flou, des sacs de provende empilés et
une camionnette de livraison à la portière ouverte. De nombreux poussins en bonne santé au sol.
Style photographique réaliste, chaleureux, digne, sans texte ni filigrane. »

---

## 2. Illustrations des cartes de choix de rôle (onboarding, étape 1)

Les trois images doivent partager un cadrage identique (portrait en action, buste, fond
légèrement flouté) pour une cohérence visuelle immédiate en grille.

### 2.1. Éleveur
```
Portrait of a confident Beninese poultry farmer, mid-shot, gently cradling a day-old chick in
open palms, soft green blurred poultry-house background, warm natural light, semi-realistic
illustration style with painterly texture, dignified expression, shallow depth of field,
no text, no watermark --ar 3:4 --style raw --v 6
```

### 2.2. Fournisseur
```
Portrait of a Beninese warehouse supplier standing confidently in front of neatly stacked
poultry feed bags, wearing a work apron, warm interior lighting, semi-realistic illustration
style with painterly texture, welcoming expression, shallow depth of field,
no text, no watermark --ar 3:4 --style raw --v 6
```

### 2.3. Livreur
```
Portrait of a Beninese delivery driver standing next to a small cargo motorbike or van adapted
for fragile live cargo (ventilated crates visible), warm outdoor daylight, semi-realistic
illustration style with painterly texture, reliable and friendly expression, shallow depth of
field, no text, no watermark --ar 3:4 --style raw --v 6
```

---

## 3. Photos produits du Marché Ouvert

Toutes les photos produits doivent partager : même rendu lumineux, mêmes proportions carrées
(1:1), fond neutre clair légèrement flouté, éclairage studio doux.

### 3.1. Poussins de chair (Race Cobb 500)
```
Close-up product photo of a group of healthy yellow day-old broiler chicks (Cobb 500 breed) on
clean straw bedding, soft studio lighting, shallow depth of field, warm tones, realistic
commercial photography, neutral blurred background --ar 1:1 --style raw --v 6
```

### 3.2. Poussins de ponte
```
Close-up product photo of a group of day-old layer chicks on clean straw bedding, soft studio
lighting, shallow depth of field, warm tones, realistic commercial photography, neutral
blurred background --ar 1:1 --style raw --v 6
```

### 3.3. Provende (Démarrage / Croissance / Ponte)
```
Product photo of a stack of branded 50kg poultry feed bags in a warm-lit warehouse, one bag
opened showing golden pelleted feed texture, realistic commercial photography, shallow depth
of field, neutral blurred background --ar 1:1 --style raw --v 6
```

### 3.4. Vaccins / compléments vétérinaires
```
Product photo of veterinary vaccine vials and a vitamin supplement bottle for poultry, arranged
on a clean white surface, soft studio lighting, realistic pharmaceutical product photography,
shallow depth of field --ar 1:1 --style raw --v 6
```

### 3.5. Matériel (mangeoires / abreuvoirs)
```
Product photo of a set of plastic poultry feeders and drinkers arranged neatly on a farm floor,
warm natural daylight, realistic commercial photography, shallow depth of field, neutral
blurred background --ar 1:1 --style raw --v 6
```

---

## 4. Utilisation dans le code

Dans l'état actuel du projet, ces visuels ne sont pas encore générés : le code utilise des
photographies réelles (Unsplash) en attendant, avec une dégradation propre (repli vers une
icône si l'image ne charge pas — voir `onerror` dans `ProductCard.vue` et `SplashView.vue`).

Une fois les images générées à partir des prompts ci-dessus, il suffit de :
1. Les déposer dans `public/images/` (ex. `public/images/produits/poussins-chair.jpg`).
2. Remplacer les URL Unsplash dans `src/stores/avizone.js` (champ `img`) et
   `src/views/SplashView.vue` par le chemin local correspondant (ex. `/images/hero.jpg`).

Cela réduit aussi la dépendance réseau externe, un gain pour la contrainte de légèreté sur les
réseaux 3G/4G béninois.
