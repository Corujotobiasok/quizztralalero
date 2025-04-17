const personajes = [
  { nombre: "Bombardiro Crocodilo", imagen: "assets/bombardiro.png" },
  { nombre: "Tung Tung Tung Tung Sahur", imagen: "assets/tung.png" },
  { nombre: "Tralalero Tralalá", imagen: "assets/tralalero.png" },
  { nombre: "Boneca Ambalabu", imagen: "assets/boneca.png" },
  { nombre: "Vaca Saturna Saturnita", imagen: "assets/vaca.png" },
  { nombre: "Bobrito Bandito", imagen: "assets/bobrito.png" },
  { nombre: "Tripi Troppa Troppa Trippa", imagen: "assets/tripitropa.png" },
  { nombre: "Chimpanzini Bananini", imagen: "assets/bananini.png" },
  { nombre: "Glorbo Fruttodrillo", imagen: "assets/glorbo.png" },
  { nombre: "Lirilí Larilá", imagen: "assets/lirili.png" },
  { nombre: "Perochello Lemonchello", imagen: "assets/perochello.png" },
  { nombre: "Udin Din Din Dun", imagen: "assets/udin.png" },
  { nombre: "Capuccino Assassino", imagen: "assets/capuccino.png" },
  { nombre: "Ballerina Cappuccina", imagen: "assets/ballerina.png" },
  { nombre: "Bombombini Gusini", imagen: "assets/bombombini.png" },
  { nombre: "Brr Brr Patapim", imagen: "assets/brbr.png" },
  { nombre: "Bri Bri Bicus Dicus", imagen: "assets/bribri.png" },
  { nombre: "Trulimero Truchini", imagen: "assets/trulimero.png" },
  { nombre: "Burbaloni Luliloli", imagen: "assets/burbaloni.png" },
  { nombre: "Crocodildo Penisini", imagen: "assets/crocodilo.png" },
  { nombre: "Trippi Troppi", imagen: "assets/trippi.png" },
  { nombre: "Bombombom Tigerlini Watermelini", imagen: "assets/bombombom.png" },
];

let currentCharacter = null;
let score = 0;
let timeLeft = 5;
let timer;
let correctAnswers = 0;

// Cargar sonido
const perderSound = new Audio('assets/perder.mp3');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function cargarNuevoPersonaje() {
  clearInterval(timer);
  timeLeft = 5;
  document.getElementById("time").textContent = `Tiempo restante: ${timeLeft}s`;

  currentCharacter = personajes[getRandomInt(personajes.length)];
  document.getElementById("character-image").src = currentCharacter.imagen;
  document.getElementById("character-image").alt = currentCharacter.nombre;

  const opciones = [currentCharacter.nombre];
  while (opciones.length < 4) {
    const opc = personajes[getRandomInt(personajes.length)].nombre;
    if (!opciones.includes(opc)) opciones.push(opc);
  }

  const mezcladas = shuffleArray(opciones);
  const contenedor = document.getElementById("options-container");
  contenedor.innerHTML = "";

  mezcladas.forEach(nombre => {
    const btn = document.createElement("button");
    btn.textContent = nombre;
    btn.className = "option-button";
    btn.onclick = () => verificarRespuesta(nombre);
    contenedor.appendChild(btn);
  });

  startTimer();
}

function verificarRespuesta(nombreSeleccionado) {
  if (nombreSeleccionado !== currentCharacter.nombre) {
    perderSound.play(); // Reproduce el sonido de perder
    clearInterval(timer);
    setTimeout(showResults, 300);
  } else {
    score += 10;
    correctAnswers++;
    document.getElementById("score").textContent = score;
    clearInterval(timer);
    setTimeout(cargarNuevoPersonaje, 300);
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("time").textContent = `Tiempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      perderSound.play(); // También reproducir sonido si se acaba el tiempo
      clearInterval(timer);
      setTimeout(showResults, 300);
    }
  }, 1000);
}

function showResults() {
  document.getElementById("game-screen").style.display = "none";
  const result = document.getElementById("result-screen");
  result.style.display = "flex";
  document.getElementById("final-stats").innerHTML = `
    Respuestas correctas: ${correctAnswers}<br>
    Puntaje final: ${score}
  `;
}

function restartGame() {
  score = 0;
  correctAnswers = 0;
  document.getElementById("score").textContent = score;
  document.getElementById("result-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
}

function volverAlInicio() {
  clearInterval(timer);
  document.getElementById("game-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "flex";
}

function startGame() {
  score = 0;
  correctAnswers = 0;
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "flex";
  document.getElementById("score").textContent = score;
  cargarNuevoPersonaje();
}

document.getElementById("start-button").addEventListener("click", startGame);
