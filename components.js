// Dynamic HTML Components for Radio Online Application

/**
 * Generates the main player section HTML
 * @returns {string} HTML string for the player section
 */
function generatePlayerSection() {
    return `
        <section id="player-section">
            <div class="station-info">
                <img id="station-logo-player" class="station-logo-player" src="#" alt="Logo stacji">
                <div>
                    <h2 id="station-name-player">Wybierz stację</h2>
                    <p id="station-details-player">---</p>
                </div>
            </div>

            <div class="playback-controls ">
                <button class="button-corner" id="prev-button" aria-label="Poprzednia stacja">
                    <i class="fas fa-step-backward"></i>
                </button>
                <button class="button-corner" id="play-pause-button" aria-label="Odtwórz">
                    <i class="fas fa-play"></i>
                </button>
                <button class="button-corner" id="next-button" aria-label="Następna stacja">
                    <i class="fas fa-step-forward"></i>
                </button>
            </div>

            <div class="volume-control">
                <button id="volume-icon-button" aria-label="Kontrola głośności">
                    <i id="volume-icon" class="fas fa-volume-up"></i>
                </button>
                <input type="range" id="volume-slider" min="0" max="100" value="80" aria-label="Głośność">
            </div>

            <div class="theme-toggle-control">
                <button id="theme-panel-toggle" aria-label="Pokaż/ukryj panel motywu">
                    <i class="fas fa-palette"></i>
                </button>
            </div>
        </section>
    `;
}

/**
 * Generates the theme customization panel HTML
 * @returns {string} HTML string for the theme panel
 */
function generateThemePanel() {
    return `
        <section id="theme-customization-panel">
            <h4><i class="fas fa-palette"></i> Personalizacja Motywu</h4>
            <div class="theme-controls">
                <input type="color" id="theme-color-picker" value="#222222"
                    aria-label="Wybierz kolor akcentu">
                <button id="reset-theme-button">
                    <i class="fas fa-undo"></i> Resetuj Motyw
                </button>
            </div>
        </section>
    `;
}

/**
 * Generates the tabs section HTML
 * @returns {string} HTML string for the tabs section
 */
function generateTabsSection() {
    return `
        <div id="tabs-section" role="tablist">
            <button class="tab-button active" data-tab="stations" role="tab" aria-selected="true"
                aria-controls="stations-content">
                <i class="fas fa-radio"></i> Stacje
            </button>
            <button class="tab-button" data-tab="history" role="tab" aria-selected="false"
                aria-controls="history-content">
                <i class="fas fa-history"></i> Historia
            </button>
            <button class="tab-button" data-tab="stats" role="tab" aria-selected="false" aria-controls="stats-content">
                <i class="fas fa-chart-bar"></i> Statystyki
            </button>
        </div>
    `;
}

/**
 * Generates the main content section HTML
 * @returns {string} HTML string for the content section
 */
function generateContentSection() {
    return `
        <main id="content-section">
            <!-- Stations Tab -->
            <div id="stations-content" class="tab-content active" role="tabpanel" aria-labelledby="stations-tab">
                <header class="stations-header">
                    <h3><i class="fas fa-broadcast-tower"></i> Lista Stacji Radiowych</h3>
                </header>

                <div class="filters-toggle-container">
                    <div id="genre-filters-container" role="radiogroup" aria-label="Filtry gatunków">
                        <!-- Dynamic genre filters will be inserted here -->
                    </div>

                    <div class="favorites-filter">
                        <input type="checkbox" id="only-favorites-toggle" aria-label="Pokaż tylko ulubione">
                        <label for="only-favorites-toggle">Tylko ulubione</label>
                    </div>
                </div>

                <div id="station-list" class="station-list-grid">
                    <!-- Station items will be dynamically inserted here -->
                </div>
            </div>

            <!-- History Tab -->
            <div id="history-content" class="tab-content" role="tabpanel" aria-labelledby="history-tab">
                <header class="tab-section-header">
                    <h3><i class="fas fa-clock"></i> Historia Odtwarzania</h3>
                    <div id="history-actions-container">
                        <!-- History action buttons will be inserted here -->
                    </div>
                </header>

                <div id="history-list-container" class="data-list-container">
                    <!-- History items will be dynamically inserted here -->
                </div>
            </div>

            <!-- Statistics Tab -->
            <div id="stats-content" class="tab-content" role="tabpanel" aria-labelledby="stats-tab">
                <header class="tab-section-header">
                    <h3><i class="fas fa-chart-line"></i> Statystyki Odtwarzania</h3>
                    <div id="stats-actions-container">
                        <!-- Stats action buttons will be inserted here -->
                    </div>
                </header>

                <div class="stats-columns">
                    <div class="stats-column">
                        <h4><i class="fas fa-star"></i> Najczęściej Odtwarzane Stacje</h4>
                        <div id="top-stations-list-container" class="data-list-container">
                            <!-- Top stations will be dynamically inserted here -->
                        </div>
                    </div>

                    <div class="stats-column">
                        <h4><i class="fas fa-music"></i> Najpopularniejsze Gatunki</h4>
                        <div id="top-genres-list-container" class="data-list-container">
                            <!-- Top genres will be dynamically inserted here -->
                        </div>
                    </div>
                </div>
            </div>
        </main>
    `;
}

/**
 * Loads all components dynamically into the app container
 * @param {string} containerId - The ID of the container element
 */
function loadAllComponents(containerId = 'app-container') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found!`);
        return;
    }

    // Clear existing content
    container.innerHTML = '';

    // Load all components
    container.innerHTML =
        generatePlayerSection() +
        generateThemePanel() +
        generateTabsSection() +
        generateContentSection();

    console.log('Components loaded successfully');
}

/**
 * Initializes the dynamic components when DOM is ready
 */
function initializeComponents() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => loadAllComponents());
    } else {
        loadAllComponents();
    }
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generatePlayerSection,
        generateThemePanel,
        generateTabsSection,
        generateContentSection,
        loadAllComponents,
        initializeComponents
    };
} 