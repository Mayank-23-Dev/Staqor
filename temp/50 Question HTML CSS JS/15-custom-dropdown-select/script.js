const customSelect = document.getElementById('customSelect');
const selectTrigger = document.getElementById('selectTrigger');
const selectDropdown = document.getElementById('selectDropdown');
const searchInput = document.getElementById('searchInput');
const optionsList = document.getElementById('optionsList');
const selectedVal = document.querySelector('.selected-val');
const selectedResult = document.getElementById('selectedResult');

selectTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = customSelect.classList.toggle('open');
    selectTrigger.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) searchInput.focus();
});

document.addEventListener('click', (e) => {
    if (!customSelect.contains(e.target)) {
        customSelect.classList.remove('open');
        selectTrigger.setAttribute('aria-expanded', 'false');
    }
});

optionsList.addEventListener('click', (e) => {
    const item = e.target.closest('.option-item');
    if (!item) return;

    optionsList.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
    item.classList.add('selected');

    const name = item.dataset.name;
    selectedVal.textContent = name;
    selectedResult.textContent = name;

    customSelect.classList.remove('open');
    selectTrigger.setAttribute('aria-expanded', 'false');
});

// Live Search Filter
searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    optionsList.querySelectorAll('.option-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
    });
});