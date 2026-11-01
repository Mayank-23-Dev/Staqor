document.getElementById('newsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Subscribed to newsletter!');
    e.target.reset();
});

document.getElementById('topBtn').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});