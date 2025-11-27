 // --- CONFIG & DATA ---

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

        // Pool of unique images to ensure no repetition
        const uniquePool = [
            covers[1], covers[2], covers[3], covers[4], covers[5], covers[6], covers[7],
            covers[8], covers[9], covers[10], covers[11], covers[12], covers[13], covers[14]
        ];

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

        // --- STATE & DOM ---
        const audio = document.getElementById('audio-player');
        const stationListEl = document.getElementById('station-list');
        const playBtn = document.getElementById('play-btn');
        const playIcon = document.getElementById('play-icon');
        const coverImg = document.getElementById('current-cover');
        const stationNameEl = document.getElementById('station-name');
        const stationGenreEl = document.getElementById('station-genre');
        const bgBlur = document.getElementById('bg-blur');
        const vinylContainer = document.getElementById('vinyl-container');
        const statusBadge = document.getElementById('status-badge');
        const canvas = document.getElementById('visualizer');
        const volSlider = document.getElementById('volume-slider');
        const stationCountEl = document.getElementById('station-count');

        // Visualizer State
        const canvasCtx = canvas.getContext('2d');
        let audioContext, analyser, source, dataArray, animationId;
        let cachedAccentColor = 'var(--highlight-color)'; // Default accent
        let currentGradient = null; // New variable to store gradient

        let currentStationId = null;
        let isPlaying = false;
        let isContextSetup = false;

        // --- INITIALIZATION ---

        function init() {
            renderStationList();
            stationCountEl.textContent = `${stations.length} stations`;

            // Set default view
            updatePlayerUI(stations[0], false);

            // Volume listener
            volSlider.addEventListener('input', (e) => {
                audio.volume = e.target.value;
            });
            audio.volume = 0.4;

            // Resize Canvas
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);

            // Cover Image Load Listener for Color Extraction
            coverImg.addEventListener('load', extractDominantColor);

            // Audio Events
            audio.addEventListener('playing', () => {
                isPlaying = true;
                updatePlayState();
                statusBadge.classList.add('hidden');
                setupAudioContext(); // Ensure context is running
                draw(); // Start visualizer
            });

            audio.addEventListener('pause', () => {
                isPlaying = false;
                updatePlayState();
                cancelAnimationFrame(animationId);
            });

            audio.addEventListener('error', (e) => {
                console.error("Stream Error", e);
                isPlaying = false;
                updatePlayState();
                statusBadge.classList.remove('hidden');
                statusBadge.innerText = "STREAM ERROR";
            });

            audio.addEventListener('waiting', () => {
                statusBadge.classList.remove('hidden');
                statusBadge.innerText = "BUFFERING...";
            });
        }

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        // --- AUDIO CONTEXT SETUP ---
        function setupAudioContext() {
            if (isContextSetup) {
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
                return;
            }

            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                analyser.fftSize = 64; // Low FFT size for chunky bars like in snippet

                // Note: CORS issues might prevent source creation for some streams
                try {
                    source = audioContext.createMediaElementSource(audio);
                    source.connect(analyser);
                    analyser.connect(audioContext.destination);
                } catch (e) {
                    console.warn("CORS restriction on MediaSource, visualizer might be flat", e);
                }

                dataArray = new Uint8Array(analyser.frequencyBinCount);
                isContextSetup = true;
            } catch (e) {
                console.error("Web Audio API not supported", e);
            }
        }

        // --- COLOR EXTRACTION ---
        function extractDominantColor() {
            try {
                // Create a small offscreen canvas to sample the image
                const smallCanvas = document.createElement('canvas');
                const ctx = smallCanvas.getContext('2d');
                smallCanvas.width = 10;
                smallCanvas.height = 10;

                // Draw image onto small canvas
                ctx.drawImage(coverImg, 0, 0, 10, 10);

                // Get pixel data
                const imageData = ctx.getImageData(0, 0, 10, 10).data;
                let r = 0, g = 0, b = 0, count = 0;

                // Average the colors (Keep this logic for accent color usage elsewhere if needed)
                for (let i = 0; i < imageData.length; i += 4) {
                    r += imageData[i];
                    g += imageData[i + 1];
                    b += imageData[i + 2];
                    count++;
                }

                r = Math.floor(r / count);
                g = Math.floor(g / count);
                b = Math.floor(b / count);

                cachedAccentColor = `rgb(${r}, ${g}, ${b})`;

                // --- NEW GRADIENT LOGIC ---
                // Create a linear gradient based on Top, Middle, Bottom colors of the cover
                const gradient = canvasCtx.createLinearGradient(0, canvas.height, 0, 0); // Bottom to Top

                // Bottom Color (Row 9, Col 5)
                const iBot = (9 * 10 + 5) * 4;
                gradient.addColorStop(0, `rgb(${imageData[iBot]}, ${imageData[iBot + 1]}, ${imageData[iBot + 2]})`);

                // Middle Color (Row 5, Col 5)
                const iMid = (5 * 10 + 5) * 4;
                gradient.addColorStop(0.5, `rgb(${imageData[iMid]}, ${imageData[iMid + 1]}, ${imageData[iMid + 2]})`);

                // Top Color (Row 0, Col 5)
                const iTop = (0 * 10 + 5) * 4;
                gradient.addColorStop(1, `rgb(${imageData[iTop]}, ${imageData[iTop + 1]}, ${imageData[iTop + 2]})`);

                currentGradient = gradient;

            } catch (e) {
                console.warn("Could not extract color (likely CORS)", e);
                cachedAccentColor = 'var(--highlight-color)'; // Fallback
                currentGradient = null;
            }
        }

        // --- VISUALIZER DRAW LOOP (Modified for Thin Bars) ---
        function draw() {
            if (!isPlaying || !analyser) return;

            animationId = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

            // USE GRADIENT IF AVAILABLE, ELSE FALLBACK
            if (currentGradient) {
                canvasCtx.fillStyle = currentGradient;
            } else {
                canvasCtx.fillStyle = cachedAccentColor;
            }

            const bufferLength = dataArray.length;

            // Calculate slot width for each frequency bin
            const slotWidth = canvas.width / bufferLength;
            // Make bar width 40% of the slot width (Thinner)
            const barWidth = slotWidth * 0.4;

            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;

                if (barHeight > 2) {
                    // Draw centered in the slot
                    canvasCtx.fillRect(x + (slotWidth - barWidth) / 2, canvas.height - barHeight, barWidth, barHeight);
                }
                x += slotWidth;
            }
        }

        // --- FUNCTIONS ---

        function renderStationList() {
            stationListEl.innerHTML = '';
            stations.forEach(station => {
                const el = document.createElement('div');
                el.className = `station-item`; // Pure CSS class
                el.dataset.id = station.id;
                el.onclick = () => loadStation(station);

                el.innerHTML = `
                    <div class="item-thumb">
                        <img src="${station.cover}" alt="${station.name}">
                        <div class="thumb-overlay">
                            <i class="fa-solid fa-play text-white" style="font-size: 0.75rem;"></i>
                        </div>
                        <!-- Updated playing indicator structure -->
                        <div id="anim-${station.id}" class="playing-indicator hidden">
                            <div class="bar"></div>
                            <div class="bar"></div>
                            <div class="bar"></div>
                        </div>
                    </div>
                    <div class="item-info">
                        <h3 class="item-name truncate">${station.name}</h3>
                        <p class="item-genre truncate">${station.genre}</p>
                    </div>
                `;
                stationListEl.appendChild(el);
            });
        }

        function loadStation(station) {
            if (currentStationId === station.id) {
                togglePlay();
                return;
            }

            // Update Audio
            audio.src = station.stream;
            audio.load();
            currentStationId = station.id;

            // Play
            audio.play().catch(e => {
                console.error("Autoplay failed/blocked", e);
                isPlaying = false;
                updatePlayState();
            });

            updatePlayerUI(station, true);
        }

        function updatePlayerUI(station, active) {
            stationNameEl.innerText = station.name;
            stationGenreEl.innerText = station.genre;

            // Cover update will trigger 'load' event, which triggers 'extractDominantColor'
            coverImg.src = station.cover;
            bgBlur.style.backgroundImage = `url('${station.cover}')`;

            // Highlight list item
            document.querySelectorAll('.station-item').forEach(el => {
                const id = parseInt(el.dataset.id);
                const indicator = document.getElementById(`anim-${id}`);

                if (id === station.id) {
                    el.classList.add('active'); // CSS based active state
                    if (active) indicator.classList.remove('hidden');
                } else {
                    el.classList.remove('active');
                    indicator.classList.add('hidden');
                }
            });
        }

        function togglePlay() {
            if (!currentStationId) {
                // If no station selected, play the first one
                loadStation(stations[0]);
                return;
            }

            // Initialize AudioContext on first user interaction
            if (!isContextSetup) setupAudioContext();

            if (audio.paused) {
                const playPromise = audio.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        isPlaying = true;
                        updatePlayState();
                    }).catch(error => {
                        console.error("Playback prevented", error);
                    });
                }
            } else {
                audio.pause();
                isPlaying = false;
                updatePlayState();
            }
        }

        function updatePlayState() {
            // Button Icon
            if (!audio.paused && !audio.error) {
                playIcon.classList.remove('fa-play');
                playIcon.classList.add('fa-pause');

                // Vinyl Spin
                vinylContainer.classList.remove('paused-anim');

            } else {
                playIcon.classList.remove('fa-pause');
                playIcon.classList.add('fa-play');

                // Stop Vinyl
                vinylContainer.classList.add('paused-anim');
            }
        }

        function adjustVolume(change) {
            let newVol = Math.min(1, Math.max(0, audio.volume + change));
            audio.volume = newVol;
            volSlider.value = newVol;
        }

        // Start
        init();
        // --- DARK MODE TOGGLE ---
        // Toggle between dark and light themes and persist user preference

        function setTheme(isDark) {
            if (isDark) {
                document.documentElement.setAttribute('theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.removeAttribute('theme');
                localStorage.setItem('theme', 'light');
            }
        }

        function toggleTheme() {
            const isDark = document.documentElement.getAttribute('theme') === 'dark';
            setTheme(!isDark);
        }

        // Add a toggle button in the DOM (top-right corner)
        (function addThemeToggleBtn() {
            const btn = document.createElement('button');
            btn.id = 'theme-toggle-btn';
            btn.title = 'Toggle dark/light mode';
            btn.innerHTML = '<i class="fa fa-moon"></i>';
            btn.className = 'theme-toggle-btn';
            btn.addEventListener('mouseenter', () => { btn.style.background = 'var(--highlight-color)'; btn.style.color = '#fff'; });
            btn.addEventListener('mouseleave', () => { btn.style.background = 'var(--panel-bg)'; btn.style.color = 'var(--text-color)'; });
            btn.addEventListener('click', () => {
                toggleTheme();
                // Change icon
                if (document.documentElement.getAttribute('theme') === 'dark') {
                    btn.innerHTML = '<i class="fa fa-sun"></i>';
                } else {
                    btn.innerHTML = '<i class="fa fa-moon"></i>';
                }
            });

            // Set proper icon on load
            if (localStorage.getItem('theme') === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme'))) {
                document.documentElement.setAttribute('theme', 'dark');
                btn.innerHTML = '<i class="fa fa-sun"></i>';
            }

            document.body.appendChild(btn);
        })();

        // On page load, apply stored or preferred theme
        (function applyStoredTheme() {
            const stored = localStorage.getItem('theme');
            if (stored === 'dark') {
                document.documentElement.setAttribute('theme', 'dark');
            } else if (stored === 'light') {
                document.documentElement.removeAttribute('theme');
            }
            // else: no storage; use system preference (already handled on button load)
        })();
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