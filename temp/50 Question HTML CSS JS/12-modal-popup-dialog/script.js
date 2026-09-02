const openFormModalBtn = document.getElementById('openFormModalBtn');
const openConfirmModalBtn = document.getElementById('openConfirmModalBtn');
const formModal = document.getElementById('formModal');
const confirmModal = document.getElementById('confirmModal');
const feedbackStatus = document.getElementById('feedbackStatus');
const feedbackForm = document.getElementById('feedbackForm');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

function showModal(modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('modal-open');
}

function hideModal(modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');
}

openFormModalBtn.addEventListener('click', () => showModal(formModal));
openConfirmModalBtn.addEventListener('click', () => showModal(confirmModal));

[formModal, confirmModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('close-modal') || e.target.classList.contains('cancel-btn')) {
            hideModal(modal);
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideModal(formModal);
        hideModal(confirmModal);
    }
});

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('userName').value;
    feedbackStatus.innerHTML = `Last action: <strong>Feedback submitted by ${name}! 🎉</strong>`;
    hideModal(formModal);
    feedbackForm.reset();
});

confirmDeleteBtn.addEventListener('click', () => {
    feedbackStatus.innerHTML = `Last action: <strong style="color: #ef4444;">Project was successfully deleted! 🗑️</strong>`;
    hideModal(confirmModal);
});