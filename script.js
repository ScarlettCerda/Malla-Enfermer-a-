// Datos de los ramos por semestre
const semestres = {
  1: [
    "Fundamentos de Enfermería",
    "Química General y Orgánica",
    "Anatomía Humana",
    "Biología Celular y Genética",
    "Curso Sello Institucional I: Ingles I",
    "Formación Básica para la Vida Académica I"
  ],
  2: [
    "Cuidados Básicos de Enfermería",
    "Bioquímica",
    "Embriología e Histología",
    "Microbiologías y Parasitología",
    "Curso Sello Institucional II: Ingles II",
    "Formación Básica para la Vida Académica I"
  ],
  3: [
    "Procesos y Cuidados de Enfermería I",
    "Salud Publica",
    "Farmacología",
    "Fisiología",
    "Bioestadística",
    "Curso Sello Institucional III"
  ],
  4: [
    "Procesos y Cuidados de Enfermería II",
    "Farmacología Aplicada a la Enfermería",
    "Enfermería en Salud Familiar y Comunitaria I",
    "Fisiopatología",
    "Gestión y Administración en Salud",
    "Curso Sello Institucional IV"
  ],
  5: [
    "Enfermería en Salud de la Mujer",
    "Enfermería en Salud Familiar y Comunitaria II",
    "Enfermería en Médico Quirúrgico",
    "Enfermería en Gerontología y Geriatría",
    "Gestión y Administración en Servicios de Enfermería I",
    "Interdisciplinar A+S"
  ],
  6: [
    "Gestión y Administración en Servicios de Enfermería II",
    "Enfermería en Salud Familiar y Comunitaria II",
    "Enfermería en Médico Quirúrgico",
    "Enfermería en Gerontología y Geriatría",
    "Metodología de la Investigación",
    "Interdisciplinar I"
  ],
  7: [
    "Enfermería Pediátrica",
    "Enfermería en Salud Familiar y Comunitaria II",
    "Enfermería Urgencias",
    "Enfermería en Salud Mental I",
    "Investigación en Enfermería I",
    "Electivo Disciplinar I"
  ],
  8: [
    "Enfermería Pediátrica",
    "Enfermería en Salud Familiar y Comunitaria III",
    "Enfermería Urgencias",
    "Enfermería en Salud Mental II",
    "Investigación en Enfermería II",
    "Electivo Disciplinar II"
  ],
  9: ["Internado de Enfermería I"],
  10: ["Internado de Enfermería II"]
};

// Prerrequisitos
const prerequisitos = {
  "Cuidados Básicos de Enfermería": ["Fundamentos de Enfermería"],
  "Bioquímica": ["Química General y Orgánica"],
  "Embriología e Histología": ["Anatomía Humana"],
  "Microbiologías y Parasitología": ["Biología Celular y Genética"],
  "Curso Sello Institucional II: Ingles II": ["Curso Sello Institucional I: Ingles I"],
  "Procesos y Cuidados de Enfermería I": ["Cuidados Básicos de Enfermería"],
  "Farmacología": ["Bioquímica"],
  "Fisiología": ["Embriología e Histología"],
  "Procesos y Cuidados de Enfermería II": ["Procesos y Cuidados de Enfermería I"],
  "Farmacología Aplicada a la Enfermería": ["Farmacología"],
  "Enfermería en Salud Familiar y Comunitaria I": ["Salud Publica"],
  "Fisiopatología": ["Fisiología"],
  "Gestión y Administración en Salud": ["Bioestadística"],
  "Enfermería en Salud de la Mujer": ["Procesos y Cuidados de Enfermería II"],
  "Enfermería en Salud Familiar y Comunitaria II": ["Farmacología Aplicada a la Enfermería"],
  "Enfermería en Médico Quirúrgico": ["Fisiopatología"],
  "Enfermería en Gerontología y Geriatría": ["Enfermería en Salud Familiar y Comunitaria I"],
  "Gestión y Administración en Servicios de Enfermería I": ["Gestión y Administración en Salud"],
  "Gestión y Administración en Servicios de Enfermería II": ["Gestión y Administración en Servicios de Enfermería I"],
  "Metodología de la Investigación": ["Bioestadística"],
  "Investigación en Enfermería I": ["Metodología de la Investigación"],
  "Enfermería Pediátrica": ["Enfermería en Salud de la Mujer"],
  "Enfermería en Salud Familiar y Comunitaria III": ["Enfermería en Salud Familiar y Comunitaria II"],
  "Enfermería Urgencias": ["Enfermería en Médico Quirúrgico"],
  "Enfermería en Salud Mental II": ["Enfermería en Salud Mental I"],
  "Investigación en Enfermería II": ["Investigación en Enfermería I"],
  "Electivo Disciplinar II": ["Electivo Disciplinar I"]
};

const aprobados = new Set();

function crearMalla() {
  const container = document.getElementById("malla-container");
  for (let i = 1; i <= 10; i++) {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>Semestre ${i}</h2>`;
    semestres[i].forEach(ramo => {
      const btn = document.createElement("div");
      btn.className = "ramo";
      btn.textContent = ramo;

      if (!puedeActivarse(ramo)) btn.classList.add("bloqueado");

      btn.addEventListener("click", () => toggleRamo(btn, ramo));
      div.appendChild(btn);
    });
    container.appendChild(div);
  }
}

function puedeActivarse(ramo) {
  const prereqs = prerequisitos[ramo];
  if (!prereqs) return true;
  return prereqs.every(p => aprobados.has(p));
}

function toggleRamo(btn, ramo) {
  if (btn.classList.contains("bloqueado")) return;

  if (btn.classList.contains("aprobado")) {
    btn.classList.remove("aprobado");
    aprobados.delete(ramo);
  } else {
    btn.classList.add("aprobado");
    aprobados.add(ramo);
  }

  actualizarMalla();
}

function actualizarMalla() {
  document.querySelectorAll(".ramo").forEach(btn => {
    const ramo = btn.textContent;
    if (!btn.classList.contains("aprobado") && !puedeActivarse(ramo)) {
      btn.classList.add("bloqueado");
    } else {
      btn.classList.remove("bloqueado");
    }
  });
}

crearMalla();

