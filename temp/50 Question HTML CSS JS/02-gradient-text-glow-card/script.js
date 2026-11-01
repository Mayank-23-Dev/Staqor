const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const color3Input = document.getElementById('color3');
const angleInput = document.getElementById('gradientAngle');
const angleVal = document.getElementById('angleVal');
const glowInput = document.getElementById('glowBlur');
const glowVal = document.getElementById('glowVal');
const glowCard = document.getElementById('glowCard');
const presetBtns = document.querySelectorAll('.preset-btn');
const copySnippetBtn = document.getElementById('copySnippetBtn');
const copyAlert = document.getElementById('copyAlert');

function updateStyles() {
    const c1 = color1Input.value;
    const c2 = color2Input.value;
    const c3 = color3Input.value;
    const angle = `${angleInput.value}deg`;
    const blur = `${glowInput.value}px`;

    document.documentElement.style.setProperty('--c1', c1);
    document.documentElement.style.setProperty('--c2', c2);
    document.documentElement.style.setProperty('--c3', c3);
    document.documentElement.style.setProperty('--angle', angle);
    document.documentElement.style.setProperty('--glow-blur', blur);

    angleVal.textContent = angle;
    glowVal.textContent = blur;

    glowCard.style.boxShadow = `0 0 ${blur} ${c1}66, 0 0 calc(${blur} * 1.5) ${c3}44`;
}

[color1Input, color2Input, color3Input, angleInput, glowInput].forEach(input => {
    input.addEventListener('input', updateStyles);
});

presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        color1Input.value = btn.dataset.c1;
        color2Input.value = btn.dataset.c2;
        color3Input.value = btn.dataset.c3;
        updateStyles();
    });
});

copySnippetBtn.addEventListener('click', () => {
    const css = `/* Gradient Text */
background: linear-gradient(${angleInput.value}deg, ${color1Input.value}, ${color2Input.value}, ${color3Input.value});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;

/* Neon Box Glow */
box-shadow: 0 0 ${glowInput.value}px ${color1Input.value}66, 0 0 calc(${glowInput.value}px * 1.5) ${color3Input.value}44;`;

    navigator.clipboard.writeText(css).then(() => {
        copyAlert.classList.remove('hidden');
        setTimeout(() => copyAlert.classList.add('hidden'), 2000);
    });
});

updateStyles();