import Icon from './Icon.jsx';

/** Montant en couronnes avec l'icône de pièce. */
export default function Price({ value, unknown = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 font-display text-gold-light ${className}`}>
      <Icon name="crown" className="h-3.5 w-3.5 text-gold" filled />
      {unknown ? '?' : value.toLocaleString('fr-FR')}
    </span>
  );
}
