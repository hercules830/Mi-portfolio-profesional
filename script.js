document.addEventListener("DOMContentLoaded", () => {
  // 1. Lógica del Modal (Zoom de Imágenes)
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgFull");
  const span = document.getElementsByClassName("close")[0];

  document.querySelectorAll(".zoomable").forEach((img) => {
    img.onclick = function () {
      modal.style.display = "block";
      modalImg.src = this.src;
    };
  });

  span.onclick = function () {
    modal.style.display = "none";
  };

  modal.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  // 2. Efecto Revelado al hacer Scroll (Intersection Observer)
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".section, .featured-project").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
  });
});
