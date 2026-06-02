document.addEventListener("DOMContentLoaded", () => {
  // 1. MODAL LOGIC
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgFull");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".zoomable").forEach((img) => {
    img.addEventListener("click", () => {
      modal.classList.add("active");
      modalImg.src = img.src;
    });
  });

  const closeModal = () => {
    modal.classList.remove("active");
    modalImg.src = "";
  };

  closeBtn.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  // 2. REVEAL ANIMATION (Intersection Observer)
  // Añadimos la clase 'reveal' dinámicamente para no romper la página si JS falla
  const sections = document.querySelectorAll(".section, .featured-project");

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.classList.add("reveal"); // Se ocultan solo cuando JS carga
    observer.observe(section);
  });
});
