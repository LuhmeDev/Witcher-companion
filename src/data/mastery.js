/**
 * Contenu du tutoriel « Niveaux de maîtrise ». Chaque chapitre est une étape
 * du parcours ; la progression est sauvegardée dans le LocalStorage.
 */

export const LEVELS = [
  { id: 'amateur', label: 'Amateur', short: 'I', color: 'text-rarity-common', ring: 'border-rarity-common' },
  { id: 'compagnon', label: 'Compagnon', short: 'II', color: 'text-rarity-master', ring: 'border-rarity-master' },
  { id: 'maitre', label: 'Maître', short: 'III', color: 'text-rarity-magic', ring: 'border-rarity-magic' },
  { id: 'grand-maitre', label: 'Grand Maître', short: 'IV', color: 'text-rarity-relic', ring: 'border-rarity-relic' },
];

/** Paliers des équipements de sorceleur et artisan minimum requis. */
export const GEAR_TIERS = [
  { tier: 'Base', level: 'amateur', example: 'Épée en acier de l\'école du Chat', note: 'Schéma de départ trouvé dans la chasse au trésor de l\'école.' },
  { tier: 'Améliorée', level: 'compagnon', example: 'Armure améliorée de l\'école du Griffon', note: 'Exige la pièce de base dans l\'inventaire.' },
  { tier: 'Supérieure', level: 'compagnon', example: 'Épée en argent supérieure de l\'école du Loup', note: 'Premiers besoins en diméritium.' },
  { tier: 'De maître', level: 'maitre', example: 'Épée en argent de maître de l\'école du Chat', note: 'Hattori (armes) ou Yoana (armures).' },
  { tier: 'De grand maître', level: 'grand-maitre', example: 'Armure de grand maître de l\'école de l\'Ours', note: 'Blood and Wine uniquement, artisan de Toussaint.' },
];

