const quizData = [
    { q: "Which HTML5 element is used for primary navigation?", opts: ["<nav>", "<header>", "<section>", "<main>"], ans: 0 },
    { q: "Which CSS property enables 2D grid matrix layouts?", opts: ["display: flex", "display: grid", "float: left", "position: absolute"], ans: 1 },
    { q: "How do you declare a custom property in CSS?", opts: ["@variable name", "--custom-color", "$color", "let color"], ans: 1 }
];

let cur = 0;
let score = 0;

const questionText = document.getElementById('questionText');
const optionsGrid = document.getElementById('optionsGrid');
const nextBtn = document.getElementById('nextQBtn');
const qProgress = document.getElementById('qProgress');
const scoreVal = document.getElementById('scoreVal');

function loadQ() {
    const data = quizData[cur];
    qProgress.textContent = `Question ${cur + 1} of ${quizData.length}`;
    questionText.textContent = data.q;
    nextBtn.classList.add('hidden');

    optionsGrid.innerHTML = data.opts.map((opt, idx) => `
        <button class="opt-btn" onclick="checkAnswer(${idx})">${opt}</button>
    `).join('');
}

window.checkAnswer = function(idx) {
    const buttons = optionsGrid.querySelectorAll('.opt-btn');
    buttons.forEach(b => b.disabled = true);

    if (idx === quizData[cur].ans) {
        buttons[idx].classList.add('correct');
        score++;
        scoreVal.textContent = score;
    } else {
        buttons[idx].classList.add('wrong');
        buttons[quizData[cur].ans].classList.add('correct');
    }
    nextBtn.classList.remove('hidden');
};

nextBtn.addEventListener('click', () => {
    cur++;
    if (cur < quizData.length) {
        loadQ();
    } else {
        questionText.textContent = `🎉 Quiz Finished! You scored ${score} out of ${quizData.length}!`;
        optionsGrid.innerHTML = '';
        nextBtn.classList.add('hidden');
    }
});

loadQ();