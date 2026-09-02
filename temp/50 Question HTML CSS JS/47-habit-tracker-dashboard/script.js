document.getElementById('addHabitBtn').addEventListener('click', () => {
    const title = prompt('Enter habit name:');
    if (!title) return;

    const row = document.createElement('div');
    row.className = 'habit-row';
    row.innerHTML = `
        <span class="habit-name">${title}</span>
        <div class="day-boxes">
            <input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox"><input type="checkbox">
        </div>
    `;
    document.getElementById('habitsList').appendChild(row);
});