import { useEffect } from 'react';
import NavBar from './components/NavBar.jsx';
import ComponentBank from './features/database/ComponentBank.jsx';
import TutorialHub from './features/tutorials/TutorialHub.jsx';
import Calculator from './features/calculator/Calculator.jsx';
import CrafterDirectory from './features/crafters/CrafterDirectory.jsx';
import Bestiary from './features/bestiary/Bestiary.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';

export default function App() {
  const [tab, setTab] = useLocalStorage('tab', 'database');

  useEffect(() => window.scrollTo({ top: 0 }), [tab]);

  return (
    <div className="min-h-screen pb-24 md:pb-10">
      <NavBar active={tab} onChange={setTab} />
      <main className="mx-auto max-w-6xl px-4 pt-6">
        {tab === 'database' && <ComponentBank />}
        {tab === 'guides' && <TutorialHub />}
        {tab === 'calculator' && <Calculator />}
        {tab === 'crafters' && <CrafterDirectory />}
        {tab === 'bestiary' && <Bestiary />}
      </main>
      <footer className="mx-auto mt-12 max-w-6xl px-4 text-center text-xs text-parchment-dim/70">
        Guide de fan non officiel. The Witcher® est une marque de CD PROJEKT S.A. Prix de base indicatifs : ils varient selon le
        marchand, la région et la difficulté. Les sources de butin sont indicatives et peuvent varier selon la version du jeu.
      </footer>
    </div>
  );
}
