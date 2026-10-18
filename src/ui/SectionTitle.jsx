export default function SectionTitle({ kicker, title, children }) {
  return (
    <header className="mb-6 text-center sm:text-left">
      {kicker && <p className="font-display text-xs uppercase tracking-[0.3em] text-blood-light">{kicker}</p>}
      <h1 className="mt-1 text-3xl text-gold-light sm:text-4xl">{title}</h1>
      {children && <p className="mt-2 max-w-2xl text-parchment-dim">{children}</p>}
      <div className="divider" />
    </header>
  );
}
