/**
 * Banque de composants d'artisanat de The Witcher 3.
 *
 * - price : valeur de base en couronnes (le prix réel varie selon le marchand,
 *   sa région et la difficulté ; à la revente on en touche une fraction).
 * - recipes : une ou plusieurs recettes alternatives [{ id, qty }].
 * - dismantle : ce que l'objet rend au démontage chez un artisan.
 * - sources : marchands, butin de monstres, lieux, objets « bric-à-brac »
 *   dont le démontage donne ce composant.
 * Les relations inverses (« obtenu en démontant », « utilisé pour ») sont
 * calculées automatiquement plus bas.
 */

export const CATEGORIES = [
  { id: 'minerai', label: 'Minerais & métaux bruts', icon: 'ore' },
  { id: 'lingot', label: 'Lingots & plaques', icon: 'ingot' },
  { id: 'cuir', label: 'Cuirs & peaux', icon: 'leather' },
  { id: 'tissu', label: 'Tissus & fibres', icon: 'cloth' },
  { id: 'base', label: 'Bois, résines & consommables', icon: 'wood' },
  { id: 'gemme', label: 'Gemmes & poussières', icon: 'gem' },
  { id: 'monstre', label: 'Monstres & alchimie', icon: 'claw' },
  { id: 'infusion', label: 'Infusion & runes', icon: 'rune' },
];

export const RARITIES = [
  { id: 'commun', label: 'Commun', rank: 1, color: 'text-rarity-common', border: 'border-rarity-common/60' },
  { id: 'maitre', label: 'Maître', rank: 2, color: 'text-rarity-master', border: 'border-rarity-master/60' },
  { id: 'magique', label: 'Magique', rank: 3, color: 'text-rarity-magic', border: 'border-rarity-magic/60' },
  { id: 'relique', label: 'Relique', rank: 4, color: 'text-rarity-relic', border: 'border-rarity-relic/60' },
];

export const DLCS = [
  { id: 'base', label: 'Jeu de base' },
  { id: 'baw', label: 'Blood and Wine' },
];

const r = (...pairs) => pairs.map(([id, qty]) => ({ id, qty }));

const SMITHS = 'Forgerons et armuriers de tout le Continent';
const TOUSSAINT = 'Forgerons et marchands de Toussaint (Beauclair)';

