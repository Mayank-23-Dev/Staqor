document.querySelectorAll('.btn-favorite').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (btn.textContent === '🤍') {
            btn.textContent = '❤️';
        } else {
            btn.textContent = '🤍';
        }
    });
});

document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', () => {
        const title = btn.closest('.product-card').querySelector('h3').textContent;
        alert(`Opening quick preview for: ${title}`);
    });
});