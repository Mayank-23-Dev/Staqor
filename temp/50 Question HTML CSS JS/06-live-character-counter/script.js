const textInput = document.getElementById('textInput');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const sentenceCount = document.getElementById('sentenceCount');
const readingTime = document.getElementById('readingTime');
const currentLimit = document.getElementById('currentLimit');
const remainingChars = document.getElementById('remainingChars');
const ringProgress = document.getElementById('ringProgress');

const upperBtn = document.getElementById('upperBtn');
const lowerBtn = document.getElementById('lowerBtn');
const clearBtn = document.getElementById('clearBtn');
const copyTextBtn = document.getElementById('copyTextBtn');
const toast = document.getElementById('toast');

const MAX_LIMIT = 280;
const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~113.1

function updateMetrics() {
    const text = textInput.value;
    const chars = text.length;

    // Character metric
    charCount.textContent = chars.toLocaleString();
    currentLimit.textContent = chars;

    // Word metric
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCount.textContent = words.toLocaleString();

    // Sentence metric
    const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text]).length : 0;
    sentenceCount.textContent = sentences;

    // Reading time (approx 200 words per min)
    const minutes = Math.ceil(words / 200);
    readingTime.textContent = `${words > 0 ? minutes : 0} min`;

    // SVG Progress Ring calculation
    const remaining = MAX_LIMIT - chars;
    remainingChars.textContent = remaining;

    const progress = Math.min(chars / MAX_LIMIT, 1);
    const offset = CIRCUMFERENCE - (progress * CIRCUMFERENCE);
    ringProgress.style.strokeDashoffset = offset;

    if (chars > MAX_LIMIT) {
        ringProgress.style.stroke = '#ef4444';
        remainingChars.style.color = '#ef4444';
    } else if (chars > MAX_LIMIT * 0.8) {
        ringProgress.style.stroke = '#f59e0b';
        remainingChars.style.color = '#f59e0b';
    } else {
        ringProgress.style.stroke = '#38bdf8';
        remainingChars.style.color = '#94a3b8';
    }
}

textInput.addEventListener('input', updateMetrics);

upperBtn.addEventListener('click', () => {
    textInput.value = textInput.value.toUpperCase();
    updateMetrics();
});

lowerBtn.addEventListener('click', () => {
    textInput.value = textInput.value.toLowerCase();
    updateMetrics();
});

clearBtn.addEventListener('click', () => {
    textInput.value = '';
    updateMetrics();
});

copyTextBtn.addEventListener('click', () => {
    if (!textInput.value) return;
    navigator.clipboard.writeText(textInput.value);
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
});

updateMetrics();