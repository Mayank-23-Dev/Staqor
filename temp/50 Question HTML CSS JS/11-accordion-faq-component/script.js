const accordion = document.getElementById('faqAccordion');
const singleModeCheckbox = document.getElementById('singleModeCheckbox');
const expandAllBtn = document.getElementById('expandAllBtn');
const collapseAllBtn = document.getElementById('collapseAllBtn');

function openItem(item) {
    item.classList.add('active');
    const header = item.querySelector('.accordion-header');
    header.setAttribute('aria-expanded', 'true');
    const content = item.querySelector('.accordion-content');
    content.style.maxHeight = `${content.scrollHeight}px`;
}

function closeItem(item) {
    item.classList.remove('active');
    const header = item.querySelector('.accordion-header');
    header.setAttribute('aria-expanded', 'false');
    const content = item.querySelector('.accordion-content');
    content.style.maxHeight = '0px';
}

// Initial active setup
document.querySelectorAll('.accordion-item.active').forEach(openItem);

accordion.addEventListener('click', (e) => {
    const header = e.target.closest('.accordion-header');
    if (!header) return;

    const item = header.parentElement;
    const isSingleMode = singleModeCheckbox.checked;
    const isActive = item.classList.contains('active');

    if (isSingleMode) {
        accordion.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) closeItem(otherItem);
        });
    }

    if (isActive) {
        closeItem(item);
    } else {
        openItem(item);
    }
});

expandAllBtn.addEventListener('click', () => {
    accordion.querySelectorAll('.accordion-item').forEach(openItem);
});

collapseAllBtn.addEventListener('click', () => {
    accordion.querySelectorAll('.accordion-item').forEach(closeItem);
});