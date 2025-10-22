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
