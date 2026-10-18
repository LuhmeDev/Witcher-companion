import { useLocalStorage } from '../../hooks/useLocalStorage.js';
import { CHAPTERS } from '../../data/mastery.js';
import Icon from '../../ui/Icon.jsx';
import SectionTitle from '../../ui/SectionTitle.jsx';
import MasteryGuide from './MasteryGuide.jsx';
import GuideArticle from './GuideArticle.jsx';
import { ECONOMY_GUIDE, WITCHER_GEAR_GUIDE } from '../../data/guides.js';

const ARTICLES = { economy: ECONOMY_GUIDE, 'witcher-gear': WITCHER_GEAR_GUIDE };

const GUIDES = [
  {
    id: 'mastery',
    title: 'Bases & niveaux de maîtrise',
    text: 'Armurier ou forgeron, puis les quatre rangs d\'artisan : Amateur, Compagnon, Maître (Hattori, Yoana) et Grand Maître (Toussaint).',
    icon: 'anvil',
  },
  {
    id: 'economy',
    title: 'Optimisation économique',
    text: 'Quand démonter, quand acheter, et où revendre son équipement au meilleur prix.',
    icon: 'crown',
  },
  {
    id: 'witcher-gear',
    title: 'Schémas de sorceleur',
    text: 'Chasses au trésor et progression des écoles du Loup, Chat, Ours, Griffon, Vipère et Manticore.',
    icon: 'sword',
  },
];

export default function TutorialHub() {
  const [openGuide, setOpenGuide] = useLocalStorage('open-guide', null);
  const [progress] = useLocalStorage('mastery-progress', { read: [] });
  const [articlesRead, setArticlesRead] = useLocalStorage('guides-read', []);

  if (openGuide === 'mastery') return <MasteryGuide onExit={() => setOpenGuide(null)} />;
  if (ARTICLES[openGuide]) {
    return (
      <GuideArticle
        guide={ARTICLES[openGuide]}
        onExit={() => setOpenGuide(null)}
        onRead={() => !articlesRead.includes(openGuide) && setArticlesRead([...articlesRead, openGuide])}
      />
    );
  }

  const done = progress.read?.length ?? 0;
  const total = CHAPTERS.length + 1; // + l'épreuve finale

  return (
    <section>
      <SectionTitle kicker="Tutoriels" title="Guides pas à pas">
        Les mécaniques d'artisanat expliquées simplement, chapitre par chapitre. Ta progression est sauvegardée.
      </SectionTitle>
      <ul className="grid gap-4 md:grid-cols-3">
        {GUIDES.map((g) => (
          <li key={g.id}>
            <button
              disabled={g.soon}
              onClick={() => setOpenGuide(g.id)}
              className="panel panel-ornate group flex h-full w-full flex-col p-5 text-left transition-colors enabled:hover:border-gold disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/70 bg-blood/30 text-gold-light">
                <Icon name={g.icon} className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-lg text-gold-light">{g.title}</h2>
              <p className="mt-1 flex-1 text-sm text-parchment-dim">{g.text}</p>
              {g.id !== 'mastery' ? (
                <span className="mt-4 flex justify-between text-xs text-parchment-dim">
                  <span>{articlesRead.includes(g.id) ? 'Lu' : `${ARTICLES[g.id].sections.length} sections`}</span>
                  <span className="text-gold group-hover:underline">{articlesRead.includes(g.id) ? 'Relire' : 'Lire'} →</span>
                </span>
              ) : (
                <span className="mt-4 block">
                  <span className="flex justify-between text-xs text-parchment-dim">
                    <span>{done ? `${done}/${total} chapitres lus` : `${total} chapitres`}</span>
                    <span className="text-gold group-hover:underline">{done ? 'Reprendre' : 'Commencer'} →</span>
                  </span>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded bg-ink">
                    <span className="block h-full bg-gold" style={{ width: `${(done / total) * 100}%` }} />
                  </span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
