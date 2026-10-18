import { useEffect, useState } from 'react';
import { CHAPTERS, GEAR_TIERS, LEVELS, QUIZ } from '../../data/mastery.js';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';
import Icon from '../../ui/Icon.jsx';

const STEPS = [...CHAPTERS.map((c) => ({ id: c.id, title: c.title, level: c.level })), { id: 'quiz', title: 'L\'épreuve' }];
const levelOf = (id) => LEVELS.find((l) => l.id === id);

function Medallion({ level, size = 'h-16 w-16 text-xl' }) {
  const l = levelOf(level);
  return (
    <span className={`grid shrink-0 place-items-center rounded-full border-2 bg-leather-900 font-display ${l.ring} ${l.color} ${size}`}>
      {l.short}
    </span>
  );
}

function Tips({ tips }) {
  if (!tips?.length) return null;
  return (
    <aside className="mt-6 rounded border-l-4 border-blood bg-blood/10 p-4">
      <p className="mb-1 font-display text-xs uppercase tracking-[0.2em] text-blood">Conseil de sorceleur</p>
      <ul className="space-y-1.5 text-[15px]">
        {tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </aside>
  );
}

function TierTable({ highlight }) {
  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b-2 border-leather-700/40 font-display text-xs uppercase tracking-wider text-leather-700">
            <th className="py-2 pr-3">Palier de schéma</th>
            <th className="py-2 pr-3">Artisan minimum</th>
            <th className="py-2">Exemple</th>
          </tr>
        </thead>
        <tbody>
          {GEAR_TIERS.map((t) => {
            const on = highlight ? t.level === highlight : true;
            return (
              <tr key={t.tier} className={`border-b border-leather-700/20 ${on ? '' : 'opacity-40'}`}>
                <td className="py-2 pr-3 font-semibold">{t.tier}</td>
                <td className="py-2 pr-3">{levelOf(t.level).label}</td>
                <td className="py-2">
                  {t.example}
                  <span className="block text-xs italic text-leather-700">{t.note}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function BasesChapter({ chapter }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {chapter.columns.map((col) => (
          <div key={col.title} className="rounded border border-leather-700/30 bg-white/25 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-leather-800 text-gold-light">
                <Icon name={col.icon} className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg text-leather-900">{col.title}</h3>
                <p className="text-xs italic text-leather-700">{col.en}</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1.5 text-[15px]">
              {col.points.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-blood">◆</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="font-display text-xs uppercase tracking-[0.2em] text-leather-700">Les quatre rangs d'artisan</p>
        <div className="mt-3 flex items-center justify-between gap-1">
          {LEVELS.map((l, i) => (
            <div key={l.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1 text-center">
                <Medallion level={l.id} size="h-11 w-11 text-sm" />
                <span className="text-xs font-semibold sm:text-sm">{l.label}</span>
              </div>
              {i < LEVELS.length - 1 && <span className="mx-1 mb-5 h-px flex-1 bg-leather-700/40" />}
            </div>
          ))}
        </div>
      </div>
      <Tips tips={chapter.tips} />
    </>
  );
}

function LevelChapter({ chapter }) {
  return (
    <>
      <ul className="space-y-2 text-[16px]">
        {chapter.points.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="text-blood">◆</span>
            {p}
          </li>
        ))}
      </ul>
      {chapter.where.length > 0 && (
        <div className="mt-6">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-leather-700">Où les trouver</p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {chapter.where.map((w) => (
              <div key={w.name} className="rounded bg-leather-900 p-4 text-parchment shadow-md">
                <p className="font-display text-lg text-gold-light">{w.name}</p>
                <p className="text-sm italic text-parchment-dim">{w.role}</p>
                <p className="mt-2 flex items-start gap-1.5 text-sm">
                  <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {w.place}
                </p>
                <p className="mt-1 flex items-start gap-1.5 text-sm">
                  <Icon name="book" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  {w.quest}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <TierTable highlight={chapter.level} />
      <Tips tips={chapter.tips} />
    </>
  );
}

function Quiz({ answers, onAnswer, onRetry }) {
  const score = QUIZ.filter((q, i) => answers[i] === q.answer).length;
  const finished = Object.keys(answers).length === QUIZ.length;
  return (
    <>
      <p className="text-[16px]">Trois questions pour vérifier que tu sais à quel artisan confier tes schémas.</p>
      <ol className="mt-4 space-y-5">
        {QUIZ.map((q, i) => {
          const picked = answers[i];
          return (
            <li key={q.q}>
              <p className="font-semibold">
                {i + 1}. {q.q}
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {q.options.map((opt, j) => {
                  const state =
                    picked == null ? '' : j === q.answer ? 'border-emerald-700 bg-emerald-700/15' : j === picked ? 'border-blood bg-blood/15' : 'opacity-50';
                  return (
                    <button
                      key={opt}
                      disabled={picked != null}
                      onClick={() => onAnswer(i, j)}
                      className={`rounded border border-leather-700/40 bg-white/30 px-3 py-2 text-left text-[15px] transition-colors enabled:hover:border-leather-900 ${state}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {picked != null && (
                <p className={`mt-2 text-sm ${picked === q.answer ? 'text-emerald-800' : 'text-blood'}`}>
                  {picked === q.answer ? 'Exact. ' : 'Raté. '}
                  {q.why}
                </p>
              )}
            </li>
          );
        })}
      </ol>
      {finished && (
        <div className="mt-6 rounded bg-leather-900 p-4 text-center text-parchment">
          <p className="font-display text-xl text-gold-light">
            {score === QUIZ.length ? 'Digne d\'un maître artisan !' : `${score} / ${QUIZ.length} bonnes réponses`}
          </p>
          <button className="btn mt-3" onClick={onRetry}>
            Recommencer l'épreuve
          </button>
        </div>
      )}
      <p className="mt-8 font-display text-xs uppercase tracking-[0.2em] text-leather-700">Récapitulatif des paliers</p>
      <TierTable />
    </>
  );
}

export default function MasteryGuide({ onExit }) {
  const [progress, setProgress] = useLocalStorage('mastery-progress', { read: [], step: 0, quiz: {} });
  const p = { read: [], step: 0, quiz: {}, ...progress };
  const [step, setStep] = useState(Math.min(p.step, STEPS.length - 1));
  const current = STEPS[step];
  const chapter = CHAPTERS.find((c) => c.id === current.id);

  // Un chapitre affiché compte comme lu ; on mémorise aussi où reprendre.
  useEffect(() => {
    setProgress((prev) => {
      const base = { read: [], quiz: {}, ...prev };
      const read = base.read.includes(current.id) ? base.read : [...base.read, current.id];
      return { ...base, read, step };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const answer = (i, j) => setProgress({ ...p, quiz: { ...p.quiz, [i]: j } });

  return (
    <section>
      <button onClick={onExit} className="mb-4 text-sm text-gold underline-offset-4 hover:underline">
        ← Tous les guides
      </button>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <nav aria-label="Chapitres" className="scrollbar-thin -mx-4 overflow-x-auto px-4 lg:mx-0 lg:overflow-visible lg:px-0">
          <ol className="flex gap-2 lg:sticky lg:top-24 lg:flex-col">
            {STEPS.map((s, i) => {
              const read = p.read.includes(s.id);
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    onClick={() => setStep(i)}
                    aria-current={i === step ? 'step' : undefined}
                    className={`flex w-full items-center gap-2 rounded border px-3 py-2 text-left text-sm transition-colors ${
                      i === step
                        ? 'border-gold bg-gold/15 text-gold-light'
                        : 'border-gold-dark/30 bg-leather-900/80 text-parchment-dim hover:border-gold-dark'
                    }`}
                  >
                    <span
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-[11px] ${
                        read ? 'border-gold bg-gold text-leather-950' : 'border-gold-dark'
                      }`}
                    >
                      {read ? <Icon name="check" className="h-3.5 w-3.5" /> : i + 1}
                    </span>
                    <span className="whitespace-nowrap font-display tracking-wide">{s.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 hidden text-xs text-parchment-dim lg:block">
            {p.read.length}/{STEPS.length} chapitres lus
          </p>
        </nav>

        <article className="parchment p-5 sm:p-8">
          <header className="flex items-center gap-4">
            {chapter?.level && <Medallion level={chapter.level} />}
            <div>
              <p className="font-display text-xs uppercase tracking-[0.25em] text-blood">
                {chapter ? chapter.kicker : 'Chapitre VI · Épreuve finale'}
              </p>
              <h2 className="text-2xl text-leather-900 sm:text-3xl">{current.title}</h2>
            </div>
          </header>
          {chapter?.intro && <p className="mt-4 text-[17px] italic text-leather-800">{chapter.intro}</p>}
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-leather-700/50 to-transparent" />

          {current.id === 'bases' && <BasesChapter chapter={chapter} />}
          {chapter?.level && <LevelChapter chapter={chapter} />}
          {current.id === 'quiz' && (
            <Quiz answers={p.quiz} onAnswer={answer} onRetry={() => setProgress({ ...p, quiz: {} })} />
          )}

          <footer className="mt-8 flex items-center justify-between gap-3 border-t border-leather-700/30 pt-4">
            <button className="btn" disabled={step === 0} onClick={() => setStep(step - 1)}>
              ← Précédent
            </button>
            <span className="text-sm text-leather-700">
              {step + 1} / {STEPS.length}
            </span>
            {step < STEPS.length - 1 ? (
              <button className="btn btn-blood" onClick={() => setStep(step + 1)}>
                Suivant →
              </button>
            ) : (
              <button className="btn" onClick={onExit}>
                Terminer
              </button>
            )}
          </footer>
        </article>
      </div>
    </section>
  );
}
