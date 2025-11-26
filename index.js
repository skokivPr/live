  // --- VARIABLES ---
        const audioElement = document.getElementById('audio-player');
        const canvas = document.getElementById('visualizer-canvas');
        const canvasCtx = canvas.getContext('2d');

        let audioContext, analyser, source;
        let animationId;
        let isVisualizerReady = false;
        let isPlaying = false;

        // Zmienne kolorów
        let cachedAccentColor = '#ff5e00'; // Kolor domyślny z CSS
        let currentVisualizerColor1 = '#ff5e00'; // Kolor 1 (góra okładki)
        let currentVisualizerColor2 = '#ff0000'; // Kolor 2 (dół okładki)

        let dataArray;

        // --- COVERS ---
        const covers = {
            1: "https://images.unsplash.com/photo-1574793954837-b7938eb5a662?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            2: "https://images.unsplash.com/photo-1643335622021-6fe038ccf08b?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            3: "https://images.unsplash.com/photo-1598387993240-44b625d97d7f?q=80&w=1752&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            4: "https://images.unsplash.com/photo-1574322101375-2591ed7667cc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            5: "https://images.unsplash.com/photo-1630395822762-98eec16c4ba1?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            6: "https://images.unsplash.com/photo-1594078819317-5bef22072175?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            7: "https://images.unsplash.com/photo-1651439401606-fd2e05286dcb?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            8: "https://images.unsplash.com/photo-1560084068-f24d02201816?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            9: "https://images.unsplash.com/photo-1580724495666-99f1d8d7f18f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            10: "https://images.unsplash.com/photo-1549873836-765d3157c324?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            11: "https://images.unsplash.com/photo-1511180427842-5878e7a53e2c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            12: "https://images.unsplash.com/photo-1486556396467-d83d2b23514b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            13: "https://images.unsplash.com/photo-1578946956271-e8234ecaaadd?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            14: "https://images.unsplash.com/photo-1536852281373-656571dde83b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        };

        // --- DATA ---
        const stations = [
            { id: 1, name: "RadioParty MAIN", genre: "Dance/Club", cover: covers[1], stream: "https://s2.radioparty.pl:8005/stream" },
            { id: 2, name: "RadioClub", genre: "Trance/Vocal", cover: covers[2], stream: "https://life4club.online/listen/live/l4c.mp3" },
            { id: 3, name: "DiscoParty.pl", genre: "House/Club", cover: covers[3], stream: "https://s3.slotex.pl/shoutcast/7354/stream?sid=1" },
            { id: 6, name: "Meloradio", genre: "Pop", cover: covers[4], stream: "https://ml.cdn.eurozet.pl/mel-net.mp3" },
            { id: 7, name: "Radio Eska", genre: "Pop/Dance", cover: covers[5], stream: "https://ic1.smcdn.pl/2380-1.mp3" },
            { id: 8, name: "RadioHeaven", genre: "Trance/Dance", cover: covers[6], stream: "https://sc1.radioheaven.pl:8000/stream.mp3" },
            { id: 9, name: "VOX Dance", genre: "Dance/Disco", cover: covers[7], stream: "https://ic1.smcdn.pl/6180-2.aac" },
            { id: 10, name: "Radio Club Dj", genre: "Club/House", cover: covers[8], stream: "https://www.4stream.pl/stream/18272" },
            { id: 11, name: "Radio Party", genre: "Trance/Dance", cover: covers[9], stream: "https://s2.radioparty.pl:7000/stream?nocache=7419" },
            { id: 12, name: "Radio Party-PORT", genre: "Trance/Techno", cover: covers[10], stream: "https://listen4.myradio24.com/84802" },
            { id: 13, name: "Radio FTB Club", genre: "Trance/Dance", cover: covers[11], stream: "http://play.radioftb.net:8000/;.mp3" },
            { id: 14, name: "Radio Party-Energy2000", genre: "Trance/Dance", cover: covers[12], stream: "https://s2.radioparty.pl:8015/energy2000" },
            { id: 15, name: "Radio Party-Stream128", genre: "Trance/Dance", cover: covers[13], stream: "https://s.radiors.pl/stream128" },
            { id: 16, name: "Radio Party-Revma", genre: "Trance/Dance", cover: covers[14], stream: "https://n12a-eu.rcs.revma.com/s4exa6c6y33vv?rj-ttl=5&rj-tok=AAABmraaUwIABuTCOFmJbF78Sw" },
        ];

        let currentStationIndex = -1;
        let filteredStations = [...stations];

        // --- INIT ---
        function init() {
            updateThemeColor();
            renderStations(stations);
            document.getElementById('station-count').innerText = stations.length;
            document.getElementById('player-vinyl-inner').style.backgroundImage = `url('${covers[1]}')`; // Ustaw domyślną

            // Resize Observer for Canvas
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    if (entry.target.classList.contains('player-column')) {
                        canvas.width = entry.contentRect.width;
                        canvas.height = entry.contentRect.height;
                    }
                }
            });
            resizeObserver.observe(document.querySelector('.player-column'));
        }

        function updateThemeColor() {
            const styles = getComputedStyle(document.documentElement);
            cachedAccentColor = styles.getPropertyValue('--highlight-color').trim();
            // Jeśli nic nie gra, lub nie udało się pobrać koloru okładki, użyj koloru motywu
            if (!isPlaying && currentStationIndex === -1) {
                currentVisualizerColor1 = cachedAccentColor;
                currentVisualizerColor2 = '#ffffff'; // Biały jako drugi dla kontrastu
            }
        }

        function toggleTheme() {
            const doc = document.documentElement;
            const newTheme = doc.getAttribute('theme') === 'dark' ? 'light' : 'dark';
            doc.setAttribute('theme', newTheme);
            const icon = document.querySelector('#theme-btn i');
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

            // Opóźnienie aby CSS zdążył się przeładować
            setTimeout(() => {
                updateThemeColor();
                // Jeśli jest błąd ładowania okładki, przywróć kolor motywu przy zmianie
                if (currentStationIndex === -1) {
                    currentVisualizerColor1 = cachedAccentColor;
                }
            }, 300);
        }

        // --- COLOR EXTRACTION ---
        // Funkcja do wyciągania 2 kolorów (góra i dół) z obrazka
        function extractColorFromImage(imageUrl) {
            // Ustawiamy domyślny kolor na czas ładowania
            currentVisualizerColor1 = cachedAccentColor;
            currentVisualizerColor2 = '#ffffff';

            const img = new Image();
            // Kluczowe dla obrazków z zewnętrznych serwerów (Unsplash)
            img.crossOrigin = "Anonymous";
            img.src = imageUrl;

            img.onload = function () {
                try {
                    // Używamy większego canvasu (np. 8x8) i wybieramy najbardziej intensywne kolory dla jeszcze większej intensywności
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = 8;
                    tempCanvas.height = 8;
                    const ctx = tempCanvas.getContext('2d');

                    ctx.drawImage(img, 0, 0, 8, 8);

                    const p = ctx.getImageData(0, 0, 8, 8).data;

                    // Góra: wiersze 0..3 (piksele 0–31)
                    // Dół: wiersze 4..7 (piksele 32–63)
                    let maxR1 = 0, maxG1 = 0, maxB1 = 0;
                    for (let y = 0; y < 4; y++) {
                        for (let x = 0; x < 8; x++) {
                            let idx = (y * 8 + x) * 4;
                            maxR1 = Math.max(maxR1, p[idx]);
                            maxG1 = Math.max(maxG1, p[idx + 1]);
                            maxB1 = Math.max(maxB1, p[idx + 2]);
                        }
                    }
                    let maxR2 = 0, maxG2 = 0, maxB2 = 0;
                    for (let y = 4; y < 8; y++) {
                        for (let x = 0; x < 8; x++) {
                            let idx = (y * 8 + x) * 4;
                            maxR2 = Math.max(maxR2, p[idx]);
                            maxG2 = Math.max(maxG2, p[idx + 1]);
                            maxB2 = Math.max(maxB2, p[idx + 2]);
                        }
                    }

                    // Dodajemy dodatkowe nasycenie kolorów (jeszcze większa intensywność)
                    function saturateChannel(val) {
                        // "Wyciągamy" kolor bliżej 255 jeśli powyżej połowy
                        let k = 1.3; // stopień saturacji
                        return Math.min(255, Math.round(128 + (val - 128) * k));
                    }
                    currentVisualizerColor1 = `rgb(${saturateChannel(maxR1)}, ${saturateChannel(maxG1)}, ${saturateChannel(maxB1)})`;
                    currentVisualizerColor2 = `rgb(${saturateChannel(maxR2)}, ${saturateChannel(maxG2)}, ${saturateChannel(maxB2)})`;
                } catch (e) {
                    console.warn("Nie można pobrać koloru z okładki (CORS?)", e);
                    currentVisualizerColor1 = cachedAccentColor;
                }
            };

            img.onerror = function () {
                console.warn("Błąd ładowania obrazka do analizy koloru");
                currentVisualizerColor1 = cachedAccentColor;
            };
        }

        // --- AUDIO ---
        audioElement.onerror = function () {
            console.error("Stream Error", audioElement.src);
            isPlaying = false;
            updateUI(false);
        };

        function setupAudioContext() {
            if (isVisualizerReady) return;
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            analyser.smoothingTimeConstant = 0.85;
            source = audioContext.createMediaElementSource(audioElement);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            isVisualizerReady = true;
        }

        function playStation(index) {
            if (index < 0 || index >= stations.length) return;
            setupAudioContext();
            if (audioContext && audioContext.state === 'suspended') audioContext.resume();

            currentStationIndex = index;
            const station = stations[index];

            // Analiza koloru okładki (pobiera 2 kolory)
            extractColorFromImage(station.cover);

            audioElement.src = station.stream;
            audioElement.play().then(() => {
                isPlaying = true;
                updateUI(true);
                draw();
            }).catch(e => {
                isPlaying = false;
                updateUI(false);
            });

            document.getElementById('player-title').innerText = station.name;
            document.getElementById('player-genre').innerText = station.genre;
            document.getElementById('player-vinyl-inner').style.backgroundImage = `url('${station.cover}')`;

            renderStations(filteredStations);
        }

        function togglePlay() {
            if (currentStationIndex === -1) {
                playStation(0);
                return;
            }
            if (audioElement.paused) {
                setupAudioContext();
                if (audioContext.state === 'suspended') audioContext.resume();
                audioElement.play();
                isPlaying = true;
                draw();
            } else {
                audioElement.pause();
                isPlaying = false;
                cancelAnimationFrame(animationId);
                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
            }
            updateUI(isPlaying);
        }

        function updateUI(playing) {
            const btn = document.getElementById('play-btn');
            const vinyl = document.getElementById('player-vinyl');
            if (playing) {
                btn.innerHTML = '<i class="fas fa-pause"></i>';
                vinyl.classList.add('spinning');
            } else {
                btn.innerHTML = '<i class="fas fa-play"></i>';
                vinyl.classList.remove('spinning');
            }
        }

        // --- VISUALIZER ---
        function draw() {
            if (!isPlaying || document.hidden) return;
            animationId = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            // Tworzenie gradientu z 2 pobranych kolorów
            // Gradient idzie od dołu (height) do góry (0)
            const gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, 0);
            gradient.addColorStop(0, currentVisualizerColor2); // Kolor z dołu okładki
            gradient.addColorStop(1, currentVisualizerColor1); // Kolor z góry okładki

            canvasCtx.fillStyle = gradient;

            const barWidth = (canvas.width / dataArray.length) * 2.5;
            let x = 0;

            for (let i = 0; i < dataArray.length; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;
                if (barHeight > 2) {
                    canvasCtx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                }
                x += barWidth + 2;
            }
        }

        // --- UI INTERACTIONS ---
        function playPrev() {
            let newIndex = currentStationIndex - 1;
            if (newIndex < 0) newIndex = stations.length - 1;
            playStation(newIndex);
        }

        function playNext() {
            let newIndex = currentStationIndex + 1;
            if (newIndex >= stations.length) newIndex = 0;
            playStation(newIndex);
        }

        function renderStations(list) {
            const grid = document.getElementById('station-list');
            grid.innerHTML = '';

            list.forEach((s, idx) => {
                const isActive = (stations.indexOf(s) === currentStationIndex);
                const item = document.createElement('div');
                item.className = `station-item ${isActive ? 'active' : ''}`;
                item.onclick = () => playStation(stations.indexOf(s));

                item.innerHTML = `
                    <div class="item-cover" style="background-image: url('${s.cover}')"></div>
                    <div class="item-info">
                        <div class="item-title">${s.name}</div>
                        <div class="item-genre">${s.genre}</div>
                    </div>
                    <i class="fas fa-play item-play-icon"></i>
                `;
                grid.appendChild(item);
            });
        }

        function filterStations(cat) {
            const btns = document.querySelectorAll('.nav-btn');
            btns.forEach(b => b.classList.remove('active'));
            event.target.classList.add('active');
            if (cat === 'all') filteredStations = stations;
            else filteredStations = stations.filter(s => s.genre.includes(cat));
            renderStations(filteredStations);
        }

        document.getElementById('searchInput').addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            filteredStations = stations.filter(s => s.name.toLowerCase().includes(val));
            renderStations(filteredStations);
        });

        const volSlider = document.getElementById('volume-slider');
        volSlider.addEventListener('input', (e) => {
            audioElement.volume = e.target.value;
        });

        function toggleMute() {
            if (audioElement.volume > 0) {
                audioElement.dataset.prev = audioElement.volume;
                audioElement.volume = 0;
                volSlider.value = 0;
            } else {
                audioElement.volume = audioElement.dataset.prev !== undefined ? audioElement.dataset.prev : 0.4;
                volSlider.value = audioElement.volume;
            }
        }

        // Ustaw głośność na 0.4 na początku
        audioElement.volume = 0.4;
        volSlider.value = 0.4;

        init();


        // Add these to your existing script section
        document.addEventListener("DOMContentLoaded", function () {
            // Remove draggable attribute from all elements
            document.querySelectorAll('[draggable="true"]').forEach((el) => {
                el.removeAttribute("draggable");
            });

            // Prevent dragstart event
            document.addEventListener("dragstart", function (e) {
                e.preventDefault();
                return false;
            });

            // Prevent drop event
            document.addEventListener("drop", function (e) {
                e.preventDefault();
                return false;
            });

            // Prevent dragover event
            document.addEventListener("dragover", function (e) {
                e.preventDefault();
                return false;
            });
        });