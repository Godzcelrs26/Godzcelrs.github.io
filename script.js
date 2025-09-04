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

// SISTEMA DE DESCRIPCI�N LIMITADA - VERSION SIMPLIFICADA
function initProjectDescriptionLimit() {
    console.log('?? Iniciando sistema de descripci�n limitada...');
    
    const projectDescriptions = document.querySelectorAll('.project-info p');
    
    projectDescriptions.forEach((description, index) => {
        // Evitar procesar si ya tiene bot�n
        if (description.parentNode.querySelector('.read-more-btn')) {
            return;
        }
        
        // Configurar estilos b�sicos
        const lineHeight = 24; // Altura fija de l�nea
        const maxHeight = lineHeight * 5; // 5 l�neas
        
        // Medir contenido
        description.style.maxHeight = 'none';
        const fullHeight = description.scrollHeight;
        
        console.log(`?? Proyecto ${index + 1}: ${fullHeight}px vs ${maxHeight}px`);
        
        // Si el contenido es m�s alto que 5 l�neas
        if (fullHeight > maxHeight + 10) {
            console.log(`?? Cortando descripci�n del proyecto ${index + 1}`);
            
            // Aplicar l�mite de altura
            description.style.maxHeight = maxHeight + 'px';
            description.style.overflow = 'hidden';
            description.classList.add('has-overflow');
            
            // Crear bot�n
            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = 'Leer m\u00e1s';
            readMoreBtn.type = 'button';
            
            // Insertar bot�n
            description.parentNode.insertBefore(readMoreBtn, description.nextSibling);
            
            // Funcionalidad del bot�n
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
            
            console.log(`? Bot�n agregado al proyecto ${index + 1}`);
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
        alert('�Mensaje enviado exitosamente! Te contactar� pronto.');
        form.reset();
    });
}

// Update social links with provided user URLs
document.addEventListener('DOMContentLoaded', () => {
    const instagramLink = document.querySelector('.social-link.instagram');
    const itchLink = document.querySelector('.social-link.itch');
    const emailLink = document.querySelector('.social-link.email');

    if (instagramLink) instagramLink.href = 'https://www.instagram.com/lisandrodev/';
    if (itchLink) itchLink.href = 'https://godzcelrs.itch.io/';
    if (emailLink) emailLink.href = 'mailto:Godzcelrs@gmail.com';
});

// Prevent textarea resize gestures on touch devices by blocking touch/pointer drags near the edges
function disableTextareaResizeOnTouch() {
    const textareas = document.querySelectorAll('.contact-form textarea, textarea');
    textareas.forEach(t => {
        // enforce inline style as well
        t.style.resize = 'none';
        t.style.minHeight = t.style.height || '140px';

        const margin = 30; // area (px) from right/bottom where resize can start

        function onTouchStart(e) {
            const touch = e.touches ? e.touches[0] : null;
            if (!touch) return;
            const rect = t.getBoundingClientRect();
            const offsetX = touch.clientX - rect.left;
            const offsetY = touch.clientY - rect.top;
            if (offsetX > rect.width - margin || offsetY > rect.height - margin) {
                // block the gesture that would start resizing
                e.preventDefault();
                // ensure textarea still receives focus so user can type
                t.focus();
            }
        }

        function onPointerDown(e) {
            // pointer events for browsers that support them
            const rect = t.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            if (offsetX > rect.width - margin || offsetY > rect.height - margin) {
                e.preventDefault();
                t.focus();
            }
        }

        // use non-passive so preventDefault works
        t.addEventListener('touchstart', onTouchStart, {passive: false});
        t.addEventListener('pointerdown', onPointerDown);
    });
}

// call after DOM ready
document.addEventListener('DOMContentLoaded', () => {
    disableTextareaResizeOnTouch();
});

// Inicializar cuando la p�gina est� lista
document.addEventListener('DOMContentLoaded', function() {
    console.log('?? Godzcelrs Portfolio - Iniciando...');
    
    // Crear part�culas
    createParticles();
    
    // Esperar un momento para que el CSS se aplique
    setTimeout(() => {
        initProjectDescriptionLimit();
    }, 1000);
});

// Tambi�n al cargar completamente
window.addEventListener('load', function() {
    setTimeout(() => {
        initProjectDescriptionLimit();
    }, 500);
});

// Hero video controls
function initHeroVideo() {
    const video = document.getElementById('heroVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const overlay = document.getElementById('videoOverlay');

    if (!video || !playPauseBtn) return;

    let isPlaying = true;

    function togglePlayPause() {
        if (isPlaying) {
            video.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            isPlaying = false;
        } else {
            video.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            isPlaying = true;
        }
    }

    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePlayPause();
    });

    overlay.addEventListener('click', togglePlayPause);

    // Auto-hide controls after 3 seconds of no interaction
    let hideTimeout;
    function showControls() {
        overlay.style.opacity = '1';
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            if (isPlaying) {
                overlay.style.opacity = '0';
            }
        }, 3000);
    }

    video.addEventListener('mouseenter', showControls);
    video.addEventListener('mousemove', showControls);
}

