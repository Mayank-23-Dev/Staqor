const range = document.getElementById('budgetRange');
const tooltip = document.getElementById('sliderTooltip');
const finalValue = document.getElementById('finalValue');

function updateSlider() {
    const val = parseInt(range.value);
    const min = parseInt(range.min);
    const max = parseInt(range.max);

    const percent = (val - min) / (max - min);
    
    // Dynamic progress color fill
    range.style.background = `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${percent * 100}%, #1e293b ${percent * 100}%, #1e293b 100%)`;

    // Tooltip position
    const thumbWidth = 24;
    const offset = percent * (range.offsetWidth - thumbWidth) + (thumbWidth / 2);
    tooltip.style.left = `${offset}px`;

    const formatted = `$${val.toLocaleString()}`;
    tooltip.textContent = formatted;
    finalValue.textContent = formatted;
}

range.addEventListener('input', updateSlider);
window.addEventListener('resize', updateSlider);

updateSlider();