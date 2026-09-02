let clicks = 0;
const totalClicksEl = document.getElementById('totalClicks');

document.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) {
        clicks++;
        totalClicksEl.textContent = clicks;
    }
});

// 1. Ripple Click Coordinates
const rippleBtn = document.querySelector('.btn-ripple');
rippleBtn.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const circle = document.createElement('span');
    circle.classList.add('ripple-circle');
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = `${size}px`;

    const existing = this.querySelector('.ripple-circle');
    if (existing) existing.remove();

    this.appendChild(circle);
});

// 6. Magnetic Button
const magneticBtn = document.getElementById('magneticBtn');
magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
});

magneticBtn.addEventListener('mouseleave', () => {
    magneticBtn.style.transform = 'translate(0px, 0px)';
});

// 8. Async Loading Button
const asyncBtn = document.getElementById('asyncBtn');
asyncBtn.addEventListener('click', () => {
    if (asyncBtn.classList.contains('loading') || asyncBtn.classList.contains('success')) return;

    asyncBtn.classList.add('loading');
    setTimeout(() => {
        asyncBtn.classList.remove('loading');
        asyncBtn.classList.add('success');

        setTimeout(() => {
            asyncBtn.classList.remove('success');
        }, 2000);
    }, 1500);
});