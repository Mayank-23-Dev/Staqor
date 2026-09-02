document.getElementById('agencyContactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for reaching out to Nexus Creative Agency! Our partner team will respond within 24 hours.');
    e.target.reset();
});

document.getElementById('contactHeaderBtn').addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});