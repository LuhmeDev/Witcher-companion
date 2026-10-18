/**
 * Répertoire des artisans (forgerons et armuriers) du jeu de base et des extensions.
 * Niveaux d'après le wiki communautaire Fextralife ; la plupart des artisans n'ont pas de nom.
 */

export const REGIONS = [
  { id: 'blanc-verger', label: 'Blanc Verger' },
  { id: 'velen', label: 'Velen' },
  { id: 'novigrad', label: 'Novigrad & Oxenfurt' },
  { id: 'skellige', label: 'Skellige' },
  { id: 'kaer-morhen', label: 'Kaer Morhen' },
  { id: 'toussaint', label: 'Toussaint' },
];

export const TRADES = [
  { id: 'forgeron', label: 'Forgeron', icon: 'sword', hint: 'Armes' },
  { id: 'armurier', label: 'Armurier', icon: 'armor', hint: 'Armures' },
];

const c = (name, trade, region, place, level, extra = {}) => ({ name, trade, region, place, level, ...extra });

export const CRAFTERS = [
  // Blanc Verger
  c('Forgeron de la garnison', 'forgeron', 'blanc-verger', 'Garnison nilfgaardienne', 'amateur'),
  c('Willis', 'armurier', 'blanc-verger', 'Village de Blanc Verger', 'amateur', { quest: 'Twisted Firestarter (prologue) : sa forge doit être sauvée' }),

  // Velen
  c('Forgeron de Blackbough', 'forgeron', 'velen', 'Blackbough', 'amateur'),
  c('Forgeron de Lindenvale', 'forgeron', 'velen', 'Lindenvale', 'amateur'),
  c('Forgeron d\'Oreton', 'forgeron', 'velen', 'Oreton', 'amateur'),
  c('Forgeron du Mont Chauve', 'forgeron', 'velen', 'Mont Chauve (Bald Mountain)', 'amateur'),
  c('Armurier de Midcopse', 'armurier', 'velen', 'Midcopse', 'amateur'),
  c('Armurier de Mulbrydale', 'armurier', 'velen', 'Mulbrydale', 'amateur'),
  c('Fergus Graem', 'armurier', 'velen', 'Nid de Corbeaux (Crow\'s Perch)', 'compagnon'),
  c('Yoana', 'armurier', 'velen', 'Nid de Corbeaux (Crow\'s Perch)', 'maitre', {
    quest: 'Maîtres armuriers (Master Armorers), niv. 24 : récupérer ses outils à Skellige',
    note: 'Amateur tant que la quête n\'est pas terminée.',
    star: true,
  }),

  // Novigrad & Oxenfurt
  c('Hattori', 'forgeron', 'novigrad', 'Glory Lane, Novigrad', 'maitre', {
    quest: 'Des épées et des boulettes (Of Swords and Dumplings), niv. 24',
    star: true,
  }),
  c('Forgeron du marché aux poissons', 'forgeron', 'novigrad', 'Marché aux poissons, Novigrad', 'compagnon'),
  c('Armurier de la place du Hiérarque', 'armurier', 'novigrad', 'Place du Hiérarque, Novigrad', 'compagnon', {
    note: 'Depuis le patch 4.01, vend deux épées (acier et argent) qui suivent ton niveau.',
  }),
  c('Forgeron d\'Upper Mill', 'forgeron', 'novigrad', 'Upper Mill', 'maitre'),
  c('Armurier d\'Upper Mill', 'armurier', 'novigrad', 'Upper Mill', 'maitre'),
  c('Forgeron d\'Oxenfurt', 'forgeron', 'novigrad', 'Oxenfurt', 'compagnon'),
  c('Armurier d\'Oxenfurt', 'armurier', 'novigrad', 'Oxenfurt', 'compagnon'),
  c('Forgeron de Silverton', 'forgeron', 'novigrad', 'Silverton', 'amateur'),

  // Skellige
  c('Forgeron de la citadelle', 'forgeron', 'skellige', 'Citadelle de Kaer Trolde', 'compagnon'),
  c('Armurier de la citadelle', 'armurier', 'skellige', 'Citadelle de Kaer Trolde', 'compagnon'),
  c('Forgeron de Kaer Muire', 'forgeron', 'skellige', 'Kaer Muire', 'compagnon'),
  c('Armurier de Kaer Muire', 'armurier', 'skellige', 'Kaer Muire', 'compagnon'),
  c('Forgeron d\'Arinbjorn', 'forgeron', 'skellige', 'Arinbjorn', 'amateur'),
  c('Forgeron de Fayrlund', 'forgeron', 'skellige', 'Fayrlund', 'amateur'),
  c('Forgeron d\'Harviken', 'forgeron', 'skellige', 'Harviken', 'amateur'),
  c('Forgeron de Larvik', 'forgeron', 'skellige', 'Larvik', 'amateur'),
  c('Armurier de Larvik', 'armurier', 'skellige', 'Larvik', 'amateur'),
  c('Forgeron de Svorlag', 'forgeron', 'skellige', 'Svorlag', 'amateur'),
  c('Forgeron du port d\'Urialla', 'forgeron', 'skellige', 'Port d\'Urialla', 'amateur'),
  c('Armurier du port d\'Urialla', 'armurier', 'skellige', 'Port d\'Urialla', 'amateur'),
  c('Forgeron de Fyresdal', 'forgeron', 'skellige', 'Fyresdal', 'amateur'),

  // Kaer Morhen
  c('Zoltan Chivay', 'forgeron', 'kaer-morhen', 'Kaer Morhen', 'amateur', { note: 'Seulement pendant les quêtes de la défense de Kaer Morhen.' }),

  // Toussaint
  c('Lazare Lafargue', 'forgeron', 'toussaint', 'Hauteville, Beauclair', 'grand-maitre', {
    quest: 'Master Master Master Master! : compléter une chasse au trésor de grand maître',
    note: 'Forgeron et armurier : le seul artisan grand maître du jeu.',
    star: true,
    dlc: 'baw',
  }),
  c('Lazare Lafargue', 'armurier', 'toussaint', 'Hauteville, Beauclair', 'grand-maitre', {
    quest: 'Master Master Master Master! : compléter une chasse au trésor de grand maître',
    note: 'Forgeron et armurier : le seul artisan grand maître du jeu.',
    star: true,
    dlc: 'baw',
  }),
  c('Trentin', 'forgeron', 'toussaint', 'Hauteville, Beauclair', 'maitre', { dlc: 'baw' }),
  c('Trentin', 'armurier', 'toussaint', 'Hauteville, Beauclair', 'maitre', { dlc: 'baw' }),
  c('Forgeron du domaine de Belgaard', 'forgeron', 'toussaint', 'Domaine viticole de Belgaard', 'maitre', { dlc: 'baw' }),
  c('Forgeron du terrain de tournoi', 'forgeron', 'toussaint', 'Terrain de tournoi', 'compagnon', { dlc: 'baw' }),
  c('Armurier du terrain de tournoi', 'armurier', 'toussaint', 'Terrain de tournoi', 'compagnon', { dlc: 'baw' }),
  c('Forgeron de la carrière d\'Ardaiso', 'forgeron', 'toussaint', 'Carrière d\'Ardaiso', 'compagnon', { dlc: 'baw' }),
  c('Armurier de Vermentino', 'armurier', 'toussaint', 'Vermentino', 'compagnon', { dlc: 'baw' }),
  c('Armurier des docks de Freinte', 'armurier', 'toussaint', 'Docks de Freinte', 'compagnon', { dlc: 'baw' }),
  c('Armurier du château de Mont Crane', 'armurier', 'toussaint', 'Château de Mont Crane', 'compagnon', { dlc: 'baw' }),
  c('Armurier des grottes de Tulasens', 'armurier', 'toussaint', 'Grottes de Tulasens', 'compagnon', { dlc: 'baw' }),
].map((x, i) => ({ id: i, dlc: 'base', ...x }));
