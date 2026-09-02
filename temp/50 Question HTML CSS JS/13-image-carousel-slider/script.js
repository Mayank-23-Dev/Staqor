const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dotsContainer');
const sliderContainer = document.getElementById('sliderContainer');
const togglePlayBtn = document.getElementById('togglePlayBtn');

let currentIndex = 0;
let isPlaying = true;
let timer = null;

// Generate dots
slides.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

function startAutoPlay() {
    if (timer) clearInterval(timer);
    timer = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
    if (timer) clearInterval(timer);
}

sliderContainer.addEventListener('mouseenter', () => {
    if (isPlaying) stopAutoPlay();
});

sliderContainer.addEventListener('mouseleave', () => {
    if (isPlaying) startAutoPlay();
});

togglePlayBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        startAutoPlay();
        togglePlayBtn.textContent = 'Pause';
    } else {
        stopAutoPlay();
        togglePlayBtn.textContent = 'Resume';
    }
});

startAutoPlay();