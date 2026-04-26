import { recomendarPlanta } from "./logic.js";

// Estado de selección
const seleccion = { zona: null, luz: null };

// Botones de opción
document.querySelectorAll(".opt-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const grupo = btn.dataset.grupo;

    // Deseleccionar otros del mismo grupo
    document.querySelectorAll(`[data-grupo="${grupo}"]`).forEach(b =>
      b.classList.remove("selected")
    );

    btn.classList.add("selected");
    seleccion[grupo] = btn.dataset.val;

    // Habilitar el botón principal cuando ambos están seleccionados
    const cta = document.getElementById("btn-recomendar");
    cta.disabled = !(seleccion.zona && seleccion.luz);
  });
});

// Botón principal
document.getElementById("btn-recomendar").addEventListener("click", () => {
  const resultados = recomendarPlanta(seleccion.luz, seleccion.zona);
  renderResultados(resultados);
});

function renderResultados(plantas) {
  const contenedor = document.getElementById("resultado");
  const maxScore = plantas[0]?.score ?? 0;

  if (plantas.length === 0) {
    contenedor.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">🪴</span>
        <p>Sin resultados para esta combinación.</p>
        <small>Prueba con otra zona o nivel de luz.</small>
      </div>`;
    return;
  }

  contenedor.innerHTML = plantas.map(p => {
    const perfecta = p.score === maxScore && p.score >= 3;
    return `
      <div class="card ${perfecta ? "card--perfecta" : ""}">
        <span class="badge ${perfecta ? "badge--perfecta" : "badge--parcial"}">
          ${perfecta ? "Coincidencia perfecta" : "Coincidencia parcial"}
        </span>
        <h3 class="card-nombre">${p.nombre}</h3>
        <p class="card-cientifico">${p.cientifico}</p>
        <div class="card-meta">
          <span class="meta-pill">💧 Riego cada ${p.riego} días</span>
          <span class="meta-pill">☀️ Luz ${p.luz.join(" / ")}</span>
        </div>
        <p class="card-obs">${p.observaciones}</p>
      </div>`;
  }).join("");
}