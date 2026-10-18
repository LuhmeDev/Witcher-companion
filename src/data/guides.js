/** Contenu des guides « Optimisation économique » et « Schémas de sorceleur ». */
import { COMPONENTS, recipeCost } from './components.js';

const fmt = (n) => n.toLocaleString('fr-FR');

// Tableaux calculés à partir de la banque de composants, pour rester cohérents avec elle.
const dismantleRows = COMPONENTS.filter((c) => c.dismantle.length && !c.priceUnknown)
  .map((c) => ({ c, value: recipeCost(c.dismantle) }))
  .map((x) => ({ ...x, ratio: x.value / x.c.price }));

const worstDismantles = [...dismantleRows].sort((a, b) => a.ratio - b.ratio).slice(0, 8);

const craftSavings = COMPONENTS.filter((c) => c.recipes.length)
  .map((c) => ({ c, cost: Math.min(...c.recipes.map(recipeCost)) }))
  .filter((x) => x.cost < x.c.price)
  .sort((a, b) => b.c.price - b.cost - (a.c.price - a.cost))
  .slice(0, 8);

export const ECONOMY_GUIDE = {
  id: 'economy',
  kicker: 'Guide · Économie',
  title: 'Optimisation économique',
  intro:
    'Les couronnes filent vite chez les artisans. Voici quand démonter, quand acheter et où écouler ton butin pour garder une bourse pleine.',
  sections: [
    {
      id: 'prix',
      title: 'Comment se forme un prix',
      icon: 'crown',
      bullets: [
        'Chaque objet a une valeur de base (celle affichée dans la banque de composants). Un marchand te le vend plus cher et te le rachète bien moins cher.',
        'Chaque marchand paie mieux sa spécialité : forgerons pour les armes, armuriers pour les armures, herboristes pour les plantes. Vends au bon comptoir.',
        'La bourse d\'un marchand est limitée et se reconstitue avec le temps : répartis tes ventes entre plusieurs comptoirs.',
      ],
    },
    {
      id: 'demonter',
      title: 'Démonter ou vendre ?',
      icon: 'recycle',
      paragraphs: [
        'Le démontage coûte des couronnes chez l\'artisan et rend souvent moins que la valeur de l\'objet. Démonte quand tu as besoin du composant, pas pour t\'enrichir.',
        'Voici les démontages qui détruisent le plus de valeur dans la banque (valeur rendue comparée au prix de base) :',
      ],
      table: {
        head: ['Objet', 'Prix de base', 'Valeur rendue', 'Rendement'],
        numeric: [1, 2, 3],
        rows: worstDismantles.map(({ c, value, ratio }) => [c.name, fmt(c.price), fmt(value), `${Math.round(ratio * 100)} %`]),
      },
      callout: {
        title: 'À retenir',
        items: [
          'Ne démonte jamais une gemme parfaite : vends-la, ou garde-la pour un schéma qui l\'exige (rubis parfait pour les épées de maître du Chat).',
          'Démonte une gemme seulement quand il te manque sa poussière : la poussière vaut moitié moins que la gemme.',
          'Les plaques et lingots démontés ne rendent qu\'une unité du palier inférieur : c\'est une perte nette.',
        ],
      },
    },
    {
      id: 'fabriquer',
      title: 'Acheter ou fabriquer ?',
      icon: 'hammer',
      paragraphs: [
        'Quand les ingrédients coûtent moins que le composant tout fait, fabrique-le toi-même chez l\'artisan (en ajoutant ses frais). Les plus grosses économies de la banque :',
      ],
      table: {
        head: ['Composant', 'Prix tout fait', 'Ingrédients', 'Économie'],
        numeric: [1, 2, 3],
        rows: craftSavings.map(({ c, cost }) => [c.name, fmt(c.price), fmt(cost), fmt(c.price - cost)]),
      },
      bullets: [
        'Le calculateur d\'artisanat fait ce choix pour toi : bascule chaque composant entre « Acheter » et « Fabriquer » pour comparer le total.',
        'La plupart des composants raffinés coûtent exactement la somme de leurs ingrédients : fabriquer ne fait alors gagner que si tu possèdes déjà la matière première.',
      ],
    },
    {
      id: 'bric-a-brac',
      title: 'Le bric-à-brac, mine d\'or méconnue',
      icon: 'bag',
      bullets: [
        'Les chandeliers, gobelets et plats en argent se démontent en argent brut : c\'est la base des épées en argent.',
        'Fers à cheval, clous et fil de fer donnent du minerai de fer pour presque rien.',
        'Les bijoux sertis rendent leurs gemmes : utile pour les schémas qui demandent rubis, saphirs ou poussières.',
        'Le bric-à-brac pèse lourd : démonte-le chez l\'artisan le plus proche au lieu de te traîner en surcharge.',
      ],
    },
    {
      id: 'vendre',
      title: 'Écouler son équipement',
      icon: 'sword',
      bullets: [
        'Vends tes armes aux forgerons et tes armures aux armuriers : ils les rachètent mieux qu\'un marchand général.',
        'Ne vends jamais la pièce de sorceleur du palier précédent avant d\'avoir forgé la suivante : chaque palier la consomme.',
        'Les schémas restent dans ton inventaire une fois appris : ne les revends pas si tu veux reforger une pièce perdue.',
        'Le patch 4.01 ajoute deux épées (acier et argent) chez l\'armurier de la place du Hiérarque à Novigrad. Elles suivent ton niveau, mais restent modestes.',
      ],
    },
  ],
};

