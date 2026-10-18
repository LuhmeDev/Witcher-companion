import { useEffect } from 'react';
import Icon from '../../ui/Icon.jsx';

/** Article de guide sur parchemin : sommaire + sections (paragraphes, listes, tableaux, encadrés). */
export default function GuideArticle({ guide, onExit, onRead, children }) {
  useEffect(() => {
    onRead?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section>
      <button onClick={onExit} className="mb-4 text-sm text-gold underline-offset-4 hover:underline">
        ← Tous les guides
      </button>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Sommaire" className="hidden lg:block">
          <ol className="sticky top-24 space-y-1 text-sm">
            {guide.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="block rounded border border-transparent px-3 py-1.5 text-parchment-dim hover:border-gold-dark/40 hover:text-gold-light">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="parchment p-5 sm:p-8">
          <p className="font-display text-xs uppercase tracking-[0.25em] text-blood">{guide.kicker}</p>
          <h2 className="text-2xl text-leather-900 sm:text-3xl">{guide.title}</h2>
          <p className="mt-3 text-[17px] italic text-leather-800">{guide.intro}</p>
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-leather-700/50 to-transparent" />
          <div className="space-y-8">
            {guide.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h3 className="flex items-center gap-2 text-xl text-leather-900">
                  {s.icon && <Icon name={s.icon} className="h-5 w-5 text-blood" />}
                  {s.title}
                </h3>
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-2 text-[16px]">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-3 space-y-1.5 text-[16px]">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-blood">◆</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[480px] border-collapse text-left text-[15px]">
                      <thead>
                        <tr className="border-b-2 border-leather-700/40 font-display text-xs uppercase tracking-wider text-leather-700">
                          {s.table.head.map((h, i) => (
                            <th key={h} className={`py-2 pr-3 ${s.table.numeric?.includes(i) ? 'text-right' : ''}`}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="tabular-nums">
                        {s.table.rows.map((row, ri) => (
                          <tr key={ri} className="border-b border-leather-700/20">
                            {row.map((cell, i) => (
                              <td key={i} className={`py-1.5 pr-3 align-top ${i === 0 ? 'font-semibold' : ''} ${s.table.numeric?.includes(i) ? 'text-right' : ''}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.callout && (
                  <aside className="mt-4 rounded border-l-4 border-blood bg-blood/10 p-4">
                    <p className="mb-1 font-display text-xs uppercase tracking-[0.2em] text-blood">{s.callout.title}</p>
                    <ul className="space-y-1.5 text-[15px]">
                      {s.callout.items.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </aside>
                )}
              </section>
            ))}
          </div>
          {children}
          <footer className="mt-8 flex justify-end border-t border-leather-700/30 pt-4">
            <button className="btn" onClick={onExit}>
              Terminer
            </button>
          </footer>
        </article>
      </div>
    </section>
  );
}
