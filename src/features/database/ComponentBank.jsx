import { useCallback, useMemo, useState } from 'react';
import { COMPONENTS, COMPONENTS_BY_ID, RARITIES } from '../../data/components.js';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';
import { normalize } from '../../lib/text.js';
import SectionTitle from '../../ui/SectionTitle.jsx';
import FilterBar from './FilterBar.jsx';
import ComponentCard from './ComponentCard.jsx';
import ComponentDetail from './ComponentDetail.jsx';

const DEFAULT_FILTERS = {
  query: '',
  category: 'all',
  rarities: [],
  dlc: 'all',
  sort: 'name',
  favoritesOnly: false,
  ownedOnly: false,
};

const rank = (id) => RARITIES.find((r) => r.id === id).rank;

const SORTERS = {
  name: (a, b) => a.name.localeCompare(b.name, 'fr'),
  'price-asc': (a, b) => a.price - b.price || SORTERS.name(a, b),
  'price-desc': (a, b) => b.price - a.price || SORTERS.name(a, b),
  rarity: (a, b) => rank(b.rarity) - rank(a.rarity) || SORTERS.name(a, b),
};

export default function ComponentBank() {
  const [filters, setFilters] = useLocalStorage('db-filters', DEFAULT_FILTERS);
  const [inventory, setInventory] = useLocalStorage('inventory', {});
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [stack, setStack] = useState([]); // fiches ouvertes, pour le bouton « Retour »
  const selectedId = stack[stack.length - 1];

  const f = { ...DEFAULT_FILTERS, ...filters };
  const update = (patch) => setFilters({ ...f, ...patch });

  const results = useMemo(() => {
    const q = normalize(f.query);
    return COMPONENTS.filter((c) => {
      if (f.category !== 'all' && c.category !== f.category) return false;
      if (f.rarities.length && !f.rarities.includes(c.rarity)) return false;
      if (f.dlc !== 'all' && c.dlc !== f.dlc) return false;
      if (f.favoritesOnly && !favorites.includes(c.id)) return false;
      if (f.ownedOnly && !(inventory[c.id] > 0)) return false;
      if (!q) return true;
      // On cherche aussi dans les sources : « sirène » trouve les cordes vocales.
      const s = c.sources;
      const haystack = [c.name, c.en, ...s.monsters, ...s.places, ...s.merchants, ...s.junk].join(' ');
      return normalize(haystack).includes(q);
    }).sort(SORTERS[f.sort]);
  }, [f.query, f.category, f.rarities, f.dlc, f.sort, f.favoritesOnly, f.ownedOnly, favorites, inventory]);

  const toggleFavorite = (id) =>
    setFavorites(favorites.includes(id) ? favorites.filter((x) => x !== id) : [...favorites, id]);

  const setQty = (id, qty) => {
    const next = { ...inventory };
    if (qty > 0) next[id] = qty;
    else delete next[id];
    setInventory(next);
  };

  const closeDetail = useCallback(() => setStack([]), []);

  const ownedCount = Object.keys(inventory).length;

  return (
    <section>
      <SectionTitle kicker="Banque de données" title="Composants & ingrédients">
        {COMPONENTS.length} composants d'artisanat : où les trouver, ce qu'ils valent, comment les fabriquer et ce qu'ils rendent au
        démontage. Ton inventaire et tes favoris sont gardés sur cet appareil.
      </SectionTitle>

      <FilterBar
        filters={f}
        onChange={update}
        onReset={() => setFilters(DEFAULT_FILTERS)}
        favoritesCount={favorites.length}
        ownedCount={ownedCount}
      />

      <p className="mb-3 mt-5 text-sm text-parchment-dim" aria-live="polite">
        {results.length} résultat{results.length > 1 ? 's' : ''}
      </p>

      {results.length ? (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c) => (
            <li key={c.id}>
              <ComponentCard
                component={c}
                owned={inventory[c.id] || 0}
                favorite={favorites.includes(c.id)}
                onOpen={() => setStack([c.id])}
                onToggleFavorite={() => toggleFavorite(c.id)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="panel p-10 text-center text-parchment-dim">
          <p className="font-display text-gold-light">Rien dans les sacoches…</p>
          <p className="mt-1 text-sm">Aucun composant ne correspond à ces filtres.</p>
          <button className="btn mt-4" onClick={() => setFilters(DEFAULT_FILTERS)}>
            Réinitialiser les filtres
          </button>
        </div>
      )}

      {selectedId && (
        <ComponentDetail
          key={selectedId}
          component={COMPONENTS_BY_ID[selectedId]}
          owned={inventory[selectedId] || 0}
          favorite={favorites.includes(selectedId)}
          onQtyChange={(q) => setQty(selectedId, q)}
          onToggleFavorite={() => toggleFavorite(selectedId)}
          onNavigate={(id) => setStack([...stack, id])}
          onBack={stack.length > 1 ? () => setStack(stack.slice(0, -1)) : undefined}
          onClose={closeDetail}
        />
      )}
    </section>
  );
}
