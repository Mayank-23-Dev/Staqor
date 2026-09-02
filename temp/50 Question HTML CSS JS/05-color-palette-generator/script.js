const paletteContainer = document.getElementById('paletteContainer');
const generateBtn = document.getElementById('generateBtn');
const exportBtn = document.getElementById('exportBtn');
const toast = document.getElementById('toast');
const exportModal = document.getElementById('exportModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const copyCssExportBtn = document.getElementById('copyCssExportBtn');
const exportCode = document.getElementById('exportCode');

let colors = [
    { hex: '#264653', locked: false },
    { hex: '#2A9D8F', locked: false },
    { hex: '#E9C46A', locked: false },
    { hex: '#F4A261', locked: false },
    { hex: '#E76F51', locked: false }
];

function getRandomHex() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getLuminance(hex) {
    const rgb = parseInt(hex.slice(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    return (0.299 * r + 0.587 * g + 0.114 * b);
}

function generatePalette() {
    colors = colors.map(col => col.locked ? col : { hex: getRandomHex(), locked: false });
    renderPalette();
}

function renderPalette() {
    paletteContainer.innerHTML = '';
    colors.forEach((col, index) => {
        const isDark = getLuminance(col.hex) < 128;
        const textColor = isDark ? '#ffffff' : '#000000';

        const card = document.createElement('div');
        card.className = 'color-card';
        card.style.background = col.hex;
        card.style.color = textColor;

        card.innerHTML = `
            <div class="actions-bar">
                <div class="color-tools">
                    <button class="tool-btn lock-btn" title="${col.locked ? 'Unlock Color' : 'Lock Color'}" style="color: ${textColor}">
                        ${col.locked ? '🔒' : '🔓'}
                    </button>
                    <button class="tool-btn copy-btn" title="Copy HEX" style="color: ${textColor}">
                        📋
                    </button>
                </div>
                <div class="hex-code" title="Click to copy">${col.hex}</div>
            </div>
        `;

        // Event listeners
        const lockBtn = card.querySelector('.lock-btn');
        lockBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            colors[index].locked = !colors[index].locked;
            renderPalette();
        });

        const copyAction = () => {
            navigator.clipboard.writeText(col.hex);
            showToast(`Copied ${col.hex} to clipboard!`);
        };

        card.querySelector('.copy-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            copyAction();
        });

        card.querySelector('.hex-code').addEventListener('click', copyAction);

        paletteContainer.appendChild(card);
    });
}

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2000);
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        generatePalette();
    }
});

generateBtn.addEventListener('click', generatePalette);

exportBtn.addEventListener('click', () => {
    const css = `:root {
  --color-1: ${colors[0].hex};
  --color-2: ${colors[1].hex};
  --color-3: ${colors[2].hex};
  --color-4: ${colors[3].hex};
  --color-5: ${colors[4].hex};
}`;
    exportCode.textContent = css;
    exportModal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => exportModal.classList.add('hidden'));

copyCssExportBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(exportCode.textContent);
    showToast('Exported CSS copied!');
    exportModal.classList.add('hidden');
});

renderPalette();