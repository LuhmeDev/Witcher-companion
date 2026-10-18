import { useEffect, useState } from 'react';

const PREFIX = 'w3craft:';

function read(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * État React persistant dans le LocalStorage (préfixe "w3craft:").
 * Tolère un stockage indisponible (navigation privée, quotas) : l'app
 * fonctionne alors normalement, sans sauvegarde.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => read(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* stockage indisponible : on ignore */
    }
  }, [key, value]);

  return [value, setValue];
}
