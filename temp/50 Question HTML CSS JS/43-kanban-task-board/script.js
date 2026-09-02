let draggedItem = null;

function attachDragEvents() {
    document.querySelectorAll('.task-card').forEach(card => {
        card.addEventListener('dragstart', () => {
            draggedItem = card;
            setTimeout(() => card.style.display = 'none', 0);
        });

        card.addEventListener('dragend', () => {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
    });
}

document.querySelectorAll('.tasks-list').forEach(list => {
    list.addEventListener('dragover', (e) => e.preventDefault());
    list.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedItem) {
            list.appendChild(draggedItem);
        }
    });
});

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const title = prompt('Enter task title:');
    if (!title) return;

    const card = document.createElement('div');
    card.className = 'task-card';
    card.draggable = true;
    card.innerHTML = `
        <span class="p-tag med">Medium</span>
        <h4>${title}</h4>
        <p>New task created from board.</p>
    `;
    document.getElementById('todoList').appendChild(card);
    attachDragEvents();
});

attachDragEvents();