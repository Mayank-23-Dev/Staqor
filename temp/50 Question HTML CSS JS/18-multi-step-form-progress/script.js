let currentStep = 1;
const totalSteps = 3;

const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevStepBtn');
const nextBtn = document.getElementById('nextStepBtn');

const emailInput = document.getElementById('emailInput');
const passInput = document.getElementById('passInput');
const fullnameInput = document.getElementById('fullnameInput');
const roleInput = document.getElementById('roleInput');

const sumEmail = document.getElementById('sumEmail');
const sumName = document.getElementById('sumName');
const sumRole = document.getElementById('sumRole');

function updateWizard() {
    // Fill calculation
    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Nodes
    document.querySelectorAll('.step-node').forEach((node, idx) => {
        const stepNum = idx + 1;
        node.classList.toggle('active', stepNum === currentStep);
        node.classList.toggle('completed', stepNum < currentStep);
    });

    // Panels
    document.querySelectorAll('.step-panel').forEach((panel, idx) => {
        panel.classList.toggle('active', idx + 1 === currentStep);
    });

    prevBtn.disabled = currentStep === 1;
    nextBtn.textContent = currentStep === totalSteps ? 'Launch Account 🚀' : 'Next Step →';

    if (currentStep === 3) {
        sumEmail.textContent = emailInput.value || 'N/A';
        sumName.textContent = fullnameInput.value || 'N/A';
        sumRole.textContent = roleInput.value || 'N/A';
    }
}

nextBtn.addEventListener('click', () => {
    if (currentStep === 1) {
        if (!emailInput.value || !passInput.value) {
            alert('Please fill out account credentials.');
            return;
        }
    } else if (currentStep === 2) {
        if (!fullnameInput.value || !roleInput.value) {
            alert('Please fill out profile details.');
            return;
        }
    } else if (currentStep === 3) {
        alert('Account setup complete! Welcome aboard.');
        return;
    }

    if (currentStep < totalSteps) {
        currentStep++;
        updateWizard();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        updateWizard();
    }
});