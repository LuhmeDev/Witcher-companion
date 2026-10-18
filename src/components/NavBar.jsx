import Icon from '../ui/Icon.jsx';

export const TABS = [
  { id: 'database', label: 'Composants', icon: 'search' },
  { id: 'calculator', label: 'Calculateur', icon: 'anvil' },
  { id: 'guides', label: 'Guides', icon: 'book' },
  { id: 'crafters', label: 'Artisans', icon: 'map' },
  { id: 'bestiary', label: 'Bestiaire', icon: 'skull' },
];

/** En-tête sur desktop, barre d'onglets fixée en bas sur mobile. */
export default function NavBar({ active, onChange }) {
  return (
    <>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b border-gold-dark/40 bg-leather-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-gold bg-blood/40 text-gold-light shadow-inner">
              <Icon name="hammer" className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="font-display text-lg text-gold-light">Codex de l'Artisan</p>
              <p className="text-xs italic text-parchment-dim">Guide d'artisanat · The Witcher 3</p>
            </div>
          </div>
          <nav className="hidden gap-1 md:flex" aria-label="Sections">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                aria-current={active === t.id ? 'page' : undefined}
                className={`flex items-center gap-2 rounded px-3 py-2 font-display text-sm tracking-wider transition-colors ${
                  active === t.id
                    ? 'bg-gold/15 text-gold-light shadow-[inset_0_-2px_0_var(--color-gold)]'
                    : 'text-parchment-dim hover:text-gold-light'
                }`}
              >
                <Icon name={t.icon} className="h-4 w-4" />
                {t.label}

              </button>
            ))}
          </nav>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-gold-dark/50 bg-leather-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
        aria-label="Sections"
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            aria-current={active === t.id ? 'page' : undefined}
            className={`flex flex-col items-center gap-0.5 py-2 text-[10px] font-display ${
              active === t.id ? 'text-gold-light' : 'text-parchment-dim'
            }`}
          >
            <Icon name={t.icon} className="h-5 w-5" />
            {t.label}
          </button>
        ))}
      </nav>
    </>
  );
}
