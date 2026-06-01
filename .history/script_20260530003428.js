document.addEventListener("DOMContentLoaded", () => {
  // 1. Lógica del Carrusel
  const track = document.getElementById("track");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  let index = 0;

  const updateCarousel = () => {
    const cardWidth = document.querySelector(".project-card").offsetWidth + 32;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  };

  nextBtn.addEventListener("click", () => {
    const cardsVisible = Math.floor(
      track.parentElement.offsetWidth /
        document.querySelector(".project-card").offsetWidth
    );
    if (index < track.children.length - cardsVisible) {
      index++;
    } else {
      index = 0;
    }
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  // 2. Efecto Revelado al hacer Scroll
  const observerOptions = { threshold: 0.1 };
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
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
  });

  window.addEventListener("resize", updateCarousel);
});
