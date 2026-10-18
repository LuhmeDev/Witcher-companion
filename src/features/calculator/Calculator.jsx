import { useMemo } from 'react';
import { CATEGORIES, COMPONENTS } from '../../data/components.js';
import { SCHOOLS, TIERS, getItem } from '../../data/gear.js';
import { LEVELS } from '../../data/mastery.js';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';
import Icon from '../../ui/Icon.jsx';
import Price from '../../ui/Price.jsx';
import { rarityOf } from '../../ui/RarityBadge.jsx';
import SectionTitle from '../../ui/SectionTitle.jsx';

const DEFAULTS = {
  mode: 'gear',
  school: 'feline',
  weapon: 'silver',
  tier: 'mastercrafted',
  component: 'dimeritium-plate',
  qty: 1,
  expanded: [],
  checked: {},
  useBag: true,
};

const CRAFTABLE_COMPONENTS = COMPONENTS.filter((c) => c.recipes.length).sort((a, b) => a.name.localeCompare(b.name, 'fr'));

/** Recette la moins chère d'un composant (au prix de base des ingrédients). */
function bestRecipe(item) {
  if (item.kind === 'gear') return item.recipes[0];
  return [...item.recipes].sort(
    (a, b) => a.reduce((s, x) => s + getItem(x.id).price * x.qty, 0) - b.reduce((s, x) => s + getItem(x.id).price * x.qty, 0)
  )[0];
}

/**
 * Arbre de fabrication. Un équipement est toujours développé ; un composant ne
 * l'est que si le joueur a choisi de le fabriquer (sinon on l'achète).
 */
function buildTree(id, qty, expanded, path = []) {
  const item = getItem(id);
  const canCraft = item.recipes.length > 0 && !path.includes(id);
  const open = canCraft && (item.kind === 'gear' || expanded.includes(id));
  return {
    id,
    qty,
    canCraft,
    open,
    children: open ? bestRecipe(item).map((x) => buildTree(x.id, x.qty * qty, expanded, [...path, id])) : [],
  };
}

function collectLeaves(node, acc = new Map()) {
  if (node.open) node.children.forEach((c) => collectLeaves(c, acc));
  else acc.set(node.id, (acc.get(node.id) || 0) + node.qty);
  return acc;
}

function collectCraftable(node, acc = new Set()) {
  if (node.canCraft && getItem(node.id).kind !== 'gear') acc.add(node.id);
  node.children.forEach((c) => collectCraftable(c, acc));
  // Les nœuds repliés ne listent pas leurs enfants : on descend dans les recettes quand même.
  if (!node.open && node.canCraft) bestRecipe(getItem(node.id)).forEach((x) => collectCraftable(buildTree(x.id, 1, []), acc));
  return acc;
}

function ItemIcon({ item, className = 'h-4 w-4' }) {
  if (item.kind === 'gear') return <Icon name="sword" className={`${className} text-gold-light`} />;
  const cat = CATEGORIES.find((c) => c.id === item.category);
  return <Icon name={cat.icon} className={`${className} ${rarityOf(item.rarity).color}`} />;
}

