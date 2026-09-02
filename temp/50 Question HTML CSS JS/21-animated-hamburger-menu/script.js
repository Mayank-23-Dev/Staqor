const hamburgerBtn = document.getElementById('hamburgerBtn');
const navDrawer = document.getElementById('navDrawer');
const backdrop = document.getElementById('drawerBackdrop');

function toggleMenu() {
    const isOpen = hamburgerBtn.classList.toggle('open');
    navDrawer.classList.toggle('open', isOpen);
    backdrop.classList.toggle('open', isOpen);
}

hamburgerBtn.addEventListener('click', toggleMenu);
backdrop.addEventListener('click', toggleMenu);