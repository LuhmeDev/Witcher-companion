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
