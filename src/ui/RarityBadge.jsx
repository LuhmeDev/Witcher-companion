import { RARITIES } from '../data/components.js';

export const rarityOf = (id) => RARITIES.find((r) => r.id === id);

export default function RarityBadge({ rarity, className = '' }) {
  const r = rarityOf(rarity);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border bg-ink/50 px-2 py-0.5 font-display text-[11px] uppercase tracking-widest ${r.color} ${r.border} ${className}`}
    >
      <span className="h-1.5 w-1.5 rotate-45 bg-current" />
      {r.label}
    </span>
  );
}
