// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const form = document.querySelector('.contact-form form');

// Mobile Navigation Toggle
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Project Filter Functionality
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(button => button.classList.remove('active'));
    btn.classList.add('active');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const categories = (card.getAttribute('data-category') || '').split(/\s+/);
      const matches = filterValue === 'all' || categories.includes(filterValue);
      card.style.display = matches ? 'block' : 'none';
      if (matches) card.style.animation = 'fadeInUp 0.5s ease forwards';
    });
  });
});

// Particles background animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(45deg, #00ff88, #00d4ff);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
            animation: float ${duration}s infinite linear;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .particle {
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// SISTEMA DE DESCRIPCIÓN LIMITADA - VERSION SIMPLIFICADA
function initProjectDescriptionLimit() {
    console.log('?? Iniciando sistema de descripción limitada...');
    
    const projectDescriptions = document.querySelectorAll('.project-info p');
    
    projectDescriptions.forEach((description, index) => {
        // Evitar procesar si ya tiene botón
        if (description.parentNode.querySelector('.read-more-btn')) {
            return;
        }
        
        // Configurar estilos básicos
        const lineHeight = 24; // Altura fija de línea
        const maxHeight = lineHeight * 5; // 5 líneas
        
        // Medir contenido
        description.style.maxHeight = 'none';
        const fullHeight = description.scrollHeight;
        
        console.log(`?? Proyecto ${index + 1}: ${fullHeight}px vs ${maxHeight}px`);
        
        // Si el contenido es más alto que 5 líneas
        if (fullHeight > maxHeight + 10) {
            console.log(`?? Cortando descripción del proyecto ${index + 1}`);
            
            // Aplicar límite de altura
            description.style.maxHeight = maxHeight + 'px';
            description.style.overflow = 'hidden';
            description.classList.add('has-overflow');
            
            // Crear botón
            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = 'Leer m\u00e1s';
            readMoreBtn.type = 'button';
            
            // Insertar botón
            description.parentNode.insertBefore(readMoreBtn, description.nextSibling);
            
            // Funcionalidad del botón
            let isExpanded = false;
            readMoreBtn.addEventListener('click', function() {
                if (isExpanded) {
                    // Contraer
                    description.style.maxHeight = maxHeight + 'px';
                    description.classList.remove('expanded');
                    this.textContent = 'Leer m\u00e1s';
                    isExpanded = false;
                } else {
                    // Expandir
                    description.style.maxHeight = fullHeight + 'px';
                    description.classList.add('expanded');
                    this.textContent = 'Leer menos';
                    isExpanded = true;
                }
            });
            
            console.log(`? Botón agregado al proyecto ${index + 1}`);
        }
    });
}

// Contact form handling
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const subject = form.querySelectorAll('input[type="text"]')[1].value;
        const message = form.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        // Simulate form submission
        alert('¡Mensaje enviado exitosamente! Te contactaré pronto.');
        form.reset();
    });
}

// Inicializar cuando la página esté lista
document.addEventListener('DOMContentLoaded', function() {
    console.log('?? Godzcelrs Portfolio - Iniciando...');
    
    // Crear partículas
    createParticles();
    
    // Esperar un momento para que el CSS se aplique
    setTimeout(() => {
        initProjectDescriptionLimit();
    }, 1000);
});

// También al cargar completamente
window.addEventListener('load', function() {
    setTimeout(() => {
        initProjectDescriptionLimit();
    }, 500);
});

console.log('?? Godzcelrs Portfolio - Script cargado!');