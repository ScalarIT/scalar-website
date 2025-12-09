      // / Carrusel de imágenes con efecto 3D
      const carousel = document.getElementById("carousel-track");
      const prevBtn = document.getElementById("prev-btn");
      const nextBtn = document.getElementById("next-btn");
      const indicators = document.querySelectorAll(".carousel-indicator");
      const slideDescription = document.getElementById("slide-description");
      const slides = document.querySelectorAll(".carousel-slide");

      let currentSlide = 0;
      const totalSlides = slides.length;

      // Configuración del efecto 3D
      const config = {
        centerScale: 1, // Escala de la imagen central (100%)
        sideScale: 0.7, // Escala de las imágenes laterales (70%)
        sideOpacity: 0.6, // Opacidad de las laterales
        sideBlur: 4, // Blur en píxeles
        centerOffset: 0, // Offset horizontal del centro
        sideOffset: 400, // Distancia de las laterales respecto al centro
        hiddenOffset: 800, // Distancia de las imágenes ocultas
        zIndexCenter: 10, // z-index de la imagen central
        zIndexSide: 5, // z-index de las laterales
        zIndexHidden: 1, // z-index de las ocultas
      };

      function updateCarousel() {
        slides.forEach((slide, index) => {
          // Calcular la posición relativa respecto al slide actual
          let position = index - currentSlide;

          // Normalizar la posición para que sea circular
          if (position > totalSlides / 2) {
            position -= totalSlides;
          } else if (position < -totalSlides / 2) {
            position += totalSlides;
          }

          let transform = "";
          let opacity = 0;
          let blur = 0;
          let zIndex = config.zIndexHidden;
          let pointerEvents = "none";

          if (position === 0) {
            // Imagen central
            transform = `translateX(${config.centerOffset}px) scale(${config.centerScale})`;
            opacity = 1;
            blur = 0;
            zIndex = config.zIndexCenter;
            pointerEvents = "auto";
          } else if (position === -1) {
            // Imagen a la izquierda
            transform = `translateX(-${config.sideOffset}px) scale(${config.sideScale})`;
            opacity = config.sideOpacity;
            blur = config.sideBlur;
            zIndex = config.zIndexSide;
            pointerEvents = "auto";
          } else if (position === 1) {
            // Imagen a la derecha
            transform = `translateX(${config.sideOffset}px) scale(${config.sideScale})`;
            opacity = config.sideOpacity;
            blur = config.sideBlur;
            zIndex = config.zIndexSide;
            pointerEvents = "auto";
          } else {
            // Imágenes ocultas
            const direction = position > 0 ? 1 : -1;
            transform = `translateX(${
              direction * config.hiddenOffset
            }px) scale(0.5)`;
            opacity = 0;
            blur = config.sideBlur;
            zIndex = config.zIndexHidden;
          }

          // Aplicar estilos
          slide.style.transform = transform;
          slide.style.opacity = opacity;
          slide.style.filter = `blur(${blur}px)`;
          slide.style.zIndex = zIndex;
          slide.style.pointerEvents = pointerEvents;
        });

        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
          if (index === currentSlide) {
            indicator.classList.remove("bg-slate-600");
            indicator.classList.add("bg-sky-400");
          } else {
            indicator.classList.remove("bg-sky-400");
            indicator.classList.add("bg-slate-600");
          }
        });

        // Actualizar descripción (opcional)
        updateDescription();
      }

      function updateDescription() {
        const descriptions = [
          "Pantalla splash",
          "Cotizaciones del dolar en tiempo real",
          "Convertidor de los distintos tipos de dolar del mercado",
          "Detalle de cada dolar histórico",
        ];

        if (slideDescription && descriptions[currentSlide]) {
          slideDescription.textContent = descriptions[currentSlide];
        }
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
        nextBtn.addEventListener("click", nextSlide);
      }

      if (prevBtn) {
        prevBtn.addEventListener("click", prevSlide);
      }

      // Indicadores
      indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
          currentSlide = index;
          updateCarousel();
        });
      });

      // Click en imágenes laterales para navegar
      slides.forEach((slide, index) => {
        slide.addEventListener("click", () => {
          const position = index - currentSlide;
          if (position === 1 || position === -(totalSlides - 1)) {
            nextSlide();
          } else if (position === -1 || position === totalSlides - 1) {
            prevSlide();
          }
        });
      });

      // Auto-play (opcional)
      let autoplayInterval = setInterval(nextSlide, 5000);

      // Pausar auto-play al interactuar
      const carouselContainer = document.getElementById("carousel");
      if (carouselContainer) {
        carouselContainer.addEventListener("mouseenter", () => {
          clearInterval(autoplayInterval);
        });

        carouselContainer.addEventListener("mouseleave", () => {
          autoplayInterval = setInterval(nextSlide, 5000);
        });
      }

      // Soporte para gestos táctiles
      let touchStartX = 0;
      let touchEndX = 0;

      if (carouselContainer) {
        carouselContainer.addEventListener("touchstart", (e) => {
          touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener("touchend", (e) => {
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

      // Inicializar el carrusel
      updateCarousel();
