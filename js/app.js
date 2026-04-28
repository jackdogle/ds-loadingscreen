// app.js - Logic Frontend Loading Screen DARKNESS
document.addEventListener('DOMContentLoaded', () => {
    initVideoBackground();
    initMusicPlayer();
    initCarousel();
    initCustomCursor();
    initParticles();
    initFiveMEvents();
});

// 1. Inisialisasi Video Background
function initVideoBackground() {
    const videoContainer = document.getElementById('video-bg');
    const video = document.createElement('video');
    video.src = Config.videoSource;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    videoContainer.appendChild(video);
}

// 2. Inisialisasi Music Player
let music;
function initMusicPlayer() {
    music = new Audio(Config.musicSource);
    music.volume = Config.defaultVolume;
    music.loop = true;

    // Autoplay policy bypass (biasanya FiveM membolehkan)
    music.play().catch(() => console.log('Autoplay blocked, waiting for interaction.'));

    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');

    playPauseBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            playPauseBtn.innerText = 'PAUSE';
        } else {
            music.pause();
            playPauseBtn.innerText = 'PLAY';
        }
    });

    volumeSlider.addEventListener('input', (e) => {
        music.volume = e.target.value;
    });
}

// 3. Carousel Logic
let currentSlide = 0;
function initCarousel() {
    const carouselContent = document.getElementById('carousel-content');
    
    function updateSlide() {
        const item = Config.carouselItems[currentSlide];
        
        // Animasi transisi fade out
        carouselContent.style.opacity = 0;
        carouselContent.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            carouselContent.innerHTML = `
                <h2>${item.title}</h2>
                <p>${item.content}</p>
            `;
            carouselContent.style.opacity = 1;
            carouselContent.style.transform = 'translateY(0)';
            
            currentSlide = (currentSlide + 1) % Config.carouselItems.length;
        }, 500);
    }

    updateSlide();
    setInterval(updateSlide, Config.carouselInterval);
}

// 4. Custom Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// 4b. Particles
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        
        // Random size
        const size = Math.random() * 5 + 2;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        
        // Random position
        p.style.left = Math.random() * 100 + 'vw';
        p.style.top = Math.random() * 100 + 'vh';
        
        // Random animation duration
        p.style.animationDuration = (Math.random() * 10 + 10) + 's';
        p.style.animationDelay = (Math.random() * -20) + 's'; // Negative delay so they start already floating
        
        container.appendChild(p);
    }
}

// 5. FiveM Load Events
function initFiveMEvents() {
    const loadBar = document.getElementById('load-bar');
    const loadPercent = document.getElementById('load-percent');
    const loadStatus = document.getElementById('load-status');
    const enterBtnWrapper = document.getElementById('enter-btn-wrapper');

    // Handler untuk event loading FiveM
    window.addEventListener('message', (event) => {
        const data = event.data;

        if (data.eventName === 'loadProgress') {
            // Update percentage bar level (0.0 to 1.0)
            const progress = (data.loadFraction * 100).toFixed(0);
            updateLoading(progress);
        }
    });

    // Simulasi loading jika tidak dijalankan di FiveM (Browser Preview)
    if (!window.invokeNative) {
        let simProgress = 0;
        const interval = setInterval(() => {
            simProgress += Math.random() * 5;
            if (simProgress >= 100) {
                simProgress = 100;
                clearInterval(interval);
            }
            updateLoading(simProgress.toFixed(0));
        }, 300);
    }

    function updateLoading(percent) {
        loadBar.style.width = percent + '%';
        loadPercent.innerText = percent + '%';
        
        if (percent < 30) loadStatus.innerText = 'LOADING ASSETS...';
        else if (percent < 70) loadStatus.innerText = 'SYNCHRONIZING DATA...';
        else if (percent < 100) loadStatus.innerText = 'FINALIZING CONNECTION...';
        else {
            loadStatus.innerText = 'SYSTEM READY.';
            // Otomatis masuk setelah delay singkat 1 detik
            setTimeout(() => {
                triggerEnterServer();
            }, 1000);
        }
    }

    function triggerEnterServer() {
        if (window.invokeNative) {
            fetch(`https://${GetParentResourceName()}/enter_server`, {
                method: 'POST',
                body: JSON.stringify({})
            });
        } else {
            // Demo mode untuk browser preview
            const loadingContainer = document.getElementById('loading-container');
            if (loadingContainer) {
                loadingContainer.style.transition = 'opacity 1s ease-out';
                loadingContainer.style.opacity = '0';
            }
            setTimeout(() => {
                console.log('Welcome to DARKNESS! (Auto-redirected)');
            }, 1000);
        }
    }
}