const RAW = [
  // ─────────────── Minerais & métaux bruts ───────────────
  {
    id: 'iron-ore', name: 'Minerai de fer', en: 'Iron ore', category: 'minerai', rarity: 'commun', price: 2,
    description: 'Le minerai le plus banal, base de presque toute la métallurgie de l\'acier.',
    sources: {
      merchants: [SMITHS],
      junk: ['Fers à cheval', 'Clous', 'Fil de fer', 'Vieilles lames rouillées'],
      places: ['Coffres de mineurs et de bandits'],
    },
  },
  {
    id: 'coal', name: 'Charbon', en: 'Coal', category: 'minerai', rarity: 'commun', price: 2,
    description: 'Indispensable pour transformer le fer en acier.',
    dismantle: r(['ashes', 1]),
    sources: { merchants: [SMITHS, 'Marchands généraux'], places: ['Forges abandonnées', 'Camps de bandits'] },
  },
  {
    id: 'dark-iron-ore', name: 'Minerai de fer noir', en: 'Dark iron ore', category: 'minerai', rarity: 'maitre', price: 23,
    description: 'Fer à forte teneur magique, base des aciers noirs utilisés pour les équipements de sorceleur de niveau intermédiaire.',
    sources: { merchants: [SMITHS + ' (stock limité)'], places: ['Coffres de bandits', 'Cachettes des chasses au trésor'] },
  },
  {
    id: 'meteorite-ore', name: 'Minerai de météorite', en: 'Meteorite ore', category: 'minerai', rarity: 'maitre', price: 30,
    description: 'Fragment d\'étoile tombée, allié à l\'argent pour forger les meilleures lames anti-monstres.',
    sources: { merchants: ['Forgerons de Novigrad et de Skellige'], places: ['Coffres de valeur', 'Épaves au large de Skellige'] },
  },
  {
    id: 'silver', name: 'Argent', en: 'Silver', category: 'minerai', rarity: 'maitre', price: 5,
    description: 'Argent brut. Dix morceaux suffisent pour couler un lingot.',
    sources: {
      junk: ['Chandeliers en argent', 'Gobelets et couverts en argent', 'Plats d\'argent'],
      merchants: [SMITHS],
      places: ['Maisons de nobles', 'Butin de cultistes'],
    },
  },
  {
    id: 'silver-ore', name: 'Minerai d\'argent', en: 'Silver ore', category: 'minerai', rarity: 'maitre', price: 25,
    recipes: [r(['silver', 5])], dismantle: r(['silver', 1]),
    description: 'Argent concentré, étape intermédiaire vers le lingot.',
    sources: { merchants: [SMITHS], places: ['Coffres de mineurs'] },
  },
  {
    id: 'glowing-ore', name: 'Minerai luminescent', en: 'Glowing ore', category: 'minerai', rarity: 'relique', price: 81,
    description: 'Minerai rare qui brille faiblement dans l\'obscurité. Entre dans le raffinage du diméritium.',
    sources: { places: ['Coffres rares', 'Cachettes des chasses au trésor'], merchants: ['Certains maîtres forgerons'] },
  },
  {
    id: 'dimeritium-ore', name: 'Minerai de diméritium', en: 'Dimeritium ore', category: 'minerai', rarity: 'relique', price: 162,
    recipes: [r(['dark-steel-ingot', 1], ['meteorite-silver-ingot', 1])],
    dismantle: r(['glowing-ore', 1]),
    description: 'Métal qui bloque la magie. Pièce maîtresse des schémas de sorceleur de rang supérieur.',
    sources: { merchants: ['Maîtres forgerons (stock limité)'], places: ['Coffres gardés par des monstres de haut niveau'] },
  },
  {
    id: 'gold-nugget', name: 'Pépite d\'or', en: 'Gold nugget', category: 'minerai', rarity: 'maitre', price: 10, dlc: 'baw',
    description: 'Or brut de Toussaint, utilisé dans l\'alliage d\'or vert.',
    sources: { merchants: [TOUSSAINT], places: ['Lits de rivière et grottes de Toussaint'] },
  },
  {
    id: 'unrefined-copper', name: 'Minerai de cuivre brut', en: 'Unrefined copper ore', category: 'minerai', rarity: 'maitre', price: 3, dlc: 'baw',
    description: 'Cuivre non raffiné, très courant en Toussaint.',
    sources: { merchants: [TOUSSAINT], places: ['Mines et grottes de Toussaint'] },
  },
  {
    id: 'nickel', name: 'Morceau de nickel', en: 'Hunk of nickel', category: 'minerai', rarity: 'maitre', price: 4, dlc: 'baw',
    description: 'Métal utilisé dans les alliages de cupronickel et d\'orichalque.',
    sources: { merchants: [TOUSSAINT], places: ['Grottes de Toussaint'] },
  },
  {
    id: 'green-gold', name: 'Or vert', en: 'Green gold', category: 'minerai', rarity: 'maitre', price: 17, dlc: 'baw',
    description: 'Fragment d\'or verdâtre, base des équipements Grand Maître.',
    sources: { merchants: [TOUSSAINT], places: ['Coffres de Toussaint'] },
  },
  {
    id: 'green-gold-ore', name: 'Minerai d\'or vert', en: 'Green gold ore', category: 'minerai', rarity: 'maitre', price: 68, dlc: 'baw',
    recipes: [r(['gold-nugget', 4], ['silver', 5], ['unrefined-copper', 1]), r(['green-gold', 4])],
    description: 'Alliage précieux de Toussaint.',
    sources: { merchants: [TOUSSAINT] },
  },
  {
    id: 'orichalcum', name: 'Orichalque', en: 'Orichalcum', category: 'minerai', rarity: 'magique', price: 20, dlc: 'baw',
    description: 'Métal légendaire aux reflets cuivrés.',
    sources: { merchants: [TOUSSAINT], places: ['Coffres de Toussaint'] },
  },
  {
    id: 'orichalcum-ore', name: 'Minerai d\'orichalque', en: 'Orichalcum ore', category: 'minerai', rarity: 'magique', price: 80, dlc: 'baw',
    recipes: [r(['green-gold', 4], ['unrefined-copper', 3], ['nickel', 1]), r(['orichalcum', 4])],
    dismantle: r(['orichalcum', 1]),
    description: 'Minerai raffiné d\'orichalque, entre dans le diméritium enrichi.',
    sources: { merchants: [TOUSSAINT] },
  },
  {
    id: 'acid-extract', name: 'Extrait acide', en: 'Acid extract', category: 'minerai', rarity: 'relique', price: 15, dlc: 'baw',
    description: 'Réactif corrosif nécessaire à l\'enrichissement du diméritium.',
    sources: { merchants: ['Herboristes et forgerons de Toussaint'], monsters: ['Archespores'] },
  },
  {
    id: 'enriched-dimeritium-ore', name: 'Minerai de diméritium enrichi', en: 'Enriched dimeritium ore', category: 'minerai', rarity: 'relique', price: 256, dlc: 'baw',
    recipes: [r(['dimeritium-ore', 1], ['orichalcum-ore', 1], ['acid-extract', 1])],
    dismantle: r(['glowing-ore-ingot', 1], ['orichalcum-ore', 1], ['green-gold-ore', 1]),
    description: 'Le métal le plus précieux du jeu, réservé aux schémas Grand Maître.',
    sources: { merchants: [TOUSSAINT + ' (rare)'] },
  },

  // ─────────────── Lingots & plaques ───────────────
  {
    id: 'iron-ingot', name: 'Lingot de fer', en: 'Iron ingot', category: 'lingot', rarity: 'commun', price: 4,
    recipes: [r(['iron-ore', 2])], dismantle: r(['iron-ore', 1]),
    sources: { merchants: [SMITHS] },
  },
  {
    id: 'steel-ingot', name: 'Lingot d\'acier', en: 'Steel ingot', category: 'lingot', rarity: 'maitre', price: 6,
    recipes: [r(['iron-ingot', 1], ['coal', 1]), r(['iron-ore', 2], ['coal', 1])], dismantle: r(['iron-ore', 1]),
    description: 'Le standard des lames d\'acier de début de partie.',
    sources: { merchants: [SMITHS], junk: ['Épées et armures d\'acier de bas niveau'] },
  },
  {
    id: 'steel-plate', name: 'Plaque d\'acier', en: 'Steel plate', category: 'lingot', rarity: 'maitre', price: 12,
    recipes: [r(['steel-ingot', 2])], dismantle: r(['steel-ingot', 1]),
    sources: { merchants: ['Armuriers'] },
  },
  {
    id: 'dark-iron-ingot', name: 'Lingot de fer noir', en: 'Dark iron ingot', category: 'lingot', rarity: 'maitre', price: 46,
    recipes: [r(['dark-iron-ore', 2])], dismantle: r(['dark-iron-ore', 1]),
    sources: { merchants: [SMITHS] },
  },
  {
    id: 'dark-iron-plate', name: 'Plaque de fer noir', en: 'Dark iron plate', category: 'lingot', rarity: 'maitre', price: 92, dlc: 'baw',
    recipes: [r(['dark-iron-ingot', 2])], dismantle: r(['dark-iron-ingot', 1]),
    sources: { merchants: [TOUSSAINT] },
  },
  {
    id: 'dark-steel-ingot', name: 'Lingot d\'acier noir', en: 'Dark steel ingot', category: 'lingot', rarity: 'magique', price: 52,
    recipes: [r(['dark-iron-ingot', 1], ['steel-ingot', 1]), r(['dark-iron-ore', 2], ['steel-ingot', 1])],
    dismantle: r(['dark-iron-ingot', 1], ['steel-ingot', 1]),
    description: 'Composant clé des schémas de sorceleur améliorés et supérieurs.',
    sources: { merchants: ['Forgerons de Novigrad, Oxenfurt et Skellige'] },
  },
  {
    id: 'dark-steel-plate', name: 'Plaque d\'acier noir', en: 'Dark steel plate', category: 'lingot', rarity: 'magique', price: 104,
    recipes: [r(['dark-steel-ingot', 2])], dismantle: r(['dark-steel-ingot', 1]),
    sources: { merchants: ['Armuriers compagnons et maîtres'] },
  },
  {
    id: 'meteorite-ingot', name: 'Lingot de météorite', en: 'Meteorite ingot', category: 'lingot', rarity: 'maitre', price: 60,
    recipes: [r(['meteorite-ore', 2])], dismantle: r(['meteorite-ore', 1]),
    sources: { merchants: [SMITHS] },
  },
  {
    id: 'silver-ingot', name: 'Lingot d\'argent', en: 'Silver ingot', category: 'lingot', rarity: 'maitre', price: 50,
    recipes: [r(['silver', 10]), r(['silver-ore', 2])], dismantle: r(['silver-ore', 1]),
    description: 'Base de toutes les épées en argent.',
    sources: { merchants: [SMITHS], junk: ['Épées en argent de bas niveau'] },
  },
  {
    id: 'silver-plate', name: 'Plaque d\'argent', en: 'Silver plate', category: 'lingot', rarity: 'maitre', price: 100,
    recipes: [r(['silver-ingot', 2])], dismantle: r(['silver-ingot', 1]),
    sources: { merchants: ['Armuriers'] },
  },
  {
    id: 'meteorite-silver-ingot', name: 'Lingot d\'argent météoritique', en: 'Meteorite silver ingot', category: 'lingot', rarity: 'magique', price: 110,
    recipes: [r(['meteorite-ingot', 1], ['silver-ingot', 1])], dismantle: r(['meteorite-ingot', 1], ['silver-ingot', 1]),
    description: 'Alliage de choix pour les épées en argent des écoles de sorceleur.',
    sources: { merchants: ['Maîtres forgerons'] },
  },
  {
    id: 'meteorite-silver-plate', name: 'Plaque d\'argent météoritique', en: 'Meteorite silver plate', category: 'lingot', rarity: 'magique', price: 220,
    recipes: [r(['meteorite-silver-ingot', 2])], dismantle: r(['meteorite-silver-ingot', 1]),
    sources: { merchants: ['Maîtres armuriers'] },
  },
  {
    id: 'glowing-ore-ingot', name: 'Lingot de minerai luminescent', en: 'Glowing ore ingot', category: 'lingot', rarity: 'relique', price: 162,
    recipes: [r(['glowing-ore', 2])], dismantle: r(['glowing-ore', 1]),
    sources: { merchants: ['Maîtres forgerons'] },
  },
  {
    id: 'dimeritium-ingot', name: 'Lingot de diméritium', en: 'Dimeritium ingot', category: 'lingot', rarity: 'relique', price: 324,
    recipes: [r(['dimeritium-ore', 2]), r(['dimeritium-ore', 1], ['glowing-ore-ingot', 1])],
    dismantle: r(['dimeritium-ore', 1]),
    description: 'Exigé par les schémas de maître des écoles du Chat, du Griffon, de l\'Ours et du Loup.',
    sources: { merchants: ['Maîtres forgerons (stock limité)'], junk: ['Équipements de sorceleur supérieurs'] },
  },
  {
    id: 'dimeritium-plate', name: 'Plaque de diméritium', en: 'Dimeritium plate', category: 'lingot', rarity: 'relique', price: 648,
    recipes: [r(['dimeritium-ingot', 2])], dismantle: r(['dimeritium-ingot', 1]),
    description: 'Indispensable aux armures de sorceleur de maître.',
    sources: { merchants: ['Maîtres armuriers'] },
  },
  {
    id: 'green-gold-ingot', name: 'Lingot d\'or vert', en: 'Green gold ingot', category: 'lingot', rarity: 'magique', price: 136, dlc: 'baw',
    recipes: [r(['green-gold-ore', 2])], dismantle: r(['green-gold-ore', 1]),
    sources: { merchants: [TOUSSAINT] },
  },
  {
    id: 'orichalcum-ingot', name: 'Lingot d\'orichalque', en: 'Orichalcum ingot', category: 'lingot', rarity: 'relique', price: 160, dlc: 'baw',
    recipes: [r(['orichalcum-ore', 2])], dismantle: r(['orichalcum-ore', 1]),
    sources: { merchants: [TOUSSAINT] },
  },
  {
    id: 'enriched-dimeritium-ingot', name: 'Lingot de diméritium enrichi', en: 'Enriched dimeritium ingot', category: 'lingot', rarity: 'relique', price: 512, dlc: 'baw',
    recipes: [r(['enriched-dimeritium-ore', 2])], dismantle: r(['enriched-dimeritium-ore', 1]),
    description: 'Exigé par les armes Grand Maître des écoles de sorceleur.',
    sources: { merchants: [TOUSSAINT + ' (rare)'] },
  },
  {
    id: 'enriched-dimeritium-plate', name: 'Plaque de diméritium enrichi', en: 'Enriched dimeritium plate', category: 'lingot', rarity: 'relique', price: 1024, dlc: 'baw',
    recipes: [r(['enriched-dimeritium-ingot', 2])], dismantle: r(['enriched-dimeritium-ingot', 1]),
    description: 'Le composant le plus cher du jeu, pour les armures Grand Maître.',
    sources: { merchants: ['Grand maître armurier (Toussaint)'] },
  },

  // ─────────────── Cuirs & peaux ───────────────
  {
    id: 'leather-straps', name: 'Lanières de cuir', en: 'Leather straps', category: 'cuir', rarity: 'commun', price: 2,
    sources: { merchants: ['Armuriers', 'Marchands généraux'], junk: ['Ceintures', 'Harnais', 'Sacoches usées'] },
  },
  {
    id: 'leather-scraps', name: 'Chutes de cuir', en: 'Leather scraps', category: 'cuir', rarity: 'commun', price: 8,
    recipes: [r(['leather-straps', 4])], dismantle: r(['leather-straps', 1]),
    sources: { monsters: ['Loups', 'Chiens sauvages', 'Cerfs'], merchants: ['Armuriers'] },
  },
  {
    id: 'cured-leather', name: 'Cuir tanné', en: 'Cured leather', category: 'cuir', rarity: 'commun', price: 32,
    recipes: [r(['leather-scraps', 4])], dismantle: r(['leather-scraps', 1]),
    sources: { merchants: ['Armuriers'], junk: ['Armures de cuir légères'] },
  },
  {
    id: 'wax', name: 'Cire', en: 'Wax', category: 'base', rarity: 'commun', price: 2,
    description: 'Sert à durcir le cuir.',
    sources: { merchants: ['Marchands généraux', 'Herboristes'], junk: ['Bougies'] },
  },
  {
    id: 'oil', name: 'Huile', en: 'Oil', category: 'base', rarity: 'commun', price: 2,
    sources: { merchants: ['Marchands généraux'], junk: ['Lampes à huile'] },
  },
  {
    id: 'hardened-leather', name: 'Cuir durci', en: 'Hardened leather', category: 'cuir', rarity: 'magique', price: 66,
    recipes: [r(['cured-leather', 1], ['wax', 4])], dismantle: r(['cured-leather', 1], ['oil', 1]),
    description: 'Cuir traité à la cire, présent dans la quasi-totalité des armures de sorceleur.',
    sources: { merchants: ['Armuriers compagnons et maîtres'] },
  },
  {
    id: 'chitinous-shell', name: 'Carapace chitineuse', en: 'Chitinous shell', category: 'cuir', rarity: 'magique', price: 20,
    sources: { monsters: ['Endriagues', 'Arachas', 'Kikimorrhes'], junk: ['Plaques d\'armure d\'endriague (démontage)'] },
  },
  {
    id: 'cured-draconid-leather', name: 'Cuir de draconide tanné', en: 'Cured draconid leather', category: 'cuir', rarity: 'relique', price: 232,
    recipes: [r(['hardened-leather', 2], ['chitinous-shell', 5])], dismantle: r(['hardened-leather', 1], ['chitinous-shell', 1]),
    description: 'Cuir d\'exception requis par les armures de sorceleur de maître et Grand Maître.',
    sources: { merchants: ['Maîtres armuriers', 'Armuriers de Toussaint'], monsters: ['Wyvernes', 'Fourchues (forktails)'] },
  },
  {
    id: 'monster-hide', name: 'Peau de monstre', en: 'Monster hide', category: 'cuir', rarity: 'relique', price: 147,
    dismantle: r(['hardened-leather', 1], ['monster-blood', 1]),
    sources: { monsters: ['Monstres de grande taille (démons, chorts, trolls)'] },
  },
  {
    id: 'dragon-scales', name: 'Écailles de dragon', en: 'Dragon scales', category: 'cuir', rarity: 'magique', price: 80,
    dismantle: r(['chitinous-shell', 1]),
    sources: { monsters: ['Draconides : wyvernes, fourchues, slyzards'] },
  },

  // ─────────────── Tissus & fibres ───────────────
  {
    id: 'cotton', name: 'Coton', en: 'Cotton', category: 'tissu', rarity: 'commun', price: 2,
    sources: { merchants: ['Tailleurs', 'Marchands généraux'], junk: ['Vêtements usés', 'Chiffons'] },
  },
  {
    id: 'thread', name: 'Fil', en: 'Thread', category: 'tissu', rarity: 'commun', price: 4,
    recipes: [r(['cotton', 2])], dismantle: r(['cotton', 2]),
    sources: { merchants: ['Tailleurs', 'Armuriers'] },
  },
  {
    id: 'linen', name: 'Lin', en: 'Linen', category: 'tissu', rarity: 'commun', price: 16,
    recipes: [r(['thread', 4])], dismantle: r(['thread', 4]),
    sources: { merchants: ['Armuriers', 'Tailleurs'] },
  },
  {
    id: 'silk', name: 'Soie', en: 'Silk', category: 'tissu', rarity: 'commun', price: 32,
    recipes: [r(['linen', 2])], dismantle: r(['linen', 2]),
    description: 'Tissu noble présent dans de nombreuses armures et glyphes.',
    sources: { merchants: ['Marchands de Novigrad', 'Armuriers'], junk: ['Vêtements de noble'] },
  },

  // ─────────────── Bois, résines & consommables ───────────────
  {
    id: 'ashes', name: 'Cendres', en: 'Ashes', category: 'base', rarity: 'commun', price: 1,
    sources: { places: ['Foyers, braseros, ruines incendiées'] },
  },
  {
    id: 'timber', name: 'Bois', en: 'Timber', category: 'base', rarity: 'commun', price: 3,
    dismantle: r(['ashes', 1]),
    sources: { merchants: ['Marchands généraux'], places: ['Scieries', 'Camps de bûcherons'] },
  },
  {
    id: 'sap', name: 'Sève', en: 'Sap', category: 'base', rarity: 'commun', price: 1,
    sources: { places: ['Forêts de Velen et de Skellige'], merchants: ['Herboristes'] },
  },
  {
    id: 'resin', name: 'Résine', en: 'Resin', category: 'base', rarity: 'commun', price: 2,
    recipes: [r(['sap', 2])], dismantle: r(['sap', 1]),
    sources: { merchants: ['Marchands généraux'] },
  },
  {
    id: 'hardened-timber', name: 'Bois durci', en: 'Hardened timber', category: 'base', rarity: 'magique', price: 12,
    recipes: [r(['timber', 2], ['resin', 1])], dismantle: r(['timber', 1], ['resin', 1]),
    description: 'Utilisé pour les arbalètes et les manches d\'armes.',
    sources: { merchants: ['Forgerons'] },
  },

  // ─────────────── Gemmes & poussières ───────────────
  ...[
    ['amber', 'Ambre', 'Amber', 150, 'amber-dust', 'Poussière d\'ambre', 75],
    ['amethyst', 'Améthyste', 'Amethyst', 120, 'amethyst-dust', 'Poussière d\'améthyste', 60],
    ['diamond', 'Diamant', 'Diamond', 300, 'diamond-dust', 'Poussière de diamant', 150],
    ['emerald', 'Émeraude', 'Emerald', 250, 'emerald-dust', 'Poussière d\'émeraude', 125],
    ['ruby', 'Rubis', 'Ruby', 200, 'ruby-dust', 'Poussière de rubis', 100],
    ['sapphire', 'Saphir', 'Sapphire', 220, 'sapphire-dust', 'Poussière de saphir', 110],
    ['black-pearl', 'Perle noire', 'Black pearl', 130, 'black-pearl-dust', 'Poussière de perle noire', 65],
  ].flatMap(([id, name, en, price, dustId, dustName, dustPrice]) => [
    {
      id, name, en, category: 'gemme', rarity: 'magique', price,
      dismantle: r([dustId, 1]),
      description: 'Démonte-la pour obtenir sa poussière, ou revends-la telle quelle : la gemme vaut deux fois sa poussière.',
      sources: {
        places: ['Coffres de bandits', 'Épaves et caisses flottantes (Skellige)', 'Cachettes « ? » du Continent'],
        junk: ['Bagues, colliers et bijoux sertis'],
        merchants: ['Joailliers et marchands'],
      },
    },
    {
      id: dustId, name: dustName, en: `${en} dust`, category: 'gemme', rarity: 'maitre', price: dustPrice,
      description: 'Poussière fine utilisée par les schémas de maître et pour les glyphes/runes.',
      sources: { merchants: ['Rarement en vente : démonter la gemme reste le moyen fiable'] },
    },
  ]),
  {
    id: 'flawless-diamond', name: 'Diamant parfait', en: 'Flawless diamond', category: 'gemme', rarity: 'relique', price: 600,
    dismantle: r(['diamond', 1]),
    description: 'Gemme parfaite : la vendre rapporte bien plus que la démonter.',
    sources: { places: ['Coffres de très haut niveau', 'Butin de quêtes'] },
  },
  {
    id: 'flawless-ruby', name: 'Rubis parfait', en: 'Flawless ruby', category: 'gemme', rarity: 'relique', price: 400,
    dismantle: r(['ruby', 1]),
    description: 'Exigé par les épées de maître de l\'école du Chat. Ne le démonte pas : il vaut deux rubis.',
    sources: { places: ['Coffres de très haut niveau', 'Butin de quêtes'] },
  },
  {
    id: 'pearl', name: 'Perle', en: 'Pearl', category: 'gemme', rarity: 'magique', price: 100,
    dismantle: r(['powdered-pearl', 1]),
    sources: { places: ['Huîtres sous-marines (Skellige, Novigrad)', 'Épaves'] },
  },
  {
    id: 'powdered-pearl', name: 'Perle en poudre', en: 'Powdered pearl', category: 'gemme', rarity: 'maitre', price: 50,
    sources: { merchants: ['Rarement en vente'] },
  },

  // ─────────────── Parties de monstres ───────────────
  {
    id: 'monster-blood', name: 'Sang de monstre', en: 'Monster blood', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Vampires inférieurs (ekimmes, fleders)', 'Loups-garous'] },
  },
  {
    id: 'monster-essence', name: 'Essence de monstre', en: 'Monster essence', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Spectres (dames de midi, spectres de nuit)', 'Apparitions'] },
  },
  {
    id: 'monster-claw', name: 'Griffe de monstre', en: 'Monster claw', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Goules et nécrophages', 'Harpies', 'Griffons'] },
  },
  {
    id: 'monster-eye', name: 'Œil de monstre', en: 'Monster eye', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Cyclopes', 'Démons (fiends)', 'Arachas'] },
  },
  {
    id: 'monster-tooth', name: 'Dent de monstre', en: 'Monster tooth', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Noyeurs', 'Nekkers', 'Loups-garous'] },
  },
  {
    id: 'monster-heart', name: 'Cœur de monstre', en: 'Monster heart', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Trolls', 'Démons (fiends)', 'Loups-garous'] },
  },
  {
    id: 'monster-feather', name: 'Plume de monstre', en: 'Monster feather', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Griffons', 'Harpies', 'Succubes'] },
  },
  {
    id: 'monster-hair', name: 'Poils de monstre', en: 'Monster hair', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Loups-garous', 'Chorts', 'Trolls'] },
  },
  {
    id: 'monster-bone', name: 'Os de monstre', en: 'Monster bone', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Nécrophages', 'Cyclopes', 'Golems'] },
  },
  {
    id: 'monster-egg', name: 'Œuf de monstre', en: 'Monster egg', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Nids d\'endriagues et de harpies', 'Arachas'] },
  },
  {
    id: 'monster-saliva', name: 'Salive de monstre', en: 'Monster saliva', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Noyeurs', 'Nekkers', 'Wyvernes'] },
  },
  {
    id: 'monster-tongue', name: 'Langue de monstre', en: 'Monster tongue', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Grands monstres et contrats'] },
  },
  {
    id: 'monster-brain', name: 'Cervelle de monstre', en: 'Monster brain', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Noyeurs', 'Goules', 'Nekkers'] },
  },
  {
    id: 'albedo', name: 'Albédo', en: 'Albedo', category: 'monstre', rarity: 'maitre', price: 0, priceUnknown: true,
    description: 'Substance alchimique, exigée par l\'épée en argent supérieure de l\'école de l\'Ours.',
    sources: { merchants: ['Herboristes'], places: ['Distillation d\'ingrédients alchimiques'] },
  },
  {
    id: 'rebis', name: 'Rebis', en: 'Rebis', category: 'monstre', rarity: 'maitre', price: 0, priceUnknown: true,
    description: 'Substance alchimique, exigée par l\'épée en argent de maître de l\'école de l\'Ours.',
    sources: { merchants: ['Herboristes'], places: ['Distillation d\'ingrédients alchimiques'] },
  },
  {
    id: 'siren-vocal-cords', name: 'Cordes vocales de sirène', en: 'Siren vocal cords', category: 'monstre', rarity: 'relique', price: 30,
    sources: { monsters: ['Sirènes et lamies (côtes de Skellige)'] },
  },
  {
    id: 'powdered-monster-tissue', name: 'Tissu de monstre en poudre', en: 'Powdered monster tissue', category: 'monstre', rarity: 'relique', price: 15,
    sources: { monsters: ['Monstres de grande taille', 'Butin de contrats de sorceleur'] },
  },

  // ─────────────── Infusion & runes ───────────────
  {
    id: 'infused-dust', name: 'Poussière infusée', en: 'Infused dust', category: 'infusion', rarity: 'magique', price: 30,
    recipes: [r(['powdered-monster-tissue', 1], ['monster-essence', 1])],
    description: 'Poussière chargée de magie : point de départ des runes et des glyphes.',
    sources: { merchants: ['Runeforgerons et enchanteurs'] },
  },
  {
    id: 'infused-shard', name: 'Éclat infusé', en: 'Infused shard', category: 'infusion', rarity: 'magique', price: 60,
    recipes: [r(['infused-dust', 2])], dismantle: r(['infused-dust', 1]),
    sources: { merchants: ['Runeforgerons'] },
  },
  {
    id: 'infused-crystal', name: 'Cristal infusé', en: 'Infused crystal', category: 'infusion', rarity: 'relique', price: 120,
    recipes: [r(['infused-shard', 2])], dismantle: r(['infused-dust', 1]),
    sources: { merchants: ['Runeforgerons', 'Enchanteur de Toussaint'] },
  },
  {
    id: 'infused-slyzard-hide', name: 'Peau de slyzard infusée', en: 'Infused slyzard hide', category: 'infusion', rarity: 'relique', price: 300, dlc: 'baw',
    recipes: [r(['cured-draconid-leather', 1], ['infused-crystal', 1])],
    dismantle: r(['hardened-leather', 1], ['chitinous-shell', 1], ['infused-dust', 1]),
    description: 'Cuir magique des armures Grand Maître.',
    sources: { merchants: [TOUSSAINT], monsters: ['Slyzards'] },
  },
];