export const CHAPTERS = [
  {
    id: 'bases',
    title: 'Armurier ou forgeron ?',
    kicker: 'Chapitre I · Les bases',
    intro:
      'Deux métiers, deux établis. Avant de chercher un maître, il faut savoir à qui confier quel schéma.',
    columns: [
      {
        title: 'Le forgeron',
        en: 'Blacksmith / Weaponsmith',
        icon: 'sword',
        points: [
          'Fabrique les épées en acier et en argent.',
          'Fabrique aussi les arbalètes et les carreaux.',
          'Répare les armes et ajoute des emplacements (fentes) pour les runes.',
          'Démonte les armes et le bric-à-brac métallique.',
        ],
      },
      {
        title: 'L\'armurier',
        en: 'Armorer',
        icon: 'armor',
        points: [
          'Fabrique les armures de torse, gants, pantalons et bottes.',
          'Répare les armures et ajoute des emplacements pour les glyphes.',
          'Démonte armures, cuirs et tissus.',
          'Vend souvent cuirs, tissus et plaques.',
        ],
      },
    ],
    tips: [
      'Un artisan ne peut fabriquer qu\'un schéma de son niveau ou inférieur : un forgeron amateur refusera un schéma de maître.',
      'Le schéma reste dans ton inventaire après fabrication : tu peux refaire l\'objet chez n\'importe quel artisan compatible.',
      'Le coût affiché chez l\'artisan s\'ajoute aux composants : prévois toujours quelques centaines de couronnes.',
    ],
  },
  {
    id: 'amateur',
    level: 'amateur',
    title: 'Amateur',
    kicker: 'Chapitre II · Niveau I',
    intro:
      'Le premier artisan que tu croiseras, dès Blanc Verger. Suffisant pour les objets courants et les schémas de sorceleur de base.',
    points: [
      'Présent dans la plupart des villages (Blanc Verger, hameaux de Velen).',
      'Fabrique les équipements de base et les schémas de sorceleur de premier palier.',
      'Démonte tout objet courant ; les tarifs de démontage sont plus élevés que ceux des grands artisans.',
    ],
    where: [{ name: 'Willis', role: 'Armurier', place: 'Blanc Verger', quest: 'Twisted Firestarter (prologue)' }],
    tips: ['Pendant le prologue, démonte peu : les composants communs s\'achètent pour quelques couronnes.'],
  },
  {
    id: 'compagnon',
    level: 'compagnon',
    title: 'Compagnon',
    kicker: 'Chapitre III · Niveau II',
    intro:
      'Le gros des artisans des grandes villes. Ils prennent en charge les équipements de sorceleur améliorés.',
    points: [
      'Présents à Novigrad (marché aux poissons, place du Hiérarque), Oxenfurt, au Nid de Corbeaux, à Kaer Trolde et Kaer Muire.',
      'Débloquent les paliers « amélioré » et « supérieur » des équipements de sorceleur.',
      'Vendent des lingots d\'acier noir, du cuir durci et du lin en quantité.',
    ],
    where: [{ name: 'Fergus Graem', role: 'Armurier', place: 'Nid de Corbeaux, Velen', quest: 'Aucune' }],
    tips: [
      'Compare les étals : chaque marchand a son propre stock et son taux de rachat.',
      'Les objets « améliorés » exigent la version de base dans ton inventaire : ne la vends pas !',
    ],
  },
  {
    id: 'maitre',
    level: 'maitre',
    title: 'Maître',
    kicker: 'Chapitre IV · Niveau III',
    intro:
      'Deux artisans seulement atteignent ce rang dans le jeu de base. Chacun se débloque par une quête secondaire vers le niveau 24.',
    points: [
      'Débloquent le palier « de maître » des écoles de sorceleur.',
      'Indispensables pour forger avec du diméritium et du cuir de draconide.',
      'Hattori ne fait que les armes, Yoana que les armures. Un forgeron et un armurier maîtres tiennent aussi boutique à Upper Mill (Novigrad).',
    ],
    where: [
      {
        name: 'Hattori',
        role: 'Maître forgeron',
        place: 'Novigrad',
        quest: 'Des épées et des boulettes (Of Swords and Dumplings), niv. 24',
      },
      {
        name: 'Yoana',
        role: 'Maîtresse armurière',
        place: 'Nid de Corbeaux, Velen',
        quest: 'Maîtres armuriers (Master Armorers), niv. 24 : récupérer ses outils à Skellige. Avant cela, elle n\'est qu\'amateur.',
      },
    ],
    tips: [
      'Lance ces deux quêtes dès que possible : sans elles, les schémas de maître restent inutilisables.',
      'Un maître accepte aussi tous les schémas de rang inférieur : plus besoin de courir entre les artisans.',
    ],
  },
  {
    id: 'grand-maitre',
    level: 'grand-maitre',
    title: 'Grand Maître',
    kicker: 'Chapitre V · Niveau IV',
    intro:
      'Réservé à l\'extension Blood and Wine. Le seul artisan capable de travailler les schémas de grand maître et l\'école de la Manticore.',
    points: [
      'Débloque le palier « de grand maître » des six écoles (Loup, Chat, Ours, Griffon, Vipère, Manticore).',
      'Ces schémas exigent or vert, orichalque, diméritium enrichi et peau de slyzard infusée.',
      'Les bonus de set à 6 pièces ne s\'activent qu\'avec des pièces de grand maître.',
    ],
    where: [
      {
        name: 'Lazare Lafargue',
        role: 'Grand maître armurier et forgeron',
        place: 'Hauteville, Beauclair (Toussaint)',
        quest: 'Master Master Master Master! : compléter une chasse au trésor de grand maître',
      },
      { name: 'Trentin', role: 'Maître forgeron', place: 'Hauteville, Beauclair', quest: 'Aucune' },
    ],
    tips: [
      'Garde tes pièces « de maître » : chaque pièce de grand maître se forge à partir de la précédente.',
      'Lafargue peut t\'envoyer sur la piste de chaque set : une chasse au trésor par école.',
    ],
  },
];

export const QUIZ = [
  {
    q: 'Tu veux forger une épée en argent de maître de l\'école du Chat. Qui vas-tu voir ?',
    options: ['Yoana', 'Hattori', 'Willis'],
    answer: 1,
    why: 'Hattori est le maître forgeron du jeu de base : il fabrique les armes. Yoana fabrique les armures.',
  },
  {
    q: 'Quel artisan peut fabriquer un schéma de grand maître ?',
    options: ['N\'importe quel maître', 'Le grand maître de Toussaint', 'Tout armurier compagnon'],
    answer: 1,
    why: 'Seul un artisan de niveau grand maître (Blood and Wine) peut travailler ces schémas.',
  },
  {
    q: 'Que se passe-t-il si tu vends la version de base d\'une armure de sorceleur ?',
    options: ['Rien, le schéma suffit', 'Tu ne peux plus fabriquer la version améliorée sans la refaire', 'Le schéma disparaît'],
    answer: 1,
    why: 'Chaque palier consomme la pièce du palier précédent. Le schéma, lui, reste dans ton inventaire.',
  },
];
