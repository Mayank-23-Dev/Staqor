document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been received.');
    e.target.reset();
});