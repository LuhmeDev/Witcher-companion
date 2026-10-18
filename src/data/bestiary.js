/**
 * Bestiaire des monstres « élite » : les créatures les plus dangereuses des contrats
 * et des quêtes, avec leurs points faibles (huile, Signes, bombes, potions).
 * D'après le bestiaire du jeu, compilé par la communauté.
 */

export const CLASSES = [
  { id: 'hybride', label: 'Hybrides', oil: 'Huile contre les hybrides' },
  { id: 'draconide', label: 'Draconides', oil: 'Huile contre les draconides' },
  { id: 'relicte', label: 'Reliques', oil: 'Huile contre les reliques' },
  { id: 'maudit', label: 'Maudits', oil: 'Huile contre les maudits' },
  { id: 'vampire', label: 'Vampires', oil: 'Huile contre les vampires' },
  { id: 'spectre', label: 'Spectres', oil: 'Huile contre les spectres' },
  { id: 'elementa', label: 'Élémentaires', oil: 'Huile contre les élémentaires' },
  { id: 'ogroide', label: 'Ogroïdes', oil: 'Huile contre les ogroïdes' },
  { id: 'insectoide', label: 'Insectoïdes', oil: 'Huile contre les insectoïdes' },
  { id: 'necrophage', label: 'Nécrophages', oil: 'Huile contre les nécrophages' },
];

// Faiblesses communes à chaque famille ; une fiche peut les compléter.
const BY_CLASS = {
  hybride: { signs: ['Aard'], bombs: ['Mitraille'], potions: ['Loriot (contre le venin)'], tip: 'Fais-le tomber avec Aard, la Mitraille ou un carreau d\'arbalète, puis frappe au sol.' },
  draconide: { signs: ['Aard'], bombs: ['Mitraille'], potions: ['Loriot (contre le venin)'], tip: 'Cloue-le au sol avec Aard, la Mitraille ou l\'arbalète avant d\'engager le combat.' },
  relicte: { signs: [], bombs: [], potions: ['Chouette hulotte', 'Tonnerre'], tip: 'Esquive ses charges sur le côté et punis après chaque assaut.' },
  maudit: { signs: ['Igni'], bombs: ['Poussière de lune'], potions: [], tip: 'La Poussière de lune bloque sa régénération : relance-la dès qu\'elle s\'estompe.' },
  vampire: { signs: ['Yrden'], bombs: ['Poussière de lune'], potions: ['Sang noir'], tip: 'La Poussière de lune le force à rester visible ; Yrden le ralentit.' },
  spectre: { signs: ['Yrden'], bombs: ['Poussière de lune'], potions: ['Chouette hulotte'], tip: 'Dans le cercle d\'Yrden, il redevient matériel : c\'est là qu\'il faut frapper.' },
  elementa: { signs: ['Quen'], bombs: ['Bombe de diméritium'], potions: ['Chouette hulotte'], tip: 'Lent mais très puissant : reste sur ses flancs et garde Quen actif.' },
  ogroide: { signs: ['Quen', 'Aard'], bombs: ['Vent du Nord'], potions: ['Tonnerre'], tip: 'Esquive latéralement ses coups larges et frappe par séries courtes.' },
  insectoide: { signs: ['Aard', 'Yrden'], bombs: ['Vent du Nord'], potions: ['Loriot'], tip: 'Attaque par le côté ou par l\'arrière : son avant est blindé et venimeux.' },
  necrophage: { signs: ['Quen'], bombs: [], potions: ['Sang noir'], tip: 'Garde Quen actif et ne te laisse pas encercler.' },
};

const m = (id, name, en, cls, extra = {}) => {
  const base = BY_CLASS[cls];
  return {
    id,
    name,
    en,
    cls,
    dlc: 'base',
    ...base,
    ...extra,
    signs: extra.signs ?? base.signs,
    bombs: extra.bombs ?? base.bombs,
    potions: extra.potions ?? base.potions,
    tip: extra.tip ?? base.tip,
  };
};

