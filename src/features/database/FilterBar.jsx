import { CATEGORIES, DLCS, RARITIES } from '../../data/components.js';
import Icon from '../../ui/Icon.jsx';

export default function FilterBar({ filters, onChange, onReset, favoritesCount, ownedCount }) {
  const toggleRarity = (id) =>
    onChange({
      rarities: filters.rarities.includes(id) ? filters.rarities.filter((r) => r !== id) : [...filters.rarities, id],
    });

  return (
    <div className="panel panel-ornate space-y-4 p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Rechercher un composant</span>
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => onChange({ query: e.target.value })}
            placeholder="Diméritium, sirène, Toussaint, dark steel…"
            className="field pl-9"
          />
        </label>
        <div className="flex gap-2">
          <select
            value={filters.sort}
            onChange={(e) => onChange({ sort: e.target.value })}
            className="field sm:w-48"
            aria-label="Trier par"
          >
            <option value="name">Nom (A → Z)</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="rarity">Rareté</option>
          </select>
          <select
            value={filters.dlc}
            onChange={(e) => onChange({ dlc: e.target.value })}
            className="field sm:w-44"
            aria-label="Contenu"
          >
            <option value="all">Tout le contenu</option>
            {DLCS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="scrollbar-thin -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
        <button
          className={`chip shrink-0 ${filters.category === 'all' ? 'chip-active' : ''}`}
          onClick={() => onChange({ category: 'all' })}
        >
          Toutes catégories
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`chip shrink-0 ${filters.category === c.id ? 'chip-active' : ''}`}
            onClick={() => onChange({ category: c.id })}
          >
            <Icon name={c.icon} className="h-4 w-4" />
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 font-display text-xs uppercase tracking-widest text-parchment-dim">Rareté</span>
        {RARITIES.map((r) => (
          <button
            key={r.id}
            onClick={() => toggleRarity(r.id)}
            aria-pressed={filters.rarities.includes(r.id)}
            className={`chip ${filters.rarities.includes(r.id) ? `chip-active ${r.color}` : ''}`}
          >
            <span className={`h-2 w-2 rotate-45 bg-current ${r.color}`} />
            {r.label}
          </button>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-gold-dark/40 sm:block" />
        <button
          onClick={() => onChange({ favoritesOnly: !filters.favoritesOnly })}
          aria-pressed={filters.favoritesOnly}
          className={`chip ${filters.favoritesOnly ? 'chip-active' : ''}`}
        >
          <Icon name="star" className="h-4 w-4" filled={filters.favoritesOnly} />
          Favoris ({favoritesCount})
        </button>
        <button
          onClick={() => onChange({ ownedOnly: !filters.ownedOnly })}
          aria-pressed={filters.ownedOnly}
          className={`chip ${filters.ownedOnly ? 'chip-active' : ''}`}
        >
          <Icon name="bag" className="h-4 w-4" />
          Dans mon sac ({ownedCount})
        </button>
        <button onClick={onReset} className="ml-auto text-sm text-blood-light underline-offset-4 hover:underline">
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