export const SCHOOL_TABLE = [
  ['Chat', 'Légère', 'Attaques rapides et coups critiques', 'Base → grand maître', 'Jeu de base · B&W'],
  ['Griffon', 'Intermédiaire', 'Signes, en particulier Yrden', 'Base → grand maître', 'Jeu de base · B&W'],
  ['Ours', 'Lourde', 'Vitalité, Quen et Igni', 'Base → grand maître', 'Jeu de base · B&W'],
  ['Loup', 'Intermédiaire', 'Polyvalent : huiles, bombes et lames', 'Base → grand maître', 'Jeu de base · B&W'],
  ['Vipère', '—', '—', 'Un seul palier (épées venimeuses à part)', 'Jeu de base · Hearts of Stone'],
  ['Manticore', '—', 'Alchimie', 'Un seul palier, de niveau grand maître', 'Blood and Wine'],
];

export const WITCHER_GEAR_GUIDE = {
  id: 'witcher-gear',
  kicker: 'Guide · Équipement',
  title: 'Schémas de sorceleur',
  intro:
    'Les équipements des écoles de sorceleur ne se trouvent pas tout faits : il faut chasser leurs schémas, puis les faire forger palier par palier.',
  sections: [
    {
      id: 'principe',
      title: 'Le principe des chasses au trésor',
      icon: 'map',
      bullets: [
        'Chaque école a sa chasse au trésor (Scavenger Hunt). Elle démarre souvent par une note ou une carte trouvée en explorant.',
        'Chaque palier a ses propres schémas, souvent cachés dans une autre région que le palier précédent.',
        'Une fois le schéma ramassé, il apparaît dans la liste de fabrication de tout artisan de niveau suffisant.',
        'Chaque palier consomme la pièce du palier précédent : garde-la jusqu\'à la forge.',
      ],
    },
    {
      id: 'ecoles',
      title: 'Les six écoles',
      icon: 'armor',
      table: { head: ['École', 'Armure', 'Style de jeu', 'Paliers', 'Contenu'], rows: SCHOOL_TABLE },
      paragraphs: [
        'Dans Blood and Wine, les pièces de grand maître débloquent un bonus d\'ensemble à 3 puis à 6 pièces, propre à chaque école.',
      ],
    },
    {
      id: 'paliers',
      title: 'La progression d\'un set',
      icon: 'anvil',
      table: {
        head: ['Palier', 'Artisan minimum', 'Matériaux typiques'],
        rows: [
          ['Base', 'Amateur', 'Lingots d\'acier ou d\'argent, cuir'],
          ['Améliorée', 'Compagnon', 'Acier noir, argent météoritique'],
          ['Supérieure', 'Compagnon', 'Acier noir, diméritium, gemmes'],
          ['De maître', 'Maître (Hattori, Yoana)', 'Diméritium, cuir de draconide, gemmes parfaites'],
          ['De grand maître', 'Grand maître (Lafargue)', 'Diméritium enrichi, peau de slyzard infusée'],
        ],
      },
      bullets: ['Le calculateur d\'artisanat déroule la chaîne complète des épées supérieures, de maître et de grand maître des quatre écoles.'],
    },
    {
      id: 'chat',
      title: 'Exemple : où trouver les schémas du Chat',
      icon: 'pin',
      bullets: [
        'Épée en acier de maître : Ard Skellig, dans les ruines juste au nord de Kaer Gelen, gardées par des spectres de niveau 29.',
        'Épée en argent de maître : Faroe, grotte à l\'est d\'Harviken, derrière un mur fragile à briser avec Aard.',
        'Armure, gants, pantalon et bottes de maître : Faroe, grotte loin au sud de Trottheim, derrière les stalagmites.',
        'Épées et gants de grand maître : sacoche au fond de la grotte au sud des ruines du palais d\'Arthach (deux archespores).',
        'Armure de grand maître : derrière un portrait, dans la maison rouge au nord du domaine à l\'est des ruines d\'Arthach.',
      ],
    },
    {
      id: 'patch',
      title: 'Ce que change la mise à jour next-gen',
      icon: 'star',
      callout: {
        title: 'Patchs 4.0 et 4.01',
        items: [
          'Aucun changement de recettes, de prix, de démontage ni d\'artisans.',
          'Nouveau set d\'armure nilfgaardienne alternatif inspiré de la série Netflix.',
          'Le set du Loup de grand maître exige désormais bien les pièces de maître (correction d\'un bug).',
          'Le coffre de la chasse au trésor du Loup à la tour de signal s\'ouvre de nouveau.',
          'Patch 4.01 : deux nouvelles épées chez l\'armurier de la place du Hiérarque à Novigrad.',
        ],
      },
    },
  ],
};