function TreeNode({ node, depth, onToggle }) {
  const item = getItem(node.id);
  const isGear = item.kind === 'gear';
  const missingDiagram = isGear && !node.canCraft;
  return (
    <li>
      <div
        className={`flex items-center gap-2 rounded border px-2 py-1.5 text-sm ${
          isGear ? 'border-gold/50 bg-gold/10' : 'border-gold-dark/25 bg-ink/40'
        }`}
      >
        <ItemIcon item={item} />
        <span className="font-display text-gold-light">{node.qty}×</span>
        <span className="min-w-0 flex-1 truncate">{item.name}</span>
        {missingDiagram && <span className="hidden text-xs italic text-parchment-dim sm:inline">à posséder</span>}
        {!isGear && <Price value={item.price * node.qty} unknown={item.priceUnknown} className="text-xs" />}
        {!isGear && node.canCraft && (
          <button
            onClick={() => onToggle(node.id)}
            className={`chip px-2 py-0.5 text-xs ${node.open ? 'chip-active' : ''}`}
            title={node.open ? 'Acheter ce composant plutôt que le fabriquer' : 'Afficher sa chaîne de fabrication'}
          >
            <Icon name={node.open ? 'hammer' : 'crown'} className="h-3 w-3" />
            {node.open ? 'Fabriquer' : 'Acheter'}
          </button>
        )}
      </div>
      {node.open && (
        <ul className="ml-3 mt-1.5 space-y-1.5 border-l border-gold-dark/40 pl-3">
          {node.children.map((c) => (
            <TreeNode key={c.id} node={c} depth={depth + 1} onToggle={onToggle} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Calculator() {
  const [stored, setStored] = useLocalStorage('calculator', DEFAULTS);
  const [inventory] = useLocalStorage('inventory', {});
  const s = { ...DEFAULTS, ...stored };
  const update = (patch) => setStored({ ...s, ...patch });

  const targetId = s.mode === 'gear' ? `${s.school}-${s.weapon}-${s.tier}` : s.component;
  const target = getItem(targetId);

  const tree = useMemo(() => buildTree(targetId, s.qty, s.expanded), [targetId, s.qty, s.expanded]);
  const leaves = useMemo(() => [...collectLeaves(tree)], [tree]);
  const allCraftable = useMemo(() => [...collectCraftable(tree)], [tree]);

  const rows = leaves.map(([id, need]) => {
    const item = getItem(id);
    const owned = s.useBag && item.kind !== 'gear' ? inventory[id] || 0 : 0;
    const toBuy = Math.max(0, need - owned);
    return { id, item, need, owned, toBuy, cost: toBuy * (item.price || 0) };
  });
  const remaining = rows.filter((r) => !s.checked[r.id] && r.toBuy > 0);
  const totalCost = remaining.reduce((sum, r) => sum + r.cost, 0);
  const hasUnknownPrice = remaining.some((r) => r.item.priceUnknown);

  const toggleExpand = (id) =>
    update({ expanded: s.expanded.includes(id) ? s.expanded.filter((x) => x !== id) : [...s.expanded, id] });
  const toggleCheck = (id) => update({ checked: { ...s.checked, [id]: !s.checked[id] } });
  const level = target.kind === 'gear' ? LEVELS.find((l) => l.id === target.level) : null;

  return (
    <section>
      <SectionTitle kicker="Calculateur d'artisanat" title="De la mine à la forge">
        Choisis ce que tu veux fabriquer : le calculateur déroule toute la chaîne de composants et en tire une liste de courses,
        en tenant compte de ce que tu as déjà dans ton sac (onglet Composants).
      </SectionTitle>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        {/* Sélection de la cible */}
        <div className="panel panel-ornate h-fit space-y-4 p-4 lg:sticky lg:top-24">
          <div className="grid grid-cols-2 gap-1 rounded bg-ink/60 p-1">
            {[
              ['gear', 'Épées de sorceleur'],
              ['component', 'Composants'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => update({ mode: id })}
                className={`rounded px-2 py-1.5 font-display text-xs tracking-wider ${
                  s.mode === id ? 'bg-gold/20 text-gold-light' : 'text-parchment-dim'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {s.mode === 'gear' ? (
            <>
              <fieldset>
                <legend className="mb-1.5 text-xs uppercase tracking-widest text-parchment-dim">École</legend>
                <div className="grid grid-cols-2 gap-2">
                  {SCHOOLS.map((sc) => (
                    <button key={sc.id} onClick={() => update({ school: sc.id })} className={`chip justify-center ${s.school === sc.id ? 'chip-active' : ''}`}>
                      {sc.label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-1.5 text-xs uppercase tracking-widest text-parchment-dim">Arme</legend>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    ['silver', 'Argent'],
                    ['steel', 'Acier'],
                  ].map(([id, label]) => (
                    <button key={id} onClick={() => update({ weapon: id })} className={`chip justify-center ${s.weapon === id ? 'chip-active' : ''}`}>
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-1.5 text-xs uppercase tracking-widest text-parchment-dim">Palier</legend>
                <div className="grid gap-2">
                  {TIERS.filter((t) => t.id !== 'enhanced').map((t) => (
                    <button key={t.id} onClick={() => update({ tier: t.id })} className={`chip justify-between ${s.tier === t.id ? 'chip-active' : ''}`}>
                      {t.label}
                      {t.dlc && <span className="text-[10px] text-blood-light">B&amp;W</span>}
                    </button>
                  ))}
                </div>
              </fieldset>
            </>
          ) : (
            <label className="block">
              <span className="mb-1.5 block text-xs uppercase tracking-widest text-parchment-dim">Composant à fabriquer</span>
              <select value={s.component} onChange={(e) => update({ component: e.target.value })} className="field" id="calc-component">
                {CRAFTABLE_COMPONENTS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-widest text-parchment-dim">Quantité</span>
            <div className="flex items-center">
              <button className="btn px-2 py-1" onClick={() => update({ qty: Math.max(1, s.qty - 1) })} aria-label="Moins">
                <Icon name="minus" className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-display text-gold-light">{s.qty}</span>
              <button className="btn px-2 py-1" onClick={() => update({ qty: Math.min(99, s.qty + 1) })} aria-label="Plus">
                <Icon name="plus" className="h-4 w-4" />
              </button>
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-parchment-dim">
            <input type="checkbox" checked={s.useBag} onChange={(e) => update({ useBag: e.target.checked })} className="accent-[var(--color-gold)]" id="calc-usebag" />
            Déduire ce que j'ai dans mon sac
          </label>
        </div>

        <div className="space-y-6">
          {/* Cible */}
          <div className="panel p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded border-2 border-gold bg-ink/60">
                <ItemIcon item={target} className="h-7 w-7" />
              </span>
              <div className="min-w-0">
                <h2 className="text-xl text-gold-light">{target.name}</h2>
                {target.kind === 'gear' ? (
                  <div className="mt-1 space-y-1 text-sm text-parchment-dim">
                    <p className="flex items-start gap-1.5">
                      <Icon name="anvil" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>
                        {target.craftsman} · niveau <span className={level.color}>{level.label}</span>
                      </span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <Icon name="map" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>Schéma : {target.diagram}</span>
                    </p>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-parchment-dim">{target.en}</p>
                )}
              </div>
            </div>
          </div>

          {/* Arbre */}
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-gold">
                <Icon name="hammer" className="h-4 w-4" /> Arbre de fabrication
              </h3>
              <div className="flex gap-2">
                <button className="chip text-xs" onClick={() => update({ expanded: allCraftable })}>
                  Tout fabriquer
                </button>
                <button className="chip text-xs" onClick={() => update({ expanded: [] })}>
                  Tout acheter
                </button>
              </div>
            </div>
            <p className="mb-3 text-xs italic text-parchment-dim">
              « Acheter » arrête la chaîne à ce composant ; « Fabriquer » affiche ses ingrédients (recette la moins chère).
            </p>
            <ul className="space-y-1.5">
              <TreeNode node={tree} depth={0} onToggle={toggleExpand} />
            </ul>
          </div>

          {/* Liste de courses */}
          <div className="parchment p-4 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl text-leather-900">Liste de courses</h3>
              <button className="text-sm text-blood underline-offset-4 hover:underline" onClick={() => update({ checked: {} })}>
                Tout décocher
              </button>
            </div>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[460px] border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b-2 border-leather-700/40 font-display text-xs uppercase tracking-wider text-leather-700">
                    <th className="py-2 pr-2">J'ai</th>
                    <th className="py-2 pr-2">Élément</th>
                    <th className="py-2 pr-2 text-right">Requis</th>
                    <th className="py-2 pr-2 text-right">Sac</th>
                    <th className="py-2 pr-2 text-right">À trouver</th>
                    <th className="py-2 text-right">Coût</th>
                  </tr>
                </thead>
                <tbody className="tabular-nums">
                  {rows.map((r) => {
                    const done = s.checked[r.id] || r.toBuy === 0;
                    return (
                      <tr key={r.id} className={`border-b border-leather-700/20 ${done ? 'opacity-50' : ''}`}>
                        <td className="py-1.5 pr-2">
                          <input
                            type="checkbox"
                            id={`chk-${r.id}`}
                            checked={done}
                            disabled={r.toBuy === 0}
                            onChange={() => toggleCheck(r.id)}
                            className="h-4 w-4 accent-[var(--color-blood)]"
                            aria-label={`J'ai ${r.item.name}`}
                          />
                        </td>
                        <td className={`py-1.5 pr-2 ${done ? 'line-through' : ''}`}>
                          <label htmlFor={`chk-${r.id}`}>{r.item.name}</label>
                          {r.item.kind === 'gear' && <span className="block text-xs italic text-leather-700">pièce du palier précédent</span>}
                        </td>
                        <td className="py-1.5 pr-2 text-right">{r.need}</td>
                        <td className="py-1.5 pr-2 text-right">{r.item.kind === 'gear' ? '—' : r.owned}</td>
                        <td className="py-1.5 pr-2 text-right font-semibold">{r.toBuy}</td>
                        <td className="py-1.5 text-right">{r.item.kind === 'gear' ? '—' : r.item.priceUnknown ? '?' : r.cost}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-leather-700/30 pt-3">
              <span className="text-sm text-leather-700">
                {remaining.length ? `${remaining.length} élément${remaining.length > 1 ? 's' : ''} à trouver` : 'Tout est prêt : direction la forge !'}
              </span>
              <span className="font-display text-lg text-leather-900">
                ≈ {totalCost.toLocaleString('fr-FR')} couronnes{hasUnknownPrice ? ' + substances' : ''}
              </span>
            </p>
            <p className="mt-1 text-xs italic text-leather-700">
              Au prix de base, hors frais de l'artisan. Les cases cochées sont mémorisées sur cet appareil.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

