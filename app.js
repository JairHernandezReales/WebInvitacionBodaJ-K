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