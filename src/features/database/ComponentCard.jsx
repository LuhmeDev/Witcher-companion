import { CATEGORIES } from '../../data/components.js';
import Icon from '../../ui/Icon.jsx';
import Price from '../../ui/Price.jsx';
import RarityBadge, { rarityOf } from '../../ui/RarityBadge.jsx';

export default function ComponentCard({ component: c, owned, favorite, onOpen, onToggleFavorite }) {
  const cat = CATEGORIES.find((x) => x.id === c.category);
  const r = rarityOf(c.rarity);
  const firstSource = c.sources.monsters[0] || c.sources.merchants[0] || c.sources.places[0] || c.sources.junk[0];

  return (
    <article className="panel group flex h-full transition-colors hover:border-gold/70">
      <button onClick={onOpen} className="flex flex-1 items-start gap-3 p-3 text-left" aria-label={`Voir ${c.name}`}>
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded border-2 bg-ink/60 ${r.border} ${r.color} shadow-inner`}
        >
          <Icon name={cat.icon} className="h-7 w-7" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-2">
            <span className="min-w-0">
              <span className="block truncate font-display text-[15px] text-parchment group-hover:text-gold-light">
                {c.name}
              </span>
              <span className="block truncate text-xs italic text-parchment-dim">{c.en}</span>
            </span>
            <Price value={c.price} unknown={c.priceUnknown} className="shrink-0 text-sm" />
          </span>
          <span className="mt-2 flex flex-wrap items-center gap-1.5">
            <RarityBadge rarity={c.rarity} />
            {c.dlc === 'baw' && (
              <span className="rounded-sm border border-blood-light/50 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-blood-light">
                B&amp;W
              </span>
            )}
            {c.recipes.length > 0 && <Icon name="hammer" className="h-3.5 w-3.5 text-parchment-dim" title="Fabricable" />}
            {c.dismantle.length > 0 && <Icon name="recycle" className="h-3.5 w-3.5 text-parchment-dim" title="Démontable" />}
            {owned > 0 && (
              <span className="ml-auto rounded bg-gold/15 px-1.5 text-xs text-gold-light">×{owned} dans le sac</span>
            )}
          </span>
          {firstSource && <span className="mt-1.5 block truncate text-xs text-parchment-dim/80">{firstSource}</span>}
        </span>
      </button>
      <button
        onClick={onToggleFavorite}
        aria-pressed={favorite}
        aria-label={favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        className={`self-start p-3 ${favorite ? 'text-gold' : 'text-parchment-dim/40 hover:text-gold'}`}
      >
        <Icon name="star" className="h-4 w-4" filled={favorite} />
      </button>
    </article>
  );
}
