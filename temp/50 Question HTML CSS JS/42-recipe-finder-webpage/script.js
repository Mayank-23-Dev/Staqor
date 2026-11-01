const search = document.getElementById('recipeSearch');
const cards = document.querySelectorAll('.r-card');

search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.classList.toggle('hidden', !text.includes(q));
    });
});