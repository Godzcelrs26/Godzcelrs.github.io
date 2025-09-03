// Itch.io API Integration for Godzcelrs Portfolio
// API Key: 6ZnRtefx5jWFVTTwsgJwQQhMVoSDbuELYjCiocPC

class ItchioAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://itch.io/api/1';
        this.userId = null;
        this.games = [];
    }

    // Get user profile information
    async getUserProfile() {
        try {
            const response = await fetch(`${this.baseURL}/jwt/me`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.userId = data.user.id;
            return data.user;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    }

    // Get all user games
    async getUserGames() {
        try {
            if (!this.userId) {
                await this.getUserProfile();
            }

            const response = await fetch(`${this.baseURL}/${this.userId}/games`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            this.games = data.games || [];
            return this.games;
        } catch (error) {
            console.error('Error fetching user games:', error);
            return [];
        }
    }

    // Get game analytics/stats
    async getGameStats(gameId) {
        try {
            const response = await fetch(`${this.baseURL}/game/${gameId}/stats`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching stats for game ${gameId}:`, error);
            return null;
        }
    }

    // Format game data for display
    formatGameData(game) {
        return {
            id: game.id,
            title: game.title,
            description: game.short_text || game.description || 'Sin descripción disponible',
            url: game.url,
            status: this.getGameStatus(game),
            published: game.published_at,
            cover: game.cover_url,
            screenshots: game.screenshots || [],
            downloads: game.downloads_count || 0,
            views: game.views_count || 0,
            rating: game.rating || null,
            price: game.min_price || 0,
            tags: game.tags || [],
            type: game.type || 'game',
            platforms: game.platforms || []
        };
    }

    // Get game status in Spanish
    getGameStatus(game) {
        if (game.published) {
            return 'Publicado';
        } else if (game.draft) {
            return 'Borrador';
        } else if (game.restricted) {
            return 'Restringido';
        } else {
            return 'Desconocido';
        }
    }

    // Get category for filtering
    getGameCategory(game) {
        if (game.tags) {
            if (game.tags.some(tag => tag.name.toLowerCase().includes('jam'))) {
                return 'gamejam';
            }
            if (game.tags.some(tag => tag.name.toLowerCase().includes('art'))) {
                return 'art';
            }
        }
        return 'games';
    }
}

// Initialize Itch.io API
const itchioAPI = new ItchioAPI('6ZnRtefx5jWFVTTwsgJwQQhMVoSDbuELYjCiocPC');

// Function to load and display real games
async function loadItchioGames() {
    try {
        showLoadingState();
        
        // Get user games from Itch.io
        const games = await itchioAPI.getUserGames();
        
        if (games && games.length > 0) {
            await displayRealGames(games);
            console.log(`? Loaded ${games.length} games from Itch.io`);
        } else {
            console.warn('?? No games found or API error');
            showErrorState();
        }
        
        hideLoadingState();
    } catch (error) {
        console.error('? Error loading Itch.io games:', error);
        hideLoadingState();
        showErrorState();
    }
}

// Display real games in the portfolio
async function displayRealGames(games) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Clear existing placeholder projects
    projectsGrid.innerHTML = '';

    for (const game of games) {
        const formattedGame = itchioAPI.formatGameData(game);
        const gameStats = await itchioAPI.getGameStats(game.id);
        
        const gameCard = createGameCard(formattedGame, gameStats);
        projectsGrid.appendChild(gameCard);
    }

    // Reinitialize observers for new cards
    reinitializeProjectObservers();
}

// Create HTML card for a game
function createGameCard(game, stats = null) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', itchioAPI.getGameCategory(game));

    const statsHTML = stats ? `
        <div class="game-stats">
            <span><i class="fas fa-download"></i> ${game.downloads}</span>
            <span><i class="fas fa-eye"></i> ${game.views}</span>
        </div>
    ` : '';

    card.innerHTML = `
        <div class="project-image">
            ${game.cover ? 
                `<img src="${game.cover}" alt="${game.title}" loading="lazy">` :
                `<div class="placeholder-project">
                    <i class="fas fa-gamepad"></i>
                    <span>${game.title}</span>
                </div>`
            }
            <div class="project-overlay">
                <div class="project-links">
                    <a href="${game.url}" class="project-link" title="Ver en Itch.io" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                    </a>
                    ${game.screenshots.length > 0 ? 
                        `<a href="#" class="project-link gallery-trigger" title="Ver galería" data-game-id="${game.id}">
                            <i class="fas fa-images"></i>
                        </a>` : ''
                    }
                </div>
            </div>
        </div>
        <div class="project-info">
            <h3>${game.title}</h3>
            <p>${game.description}</p>
            <div class="project-meta">
                <span class="status status-${game.status.toLowerCase()}">${game.status}</span>
                ${game.price > 0 ? `<span class="price">$${game.price}</span>` : '<span class="price">Gratis</span>'}
            </div>
            ${statsHTML}
            <div class="project-tags">
                ${game.tags.slice(0, 3).map(tag => `<span class="tag">${tag.name}</span>`).join('')}
                ${game.platforms.map(platform => `<span class="tag platform">${platform}</span>`).join('')}
            </div>
        </div>
    `;

    return card;
}

// Show loading state
function showLoadingState() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = `
        <div class="loading-games">
            <div class="loader-spinner"></div>
            <p>Cargando juegos desde Itch.io...</p>
        </div>
    `;
}

// Hide loading state
function hideLoadingState() {
    const loadingElement = document.querySelector('.loading-games');
    if (loadingElement) {
        loadingElement.remove();
    }
}

// Show error state
function showErrorState() {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = `
        <div class="error-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error al cargar juegos</h3>
            <p>No se pudieron cargar los juegos desde Itch.io. Mostrando proyectos de ejemplo.</p>
            <button onclick="loadItchioGames()" class="btn btn-primary retry-btn">Reintentar</button>
        </div>
    `;
}

// Reinitialize project observers after loading real games
function reinitializeProjectObservers() {
    // Reinitialize filter functionality
    const newProjectCards = document.querySelectorAll('.project-card');
    
    // Update filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(button => button.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            newProjectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Reinitialize scroll animations
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    newProjectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        projectObserver.observe(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load real games from Itch.io
    loadItchioGames();
});

// Export for global access
window.ItchioAPI = ItchioAPI;
window.loadItchioGames = loadItchioGames;