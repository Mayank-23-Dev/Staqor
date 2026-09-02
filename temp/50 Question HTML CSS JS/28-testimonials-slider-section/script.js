const testimonials = [
    {
        quote: '"Migrating our microservices to NovaCloud cut our cloud infrastructure spending by 42% while simultaneously boosting our API response speed."',
        name: "Sarah Jenkins",
        role: "VP of Engineering at FinScale",
        img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    },
    {
        quote: '"The developer experience is unmatched. We shipped our full AI production pipeline 3 weeks ahead of schedule with zero downtime."',
        name: "Marcus Vance",
        role: "Chief Technology Officer at HyperSync",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
        quote: '"NovaCloud automated all multi-region data synchronization headaches so our team could focus exclusively on customer features."',
        name: "Aisha Morales",
        role: "Lead Cloud Architect at CloudBase",
        img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80"
    }
];

let currentIndex = 0;

const quoteText = document.getElementById('quoteText');
const authorName = document.getElementById('authorName');
const authorRole = document.getElementById('authorRole');
const authorImg = document.getElementById('authorImg');
const prevBtn = document.getElementById('prevTestiBtn');
const nextBtn = document.getElementById('nextTestiBtn');
const dotsBox = document.getElementById('testiDots');

testimonials.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
        currentIndex = idx;
        renderTestimonial();
    });
    dotsBox.appendChild(dot);
});

function renderTestimonial() {
    const t = testimonials[currentIndex];
    quoteText.textContent = t.quote;
    authorName.textContent = t.name;
    authorRole.textContent = t.role;
    authorImg.src = t.img;

    document.querySelectorAll('.dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    renderTestimonial();
});