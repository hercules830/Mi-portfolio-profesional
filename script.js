document.addEventListener("DOMContentLoaded", () => {
  // 1. LÓGICA DEL MODAL (ZOOM DE IMÁGENES)
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgFull");
  const span = document.querySelector(".close");

  // Al hacer clic en cualquier imagen con la clase .zoomable
  document.querySelectorAll(".zoomable").forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "flex"; // Usamos flex para centrar la imagen
      modalImg.src = this.src;
    });
  });

  // Cerrar el modal al dar clic en la (X)
  if (span) {
    span.onclick = () => {
      modal.style.display = "none";
    };
  }

  // Cerrar el modal al dar clic fuera de la imagen
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  // 2. LÓGICA DE REVELADO (INTERSECTION OBSERVER) MEJORADA
  const items = document.querySelectorAll(
    ".section-title, .featured-project, .skill-card"
  );

  const observerOptions = {
    root: null,
    threshold: 0.1,
    // Dejamos el rootMargin en 0px. Los márgenes negativos causan bugs en celulares
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  items.forEach((item) => {
    observer.observe(item);
  });

  // 3. FIX A PRUEBA DE FALLOS PARA MOVILES (FALLBACK)
  const forceReveal = () => {
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      // Si el elemento asoma en pantalla (incluso un poco), forzamos que aparezca
      if (rect.top < window.innerHeight + 150) {
        item.classList.add("visible");
      }
    });
  };

  // Ejecutamos el parche al cargar
  forceReveal();
  setTimeout(forceReveal, 500);

  // EVENTO DE RESPALDO: Si el Observer falla en el celular, el simple hecho de scrollear lo revelará.
  window.addEventListener("scroll", forceReveal, { passive: true });
});
