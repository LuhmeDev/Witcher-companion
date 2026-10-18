import { useEffect, useRef } from 'react';
import { CATEGORIES, COMPONENTS_BY_ID, recipeCost } from '../../data/components.js';
import Icon from '../../ui/Icon.jsx';
import Price from '../../ui/Price.jsx';
import RarityBadge, { rarityOf } from '../../ui/RarityBadge.jsx';

const SOURCE_GROUPS = [
  { key: 'monsters', label: 'Butin de monstres', icon: 'skull' },
  { key: 'merchants', label: 'Marchands', icon: 'crown' },
  { key: 'places', label: 'Lieux & coffres', icon: 'pin' },
  { key: 'junk', label: 'En démontant du bric-à-brac', icon: 'recycle' },
];

function Block({ icon, title, children }) {
  return (
    <section className="mt-5">
      <h3 className="mb-2 flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold">
        <Icon name={icon} className="h-4 w-4" />
        {title}
      </h3>
      {children}
    </section>
  );
}

/** Pastille cliquable vers un autre composant (navigation dans la fiche). */
function ComponentLink({ id, qty, onNavigate }) {
  const c = COMPONENTS_BY_ID[id];
  const cat = CATEGORIES.find((x) => x.id === c.category);
  return (
    <button
      onClick={() => onNavigate(id)}
      className="flex w-full items-center gap-2 rounded border border-gold-dark/30 bg-ink/40 px-2 py-1.5 text-left text-sm hover:border-gold"
    >
      <Icon name={cat.icon} className={`h-4 w-4 shrink-0 ${rarityOf(c.rarity).color}`} />
      {qty != null && <span className="font-display text-gold-light">{qty}×</span>}
      <span className="flex-1 truncate">{c.name}</span>
      <Price value={c.price * (qty ?? 1)} className="text-xs" />
    </button>
  );
}

