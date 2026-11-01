document.getElementById('portfolioContact').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Alex will reply to your message shortly.');
    e.target.reset();
});

document.getElementById('hireMeBtn').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});