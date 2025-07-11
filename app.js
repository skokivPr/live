// Radio App JavaScript (converted from TypeScript)

// Configuration constants
const LS_KEYS = {
    HISTORY: 'radioAppHistory',
    STATION_STATS: 'radioAppStationStats',
    GENRE_STATS: 'radioAppGenreStats',
    FAVORITES: 'radioAppFavorites',
    CUSTOM_THEME_ACCENT: 'customRadioThemeAccent',
    VOLUME: 'radioAppVolume',
    MUTED: 'radioAppMutedState',
};

const MAX_HISTORY_ITEMS = 20;
const TOP_N_STATS = 5;
const defaultAccentColor = '#000000';

// Station data
const newRawStations = [
    {
        id: 1,
        name: "Meloradio",
        genre: "Pop",
        country: "Polska",
        quality: "192 kbps",
        stream: "https://ml.cdn.eurozet.pl/mel-net.mp3",
        logo: "https://gfx-player.meloradio.pl/design/player_meloradio/images/logo-purple.svg",
        icon: "fa-music",
        favorite: false,
        category: "pop"
    },
    {
        id: 2,
        name: "Radio Eska",
        genre: "Pop/Dance",
        country: "Polska",
        quality: "192 kbps",
        stream: "https://ic1.smcdn.pl/2380-1.mp3",
        logo: "https://www.eska.pl/media/eska/desktop/images/logo-ESKA2023.svg",
        icon: "fa-music",
        favorite: false,
        category: "pop"
    },
    {
        id: 13,
        name: "RadioHeaven",
        genre: "Trance/Dance/House",
        country: "Polska",
        quality: "192 kbps",
        stream: "https://sc1.radioheaven.pl:8000/stream.mp3",
        logo: "https://radioheaven.pl/wp-content/uploads/2020/06/nowe-logo-white.png",
        icon: "fa-compact-disc",
        favorite: false,
        category: "trance"
    },
    {
        id: 14,
        name: "VOX Dance",
        genre: "Trance/Dance",
        country: "Polska",
        quality: "192 kbps",
        stream: "https://ic1.smcdn.pl/6180-2.aac",
        logo: "https://uradio.pl/uploads/img/vox-dance.jpg",
        icon: "fa-compact-disc",
        favorite: false,
        category: "trance"
    },
    {
        id: 15,
        name: "Radio Club Dj",
        genre: "Trance/Dance/House",
        country: "Polska",
        quality: "192 kbps",
        stream: "https://www.4stream.pl/stream/18272",
        logo: "https://cdn.onlineradiobox.com/img/l/5/140225.v14.png",
        icon: "fa-compact-disc",
        favorite: false,
        category: "trance"
    },
    {
        id: 22,
        name: "Radio Party",
        genre: "Trance/Dance",
        country: "Polska",
        quality: "192 kbps",
        stream: "https://s2.radioparty.pl:7000/stream?nocache=7419",
        logo: "https://radioparty.pl/assets/img/logo.png",
        icon: "fa-compact-disc",
        favorite: true,
        category: "trance"
    }
];

// Global variables
let currentStations = [];
let currentlyDisplayedStations = [];
let genreFilterButtons;
let currentGenreFilter = 'all';
let showOnlyFavorites = false;
let currentlyPlaying = null;
let isPlaying = false;
let isPlayerLoading = false;

// DOM elements - will be initialized in initializeApp()
let stationListElement;
let genreFiltersContainer;
let onlyFavoritesToggle;
let tabButtons;
let contentSections;
let playerStationLogo;
let playerStationName;
let playerStationDetails;
let playPauseButton;
let playPauseIcon;
let prevButton;
let nextButton;
let volumeSlider;
let volumeIconButton;
let volumeIcon;
let audioElement;
let themeColorPicker;
let resetThemeButton;
let themePanelToggle;
let themeCustomizationPanel;
let historyListContainer;
let historyActionsContainer;
let topStationsListContainer;
let topGenresListContainer;
let statsActionsContainer;

// LocalStorage Helper Functions
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Błąd zapisu do localStorage (${key}):`, error);
    }
}

function loadFromLocalStorage(key, defaultValue) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Błąd odczytu z localStorage (${key}):`, error);
        return defaultValue;
    }
}

// Color Utility Functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    const red = Math.max(0, Math.min(255, Math.round(r)));
    const green = Math.max(0, Math.min(255, Math.round(g)));
    const blue = Math.max(0, Math.min(255, Math.round(b)));
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1).padStart(6, '0');
}

function adjustHexColor(hexColor, percent) {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return hexColor;
    const amount = Math.floor(255 * (percent / 100));
    const r = Math.max(0, Math.min(255, rgb.r + amount));
    const g = Math.max(0, Math.min(255, rgb.g + amount));
    const b = Math.max(0, Math.min(255, rgb.b + amount));
    return rgbToHex(r, g, b);
}

