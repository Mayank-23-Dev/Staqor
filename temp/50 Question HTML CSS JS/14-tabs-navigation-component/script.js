const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const indicator = document.getElementById('tabIndicator');
const tabsNav = document.getElementById('tabsNav');

function moveIndicator(btn) {
    const navRect = tabsNav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    indicator.style.left = `${btnRect.left - navRect.left}px`;
    indicator.style.width = `${btnRect.width}px`;
}

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.dataset.tab;
        document.getElementById(targetId).classList.add('active');

        moveIndicator(btn);
    });
});

window.addEventListener('resize', () => {
    const activeBtn = document.querySelector('.tab-btn.active');
    if (activeBtn) moveIndicator(activeBtn);
});

// Initial positioning
const initialActive = document.querySelector('.tab-btn.active');
if (initialActive) moveIndicator(initialActive);