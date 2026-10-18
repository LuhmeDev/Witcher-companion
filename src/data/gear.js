/**
 * Équipements de sorceleur fabricables : épées en acier et en argent des quatre
 * écoles améliorables, paliers supérieur → de maître → de grand maître.
 * Chaque recette consomme la pièce du palier précédent ; la pièce « améliorée »
 * sert de point de départ (à posséder ou à fabriquer avant).
 */
import { COMPONENTS_BY_ID } from './components.js';

export const SCHOOLS = [
  { id: 'feline', label: 'Chat', of: 'du Chat', weight: 'Légère', style: 'Attaques rapides et coups critiques' },
  { id: 'griffin', label: 'Griffon', of: 'du Griffon', weight: 'Intermédiaire', style: 'Signes, en particulier Yrden' },
  { id: 'ursine', label: 'Ours', of: 'de l\'Ours', weight: 'Lourde', style: 'Vitalité, Quen et Igni' },
  { id: 'wolven', label: 'Loup', of: 'du Loup', weight: 'Intermédiaire', style: 'Polyvalent : huiles, bombes et lames' },
];

export const TIERS = [
  { id: 'enhanced', label: 'Améliorée', level: 'compagnon' },
  { id: 'superior', label: 'Supérieure', level: 'compagnon' },
  { id: 'mastercrafted', label: 'De maître', level: 'maitre' },
  { id: 'grandmaster', label: 'De grand maître', level: 'grand-maitre', dlc: 'baw' },
];

const WEAPONS = { silver: 'Épée en argent', steel: 'Épée en acier' };

function gearName(weapon, tier, school) {
  const w = WEAPONS[weapon];
  const s = `de l'école ${school.of}`;
  if (tier === 'enhanced') return `${w} améliorée ${s}`;
  if (tier === 'superior') return `${w} supérieure ${s}`;
  if (tier === 'mastercrafted') return `${w} de maître ${s}`;
  return `${w} de grand maître ${s}`;
}

// Ingrédients propres à chaque palier, hors pièce du palier précédent.
const RECIPES = {
  feline: {
    silver: {
      superior: [['leather-scraps', 1], ['dimeritium-ingot', 1], ['ruby', 1], ['monster-heart', 1]],
      mastercrafted: [['cured-leather', 2], ['dimeritium-ingot', 2], ['flawless-ruby', 1], ['powdered-monster-tissue', 1]],
      grandmaster: [['leather-scraps', 2], ['enriched-dimeritium-ingot', 2], ['sapphire', 1], ['monster-tooth', 1]],
    },
    steel: {
      superior: [['leather-scraps', 1], ['dark-steel-ingot', 3], ['ruby', 1], ['monster-tooth', 1]],
      mastercrafted: [['leather-scraps', 2], ['dimeritium-ingot', 2], ['flawless-ruby', 1], ['monster-bone', 1]],
      grandmaster: [['leather-scraps', 2], ['enriched-dimeritium-ingot', 2], ['sapphire', 1], ['monster-blood', 1]],
    },
  },
  griffin: {
    silver: {
      superior: [['leather-scraps', 2], ['dimeritium-ingot', 1], ['monster-blood', 1], ['powdered-monster-tissue', 1]],
      mastercrafted: [['leather-scraps', 2], ['dimeritium-ingot', 2], ['monster-feather', 1], ['monster-heart', 1]],
      grandmaster: [['leather-scraps', 2], ['enriched-dimeritium-ingot', 2], ['monster-heart', 1], ['monster-essence', 1]],
    },
    steel: {
      superior: [['leather-scraps', 1], ['dark-steel-ingot', 3], ['monster-blood', 1], ['monster-feather', 1]],
      mastercrafted: [['leather-scraps', 2], ['dimeritium-ingot', 2], ['monster-egg', 1], ['siren-vocal-cords', 1]],
      grandmaster: [['leather-scraps', 2], ['enriched-dimeritium-ingot', 2], ['monster-heart', 1], ['monster-essence', 1]],
    },
  },
  ursine: {
    silver: {
      superior: [['leather-scraps', 2], ['dimeritium-ingot', 1], ['albedo', 1], ['monster-hair', 1]],
      mastercrafted: [['leather-scraps', 2], ['dimeritium-ingot', 2], ['rebis', 1], ['monster-essence', 1]],
      grandmaster: [['leather-scraps', 2], ['enriched-dimeritium-ingot', 2], ['monster-saliva', 1], ['monster-tongue', 1]],
    },
    steel: {
      superior: [['leather-scraps', 1], ['dimeritium-ingot', 1], ['monster-blood', 1], ['monster-claw', 1]],
      mastercrafted: [['leather-scraps', 2], ['dimeritium-ingot', 2], ['monster-saliva', 1], ['monster-tooth', 1]],
      grandmaster: [['leather-scraps', 2], ['enriched-dimeritium-ingot', 2], ['monster-blood', 1], ['monster-brain', 1]],
    },
  },
  wolven: {
    silver: {
      superior: [['leather-scraps', 2], ['dimeritium-ingot', 1], ['monster-blood', 1], ['powdered-monster-tissue', 1]],
      mastercrafted: [['leather-scraps', 2], ['dimeritium-ingot', 2], ['monster-feather', 1], ['monster-heart', 1]],
      grandmaster: [['leather-scraps', 2], ['enriched-dimeritium-ingot', 2], ['ruby', 1], ['powdered-monster-tissue', 1]],
    },
    steel: {
      superior: [['leather-scraps', 1], ['dark-steel-ingot', 3], ['monster-blood', 1], ['monster-feather', 1]],
      mastercrafted: [['leather-scraps', 2], ['dimeritium-ingot', 2], ['monster-egg', 1], ['siren-vocal-cords', 1]],
      grandmaster: [['leather-scraps', 2], ['enriched-dimeritium-ingot', 2], ['ruby', 1], ['monster-essence', 1]],
    },
  },
};

