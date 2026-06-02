document.addEventListener("DOMContentLoaded", () => {
  // 1. Lógica del Modal (Zoom de Imágenes)
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

  // 2. Lógica de Revelado Automático (Intersection Observer)
  const items = document.querySelectorAll(".section, .featured-project");

  const observerOptions = {
    threshold: 0.1, // Se activa apenas entra un 10% del elemento
    rootMargin: "0px 0px -50px 0px", // Se activa un poco antes de llegar para fluidez
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  items.forEach((item) => observer.observe(item));

  // 3. FIX CRÍTICO PARA CELULARES:
  // Algunos navegadores móviles no disparan el Observer hasta que hay interacción.
  // Esto fuerza un "refresh" visual que activa las animaciones automáticamente.
  setTimeout(() => {
    window.dispatchEvent(new Event("scroll"));
    // Si aún no se ve nada en 1 segundo (por seguridad), mostramos las secciones superiores
    items.forEach((item, index) => {
      if (index < 2) item.classList.add("visible");
    });
  }, 300);
});
