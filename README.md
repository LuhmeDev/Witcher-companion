# Codex de l'Artisan · The Witcher 3

Guide interactif du système d'artisanat de *The Witcher 3: Wild Hunt* : banque de composants, calculateur d'artisanat, guides et répertoire des artisans.

## Lancer le projet

```bash
npm install
npm run dev          # serveur de développement (http://localhost:5173)
npm run build        # build de production dans dist/
npm run build:demo   # + dist/witcher3-crafting-demo.html : démo autonome en un seul fichier
```

Node 18+ requis.

## Architecture technique

| Couche | Choix | Pourquoi |
|---|---|---|
| Build | **Vite 6** | Démarrage instantané, build statique déployable partout (Netlify, GitHub Pages, Vercel). |
| UI | **React 18** (composants fonctionnels + hooks) | Découpage par fonctionnalité, état local simple, pas de routeur nécessaire pour 4 onglets. |
| Style | **Tailwind CSS 4** (`@tailwindcss/vite`) | Thème centralisé dans `src/index.css` (`@theme`) : cuir, or antique, parchemin, rouge sang, couleurs de rareté. |
| Données | **Modules JS statiques** (`src/data/`) | Aucune API : la base est versionnée avec le code, les relations inverses sont calculées au chargement. |
| Persistance | **LocalStorage** via `useLocalStorage` | Inventaire, favoris, filtres, onglet actif et progression du tutoriel, sur l'appareil du joueur. |
| Mobile | Responsive mobile-first | Barre d'onglets en bas sur mobile, en-tête sur desktop, fiches en « bottom sheet ». |

```
src/
├── main.jsx, App.jsx            # point d'entrée, navigation par onglets
├── index.css                    # thème Tailwind + composants (.panel, .parchment, .chip, .btn…)
├── hooks/useLocalStorage.js     # état persistant, tolérant aux erreurs de stockage
├── lib/text.js                  # recherche sans accents
├── data/
│   ├── components.js            # composants : prix, rareté, recettes, démontage, sources
│   ├── gear.js                  # épées de sorceleur (4 écoles × 3 paliers) et leurs recettes
│   ├── crafters.js              # forgerons et armuriers : région, niveau, quêtes
│   ├── guides.js                # guides Économie et Schémas de sorceleur (tableaux calculés)
│   └── mastery.js               # chapitres du tutoriel, paliers d'équipement, quiz
├── ui/                          # Icon (SVG maison), RarityBadge, Price, SectionTitle
├── components/NavBar.jsx
└── features/
    ├── database/                # A. Banque de composants
    │   ├── ComponentBank.jsx    #    filtres + grille + inventaire/favoris
    │   ├── FilterBar.jsx
    │   ├── ComponentCard.jsx
    │   └── ComponentDetail.jsx  #    fiche : obtention, fabrication, démontage, relations
    ├── calculator/Calculator.jsx   # B. Arbre de fabrication + liste de courses
    ├── tutorials/               # C. Guides
    │   ├── TutorialHub.jsx
    │   ├── MasteryGuide.jsx     #    parcours en 6 chapitres + quiz
    │   └── GuideArticle.jsx     #    Économie, Schémas de sorceleur
    └── crafters/CrafterDirectory.jsx  # D. Répertoire filtrable des artisans
```

### Clés LocalStorage (préfixe `w3craft:`)

`tab`, `db-filters`, `inventory` (`{ idComposant: quantité }`), `favorites` (`[id]`), `calculator` (cible, composants à fabriquer, cases cochées), `crafter-filters`, `open-guide`, `guides-read`, `mastery-progress` (`{ read, step, quiz }`).

### Modèle d'un composant

```js
{
  id: 'dimeritium-ingot', name: 'Lingot de diméritium', en: 'Dimeritium ingot',
  category: 'lingot', rarity: 'relique', price: 324, dlc: 'base',
  recipes: [[{ id: 'dimeritium-ore', qty: 2 }], [...]],   // recettes alternatives
  dismantle: [{ id: 'dimeritium-ore', qty: 1 }],
  sources: { merchants: [], monsters: [], places: [], junk: [] },
  // calculés : dismantledFrom, usedIn
}
```

Le calculateur parcourt `recipes` récursivement : un équipement est toujours développé, un composant seulement si le joueur choisit « Fabriquer » (sinon il l'achète). Les feuilles de l'arbre forment la liste de courses, comparée à `inventory`.

## Pistes d'évolution

1. Ajouter les armures de sorceleur (torse, gants, pantalon, bottes) et les sets Vipère et Manticore au calculateur.
2. PWA (hors ligne) et export/import de l'inventaire.
3. Carte interactive des artisans.

## Données

Prix de base issus des bases de données de la communauté ; recettes et démontages d'après le guide de composants d'eip.gg ; recettes des épées et niveaux des artisans d'après les wikis Fandom et Fextralife. Vérifié contre les patchs 4.0 et 4.01. Les sources de butin (monstres, lieux) sont indicatives. Guide de fan non officiel ; The Witcher® est une marque de CD PROJEKT S.A.
