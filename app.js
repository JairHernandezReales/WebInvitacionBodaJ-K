// FECHA DEL EVENTO
const weddingDate = new Date("Jul 20, 2026 17:00:00").getTime();
const music = document.getElementById("music");
const btn = document.getElementById("musicBtn");

let playing = false;

// activar con botón
btn.addEventListener("click", () => {
  if(!playing){
    music.play();
    btn.innerHTML = "🔊";
    playing = true;
  }else{
    music.pause();
    btn.innerHTML = "🔇";
    playing = false;
  }
});

// activar automáticamente al primer clic en pantalla
document.body.addEventListener("click", () => {
  if(!playing){
    music.play();
    playing = true;
  }
}, { once: true });

document.addEventListener("mousemove", startMusic);
document.addEventListener("scroll", startMusic);
document.addEventListener("touchstart", startMusic);

function startMusic() {
  const music = document.getElementById("music");
  music.play();

  document.removeEventListener("mousemove", startMusic);
  document.removeEventListener("scroll", startMusic);
  document.removeEventListener("touchstart", startMusic);
}

const interval = setInterval(() => {

  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

}, 1000);

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.15
});

reveals.forEach(el => observer.observe(el));


//  Conexion a google form desde js

document.getElementById("formAsistencia").addEventListener("submit", function(e) {
  e.preventDefault();

  let form = this;

  let datos = new FormData();

  datos.append("entry.2092238618", form.nombre.value);
  datos.append("entry.2000174007", form.acompanantes.value);
  datos.append("entry.1495685309", form.nombresAcompanantes.value);
  datos.append("entry.1653027947", form.asistencia.value);
  datos.append("entry.1557746772", form.regalo.value);
  datos.append("entry.1321647054", form.mensaje.value);
  datos.append("entry.913320467", form.cancion.value);

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSf9q_Q3aaAsLtTI6okYOaFOTrupnUzv48NzxCAqzbBCZIctTg/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: datos
  });

  form.reset();
  cerrarFormulario();
});

function abrirFormulario(){
  document.getElementById("modalFormulario").style.display = "block";

  if(window.nombreInvitado){
    document.getElementById("nombreInput").value = window.nombreInvitado;
  }

  // 🔥 generar opciones según el invitado
  generarOpcionesAcompanantes();
}

function cerrarFormulario() {
  document.getElementById("modalFormulario").style.display = "none";
}

// Cerrar al hacer clic fuera
window.onclick = function(e) {
  let modal = document.getElementById("modalFormulario");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

function abrirGracias(){
  document.getElementById("modalGracias").style.display = "block";
}

function cerrarGracias(){
  document.getElementById("modalGracias").style.display = "none";
}

// Capturar envío
document.getElementById("formAsistencia").addEventListener("submit", function(e) {
  e.preventDefault();
  cerrarFormulario();
  abrirGracias();
});

// ABRIR / CERRAR MODAL
function abrirPin() {
  document.getElementById("modalPin").style.display = "block";
}

function cerrarPin() {
  document.getElementById("modalPin").style.display = "none";
}

function mostrarBienvenida(nombre){
  document.getElementById("bienvenido").innerText = "Bienvenido/a " + nombre + " 🌻";
}
