const toggle = document.getElementById('billingToggle');
const monthlyLabel = document.getElementById('monthlyLabel');
const annualLabel = document.getElementById('annualLabel');
const prices = document.querySelectorAll('.price-val');

toggle.addEventListener('change', () => {
    const isAnnual = toggle.checked;
    monthlyLabel.classList.toggle('active', !isAnnual);
    annualLabel.classList.toggle('active', isAnnual);

    prices.forEach(price => {
        price.textContent = isAnnual ? price.dataset.annual : price.dataset.monthly;
    });
});