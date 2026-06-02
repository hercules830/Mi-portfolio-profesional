document.addEventListener("DOMContentLoaded", () => {
  // 1. LÓGICA DEL MODAL (ZOOM DE IMÁGENES)
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgFull");
  const span = document.querySelector(".close");

  document.querySelectorAll(".zoomable").forEach((img) => {
    img.addEventListener("click", function () {
      if (modal && modalImg) {
        modal.style.display = "flex";
        modalImg.src = this.src;
      }
    });
  });

  if (span) {
    span.onclick = () => {
      modal.style.display = "none";
    };
  }

  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    };
  }

  // 2. LÓGICA DE ANIMACIÓN LIMPIA Y DEFINITIVA
  // Seleccionamos exclusivamente los elementos a animar
  const itemsToAnimate = document.querySelectorAll(
    ".section-title, .featured-project, .skill-card"
  );

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        // Cuando el elemento entra en la pantalla
        if (entry.isIntersecting) {
          // Le agregamos la clase que dispara la transición CSS
          entry.target.classList.add("visible");
          // Dejamos de observarlo para que no se vuelva a animar
          observerInstance.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Se activa cuando asoma el 10%
      rootMargin: "0px 0px -50px 0px", // El margen de -50px da el efecto elegante en PC
    }
  );

  // Iniciamos la observación
  itemsToAnimate.forEach((item) => {
    observer.observe(item);
  });
});
