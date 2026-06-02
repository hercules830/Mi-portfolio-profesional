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

  // 2. LÓGICA DE REVELADO (INTERSECTION OBSERVER)
  // Seleccionamos todas las secciones y los proyectos
  const items = document.querySelectorAll(".section, .featured-project");

  const observerOptions = {
    // threshold: 0.1 significa que en cuanto asome el 10% del elemento, se activa.
    // Esto es vital para celulares donde los elementos son muy largos.
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Añadimos la clase .visible que definimos en el CSS
        entry.target.classList.add("visible");
        // Una vez que aparece, dejamos de observarlo para ahorrar recursos
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  items.forEach((item) => {
    observer.observe(item);
  });

  // 3. FIX DE SEGURIDAD PARA CELULARES
  // Algunos navegadores móviles pausan el sensor hasta que detectan movimiento real.
  // Este código fuerza al navegador a "despertar" y mostrar los proyectos de inmediato.
  const forceReveal = () => {
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      // Si el elemento ya está en el área visible del celular, forzamos la clase
      if (rect.top < window.innerHeight) {
        item.classList.add("visible");
      }
    });
  };

  // Ejecutar el fix al cargar y tras un pequeño delay
  forceReveal();
  setTimeout(forceReveal, 500);

  // Truco extra: disparar un pequeño scroll invisible
  setTimeout(() => {
    window.scrollTo(window.scrollX, window.scrollY + 1);
    window.scrollTo(window.scrollX, window.scrollY - 1);
  }, 300);
});
