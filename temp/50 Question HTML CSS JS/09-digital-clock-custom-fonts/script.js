const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const periodEl = document.getElementById('period');
const dateDisplayEl = document.getElementById('dateDisplay');
const secondsBar = document.getElementById('secondsBar');
const mode12Btn = document.getElementById('mode12');
const mode24Btn = document.getElementById('mode24');
const timezoneSelect = document.getElementById('timezoneSelect');

let is24Hour = false;
let currentTimezone = 'local';

function updateClock() {
    const now = new Date();
    let dateObj = now;

    if (currentTimezone !== 'local') {
        const tzString = now.toLocaleString('en-US', { timeZone: currentTimezone });
        dateObj = new Date(tzString);
    }

    let h = dateObj.getHours();
    const m = dateObj.getMinutes();
    const s = dateObj.getSeconds();

    let period = '';
    if (!is24Hour) {
        period = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        periodEl.style.display = 'inline';
        periodEl.textContent = period;
    } else {
        periodEl.style.display = 'none';
    }

    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');

    // Date String
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplayEl.textContent = dateObj.toLocaleDateString('en-US', options);

    // Progress Bar
    const percent = (s / 60) * 100;
    secondsBar.style.width = `${percent}%`;
}

mode12Btn.addEventListener('click', () => {
    is24Hour = false;
    mode12Btn.classList.add('active');
    mode24Btn.classList.remove('active');
    updateClock();
});

mode24Btn.addEventListener('click', () => {
    is24Hour = true;
    mode24Btn.classList.add('active');
    mode12Btn.classList.remove('active');
    updateClock();
});

timezoneSelect.addEventListener('change', (e) => {
    currentTimezone = e.target.value;
    updateClock();
});

setInterval(updateClock, 1000);
updateClock();