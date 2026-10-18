import { useMemo } from 'react';
import { CLASSES, MONSTERS } from '../../data/bestiary.js';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';
import { normalize } from '../../lib/text.js';
import Icon from '../../ui/Icon.jsx';
import SectionTitle from '../../ui/SectionTitle.jsx';

const DEFAULTS = { query: '', cls: 'all' };

const WEAKNESS_ROWS = [
  { key: 'oil', label: 'Huile', icon: 'sword' },
  { key: 'signs', label: 'Signes', icon: 'rune' },
  { key: 'bombs', label: 'Bombes', icon: 'gem' },
  { key: 'potions', label: 'Potions', icon: 'book' },
];

export default function Bestiary() {
  const [stored, setStored] = useLocalStorage('bestiary-filters', DEFAULTS);
  const f = { ...DEFAULTS, ...stored };
  const update = (patch) => setStored({ ...f, ...patch });

  const list = useMemo(() => {
    const q = normalize(f.query);
    return MONSTERS.filter((mo) => {
      if (f.cls !== 'all' && mo.cls !== f.cls) return false;
      if (!q) return true;
      return normalize([mo.name, mo.en, mo.oil, ...mo.signs, ...mo.bombs, ...mo.potions].join(' ')).includes(q);
    });
  }, [f.query, f.cls]);

  return (
    <section>
      <SectionTitle kicker="Bestiaire" title="Monstres d'élite">
        Les {MONSTERS.length} créatures les plus redoutables des contrats, avec leurs points faibles : l'huile à appliquer, les
        Signes, les bombes et les potions qui font la différence.
      </SectionTitle>

      <div className="panel panel-ornate space-y-4 p-4">
        <label className="relative block">
          <span className="sr-only">Rechercher un monstre ou une faiblesse</span>
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
          <input
            id="bestiary-search"
            type="search"
            value={f.query}
            onChange={(e) => update({ query: e.target.value })}
            placeholder="Loup-garou, Yrden, poussière de lune…"
            className="field pl-9"
          />
        </label>
        <div className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
          <button className={`chip shrink-0 ${f.cls === 'all' ? 'chip-active' : ''}`} onClick={() => update({ cls: 'all' })}>
            Toutes les familles
          </button>
          {CLASSES.map((c) => (
            <button key={c.id} className={`chip shrink-0 ${f.cls === c.id ? 'chip-active' : ''}`} onClick={() => update({ cls: c.id })}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-3 mt-5 text-sm text-parchment-dim" aria-live="polite">
        {list.length} monstre{list.length > 1 ? 's' : ''}
      </p>

      {list.length ? (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {list.map((mo) => {
            const cls = CLASSES.find((c) => c.id === mo.cls);
            return (
              <li key={mo.id} className="panel flex h-full flex-col p-4">
                <div className="flex items-start gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-blood-light/70 bg-blood/30 text-parchment">
                    <Icon name="skull" className="h-6 w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg text-gold-light">{mo.name}</h2>
                    <p className="text-xs text-parchment-dim">
                      <span className="italic">{mo.en}</span> · {cls.label}
                      {mo.dlc === 'baw' && <span className="ml-1 text-blood-light">B&amp;W</span>}
                    </p>
                  </div>
                </div>
                <dl className="mt-3 space-y-1.5 text-sm">
                  {WEAKNESS_ROWS.map((row) => {
                    const value = row.key === 'oil' ? [mo.oil] : mo[row.key];
                    if (!value.length) return null;
                    return (
                      <div key={row.key} className="flex items-start gap-2">
                        <dt className="flex w-20 shrink-0 items-center gap-1.5 text-xs uppercase tracking-wider text-parchment-dim">
                          <Icon name={row.icon} className="h-3.5 w-3.5 text-gold" />
                          {row.label}
                        </dt>
                        <dd className="flex flex-wrap gap-1">
                          {value.map((v) => (
                            <span key={v} className="rounded-sm border border-gold-dark/40 bg-ink/50 px-1.5 py-0.5 text-[13px] text-parchment">
                              {v}
                            </span>
                          ))}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-3 flex-1 border-t border-gold-dark/25 pt-2 text-sm italic text-parchment-dim">{mo.tip}</p>
                {mo.note && <p className="mt-1 text-xs text-gold">{mo.note}</p>}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="panel p-10 text-center text-parchment-dim">
          <p className="font-display text-gold-light">Aucun monstre ne correspond.</p>
          <button className="btn mt-4" onClick={() => setStored(DEFAULTS)}>
            Réinitialiser
          </button>
        </div>
      )}
      <p className="mt-6 text-xs text-parchment-dim/80">
        Toujours sur une lame en argent. Le bestiaire du jeu se complète au fil des combats et des livres lus : consulte-le avant
        chaque contrat.
      </p>
    </section>
  );
}
