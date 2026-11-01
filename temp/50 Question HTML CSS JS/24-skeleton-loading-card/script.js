const toggleBtn = document.getElementById('toggleStateBtn');
const skeletonCard = document.getElementById('skeletonCard');
const realCard = document.getElementById('realCard');

let isLoading = true;

toggleBtn.addEventListener('click', () => {
    isLoading = !isLoading;
    if (isLoading) {
        skeletonCard.classList.remove('hidden');
        realCard.classList.add('hidden');
    } else {
        skeletonCard.classList.add('hidden');
        realCard.classList.remove('hidden');
    }
});