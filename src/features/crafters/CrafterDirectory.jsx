import { useMemo } from 'react';
import { CRAFTERS, REGIONS, TRADES } from '../../data/crafters.js';
import { LEVELS } from '../../data/mastery.js';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';
import { normalize } from '../../lib/text.js';
import Icon from '../../ui/Icon.jsx';
import SectionTitle from '../../ui/SectionTitle.jsx';

const DEFAULTS = { query: '', region: 'all', trade: 'all', levels: [] };
const levelOf = (id) => LEVELS.find((l) => l.id === id);
const rank = (id) => LEVELS.findIndex((l) => l.id === id);

export default function CrafterDirectory() {
  const [stored, setStored] = useLocalStorage('crafter-filters', DEFAULTS);
  const f = { ...DEFAULTS, ...stored };
  const update = (patch) => setStored({ ...f, ...patch });

  const list = useMemo(() => {
    const q = normalize(f.query);
    return CRAFTERS.filter(
      (c) =>
        (f.region === 'all' || c.region === f.region) &&
        (f.trade === 'all' || c.trade === f.trade) &&
        (!f.levels.length || f.levels.includes(c.level)) &&
        (!q || normalize(`${c.name} ${c.place} ${c.quest || ''}`).includes(q))
    ).sort((a, b) => rank(b.level) - rank(a.level) || a.name.localeCompare(b.name, 'fr'));
  }, [f.query, f.region, f.trade, f.levels]);

  const toggleLevel = (id) => update({ levels: f.levels.includes(id) ? f.levels.filter((l) => l !== id) : [...f.levels, id] });

  return (
    <section>
      <SectionTitle kicker="Répertoire des artisans" title="Forgerons & armuriers">
        Où faire forger tes schémas : {CRAFTERS.length} établis, classés du plus qualifié au plus modeste. Les artisans clés
        sont marqués d'une étoile.
      </SectionTitle>

      <div className="panel panel-ornate space-y-4 p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Rechercher un artisan</span>
            <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
            <input
              id="crafter-search"
              type="search"
              value={f.query}
              onChange={(e) => update({ query: e.target.value })}
              placeholder="Hattori, Oxenfurt, quête…"
              className="field pl-9"
            />
          </label>
          <div className="grid grid-cols-3 gap-1 rounded bg-ink/60 p-1 sm:w-80">
            {[{ id: 'all', label: 'Tous' }, ...TRADES].map((t) => (
              <button
                key={t.id}
                onClick={() => update({ trade: t.id })}
                className={`rounded px-2 py-1.5 font-display text-xs tracking-wider ${f.trade === t.id ? 'bg-gold/20 text-gold-light' : 'text-parchment-dim'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
          <button className={`chip shrink-0 ${f.region === 'all' ? 'chip-active' : ''}`} onClick={() => update({ region: 'all' })}>
            Toutes les régions
          </button>
          {REGIONS.map((r) => (
            <button key={r.id} className={`chip shrink-0 ${f.region === r.id ? 'chip-active' : ''}`} onClick={() => update({ region: r.id })}>
              <Icon name="pin" className="h-4 w-4" />
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 font-display text-xs uppercase tracking-widest text-parchment-dim">Niveau</span>
          {LEVELS.map((l) => (
            <button key={l.id} onClick={() => toggleLevel(l.id)} aria-pressed={f.levels.includes(l.id)} className={`chip ${f.levels.includes(l.id) ? `chip-active ${l.color}` : ''}`}>
              <span className={`font-display text-[10px] ${l.color}`}>{l.short}</span>
              {l.label}
            </button>
          ))}
          <button onClick={() => setStored(DEFAULTS)} className="ml-auto text-sm text-blood-light underline-offset-4 hover:underline">
            Réinitialiser
          </button>
        </div>
      </div>

      <p className="mb-3 mt-5 text-sm text-parchment-dim" aria-live="polite">
        {list.length} artisan{list.length > 1 ? 's' : ''}
      </p>

      {list.length ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => {
            const l = levelOf(c.level);
            const trade = TRADES.find((t) => t.id === c.trade);
            const region = REGIONS.find((r) => r.id === c.region);
            return (
              <li key={c.id} className={`panel flex h-full gap-3 p-3 ${c.star ? 'border-gold/70' : ''}`}>
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 bg-ink/60 font-display ${l.ring} ${l.color}`}>
                  {l.short}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-start justify-between gap-2">
                    <span className="font-display text-[15px] text-parchment">{c.name}</span>
                    {c.star && <Icon name="star" className="h-4 w-4 shrink-0 text-gold" filled title="Artisan clé" />}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-parchment-dim">
                    <span className="inline-flex items-center gap-1">
                      <Icon name={trade.icon} className="h-3.5 w-3.5 text-gold" /> {trade.label}
                    </span>
                    <span className={l.color}>{l.label}</span>
                    {c.dlc === 'baw' && <span className="text-blood-light">B&amp;W</span>}
                  </p>
                  <p className="mt-1.5 flex items-start gap-1.5 text-sm">
                    <Icon name="pin" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                    <span>
                      {c.place} <span className="text-parchment-dim">· {region.label}</span>
                    </span>
                  </p>
                  {c.quest && (
                    <p className="mt-1 flex items-start gap-1.5 text-sm">
                      <Icon name="book" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                      <span className="italic">{c.quest}</span>
                    </p>
                  )}
                  {c.note && <p className="mt-1 text-xs text-parchment-dim">{c.note}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="panel p-10 text-center text-parchment-dim">
          <p className="font-display text-gold-light">Aucun artisan ne correspond.</p>
          <button className="btn mt-4" onClick={() => setStored(DEFAULTS)}>
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </section>
  );
}
