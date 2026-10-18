/** Petites icônes SVG au trait doré, dessinées pour l'app (pas de dépendance). */
const PATHS = {
  ore: <><path d="M4 16l3-7 5-3 6 3 2 6-4 4H8z" /><path d="M7 9l5 3 6-3M12 12v7" /></>,
  ingot: <><path d="M3 15l3-5h12l3 5z" /><path d="M3 15v3h18v-3M6 10l1.5-3h9L18 10" /></>,
  leather: <><path d="M6 4c2 1 4 1 6 0 2 1 4 1 6 0l-1 5 2 4-3 7c-3-1-5-1-8 0l-3-7 2-4z" /><path d="M9 10h6M9 14h6" strokeDasharray="1.5 1.5" /></>,
  cloth: <><path d="M4 7c3-2 5 2 8 0s5-2 8 0v10c-3-2-5 2-8 0s-5-2-8 0z" /><path d="M4 12c3-2 5 2 8 0s5-2 8 0" /></>,
  wood: <><ellipse cx="7" cy="12" rx="3" ry="5" /><path d="M7 7h11c2 0 3 2 3 5s-1 5-3 5H7" /><ellipse cx="7" cy="12" rx="1" ry="2" /></>,
  gem: <><path d="M6 4h12l3 5-9 11L3 9z" /><path d="M3 9h18M9 4l-2 5 5 11 5-11-2-5" /></>,
  claw: <><path d="M5 20c0-6 2-11 6-15-1 5-1 9 1 12" /><path d="M10 20c1-5 3-9 7-12-1 4-1 8 1 10" /><path d="M4 20h16" /></>,
  rune: <><path d="M12 3l7 4v10l-7 4-7-4V7z" /><path d="M10 8v8M10 8l4 4-4 2" /></>,
  sword: <><path d="M14 4h6v6L9 21l-3-3z" /><path d="M5 15l4 4M3 21l3-3" /></>,
  armor: <><path d="M8 3h8l4 3-2 5v8l-6 3-6-3v-8L4 6z" /><path d="M12 6v15M8 11h8" /></>,
  search: <><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></>,
  book: <><path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z" /><path d="M12 6v14" /></>,
  anvil: <><path d="M3 7h13c0 3 2 4 5 4v2h-6l-1 3h3v3H7v-3h3l-1-3C5 13 3 10 3 7z" /></>,
  map: <><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></>,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  check: <path d="M5 12l5 5 9-10" />,
  crown: <path d="M4 17l-1-9 5 4 4-7 4 7 5-4-1 9z" />,
  hammer: <><path d="M14 4l6 6-3 3-6-6z" /><path d="M11 7L3 15l3 3 8-8" /></>,
  skull: <><path d="M12 3c5 0 8 3 8 7 0 3-2 4-3 5v3H7v-3c-1-1-3-2-3-5 0-4 3-7 8-7z" /><circle cx="9" cy="10" r="1.5" /><circle cx="15" cy="10" r="1.5" /><path d="M10 18v3M14 18v3" /></>,
  bag: <><path d="M6 8h12l1 12H5z" /><path d="M9 8V6a3 3 0 016 0v2" /></>,
  pin: <><path d="M12 21s-6-6-6-11a6 6 0 0112 0c0 5-6 11-6 11z" /><circle cx="12" cy="10" r="2" /></>,
  recycle: <><path d="M7 7l5-4 5 4M12 3v9" /><path d="M5 13a7 7 0 0014 0" /></>,
  chevron: <path d="M9 6l6 6-6 6" />,
  minus: <path d="M5 12h14" />,
  plus: <path d="M12 5v14M5 12h14" />,
};

export default function Icon({ name, className = 'h-5 w-5', filled = false, title }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  );
}