// Enhanced video modal with timeline controls
function initVideoGallery() {
    // Create modal element with enhanced controls
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" aria-label="Cerrar">&times;</button>
            <video controls controlsList="nodownload" playsinline class="modal-video"></video>
            <div class="custom-controls">
                <button class="control-btn play-pause-control">
                    <i class="fas fa-play"></i>
                </button>
                <input type="range" class="timeline-slider" min="0" max="100" value="0">
                <span class="time-display">0:00 / 0:00</span>
                <input type="range" class="volume-slider" min="0" max="100" value="50">
                <button class="control-btn volume-btn">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const videoEl = modal.querySelector('.modal-video');
    const closeBtn = modal.querySelector('.close-modal');
    const playPauseControl = modal.querySelector('.play-pause-control');
    const timelineSlider = modal.querySelector('.timeline-slider');
    const timeDisplay = modal.querySelector('.time-display');
    const volumeSlider = modal.querySelector('.volume-slider');
    const volumeBtn = modal.querySelector('.volume-btn');

    let isModalPlaying = false;

    // Timeline control
    function updateTimeline() {
        if (videoEl.duration) {
            const progress = (videoEl.currentTime / videoEl.duration) * 100;
            timelineSlider.value = progress;
            
            const current = formatTime(videoEl.currentTime);
            const total = formatTime(videoEl.duration);
            timeDisplay.textContent = `${current} / ${total}`;
        }
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    timelineSlider.addEventListener('input', () => {
        if (videoEl.duration) {
            const time = (timelineSlider.value / 100) * videoEl.duration;
            videoEl.currentTime = time;
        }
    });

    // Play/pause control
    playPauseControl.addEventListener('click', () => {
        if (isModalPlaying) {
            videoEl.pause();
            playPauseControl.innerHTML = '<i class="fas fa-play"></i>';
            isModalPlaying = false;
        } else {
            videoEl.play();
            playPauseControl.innerHTML = '<i class="fas fa-pause"></i>';
            isModalPlaying = true;
        }
    });

    // Volume control
    volumeSlider.addEventListener('input', () => {
        videoEl.volume = volumeSlider.value / 100;
        if (videoEl.volume === 0) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (videoEl.volume < 0.5) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    volumeBtn.addEventListener('click', () => {
        if (videoEl.volume > 0) {
            videoEl.volume = 0;
            volumeSlider.value = 0;
            volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            videoEl.volume = 0.5;
            volumeSlider.value = 50;
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    // Video events
    videoEl.addEventListener('timeupdate', updateTimeline);
    videoEl.addEventListener('play', () => {
        isModalPlaying = true;
        playPauseControl.innerHTML = '<i class="fas fa-pause"></i>';
    });
    videoEl.addEventListener('pause', () => {
        isModalPlaying = false;
        playPauseControl.innerHTML = '<i class="fas fa-play"></i>';
    });

    // Open handlers
    document.querySelectorAll('.play-overlay').forEach(btn => {
        btn.addEventListener('click', () => {
            const src = btn.getAttribute('data-src');
            if (!src) return;

            // Set sources and poster - lazy load
            while (videoEl.firstChild) videoEl.removeChild(videoEl.firstChild);
            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            videoEl.appendChild(source);

            // Force the video element to load the new source before attempting to play
            try {
                videoEl.load();
                videoEl.volume = 0.5;
                volumeSlider.value = 50;
            } catch (e) {
                // ignore
            }

            modal.classList.add('active');
            // Start playing automatically
            timelineSlider.value = 0;
            timeDisplay.textContent = '0:00 / 0:00';
            playPauseControl.innerHTML = '<i class="fas fa-pause"></i>';
            isModalPlaying = true;
            
            // Auto-play the video
            videoEl.play().catch(() => {
                // autoplay may be blocked; reset controls
                isModalPlaying = false;
                playPauseControl.innerHTML = '<i class="fas fa-play"></i>';
            });
        });
    });

    // Close handlers
    function closeModal() {
        modal.classList.remove('active');
        try { videoEl.pause(); } catch (e) {}
        // Remove sources and force unload
        while (videoEl.firstChild) videoEl.removeChild(videoEl.firstChild);
        try {
            videoEl.removeAttribute('src');
            videoEl.load();
        } catch (e) {}
        isModalPlaying = false;
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

// Create thumbnail videos (preload metadata to show default frame) for each play button
function initVideoThumbnails() {
    document.querySelectorAll('.play-overlay').forEach(btn => {
        const src = btn.getAttribute('data-src');
        if (!src) return;

        const thumbContainer = btn.closest('.video-thumb');
        if (!thumbContainer) return;

        // Avoid duplicating
        if (thumbContainer.querySelector('.thumb-video')) return;

        const thumbVideo = document.createElement('video');
        thumbVideo.className = 'thumb-video';
        thumbVideo.preload = 'metadata';
        thumbVideo.muted = true;
        thumbVideo.playsInline = true;
        thumbVideo.setAttribute('aria-hidden', 'true');
        thumbVideo.style.width = '100%';
        thumbVideo.style.height = '100%';
        thumbVideo.style.objectFit = 'cover';
        thumbVideo.style.position = 'absolute';
        thumbVideo.style.top = '0';
        thumbVideo.style.left = '0';

        const source = document.createElement('source');
        source.src = src;
        source.type = 'video/mp4';
        thumbVideo.appendChild(source);

        // When metadata loaded, seek a tiny bit to generate a frame preview (some browsers require this)
        thumbVideo.addEventListener('loadedmetadata', function() {
            try {
                if (thumbVideo.duration > 0) {
                    thumbVideo.currentTime = Math.min(0.1, thumbVideo.duration / 2);
                }
            } catch (e) {
                // ignore seek errors
            }
        });

        // Insert before the button so the play icon stays on top
        thumbContainer.insertBefore(thumbVideo, btn);
    });
}

// Function for fullscreen video
function openVideoFullscreen() {
    const video = document.getElementById('heroVideo');
    if (video) {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }
}

// Initialize hero video and enhanced video gallery on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initHeroVideo();
    initVideoGallery();
    initVideoThumbnails();
});

console.log('?? Godzcelrs Portfolio - Script cargado!');