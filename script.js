document.addEventListener("DOMContentLoaded", () => {
  // 1. Lógica del Modal (Zoom)
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgFull");
  const span = document.querySelector(".close");

  document.querySelectorAll(".zoomable").forEach((img) => {
    img.onclick = function () {
      modal.style.display = "flex";
      modalImg.src = this.src;
    };
  });

  span.onclick = () => (modal.style.display = "none");
  modal.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
  };

  // 2. Lógica de Revelado (Intersection Observer)
  const observerOptions = {
    threshold: 0.1, // Se activa apenas asoma el 10% del elemento
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section, .featured-project").forEach((el) => {
    observer.observe(el);
  });

  // 3. Fix para Celulares (Forzar detección al cargar)
  // Esto hace que las primeras secciones aparezcan solas sin tocar la pantalla
  setTimeout(() => {
    window.dispatchEvent(new Event("scroll"));
  }, 500);
});
