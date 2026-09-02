const profileCard = document.getElementById('profileCard');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const followBtn = document.getElementById('followBtn');
const followersCount = document.getElementById('followersCount');
const messageBtn = document.getElementById('messageBtn');
const toastMsg = document.getElementById('toastMsg');

let isFollowing = false;
let currentFollowers = 1420;

themeToggleBtn.addEventListener('click', () => {
    profileCard.classList.toggle('light-mode');
    themeToggleBtn.textContent = profileCard.classList.contains('light-mode') ? '☀️' : '🌙';
});

followBtn.addEventListener('click', () => {
    isFollowing = !isFollowing;
    if (isFollowing) {
        currentFollowers++;
        followBtn.textContent = 'Following ✓';
        followBtn.classList.add('following');
    } else {
        currentFollowers--;
        followBtn.textContent = 'Follow +';
        followBtn.classList.remove('following');
    }
    followersCount.textContent = currentFollowers.toLocaleString();
});

messageBtn.addEventListener('click', () => {
    toastMsg.classList.remove('hidden');
    setTimeout(() => {
        toastMsg.classList.add('hidden');
    }, 2500);
});