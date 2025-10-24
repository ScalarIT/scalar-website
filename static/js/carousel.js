// Carrusel de imágenes
const carousel = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const indicators = document.querySelectorAll('.carousel-indicator');
const slideDescription = document.getElementById('slide-description');

let currentSlide = 0;
// Detectar automáticamente el número de slides
const totalSlides = indicators.length;

function updateCarousel() {
  // Mover el carrusel
  carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  // Actualizar indicadores
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.remove('bg-slate-600');
      indicator.classList.add('bg-sky-400');
    } else {
      indicator.classList.remove('bg-sky-400');
      indicator.classList.add('bg-slate-600');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Event listeners
if (nextBtn) {
  nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
  prevBtn.addEventListener('click', prevSlide);
}

// Indicadores
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    currentSlide = index;
    updateCarousel();
  });
});

// Auto-play (opcional)
let autoplayInterval = setInterval(nextSlide, 5000);

// Pausar auto-play al interactuar
const carouselContainer = document.getElementById('carousel');
if (carouselContainer) {
  carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
  });

  carouselContainer.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
  });
}

// Soporte para gestos táctiles
let touchStartX = 0;
let touchEndX = 0;

if (carouselContainer) {
  carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
}

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide();
  }
  if (touchEndX > touchStartX + 50) {
    prevSlide();
  }
}