function hexToRgba(hex, alpha) {
    const rgb = hexToRgb(hex);
    if (!rgb) return `rgba(90, 103, 216, ${alpha})`;
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

// Theme Logic
function generateDerivedColors(baseAccentHex) {
    const colors = {};
    const accentRgb = hexToRgb(baseAccentHex);
    const baseRgb = accentRgb || hexToRgb(defaultAccentColor);

    // New glassmorphism theme colors
    colors['--dynamic-accent'] = baseAccentHex;
    colors['--dynamic-accent-rgb'] = `${baseRgb.r}, ${baseRgb.g}, ${baseRgb.b}`;
    colors['--dynamic-accent-hover'] = adjustHexColor(baseAccentHex, 15);
    colors['--dynamic-glass-border'] = hexToRgba(baseAccentHex, 0.3);

    // Legacy colors for backward compatibility
    colors['--accent-color'] = baseAccentHex;
    colors['--accent-hover-color'] = adjustHexColor(baseAccentHex, 15);
    colors['--glow-color'] = hexToRgba(baseAccentHex, 0.6);

    const primaryBgR = baseRgb.r * 0.1 + 20 * 0.9;
    const primaryBgG = baseRgb.g * 0.1 + 20 * 0.9;
    const primaryBgB = baseRgb.b * 0.1 + 20 * 0.9;
    colors['--primary-bg'] = rgbToHex(primaryBgR, primaryBgG, primaryBgB);

    const containerBgR = primaryBgR + 10;
    const containerBgG = primaryBgG + 10;
    const containerBgB = primaryBgB + 10;
    colors['--container-bg-value-for-rgba'] = `${Math.round(containerBgR)}, ${Math.round(containerBgG)}, ${Math.round(containerBgB)}`;

    const playerBgR = primaryBgR + 5;
    const playerBgG = primaryBgG + 5;
    const playerBgB = primaryBgB + 5;
    colors['--player-bg-value-for-rgba'] = `${Math.round(playerBgR)}, ${Math.round(playerBgG)}, ${Math.round(playerBgB)}`;

    const panelBgR = containerBgR;
    const panelBgG = containerBgG;
    const panelBgB = containerBgB;
    colors['--panel-bg-value-for-rgba'] = `${Math.round(panelBgR)}, ${Math.round(panelBgG)}, ${Math.round(panelBgB)}`;

    const elementBgR = primaryBgR + 25;
    const elementBgG = primaryBgG + 25;
    const elementBgB = primaryBgB + 25;
    colors['--element-bg'] = rgbToHex(elementBgR, elementBgG, elementBgB);

    const elementHoverBgR = primaryBgR + 40;
    const elementHoverBgG = primaryBgG + 40;
    const elementHoverBgB = primaryBgB + 40;
    colors['--element-hover-bg'] = rgbToHex(elementHoverBgR, elementHoverBgG, elementHoverBgB);

    colors['--border-color'] = adjustHexColor(colors['--element-bg'], -30);
    colors['--text-primary'] = adjustHexColor(colors['--accent-color'], 50);
    colors['--text-secondary'] = adjustHexColor(colors['--accent-color'], 30);
    colors['--text-muted'] = adjustHexColor(colors['--accent-color'], 10);

    const accentColorRgb = hexToRgb(colors['--accent-color']);
    colors['--shadow-color-soft'] = accentColorRgb
        ? `rgba(${accentColorRgb.r}, ${accentColorRgb.g}, ${accentColorRgb.b}, 0.2)`
        : 'var(--shadow-color-soft)';
    colors['--shadow-color-strong'] = accentColorRgb
        ? `rgba(${accentColorRgb.r}, ${accentColorRgb.g}, ${accentColorRgb.b}, 0.4)`
        : 'var(--shadow-color-strong)';
    colors['--accent-color-rgba'] = `${accentColorRgb?.r || 229}, ${accentColorRgb?.g || 57}, ${accentColorRgb?.b || 53}`;

    return colors;
}

function applyCustomTheme(baseAccentHex) {
    const derived = generateDerivedColors(baseAccentHex);

    // Add custom theme class to enable dynamic colors
    document.documentElement.classList.add('custom-theme');

    for (const [property, value] of Object.entries(derived)) {
        document.documentElement.style.setProperty(property, value);
    }
    saveToLocalStorage(LS_KEYS.CUSTOM_THEME_ACCENT, baseAccentHex);
    if (themeColorPicker) themeColorPicker.value = baseAccentHex;

    // Update interactive background colors
    updateInteractiveBackgroundColors();
}

function resetToDefaultTheme() {
    localStorage.removeItem(LS_KEYS.CUSTOM_THEME_ACCENT);
    document.documentElement.classList.remove('custom-theme');

    // Clear custom CSS properties
    const derived = generateDerivedColors(defaultAccentColor);
    for (const property of Object.keys(derived)) {
        document.documentElement.style.removeProperty(property);
    }

    if (themeColorPicker) themeColorPicker.value = defaultAccentColor;

    // Update interactive background colors
    updateInteractiveBackgroundColors();
}

function toggleThemePanel() {
    if (themeCustomizationPanel) {
        themeCustomizationPanel.classList.toggle('visible');

        // Update button icon based on panel visibility
        if (themePanelToggle) {
            const icon = themePanelToggle.querySelector('i');
            if (themeCustomizationPanel.classList.contains('visible')) {
                icon.className = 'fas fa-times';
                themePanelToggle.setAttribute('aria-label', 'Ukryj panel motywu');
            } else {
                icon.className = 'fas fa-palette';
                themePanelToggle.setAttribute('aria-label', 'Pokaż panel motywu');
            }
        }
    }
}

function loadCustomTheme() {
    const savedAccent = loadFromLocalStorage(LS_KEYS.CUSTOM_THEME_ACCENT, defaultAccentColor);
    if (themeColorPicker) themeColorPicker.value = savedAccent;
    if (savedAccent !== defaultAccentColor) {
        applyCustomTheme(savedAccent);
    }
}

function updateInteractiveBackgroundColors() {
    // Update interactive background colors when theme changes
    if (window.interactiveBackground) {
        const currentAccent = getComputedStyle(document.documentElement).getPropertyValue('--corner-color').trim();
        window.interactiveBackground.setDotColor(currentAccent);
    }
}

// Dark/Light Theme Toggle Functions
function toggleTheme() {
    const root = document.documentElement;
    const isDark = root.hasAttribute('dark-theme');

    if (isDark) {
        root.removeAttribute('dark-theme');
        localStorage.setItem('theme-mode', 'light');
    } else {
        root.setAttribute('dark-theme', '');
        localStorage.setItem('theme-mode', 'dark');
    }

    updateThemeToggleButton();
}

function loadThemeMode() {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('dark-theme', '');
    } else if (savedTheme === 'light') {
        document.documentElement.removeAttribute('dark-theme');
    } else {
        // Auto-detect based on system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('dark-theme', '');
        }
    }
    updateThemeToggleButton();
}

