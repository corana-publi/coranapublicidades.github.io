
    // Mostrar el botón al desplazarse
    const btnArriba = document.getElementById("btnArriba");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            btnArriba.classList.add("show");
        } else {
            btnArriba.classList.remove("show");
        }
    });

    document.addEventListener("DOMContentLoaded", () => {
      const circles = document.querySelectorAll(".circle");
  
      circles.forEach((circle) => {
          const porcentaje = circle.getAttribute("data-porcentaje");
          const colorPrincipal = "#282929"; // Color del progreso
          const colorFondo = "#ddd"; // Color del fondo
  
          // Calcular el ángulo del gradiente
          const angulo = (porcentaje / 100) * 360;
  
          // Aplicar el gradiente dinámicamente
          circle.style.background = `
              conic-gradient(
                  ${colorPrincipal} 0% ${angulo}deg, 
                  ${colorFondo} ${angulo}deg 360deg
              )
          `;
      });
  });

  // Función para animar los porcentajes
function animarPorcentaje(circle) {
  const porcentaje = circle.getAttribute('data-porcentaje'); // Obtén el porcentaje
  const innerText = circle.querySelector('.percent h3'); // Texto dentro del círculo
  let start = 0; // Inicio del porcentaje

  // Animación del gradiente y el texto
  const animation = setInterval(() => {
      start++;
      circle.style.background = `conic-gradient(#282929 0% ${start}%, #ddd ${start}% 100%)`;
      innerText.innerHTML = `${start}<span>%</span>`;
      if (start == porcentaje) {
          clearInterval(animation); // Detiene la animación al llegar al porcentaje
      }
  }, 20); // Velocidad de la animación
}

// Configuración del Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          // Si el círculo entra en la vista, anima el porcentaje
          animarPorcentaje(entry.target);
          observer.unobserve(entry.target); // Deja de observar el círculo para evitar repetir la animación
      }
  });
}, {
  threshold: 0.5 // Dispara la animación cuando el 50% del círculo es visible
});

// Selecciona todos los círculos y los observa
document.querySelectorAll('.circle').forEach(circle => {
  observer.observe(circle);
});

