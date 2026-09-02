const themeToggle = document.getElementById('themeToggle');
const modeLabel = document.getElementById('modeLabel');
const statusDesc = document.getElementById('statusDesc');
const testAlertBtn = document.getElementById('testAlertBtn');

// Read Saved Theme or Default to Dark
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'light') {
        themeToggle.checked = true;
        modeLabel.textContent = 'Light Mode';
        statusDesc.innerHTML = 'Current active theme: <strong>Light Theme (data-theme="light")</strong>';
    } else {
        themeToggle.checked = false;
        modeLabel.textContent = 'Dark Mode';
        statusDesc.innerHTML = 'Current active theme: <strong>Dark Theme (data-theme="dark")</strong>';
    }
}

themeToggle.addEventListener('change', () => {
    const nextTheme = themeToggle.checked ? 'light' : 'dark';
    applyTheme(nextTheme);
});

testAlertBtn.addEventListener('click', () => {
    alert(`Theme is currently set to ${document.documentElement.getAttribute('data-theme')} mode!`);
});