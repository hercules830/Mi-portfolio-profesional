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

  // 2. LÓGICA DE REVELADO (INTERSECTION OBSERVER) RESTAURADA
  // Seleccionamos los elementos individuales que configuramos en el CSS
  const items = document.querySelectorAll(".section-title, .featured-project, .skill-card");

  const observerOptions = {
    // threshold: 0.05 significa que asomando el 5% del proyecto, se activa.
    // Al ser un valor pequeño, no falla en móviles y se ve natural en PC.
    threshold: 0.05,
    // Le regresamos el -50px para que haya ese margen visual bonito antes de que aparezcan
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // Si el elemento cruza el umbral definido
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Dejamos de observarlo para que no se vuelva a animar al subir
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Le asignamos el observador a cada elemento
  items.forEach((item) => {
    observer.observe(item);
  });
});