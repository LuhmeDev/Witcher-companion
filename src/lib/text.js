/** Minuscules sans accents, pour une recherche tolérante ("dimerite" trouve "Diméritium"). */
export function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

export const formatCrowns = (n) => `${n.toLocaleString('fr-FR')} cour.`;
