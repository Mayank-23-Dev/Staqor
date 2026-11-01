const stars = document.querySelectorAll('.star');
const feedback = document.getElementById('ratingFeedback');
const submitBtn = document.getElementById('submitRatingBtn');
const resetBtn = document.getElementById('resetRatingBtn');
const thankCard = document.getElementById('thankCard');
const finalScore = document.getElementById('finalScore');

const moods = {
    1: '😞 1 Star - Terrible Experience',
    2: '🙁 2 Stars - Needs Improvement',
    3: '😐 3 Stars - Average / Okay',
    4: '🙂 4 Stars - Very Good!',
    5: '🤩 5 Stars - Absolutely Outstanding!'
};

let currentRating = 0;

function highlightStars(count, className = 'hovered') {
    stars.forEach(star => {
        const r = parseInt(star.dataset.rating);
        if (r <= count) {
            star.classList.add(className);
        } else {
            star.classList.remove(className);
        }
    });
}

stars.forEach(star => {
    const rating = parseInt(star.dataset.rating);

    star.addEventListener('mouseenter', () => {
        highlightStars(rating, 'hovered');
        feedback.textContent = moods[rating];
    });

    star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hovered'));
        if (currentRating > 0) {
            highlightStars(currentRating, 'active');
            feedback.textContent = moods[currentRating];
        } else {
            feedback.textContent = 'Select your rating';
        }
    });

    star.addEventListener('click', () => {
        currentRating = rating;
        highlightStars(currentRating, 'active');
        feedback.textContent = moods[currentRating];
        submitBtn.disabled = false;
    });
});

resetBtn.addEventListener('click', () => {
    currentRating = 0;
    stars.forEach(s => s.classList.remove('active', 'hovered'));
    feedback.textContent = 'Select your rating';
    submitBtn.disabled = true;
    thankCard.classList.add('hidden');
});

submitBtn.addEventListener('click', () => {
    finalScore.textContent = currentRating;
    thankCard.classList.remove('hidden');
});