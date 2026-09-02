function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 1500; // Duration in ms

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const decimals = parseInt(counter.getAttribute('data-decimals') || '0');
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / speed, 1);
            
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeProgress * target;

            counter.textContent = decimals > 0 ? currentVal.toFixed(decimals) : Math.floor(currentVal).toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = decimals > 0 ? target.toFixed(decimals) : target.toLocaleString();
            }
        }

        requestAnimationFrame(updateCount);
    });
}

document.getElementById('replayBtn').addEventListener('click', animateCounters);

// Trigger on load
animateCounters();