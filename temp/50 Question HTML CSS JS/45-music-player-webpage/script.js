const playBtn = document.getElementById('playBtn');
const disc = document.getElementById('albumDisc');
let isPlaying = false;

playBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    playBtn.textContent = isPlaying ? '⏸' : '▶';
    disc.classList.toggle('rotating', isPlaying);
});