// Efecto de scroll suave y revelado de secciones
document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
  });
});

const track = document.getElementById("track");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

let index = 0;

nextBtn.addEventListener("click", () => {
  const cardWidth = document.querySelector(".project-card").offsetWidth + 32; // Ancho + gap
  const maxIndex =
    track.children.length -
    Math.floor(track.parentElement.offsetWidth / cardWidth);

  if (index < maxIndex) {
    index++;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  } else {
    index = 0; // Vuelve al inicio si quieres carrusel infinito
    track.style.transform = `translateX(0)`;
  }
});

prevBtn.addEventListener("click", () => {
  const cardWidth = document.querySelector(".project-card").offsetWidth + 32;
  if (index > 0) {
    index--;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});
