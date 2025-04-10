// Código específico para el carrusel de imágenes
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) return;
    
    // Crear estructura del carrusel si no existe
    if (!document.querySelector('.carousel')) {
        createCarouselStructure();
    }
    
    const carousel = document.querySelector('.carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dotsContainer = document.querySelector('.carousel-dots');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    
    let currentSlide = 0;
    let interval;
    
    // Inicializar el carrusel
    function initCarousel() {
        // Mostrar el primer slide
        showSlide(currentSlide);
        
        // Crear indicadores (dots)
        createDots();
        
        // Configurar eventos de botones
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
        
        // Iniciar autoplay
        startAutoplay();
        
        // Detener autoplay al pasar el mouse
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }
    
    // Crear estructura del carrusel
    function createCarouselStructure() {
        const carouselHTML = `
            <div id="carousel" class="carousel">
                <div class="carousel-slide">
                    <img src="images/arreglo-floral.jpg" alt="Arreglo floral">
                    <div class="carousel-caption">
                        <h3>Arreglos florales únicos</h3>
                        <p>Creaciones exclusivas para cada ocasión</p>
                    </div>
                </div>
                <div class="carousel-slide">
                    <img src="images/rosas-jarron.jpg" alt="Rosas en jarrón">
                    <div class="carousel-caption">
                        <h3>Flores frescas cada día</h3>
                        <p>Seleccionamos las mejores flores para ti</p>
                    </div>
                </div>
                <div class="carousel-slide">
                    <img src="images/campo-flores.jpg" alt="Campo de flores">
                    <div class="carousel-caption">
                        <h3>Inspirados en la naturaleza</h3>
                        <p>Conectamos con las raíces de nuestra tierra</p>
                    </div>
                </div>
                <button class="carousel-prev">&#10094;</button>
                <button class="carousel-next">&#10095;</button>
                <div class="carousel-dots"></div>
            </div>
        `;
        
        carouselContainer.innerHTML = carouselHTML;
    }
    
    // Crear dots para navegación
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
        });
    }
    
    // Mostrar slide específico
    function showSlide(n) {
        slides.forEach((slide, index) => {
            slide.style.display = index === n ? 'block' : 'none';
            slide.classList.toggle('active', index === n);
        });
        
        // Actualizar dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === n);
        });
    }
    
    // Ir al slide anterior
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Ir al siguiente slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Ir a un slide específico
    function goToSlide(n) {
        currentSlide = n;
        showSlide(currentSlide);
    }
    
    // Iniciar autoplay
    function startAutoplay() {
        stopAutoplay(); // Evitar múltiples intervalos
        interval = setInterval(nextSlide, 5000);
    }
    
    // Detener autoplay
    function stopAutoplay() {
        clearInterval(interval);
    }
    
    // Inicializar carrusel
    if (slides.length > 0) {
        initCarousel();
    }
});
