const search = document.getElementById('faqSearch');
const cards = document.querySelectorAll('.faq-card');

search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.classList.toggle('hidden', !text.includes(q));
    });
});