export const MONSTERS = [
  m('griffin', 'Griffon', 'Griffin', 'hybride', { note: 'Premier grand contrat du jeu (La Bête de Blanc Verger).' }),
  m('succubus', 'Succube', 'Succubus', 'hybride', { tip: 'Esquive ses charges et contre-attaque ; Aard l\'interrompt.' }),
  m('royal-wyvern', 'Wyverne royale', 'Royal wyvern', 'draconide'),
  m('forktail', 'Fourchue', 'Forktail', 'draconide'),
  m('slyzard', 'Slyzard', 'Slyzard', 'draconide'),
  m('basilisk', 'Basilic', 'Basilisk', 'draconide'),
  m('cockatrice', 'Cocatrix', 'Cockatrice', 'draconide'),
  m('leshen', 'Sylvain', 'Leshen', 'relicte', { signs: ['Igni'], bombs: ['Bombe de diméritium'], tip: 'Tue d\'abord les corbeaux et les loups qu\'il invoque, et brûle-le avec Igni.' }),
  m('fiend', 'Démon', 'Fiend', 'relicte', { bombs: ['Samum'], tip: 'Le Samum interrompt son hypnose : lance-le quand ses yeux s\'illuminent.' }),
  m('chort', 'Chort', 'Chort', 'relicte'),
  m('werewolf', 'Loup-garou', 'Werewolf', 'maudit'),
  m('archespore', 'Archespore', 'Archespore', 'maudit', { dlc: 'baw', potions: ['Loriot'], tip: 'Ses attaques empoisonnent : Loriot actif, et Igni pour le mettre sous pression.' }),
  m('katakan', 'Katakan', 'Katakan', 'vampire'),
  m('ekimmara', 'Ekimmara', 'Ekimmara', 'vampire'),
  m('bruxa', 'Bruxa', 'Bruxa', 'vampire', { dlc: 'baw' }),
  m('alp', 'Alp', 'Alp', 'vampire'),
  m('garkain', 'Garkain', 'Garkain', 'vampire', { dlc: 'baw', bombs: ['Samum'], tip: 'Le Samum l\'étourdit et coupe son attaque psychique.' }),
  m('noonwraith', 'Dame de midi', 'Noonwraith', 'spectre', { signs: ['Yrden', 'Quen'], tip: 'Elle se dédouble : tue les copies tout de suite et garde Quen contre ses téléportations.' }),
  m('nightwraith', 'Spectre de nuit', 'Nightwraith', 'spectre', { tip: 'Comme la dame de midi : Yrden pour la rendre matérielle, et élimine vite ses copies.' }),
  m('golem', 'Golem', 'Golem', 'elementa'),
  m('earth-elemental', 'Élémentaire de terre', 'Earth elemental', 'elementa'),
  m('ice-elemental', 'Élémentaire de glace', 'Ice elemental', 'elementa'),
  m('gargoyle', 'Gargouille', 'Gargoyle', 'elementa'),
  m('rock-troll', 'Troll des rochers', 'Rock troll', 'ogroide'),
  m('ice-troll', 'Troll des glaces', 'Ice troll', 'ogroide'),
  m('cyclops', 'Cyclope', 'Cyclops', 'ogroide'),
  m('ice-giant', 'Géant des glaces', 'Ice giant', 'ogroide', { tip: 'Apprends ses enchaînements avant d\'attaquer ; privilégie Quen à l\'offensive.' }),
  m('armored-arachas', 'Arachas blindé', 'Armored arachas', 'insectoide'),
  m('kikimore-queen', 'Reine kikimore', 'Kikimore queen', 'insectoide'),
  m('grave-hag', 'Mégère des tombes', 'Grave hag', 'necrophage'),
  m('water-hag', 'Mégère des eaux', 'Water hag', 'necrophage'),
  m('foglet', 'Brumelin', 'Foglet', 'necrophage', { bombs: ['Poussière de lune'], potions: [], tip: 'Il se cache dans le brouillard : la Poussière de lune le fait apparaître.' }),
].map((x) => ({ ...x, oil: CLASSES.find((c) => c.id === x.cls).oil }));