export default function ComponentDetail({
  component: c,
  owned,
  favorite,
  onQtyChange,
  onToggleFavorite,
  onNavigate,
  onBack,
  onClose,
}) {
  const dialogRef = useRef(null);
  const cat = CATEGORIES.find((x) => x.id === c.category);
  const r = rarityOf(c.rarity);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const hasSources = SOURCE_GROUPS.some((g) => c.sources[g.key].length);
  const cheapest = c.recipes.length ? Math.min(...c.recipes.map(recipeCost)) : null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
        onClick={(e) => e.stopPropagation()}
        className="panel panel-ornate scrollbar-thin max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-b-none p-5 outline-none sm:rounded-md sm:p-6"
      >
        <div className="flex items-start gap-4">
          <span className={`grid h-16 w-16 shrink-0 place-items-center rounded border-2 bg-ink/60 ${r.border} ${r.color}`}>
            <Icon name={cat.icon} className="h-9 w-9" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest text-parchment-dim">{cat.label}</p>
            <h2 id="detail-title" className="text-2xl text-gold-light">
              {c.name}
            </h2>
            <p className="text-sm italic text-parchment-dim">{c.en}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <RarityBadge rarity={c.rarity} />
              <Price value={c.price} unknown={c.priceUnknown} />
              <span className="text-xs text-parchment-dim">prix de base</span>
              {c.dlc === 'baw' && <span className="text-xs text-blood-light">Blood and Wine</span>}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <button onClick={onClose} className="p-1 text-parchment-dim hover:text-gold-light" aria-label="Fermer">
              <Icon name="close" className="h-6 w-6" />
            </button>
            {onBack && (
              <button onClick={onBack} className="text-xs text-gold underline-offset-4 hover:underline">
                ← Retour
              </button>
            )}
          </div>
        </div>

        {c.description && <p className="mt-4 text-parchment">{c.description}</p>}

        <div className="mt-4 flex flex-wrap items-center gap-3 rounded border border-gold-dark/30 bg-ink/40 p-3">
          <span className="flex items-center gap-2 text-sm text-parchment-dim">
            <Icon name="bag" className="h-4 w-4 text-gold" /> Dans mon sac
          </span>
          <div className="flex items-center">
            <button className="btn px-2 py-1" onClick={() => onQtyChange(Math.max(0, owned - 1))} aria-label="Retirer un">
              <Icon name="minus" className="h-4 w-4" />
            </button>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={owned}
              onChange={(e) => onQtyChange(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="field mx-1 w-16 py-1 text-center"
              aria-label="Quantité possédée"
            />
            <button className="btn px-2 py-1" onClick={() => onQtyChange(owned + 1)} aria-label="Ajouter un">
              <Icon name="plus" className="h-4 w-4" />
            </button>
          </div>
          {owned > 0 && (
            <span className="text-sm text-parchment-dim">
              valeur : <Price value={owned * c.price} className="text-sm" />
            </span>
          )}
          <button onClick={onToggleFavorite} className={`chip ml-auto ${favorite ? 'chip-active' : ''}`} aria-pressed={favorite}>
            <Icon name="star" className="h-4 w-4" filled={favorite} />
            {favorite ? 'Favori' : 'Ajouter aux favoris'}
          </button>
        </div>

        {hasSources && (
          <Block icon="map" title="Comment l'obtenir">
            <div className="grid gap-3 sm:grid-cols-2">
              {SOURCE_GROUPS.filter((g) => c.sources[g.key].length).map((g) => (
                <div key={g.key} className="rounded border border-gold-dark/25 bg-leather-800/60 p-3">
                  <p className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wider text-parchment-dim">
                    <Icon name={g.icon} className="h-3.5 w-3.5 text-gold" /> {g.label}
                  </p>
                  <ul className="space-y-0.5 text-sm">
                    {c.sources[g.key].map((s) => (
                      <li key={s} className="flex gap-1.5">
                        <span className="text-gold-dark">◆</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>
        )}

        {c.recipes.length > 0 && (
          <Block icon="hammer" title="Fabrication chez l'artisan">
            <div className="space-y-3">
              {c.recipes.map((recipe, i) => {
                const cost = recipeCost(recipe);
                const saving = c.price - cost;
                return (
                  <div key={i} className="rounded border border-gold-dark/25 bg-leather-800/60 p-3">
                    {c.recipes.length > 1 && (
                      <p className="mb-2 text-xs uppercase tracking-wider text-parchment-dim">Recette {i + 1}</p>
                    )}
                    <div className="grid gap-1.5 sm:grid-cols-2">
                      {recipe.map(({ id, qty }) => (
                        <ComponentLink key={id} id={id} qty={qty} onNavigate={onNavigate} />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-parchment-dim">
                      Ingrédients achetés : <Price value={cost} className="text-sm" />{' '}
                      {saving > 0 ? (
                        <span className="text-emerald-400">soit {saving} cour. de moins que l'achat direct</span>
                      ) : saving < 0 ? (
                        <span className="text-blood-light">soit {-saving} cour. de plus : achète-le tout fait</span>
                      ) : (
                        <span>même prix que l'achat direct</span>
                      )}
                      {cost === cheapest && c.recipes.some((rc) => recipeCost(rc) > cheapest) && <span className="ml-1 text-gold">· la moins chère</span>}
                    </p>
                  </div>
                );
              })}
              <p className="text-xs italic text-parchment-dim">Hors frais de l'artisan, qui varient selon son niveau.</p>
            </div>
          </Block>
        )}

        <Block icon="recycle" title="Démontage">
          {c.dismantle.length ? (
            <>
              <p className="mb-2 text-sm text-parchment-dim">Démonté chez un artisan, cet objet rend :</p>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {c.dismantle.map(({ id, qty }) => (
                  <ComponentLink key={id} id={id} qty={qty} onNavigate={onNavigate} />
                ))}
              </div>
              {recipeCost(c.dismantle) < c.price / 2 && (
                <p className="mt-2 text-sm text-rarity-relic">
                  Conseil : le démontage rend peu de valeur ici, mieux vaut le revendre ou le garder.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-parchment-dim">Composant de base : il ne se démonte pas.</p>
          )}
        </Block>

        {c.dismantledFrom.length > 0 && (
          <Block icon="recycle" title="Obtenu en démontant">
            <div className="grid gap-1.5 sm:grid-cols-2">
              {c.dismantledFrom.map((id) => (
                <ComponentLink key={id} id={id} onNavigate={onNavigate} />
              ))}
            </div>
          </Block>
        )}

        {c.usedIn.length > 0 && (
          <Block icon="anvil" title="Sert à fabriquer">
            <div className="grid gap-1.5 sm:grid-cols-2">
              {c.usedIn.map((id) => (
                <ComponentLink key={id} id={id} onNavigate={onNavigate} />
              ))}
            </div>
          </Block>
        )}
      </div>
    </div>
  );
}