// Emplacements de schémas vérifiés ; sinon renvoi à la chasse au trésor de l'école.
const DIAGRAMS = {
  'feline-steel-mastercrafted': 'Ard Skellig : ruines juste au nord de Kaer Gelen, gardées par des spectres (niv. 29).',
  'feline-silver-mastercrafted': 'Faroe : grotte à l\'est d\'Harviken, derrière un mur fragile à briser avec Aard.',
  'feline-steel-grandmaster': 'Toussaint : sacoche au fond de la grotte au sud des ruines du palais d\'Arthach (deux archespores).',
  'feline-silver-grandmaster': 'Toussaint : sacoche au fond de la grotte au sud des ruines du palais d\'Arthach (deux archespores).',
};

function build() {
  const items = {};
  for (const school of SCHOOLS) {
    for (const weapon of Object.keys(WEAPONS)) {
      TIERS.forEach((tier, i) => {
        const id = `${school.id}-${weapon}-${tier.id}`;
        const prev = i > 0 ? `${school.id}-${weapon}-${TIERS[i - 1].id}` : null;
        const own = tier.id === 'enhanced' ? null : RECIPES[school.id][weapon][tier.id];
        items[id] = {
          id,
          kind: 'gear',
          name: gearName(weapon, tier.id, school),
          school: school.id,
          weapon,
          tier: tier.id,
          level: tier.level,
          dlc: tier.dlc || 'base',
          craftsman: tier.level === 'grand-maitre' ? 'Grand maître forgeron (Lafargue, Toussaint)' : tier.level === 'maitre' ? 'Maître forgeron (Hattori, Novigrad)' : 'Forgeron compagnon ou mieux',
          diagram: DIAGRAMS[id] || `Chasse au trésor : équipement de l'école ${school.of}.`,
          recipes: own ? [[{ id: prev, qty: 1 }, ...own.map(([cid, qty]) => ({ id: cid, qty }))]] : [],
        };
      });
    }
  }
  for (const item of Object.values(items)) {
    for (const { id } of item.recipes.flat()) {
      if (!items[id] && !COMPONENTS_BY_ID[id]) throw new Error(`Ingrédient inconnu « ${id} » dans ${item.id}`);
    }
  }
  return items;
}

export const GEAR_BY_ID = build();
export const GEAR = Object.values(GEAR_BY_ID).filter((g) => g.tier !== 'enhanced');

/** Équipement ou composant, pour le calculateur. */
export const getItem = (id) => GEAR_BY_ID[id] || COMPONENTS_BY_ID[id];
