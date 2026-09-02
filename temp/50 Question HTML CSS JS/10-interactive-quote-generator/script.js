const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Innovation" },
    { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman", category: "Design" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House", category: "Engineering" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "Engineering" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck", category: "Productivity" },
    { text: "Stay hungry, stay foolish.", author: "Whole Earth Catalog", category: "Mindset" },
    { text: "Knowledge is power.", author: "Francis Bacon", category: "Wisdom" },
    { text: "Action is the foundational key to all success.", author: "Pablo Picasso", category: "Motivation" }
];

const quoteCard = document.getElementById('quoteCard');
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteCategory = document.getElementById('quoteCategory');
const newQuoteBtn = document.getElementById('newQuoteBtn');
const speakBtn = document.getElementById('speakBtn');
const copyBtn = document.getElementById('copyBtn');
const tweetBtn = document.getElementById('tweetBtn');
const toast = document.getElementById('toast');

let currentIndex = 0;

function getRandomQuote() {
    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * quotes.length);
    } while (nextIndex === currentIndex && quotes.length > 1);

    currentIndex = nextIndex;
    const quote = quotes[currentIndex];

    quoteCard.style.opacity = 0;
    quoteCard.style.transform = 'translateY(10px)';

    setTimeout(() => {
        quoteText.textContent = quote.text;
        quoteAuthor.textContent = `— ${quote.author}`;
        quoteCategory.textContent = quote.category;

        quoteCard.style.opacity = 1;
        quoteCard.style.transform = 'translateY(0)';
    }, 250);
}

newQuoteBtn.addEventListener('click', getRandomQuote);

// Web Speech API
speakBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(`${quoteText.textContent} by ${quoteAuthor.textContent}`);
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Web Speech API is not supported in this browser.');
    }
});

copyBtn.addEventListener('click', () => {
    const text = `"${quoteText.textContent}" ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(text);
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
});

tweetBtn.addEventListener('click', () => {
    const text = encodeURIComponent(`"${quoteText.textContent}" ${quoteAuthor.textContent}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
});