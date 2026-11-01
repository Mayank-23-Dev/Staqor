const container = document.getElementById('toastContainer');
const successBtn = document.getElementById('successToast');
const errorBtn = document.getElementById('errorToast');
const warningBtn = document.getElementById('warningToast');
const infoBtn = document.getElementById('infoToast');

function createToast(type, icon, title, desc, duration = 3500) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-desc">${desc}</div>
        </div>
        <button class="toast-close">&times;</button>
        <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const dismiss = () => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    };

    closeBtn.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);

    container.appendChild(toast);
}

successBtn.addEventListener('click', () => {
    createToast('success', '✓', 'Operation Successful', 'Your changes have been saved to the cloud.');
});

errorBtn.addEventListener('click', () => {
    createToast('error', '✕', 'Connection Error', 'Failed to reach database server. Retry in 5s.');
});

warningBtn.addEventListener('click', () => {
    createToast('warning', '⚠️', 'Storage Almost Full', 'You have utilized 92% of allocated disk capacity.');
});

infoBtn.addEventListener('click', () => {
    createToast('info', 'ℹ️', 'New Version Available', 'Antigravity 2.4 update is ready for installation.');
});