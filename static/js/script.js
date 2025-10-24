// Inicializar Lucide Icons
lucide.createIcons();

// Lógica para el menú móvil
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Cerrar menú móvil al hacer clic en un enlace
const mobileLinks = mobileMenu.getElementsByTagName("a");
for (let link of mobileLinks) {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
}

// Cambiar el fondo del header al hacer scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("py-2");
    header.classList.remove("py-4");
  } else {
    header.classList.add("py-4");
    header.classList.remove("py-2");
  }
});

// Marcar sección activa en la navbar
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function highlightActiveSection() {
  const scrollPosition = window.scrollY + 100; // Offset para activar antes

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("text-sky-400", "border-b-2", "border-sky-400");
        link.classList.add("text-slate-200");
        
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.remove("text-slate-200");
          link.classList.add("text-sky-400", "border-b-2", "border-sky-400");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightActiveSection);
window.addEventListener("load", highlightActiveSection);
