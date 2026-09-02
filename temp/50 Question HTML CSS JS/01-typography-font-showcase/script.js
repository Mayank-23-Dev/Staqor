// DOM Elements
const fontSelect = document.getElementById('fontSelect');
const fontSize = document.getElementById('fontSize');
const fontSizeVal = document.getElementById('fontSizeVal');
const lineHeight = document.getElementById('lineHeight');
const lineHeightVal = document.getElementById('lineHeightVal');
const letterSpacing = document.getElementById('letterSpacing');
const letterSpacingVal = document.getElementById('letterSpacingVal');
const weightGroup = document.getElementById('weightGroup');
const transformGroup = document.getElementById('transformGroup');
const alignGroup = document.getElementById('alignGroup');
const previewText = document.getElementById('previewText');
const cssCode = document.getElementById('cssCode');
const copyCssBtn = document.getElementById('copyCssBtn');
const copyToast = document.getElementById('copyToast');
const resetTextBtn = document.getElementById('resetTextBtn');

// State
const state = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '36px',
    fontWeight: '400',
    lineHeight: '1.4',
    letterSpacing: '0px',
    textTransform: 'none',
    textAlign: 'left'
};

const defaultContent = `<h2>The Quick Brown Fox Jumps Over The Lazy Dog</h2>
<p>Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing.</p>
<p>Great design starts with great hierarchy, contrast, rhythm, and clarity.</p>`;

// Update Styles & CSS Output
function applyStyles() {
    previewText.style.fontFamily = state.fontFamily;
    previewText.style.fontSize = state.fontSize;
    previewText.style.fontWeight = state.fontWeight;
    previewText.style.lineHeight = state.lineHeight;
    previewText.style.letterSpacing = state.letterSpacing;
    previewText.style.textTransform = state.textTransform;
    previewText.style.textAlign = state.textAlign;

    cssCode.textContent = `font-family: ${state.fontFamily};
font-size: ${state.fontSize};
font-weight: ${state.fontWeight};
line-height: ${state.lineHeight};
letter-spacing: ${state.letterSpacing};
text-transform: ${state.textTransform};
text-align: ${state.textAlign};`;
}

// Event Listeners
fontSelect.addEventListener('change', (e) => {
    state.fontFamily = e.target.value;
    applyStyles();
});

fontSize.addEventListener('input', (e) => {
    state.fontSize = `${e.target.value}px`;
    fontSizeVal.textContent = state.fontSize;
    applyStyles();
});

lineHeight.addEventListener('input', (e) => {
    state.lineHeight = e.target.value;
    lineHeightVal.textContent = state.lineHeight;
    applyStyles();
});

letterSpacing.addEventListener('input', (e) => {
    state.letterSpacing = `${e.target.value}px`;
    letterSpacingVal.textContent = state.letterSpacing;
    applyStyles();
});

function handleButtonGroup(groupEl, stateProp, dataAttr) {
    groupEl.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        groupEl.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        state[stateProp] = btn.dataset[dataAttr];
        applyStyles();
    });
}

handleButtonGroup(weightGroup, 'fontWeight', 'weight');
handleButtonGroup(transformGroup, 'textTransform', 'transform');
handleButtonGroup(alignGroup, 'textAlign', 'align');

resetTextBtn.addEventListener('click', () => {
    previewText.innerHTML = defaultContent;
});

copyCssBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(cssCode.textContent).then(() => {
        copyToast.classList.remove('hidden');
        setTimeout(() => {
            copyToast.classList.add('hidden');
        }, 2000);
    });
});

// Initial Render
applyStyles();