function updateThemeToggleButton() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const isDark = document.documentElement.hasAttribute('dark-theme');
        const icon = themeToggle.querySelector('.theme-toggle-icon');
        if (icon) {
            icon.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    }
}

function createThemeToggleButton() {
    // Check if button already exists
    if (document.querySelector('.theme-toggle')) return;

    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<span class="theme-toggle-icon"><i class="fas fa-moon"></i></span>';
    themeToggle.setAttribute('aria-label', 'Przełącz motyw');
    themeToggle.onclick = toggleTheme;

    document.body.appendChild(themeToggle);
}

// Timestamp Formatter
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString('pl-PL')} ${date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}`;
}

// Player Logic
function setPlayerLoading(loading) {
    isPlayerLoading = loading;
    playerStationLogo.classList.toggle('loading', loading);
}

function renderStationItem(station) {
    const item = document.createElement('div');
    item.className = 'station-item';
    item.dataset.stationId = station.id;
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Odtwórz ${station.name}`);

    const logoImg = document.createElement('img');
    logoImg.src = station.logo;
    logoImg.alt = `${station.name} logo`;
    logoImg.className = 'station-logo';
    logoImg.onerror = () => {
        logoImg.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e0e0e0' width='40px' height='40px'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M9 9v6h6V9H9zm1-3h4v2H10V6zm5 11H9v2h6v-2zM7 3h10c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 2v14h10V5H7z'/%3E%3C/svg%3E`;
        logoImg.alt = 'Domyślne logo stacji';
    }

    const info = document.createElement('div');
    info.className = 'station-item-info';
    const name = document.createElement('h4');
    name.textContent = station.name;
    const genreP = document.createElement('p');
    genreP.textContent = `${station.genre} • ${station.country}`;
    info.appendChild(name);
    info.appendChild(genreP);

    const favoriteStar = document.createElement('span');
    favoriteStar.className = 'favorite-star';
    favoriteStar.innerHTML = `<i class="fas fa-star"></i>`;
    favoriteStar.classList.toggle('favorited', station.favorite);
    favoriteStar.setAttribute('role', 'button');
    favoriteStar.setAttribute('tabindex', '0');
    favoriteStar.setAttribute('aria-label', station.favorite ? `Usuń ${station.name} z ulubionych` : `Dodaj ${station.name} do ulubionych`);

    favoriteStar.addEventListener('click', (e) => { e.stopPropagation(); toggleFavorite(station.id); });
    favoriteStar.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.stopPropagation(); toggleFavorite(station.id); } });

    item.appendChild(logoImg);
    item.appendChild(info);
    item.appendChild(favoriteStar);

    item.addEventListener('click', () => selectStationToPlay(station));
    item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { selectStationToPlay(station); } });
    return item;
}

function renderStationList() {
    if (!stationListElement) return;
    stationListElement.innerHTML = '';
    let filtered = [...currentStations];
    let activeCategoryName = "Wszystkie";

    if (currentGenreFilter !== 'all') {
        filtered = filtered.filter(s => s.category === currentGenreFilter);
        activeCategoryName = currentGenreFilter.charAt(0).toUpperCase() + currentGenreFilter.slice(1);
    }
    if (showOnlyFavorites) {
        filtered = filtered.filter(s => s.favorite);
    }
    currentlyDisplayedStations = filtered;

    if (filtered.length === 0) {
        let emptyMessage = 'Brak stacji spełniających kryteria.';
        if (showOnlyFavorites && currentGenreFilter === 'all') emptyMessage = 'Brak ulubionych stacji.';
        else if (showOnlyFavorites) emptyMessage = `Brak ulubionych stacji w kategorii "${activeCategoryName}".`;
        else if (currentGenreFilter !== 'all') emptyMessage = `Brak stacji w kategorii "${activeCategoryName}".`;
        stationListElement.innerHTML = `<p class="empty-list-message">${emptyMessage}</p>`;
        return;
    }
    filtered.forEach(station => stationListElement.appendChild(renderStationItem(station)));
}

function updatePlayerDisplay(station) {
    if (station) {
        playerStationLogo.src = station.logo;
        playerStationLogo.alt = `${station.name} logo`;
        playerStationLogo.onerror = () => {
            playerStationLogo.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e0e0e0' width='48px' height='48px'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/%3E%3C/svg%3E`;
            playerStationLogo.alt = 'Domyślne logo stacji';
        }
        playerStationName.textContent = station.name;
        playerStationDetails.textContent = `${station.genre} • ${station.country} | ${station.quality}`;
    } else {
        playerStationLogo.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e0e0e0' width='48px' height='48px'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z'/%3E%3C/svg%3E`;
        playerStationLogo.alt = 'Logo stacji';
        playerStationName.textContent = 'Wybierz stację';
        playerStationDetails.textContent = '---';
        setPlayerLoading(false);
    }
    updatePlayPauseButton();
}

function selectStationToPlay(station) {
    audioElement.pause();
    isPlaying = false;
    setPlayerLoading(true);
    currentlyPlaying = station;
    updatePlayerDisplay(currentlyPlaying);

    if (!station || !station.stream || station.stream === '#') {
        console.warn(`Stacja ${station?.name} nie ma poprawnego adresu URL strumienia lub jest nieodtwarzalna.`);
        if (audioElement.currentSrc || audioElement.src) audioElement.src = '';
        setPlayerLoading(false);
        updatePlayPauseButton();
        return;
    }

    if (audioElement.currentSrc !== station.stream || audioElement.error) {
        audioElement.src = station.stream;
        audioElement.load();
    }
    const playPromise = audioElement.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.error(`Błąd odtwarzania dla ${currentlyPlaying?.name}: `, error);
            isPlaying = false; setPlayerLoading(false); updatePlayPauseButton();
        });
    } else { isPlaying = false; setPlayerLoading(false); updatePlayPauseButton(); }
}

function toggleFavorite(stationId) {
    const stationIndex = currentStations.findIndex(s => s.id == stationId);
    let currentFavoriteStatus = false;
    if (stationIndex > -1) {
        currentStations[stationIndex].favorite = !currentStations[stationIndex].favorite;
        currentFavoriteStatus = currentStations[stationIndex].favorite;
    }
    if (currentlyPlaying && currentlyPlaying.id == stationId) {
        currentlyPlaying.favorite = currentFavoriteStatus;
    }

    const favorites = currentStations.filter(s => s.favorite).map(s => s.id);
    saveToLocalStorage(LS_KEYS.FAVORITES, favorites);
    renderStationList();
}

function updatePlayPauseButton() {
    if (isPlaying && currentlyPlaying) {
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
        playPauseButton.setAttribute('aria-label', `Pauza ${currentlyPlaying.name}`);
    } else {
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
        playPauseButton.setAttribute('aria-label', currentlyPlaying ? `Odtwórz ${currentlyPlaying.name}` : 'Odtwórz');
    }
}

function togglePlayPause() {
    if (!currentlyPlaying || !currentlyPlaying.stream || currentlyPlaying.stream === '#') {
        const firstVisibleStation = currentlyDisplayedStations.find(s => s.stream && s.stream !== '#');
        if (firstVisibleStation) selectStationToPlay(firstVisibleStation);
        else {
            console.log("Brak stacji do odtworzenia.");
            audioElement.pause(); isPlaying = false; setPlayerLoading(false); updatePlayPauseButton();
        }
        return;
    }

    if (audioElement.paused || audioElement.ended) {
        if (!audioElement.src || audioElement.src === window.location.href || audioElement.error) {
            console.warn("Próba odtworzenia bez prawidłowego źródła lub z błędem. Ponowne ładowanie stacji:", currentlyPlaying.name);
            selectStationToPlay(currentlyPlaying);
            return;
        }
        setPlayerLoading(true);
        const playPromise = audioElement.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error(`Błąd przy próbie odtworzenia (togglePlayPause) dla ${currentlyPlaying?.name}: `, error);
                isPlaying = false; setPlayerLoading(false); updatePlayPauseButton();
            });
        } else { isPlaying = false; setPlayerLoading(false); updatePlayPauseButton(); }
    } else { audioElement.pause(); }
}

function findPlayableStation(startIndex, direction) {
    if (currentlyDisplayedStations.length === 0) return null;
    let currentIndex = startIndex;
    for (let i = 0; i < currentlyDisplayedStations.length; i++) {
        const stationToTry = currentlyDisplayedStations[currentIndex];
        if (stationToTry && stationToTry.stream && stationToTry.stream !== '#') {
            return stationToTry;
        }
        currentIndex = direction === 'next'
            ? (currentIndex + 1) % currentlyDisplayedStations.length
            : (currentIndex - 1 + currentlyDisplayedStations.length) % currentlyDisplayedStations.length;
    }
    return null;
}

function playNextStation() {
    if (currentlyDisplayedStations.length === 0) return;
    let currentIndex = currentlyPlaying ? currentlyDisplayedStations.findIndex(s => s.id == currentlyPlaying.id) : -1;
    const nextStation = findPlayableStation((currentIndex + 1) % currentlyDisplayedStations.length, 'next');
    if (nextStation) selectStationToPlay(nextStation);
    else console.warn("Nie znaleziono następnej odtwarzalnej stacji.");
}

function playPreviousStation() {
    if (currentlyDisplayedStations.length === 0) return;
    let currentIndex = currentlyPlaying ? currentlyDisplayedStations.findIndex(s => s.id == currentlyPlaying.id) : 0;
    if (currentIndex === -1) currentIndex = 0;
    const prevStation = findPlayableStation((currentIndex - 1 + currentlyDisplayedStations.length) % currentlyDisplayedStations.length, 'prev');
    if (prevStation) selectStationToPlay(prevStation);
    else console.warn("Nie znaleziono poprzedniej odtwarzalnej stacji.");
}

function handleVolumeChange() {
    const volume = parseInt(volumeSlider.value) / 100;
    audioElement.volume = volume;
    saveToLocalStorage(LS_KEYS.VOLUME, volume);
    if (volume > 0 && audioElement.muted) audioElement.muted = false;
}

function toggleMute() {
    audioElement.muted = !audioElement.muted;
    saveToLocalStorage(LS_KEYS.MUTED, audioElement.muted);
}

function updateVolumeIcon() {
    if (audioElement.muted || audioElement.volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
        volumeIconButton.setAttribute('aria-label', 'Włącz dźwięk');
    } else if (audioElement.volume <= 0.1) {
        volumeIcon.className = 'fas fa-volume-off';
        volumeIconButton.setAttribute('aria-label', 'Wycisz');
    } else if (audioElement.volume <= 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
        volumeIconButton.setAttribute('aria-label', 'Wycisz');
    } else {
        volumeIcon.className = 'fas fa-volume-up';
        volumeIconButton.setAttribute('aria-label', 'Wycisz');
    }
    if (!audioElement.muted) volumeSlider.value = (audioElement.volume * 100).toString();
    else if (audioElement.volume === 0) volumeSlider.value = "0";
}

// Genre Filter Logic
function handleGenreFilterChange(event) {
    const target = event.currentTarget;
    currentGenreFilter = (target.dataset.genre || 'all').toLowerCase();
    genreFilterButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-checked', 'false');
    });
    target.classList.add('active');
    target.setAttribute('aria-checked', 'true');
    renderStationList();
}

function handleFavoritesToggleChange() {
    showOnlyFavorites = onlyFavoritesToggle.checked;
    renderStationList();
}

function handleTabClick(event) {
    const clickedTab = event.currentTarget;
    const targetTabId = clickedTab.dataset.tab;
    const targetContentId = targetTabId + '-content';

    tabButtons.forEach(button => {
        button.classList.remove('active');
        button.setAttribute('aria-selected', 'false');
    });
    clickedTab.classList.add('active');
    clickedTab.setAttribute('aria-selected', 'true');

    contentSections.forEach(section => {
        const content = section;
        if (content.id === targetContentId) {
            content.style.display = 'block';
            content.classList.add('active');
            if (targetTabId === 'history') renderHistoryList();
            else if (targetTabId === 'stats') renderStatistics();
        } else {
            content.style.display = 'none';
            content.classList.remove('active');
        }
    });
}

function renderDynamicGenreFilters() {
    if (!genreFiltersContainer) return;
    genreFiltersContainer.innerHTML = '';
    const categories = ['all', ...new Set(currentStations.map(s => s.category))];
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'genre-filter-button';
        button.dataset.genre = category;
        button.textContent = category === 'all' ? 'Wszystkie' : category.charAt(0).toUpperCase() + category.slice(1);
        button.setAttribute('role', 'radio');
        button.setAttribute('aria-checked', category === currentGenreFilter ? 'true' : 'false');
        if (category === currentGenreFilter) button.classList.add('active');
        button.addEventListener('click', handleGenreFilterChange);
        genreFiltersContainer.appendChild(button);
    });
    genreFilterButtons = genreFiltersContainer.querySelectorAll('.genre-filter-button');
}

// History Functions
function getHistory() {
    return loadFromLocalStorage(LS_KEYS.HISTORY, []);
}

function addStationToHistory(stationId) {
    let history = getHistory();
    history = history.filter(entry => entry.stationId !== stationId);
    history.unshift({ stationId, timestamp: Date.now() });
    if (history.length > MAX_HISTORY_ITEMS) {
        history = history.slice(0, MAX_HISTORY_ITEMS);
    }
    saveToLocalStorage(LS_KEYS.HISTORY, history);
}

function renderHistoryItem(entry, station) {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.dataset.timestamp = entry.timestamp.toString();

    const logoImg = document.createElement('img');
    logoImg.src = station?.logo || `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e0e0e0'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M9 9v6h6V9H9zm1-3h4v2H10V6zm5 11H9v2h6v-2zM7 3h10c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 2v14h10V5H7z'/%3E%3C/svg%3E`;
    logoImg.alt = `${station?.name || 'Nieznana stacja'} logo`;
    logoImg.className = 'station-logo';

    const infoDiv = document.createElement('div');
    infoDiv.className = 'history-item-info';
    const nameH5 = document.createElement('h5');
    nameH5.textContent = station?.name || 'Nieznana stacja';
    const genreP = document.createElement('p');
    genreP.textContent = station?.genre || '---';
    infoDiv.append(nameH5, genreP);

    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = formatTimestamp(entry.timestamp);

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'item-actions';
    const playBtn = document.createElement('button');
    playBtn.innerHTML = `<i class="fas fa-play"></i> Odtwórz`;
    playBtn.setAttribute('aria-label', `Odtwórz ${station?.name || 'stację'} ponownie`);
    playBtn.onclick = () => station && handleReplayFromHistory(station.id);
    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = `<i class="fas fa-times"></i> Usuń`;
    removeBtn.setAttribute('aria-label', `Usuń ${station?.name || 'stację'} z historii`);
    removeBtn.onclick = () => handleRemoveFromHistory(entry.timestamp);
    actionsDiv.append(playBtn, removeBtn);

    item.append(logoImg, infoDiv, timestampSpan, actionsDiv);
    return item;
}

function renderHistoryList() {
    if (!historyListContainer || !historyActionsContainer) return;
    historyListContainer.innerHTML = '';
    historyActionsContainer.innerHTML = '';
    const history = getHistory();

    if (history.length === 0) {
        historyListContainer.innerHTML = `<p class="empty-list-message">Historia odtwarzania jest pusta.</p>`;
        return;
    }

    history.forEach(entry => {
        const station = currentStations.find(s => s.id === entry.stationId);
        historyListContainer.appendChild(renderHistoryItem(entry, station));
    });

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Wyczyść Całą Historię';
    clearButton.setAttribute('aria-label', 'Wyczyść całą historię odtwarzania');
    clearButton.onclick = handleClearHistory;
    historyActionsContainer.appendChild(clearButton);
}

function handleReplayFromHistory(stationId) {
    const station = currentStations.find(s => s.id === stationId);
    if (station) selectStationToPlay(station);
}

function handleRemoveFromHistory(timestamp) {
    let history = getHistory();
    history = history.filter(entry => entry.timestamp !== timestamp);
    saveToLocalStorage(LS_KEYS.HISTORY, history);
    renderHistoryList();
}

function handleClearHistory() {
    if (confirm('Czy na pewno chcesz wyczyścić całą historię odtwarzania?')) {
        saveToLocalStorage(LS_KEYS.HISTORY, []);
        renderHistoryList();
    }
}

// Statistics Functions
function getStationPlayCounts() {
    return loadFromLocalStorage(LS_KEYS.STATION_STATS, {});
}

function getGenrePlayCounts() {
    return loadFromLocalStorage(LS_KEYS.GENRE_STATS, {});
}

function incrementPlayCount(stationId, category) {
    const stationCounts = getStationPlayCounts();
    stationCounts[stationId] = (stationCounts[stationId] || 0) + 1;
    saveToLocalStorage(LS_KEYS.STATION_STATS, stationCounts);

    const genreCounts = getGenrePlayCounts();
    genreCounts[category] = (genreCounts[category] || 0) + 1;
    saveToLocalStorage(LS_KEYS.GENRE_STATS, genreCounts);
}

function renderStatsListItem(data, type, playCallback) {
    const item = document.createElement('div');
    item.className = 'stat-item';

    if (data.logo) {
        const logoImg = document.createElement('img');
        logoImg.src = data.logo;
        logoImg.alt = `${data.name} logo`;
        logoImg.className = 'station-logo';
        item.appendChild(logoImg);
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'stat-item-info';
    const nameH5 = document.createElement('h5');
    nameH5.textContent = data.name;
    infoDiv.appendChild(nameH5);
    if (type === 'station' && data.category) {
        const categoryP = document.createElement('p');
        categoryP.textContent = data.category.charAt(0).toUpperCase() + data.category.slice(1);
        infoDiv.appendChild(categoryP);
    }
    item.appendChild(infoDiv);

    const countSpan = document.createElement('span');
    countSpan.className = 'play-count';
    countSpan.textContent = data.count.toString();
    item.appendChild(countSpan);

    if (type === 'station' && data.id && playCallback) {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'item-actions';
        const playBtn = document.createElement('button');
        playBtn.innerHTML = `<i class="fas fa-play"></i> Odtwórz`;
        playBtn.setAttribute('aria-label', `Odtwórz ${data.name}`);
        const stationId = data.id; // Capture id in closure
        playBtn.onclick = () => playCallback(stationId);
        actionsDiv.appendChild(playBtn);
        item.appendChild(actionsDiv);
    }
    return item;
}

function renderStatistics() {
    if (!topStationsListContainer || !topGenresListContainer || !statsActionsContainer) return;
    topStationsListContainer.innerHTML = '';
    topGenresListContainer.innerHTML = '';
    statsActionsContainer.innerHTML = '';

    const stationCounts = getStationPlayCounts();
    const genreCounts = getGenrePlayCounts();

    const sortedStations = Object.entries(stationCounts)
        .map(([id, count]) => ({ id, count, station: currentStations.find(s => s.id === id) }))
        .filter(item => item.station)
        .sort((a, b) => b.count - a.count)
        .slice(0, TOP_N_STATS);

    const sortedGenres = Object.entries(genreCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, TOP_N_STATS);

    if (sortedStations.length === 0 && sortedGenres.length === 0) {
        topStationsListContainer.innerHTML = `<p class="empty-list-message">Brak statystyk odtwarzania stacji.</p>`;
        topGenresListContainer.innerHTML = `<p class="empty-list-message">Brak statystyk odtwarzania gatunków.</p>`;
        return;
    }

    if (sortedStations.length > 0) {
        sortedStations.forEach(item => {
            if (item.station) {
                topStationsListContainer.appendChild(
                    renderStatsListItem(
                        { name: item.station.name, count: item.count, logo: item.station.logo, id: item.station.id, category: item.station.category },
                        'station',
                        handlePlayFromStats
                    )
                );
            }
        });
    } else {
        topStationsListContainer.innerHTML = `<p class="empty-list-message">Brak statystyk odtwarzania stacji.</p>`;
    }

    if (sortedGenres.length > 0) {
        sortedGenres.forEach(([genre, count]) => {
            topGenresListContainer.appendChild(
                renderStatsListItem({ name: genre.charAt(0).toUpperCase() + genre.slice(1), count }, 'genre')
            );
        });
    } else {
        topGenresListContainer.innerHTML = `<p class="empty-list-message">Brak statystyk odtwarzania gatunków.</p>`;
    }

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Resetuj Statystyki';
    resetButton.setAttribute('aria-label', 'Resetuj wszystkie statystyki odtwarzania');
    resetButton.onclick = handleResetStatistics;
    statsActionsContainer.appendChild(resetButton);
}

function handlePlayFromStats(stationId) {
    const station = currentStations.find(s => s.id === stationId);
    if (station) selectStationToPlay(station);
}

function handleResetStatistics() {
    if (confirm('Czy na pewno chcesz zresetować wszystkie statystyki odtwarzania?')) {
        saveToLocalStorage(LS_KEYS.STATION_STATS, {});
        saveToLocalStorage(LS_KEYS.GENRE_STATS, {});
        renderStatistics();
    }
}

// Initialize App Function
function initializeApp() {
    // Initialize DOM elements
    stationListElement = document.getElementById('station-list');
    genreFiltersContainer = document.getElementById('genre-filters-container');
    onlyFavoritesToggle = document.getElementById('only-favorites-toggle');
    tabButtons = document.querySelectorAll('.tab-button');
    contentSections = document.querySelectorAll('.tab-content');
    playerStationLogo = document.getElementById('station-logo-player');
    playerStationName = document.getElementById('station-name-player');
    playerStationDetails = document.getElementById('station-details-player');
    playPauseButton = document.getElementById('play-pause-button');
    playPauseIcon = playPauseButton ? playPauseButton.querySelector('i') : null;
    prevButton = document.getElementById('prev-button');
    nextButton = document.getElementById('next-button');
    volumeSlider = document.getElementById('volume-slider');
    volumeIconButton = document.getElementById('volume-icon-button');
    volumeIcon = document.getElementById('volume-icon');
    audioElement = document.getElementById('audio-player');
    themeColorPicker = document.getElementById('theme-color-picker');
    resetThemeButton = document.getElementById('reset-theme-button');
    themePanelToggle = document.getElementById('theme-panel-toggle');
    themeCustomizationPanel = document.getElementById('theme-customization-panel');
    historyListContainer = document.getElementById('history-list-container');
    historyActionsContainer = document.getElementById('history-actions-container');
    topStationsListContainer = document.getElementById('top-stations-list-container');
    topGenresListContainer = document.getElementById('top-genres-list-container');
    statsActionsContainer = document.getElementById('stats-actions-container');

    // Setup Audio Event Listeners
    if (audioElement) {
        audioElement.addEventListener('loadstart', () => setPlayerLoading(true));
        audioElement.addEventListener('waiting', () => setPlayerLoading(true));
        audioElement.addEventListener('stalled', () => console.warn("Audio stalled."));

        audioElement.addEventListener('playing', () => {
            isPlaying = true;
            setPlayerLoading(false);
            updatePlayPauseButton();
            if (currentlyPlaying) {
                addStationToHistory(currentlyPlaying.id);
                incrementPlayCount(currentlyPlaying.id, currentlyPlaying.category);

                // Refresh active history/stats tab if visible
                const activeTab = document.querySelector('#tabs-section .tab-button.active');
                if (activeTab) {
                    const activeTabId = activeTab.getAttribute('data-tab');
                    if (activeTabId === 'history') renderHistoryList();
                    else if (activeTabId === 'stats') renderStatistics();
                }
            }
        });

        audioElement.addEventListener('pause', () => {
            isPlaying = false; setPlayerLoading(false); updatePlayPauseButton();
        });

        audioElement.addEventListener('ended', () => {
            isPlaying = false; setPlayerLoading(false); updatePlayPauseButton();
        });

        audioElement.addEventListener('error', (e) => {
            isPlaying = false; setPlayerLoading(false);
            const err = audioElement.error;
            console.error("Błąd elementu audio:", e);
            if (err) {
                let message = `Kod: ${err.code}`;
                switch (err.code) {
                    case MediaError.MEDIA_ERR_ABORTED: message += " - Odtwarzanie przerwane."; break;
                    case MediaError.MEDIA_ERR_NETWORK: message += " - Błąd sieciowy."; break;
                    case MediaError.MEDIA_ERR_DECODE: message += " - Błąd dekodowania."; break;
                    case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED: message += " - Format źródła nieobsługiwany."; break;
                    default: message += " - Nieznany błąd.";
                }
                console.error("Szczegóły błędu audio: ", message, err.message);
            }
            updatePlayerDisplay(currentlyPlaying); updatePlayPauseButton();
        });

        audioElement.addEventListener('volumechange', updateVolumeIcon);
    }

    // Load theme mode first
    loadThemeMode();

    // Create theme toggle button
    createThemeToggleButton();

    // Load favorites and initialize stations
    const savedFavorites = loadFromLocalStorage(LS_KEYS.FAVORITES, []);
    currentStations = newRawStations.map(rawStation => ({
        id: String(rawStation.id),
        name: rawStation.name,
        genre: rawStation.genre,
        country: rawStation.country,
        quality: rawStation.quality,
        logo: rawStation.logo,
        stream: rawStation.stream,
        favorite: savedFavorites.includes(String(rawStation.id)),
        category: rawStation.category.toLowerCase(),
        icon: rawStation.icon
    }));

    renderDynamicGenreFilters();

    if (onlyFavoritesToggle) onlyFavoritesToggle.addEventListener('change', handleFavoritesToggleChange);
    tabButtons.forEach(button => button.addEventListener('click', handleTabClick));

    if (playPauseButton) playPauseButton.addEventListener('click', togglePlayPause);
    if (nextButton) nextButton.addEventListener('click', playNextStation);
    if (prevButton) prevButton.addEventListener('click', playPreviousStation);

    // Volume initialization
    const savedVolume = loadFromLocalStorage(LS_KEYS.VOLUME, null);
    const savedMutedState = loadFromLocalStorage(LS_KEYS.MUTED, null);
    audioElement.volume = savedVolume !== null ? savedVolume : (parseInt(volumeSlider?.value || '80') / 100);
    if (savedMutedState !== null) audioElement.muted = savedMutedState;
    else audioElement.muted = false;
    if (volumeSlider) volumeSlider.value = (audioElement.volume * 100).toString();
    updateVolumeIcon();
    if (volumeSlider) volumeSlider.addEventListener('input', handleVolumeChange);
    if (volumeIconButton) volumeIconButton.addEventListener('click', toggleMute);

    updatePlayerDisplay(null);
    renderStationList();

    // Theme customization
    if (themeColorPicker) themeColorPicker.addEventListener('input', (event) => applyCustomTheme(event.target.value));
    if (resetThemeButton) resetThemeButton.addEventListener('click', resetToDefaultTheme);
    if (themePanelToggle) themePanelToggle.addEventListener('click', toggleThemePanel);
    loadCustomTheme();

    // Interactive background control
    updateInteractiveBackgroundColors();

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            const savedTheme = localStorage.getItem('theme-mode');
            if (!savedTheme) { // Only auto-update if user hasn't manually set a preference
                if (e.matches) {
                    document.documentElement.setAttribute('dark-theme', '');
                } else {
                    document.documentElement.removeAttribute('dark-theme');
                }
                updateThemeToggleButton();
            }
        });
    }

    // Initialize first tab
    const initialActiveTab = document.querySelector('#tabs-section .tab-button.active');
    if (initialActiveTab) {
        const initialTabId = initialActiveTab.getAttribute('data-tab');
        const initialContentId = initialTabId + '-content';
        const initialContentElement = document.getElementById(initialContentId);
        if (initialContentElement) {
            initialContentElement.style.display = 'block';
            initialContentElement.classList.add('active');
            if (initialTabId === 'history') renderHistoryList();
            else if (initialTabId === 'stats') renderStatistics();
        }
    }
}