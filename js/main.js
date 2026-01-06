// Inicializar Animaciones
AOS.init({ 
    duration: 800, 
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
});

// Variables globales
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
const navLinks = document.getElementById("navLinks");
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const scrollTopBtn = document.getElementById("scrollTopBtn");

// Variables para control de scroll
let lastScrollTop = 0;

// Efecto Scroll en Header
window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Mostrar/ocultar header con efecto
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add("hidden");
        header.classList.remove("scrolled");
    } else {
        header.classList.remove("hidden");
        if (scrollTop > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
    lastScrollTop = scrollTop;
    
    // Mostrar botón scroll top
    if (scrollTop > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Función para abrir/cerrar menú móvil
function toggleMobileMenu() {
    hamburger.classList.toggle("active");
    mobileMenuOverlay.classList.toggle("active");
    navLinks.classList.toggle("active");
    
    // Prevenir scroll cuando el menú está abierto
    if (navLinks.classList.contains("active")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
}

// Función para cerrar menú móvil
function closeMobileMenu() {
    hamburger.classList.remove("active");
    mobileMenuOverlay.classList.remove("active");
    navLinks.classList.remove("active");
    document.body.style.overflow = "auto";
}

// Event listeners para menú móvil
mobileMenuToggle.addEventListener("click", toggleMobileMenu);
mobileMenuOverlay.addEventListener("click", closeMobileMenu);

// Cerrar menú al hacer clic en enlaces
const navAnchors = document.querySelectorAll('.nav-links a');
navAnchors.forEach(anchor => {
    anchor.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
        
        // Smooth scroll para enlaces internos
        if (anchor.getAttribute('href').startsWith('#')) {
            event.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Carrusel Afición
const swiperAficion = new Swiper('.swiper-aficion', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: { 
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: { 
        el: '.swiper-pagination', 
        clickable: true,
    },
    navigation: { 
        nextEl: '.swiper-button-next', 
        prevEl: '.swiper-button-prev' 
    },
    breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    },
    speed: 600,
});

// Carrusel Galería
const swiperGaleria = new Swiper('.swiper-galeria', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 20,
    autoplay: { 
        delay: 6000,
        disableOnInteraction: false,
    },
    pagination: { 
        el: '.swiper-pagination', 
        clickable: true,
    },
    navigation: { 
        nextEl: '.swiper-button-next', 
        prevEl: '.swiper-button-prev' 
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    },
    speed: 600,
});

// Animación de contadores en estadísticas
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observador para animar contadores cuando son visibles
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, 0, target, 1500);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

// Observar la sección hero para animar contadores
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    counterObserver.observe(heroStats);
}

// Manejo del formulario de contacto
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simulación de envío
        const submitButton = this.querySelector('.btn-submit');
        const buttonText = submitButton.querySelector('span');
        const originalText = buttonText.textContent;
        const buttonIcon = submitButton.querySelector('i');
        
        // Animación de envío
        buttonText.textContent = 'ENVIANDO...';
        buttonIcon.className = 'fas fa-spinner fa-spin';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Simular éxito
            buttonText.textContent = '¡ENVIADO!';
            buttonIcon.className = 'fas fa-check';
            submitButton.style.background = '#4CAF50';
            
            // Restaurar después de 2 segundos
            setTimeout(() => {
                contactForm.reset();
                buttonText.textContent = originalText;
                buttonIcon.className = 'fas fa-paper-plane';
                submitButton.style.background = '';
                submitButton.disabled = false;
                
                // Mostrar mensaje de éxito
                showNotification('¡Información enviada con éxito! Nos pondremos en contacto contigo pronto.', 'success');
            }, 2000);
        }, 1500);
    });
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Estilos básicos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.style.transform = 'translateX(0)', 10);
    
    // Cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth scroll para todos los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.getAttribute('href') !== '#') {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Cerrar menú al redimensionar a escritorio
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Optimizar hero para móvil
function optimizeHeroForMobile() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    if (window.innerWidth <= 768) {
        // Asegurar que el hero se vea bien en móvil
        hero.style.minHeight = '600px';
        hero.style.paddingTop = '40px';
        
        // Ajustar contenido para móvil
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.padding = '0 15px';
        }
    } else {
        // Restaurar valores por defecto en escritorio
        hero.style.minHeight = '700px';
        hero.style.paddingTop = '100px';
        
        const heroContent = hero.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.padding = '';
        }
    }
}

// Optimizar hero al cargar y redimensionar
window.addEventListener('load', optimizeHeroForMobile);
window.addEventListener('resize', optimizeHeroForMobile);

// Efecto de partículas
function initParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        // Posiciones aleatorias
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const randomSize = Math.random() * 8 + 3;
        const randomDuration = Math.random() * 20 + 10;
        const randomDelay = Math.random() * 5;
        
        particle.style.left = `${randomX}%`;
        particle.style.top = `${randomY}%`;
        particle.style.width = `${randomSize}px`;
        particle.style.height = `${randomSize}px`;
        particle.style.animationDuration = `${randomDuration}s`;
        particle.style.animationDelay = `${randomDelay}s`;
    });
}

// Inicializar partículas al cargar
window.addEventListener('load', initParticles);

// Efecto de scroll reveal mejorado
function initScrollReveal() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const scrollReveal = () => {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    };
    
    window.addEventListener('scroll', scrollReveal);
    scrollReveal(); // Ejecutar una vez al cargar
}

// Inicializar scroll reveal
initScrollReveal();

// Prevenir envío de formularios vacíos
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredInputs = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
                setTimeout(() => input.style.borderColor = '', 2000);
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showNotification('Por favor, completa todos los campos requeridos.', 'info');
        }
    });
});

// Añadir efecto de carga suave para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });
});