/** Index par id, avec valeurs par défaut et relations inverses calculées. */
function build(list) {
  const byId = {};
  for (const c of list) {
    byId[c.id] = {
      dlc: 'base',
      recipes: [],
      dismantle: [],
      description: '',
      ...c,
      sources: { merchants: [], monsters: [], places: [], junk: [], ...c.sources },
      dismantledFrom: [],
      usedIn: [],
    };
  }
  for (const c of Object.values(byId)) {
    for (const { id } of c.dismantle) {
      if (!byId[id]) throw new Error(`Démontage inconnu « ${id} » dans ${c.id}`);
      byId[id].dismantledFrom.push(c.id);
    }
    for (const recipe of c.recipes) {
      for (const { id } of recipe) {
        if (!byId[id]) throw new Error(`Ingrédient inconnu « ${id} » dans ${c.id}`);
        if (!byId[id].usedIn.includes(c.id)) byId[id].usedIn.push(c.id);
      }
    }
  }
  return byId;
}

export const COMPONENTS_BY_ID = build(RAW);
export const COMPONENTS = Object.values(COMPONENTS_BY_ID);

/** Coût en couronnes d'une recette si l'on achète chaque ingrédient au prix de base. */
export function recipeCost(recipe) {
  return recipe.reduce((sum, { id, qty }) => sum + COMPONENTS_BY_ID[id].price * qty, 0);
}