export const ALCHEMY_GUIDE = {
  id: 'alchemy',
  kicker: 'Guide · Alchimie',
  title: 'L\'alchimie du sorceleur',
  intro:
    'Potions, décoctions, huiles et bombes : l\'alchimie fait la différence contre les monstres. Une fois une formule apprise, l\'objet se fabrique sans artisan et se recharge en méditant.',
  sections: [
    {
      id: 'bases',
      title: 'Les bases',
      icon: 'book',
      bullets: [
        'Il faut d\'abord une formule : achète-la chez les herboristes ou trouve-la en explorant. Elle s\'apprend en la lisant.',
        'Tu fabriques depuis le menu Alchimie, n\'importe où, sans artisan ni frais : il suffit d\'avoir les ingrédients.',
        'Chaque potion, bombe ou huile fabriquée une fois se recharge gratuitement en méditant, à condition d\'avoir un alcool fort dans l\'inventaire (alcohest ou spiritueux nain). Une seule bouteille recharge tout.',
        'Les ingrédients viennent des plantes (cueillette, herboristes) et des monstres (dépouilles après un combat).',
      ],
    },
    {
      id: 'categories',
      title: 'Les familles de préparations',
      icon: 'rune',
      table: {
        head: ['Famille', 'À quoi ça sert', 'Exemples'],
        rows: [
          ['Potions', 'Effets courts : soin, vision nocturne, endurance, dégâts', 'Hirondelle, Tonnerre, Chat, Pleine lune, Miel blanc'],
          ['Décoctions', 'Bonus passifs de longue durée, faites avec un mutagène de monstre', 'Décoctions de goule, de griffon, d\'ekimmara'],
          ['Huiles de lame', 'Plus de dégâts contre une famille de monstres', 'Huile contre les nécrophages, les spectres, les draconides'],
          ['Bombes', 'Contrôle et dégâts de zone', 'Mitraille, Étoile dansante, Samum, Bombe de diméritium'],
          ['Substances alchimiques', 'Ingrédients intermédiaires pour les formules avancées', 'Albédo, Rebis, Nigredo, Vermillon'],
        ],
      },
    },
    {
      id: 'toxicite',
      title: 'Gérer la toxicité',
      icon: 'skull',
      bullets: [
        'Chaque potion et décoction ajoute de la toxicité. Au-delà du seuil, Geralt perd de la vitalité.',
        'Les décoctions sont très toxiques : en garder une ou deux actives laisse peu de marge pour les potions.',
        'Le Miel blanc remet la toxicité à zéro et annule les effets de potion actifs. Garde-le pour te remettre d\'une erreur ou préparer un combat de boss.',
        'La compétence Tolérance acquise de l\'arbre Alchimie augmente le seuil de toxicité à chaque formule apprise.',
      ],
    },
    {
      id: 'paliers',
      title: 'Améliorer ses formules',
      icon: 'anvil',
      bullets: [
        'La plupart des préparations existent en trois versions : normale, améliorée et supérieure (et parfois une quatrième dans Blood and Wine).',
        'Chaque version améliorée demande la formule correspondante et la version précédente de la préparation, plus des ingrédients plus rares.',
        'Les versions supérieures demandent souvent un alcool plus fort (spiritueux nain, alcohest) et des substances alchimiques.',
        'Une préparation améliorée a plus de charges et des effets plus forts : la fabriquer une fois suffit, la méditation la recharge.',
      ],
    },
    {
      id: 'mutagenes',
      title: 'Les mutagènes',
      icon: 'gem',
      bullets: [
        'Les mutagènes tombent sur les monstres puissants et servent aussi à fabriquer les décoctions.',
        'Placé dans un emplacement de mutagène, un mutagène rouge augmente la puissance d\'attaque, un vert la vitalité, un bleu l\'intensité des Signes.',
        'Entoure-le de compétences de la même couleur pour multiplier son bonus.',
        'Les mutagènes mineurs se combinent en mutagènes plus puissants dans le menu Alchimie.',
      ],
    },
    {
      id: 'conseils',
      title: 'Conseils de sorceleur',
      icon: 'star',
      callout: {
        title: 'À retenir',
        items: [
          'Garde toujours au moins une bouteille d\'alcohest ou de spiritueux nain : sans elle, la méditation ne recharge rien.',
          'Avant un contrat, lis le bestiaire : il indique les huiles, bombes et Signes efficaces contre le monstre.',
          'Fabrique tôt Hirondelle (soin), Chat (vision nocturne) et une huile adaptée : elles servent tout le jeu.',
          'Depuis le patch 4.0, les plantes se ramassent d\'une seule interaction, sans fenêtre de butin : la cueillette va beaucoup plus vite.',
        ],
      },
    },
  ],
};
