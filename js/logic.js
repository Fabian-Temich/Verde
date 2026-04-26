import { plantas } from "./data.js";

export function recomendarPlanta(luzUsuario, zonaUsuario) {
  return plantas
    .map(planta => {
      let score = 0;

      // La zona vale más que la luz (criterio principal)
      if (planta.zona === zonaUsuario) score += 2;
      if (planta.luz.includes(luzUsuario)) score += 1;

      return { ...planta, score };
    })
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score);
}