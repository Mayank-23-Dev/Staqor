const topics = [
    { title: "HTML5 Semantic Elements", cat: "Frontend" },
    { title: "CSS Flexbox & Grid Layouts", cat: "Styling" },
    { title: "JavaScript ES6+ & Async/Await", cat: "Programming" },
    { title: "React Components & Hooks", cat: "Framework" },
    { title: "TypeScript Generics & Types", cat: "Language" },
    { title: "Node.js & Express REST APIs", cat: "Backend" },
    { title: "Docker Containerization", cat: "DevOps" },
    { title: "GraphQL Queries & Mutations", cat: "API" },
    { title: "Tailwind CSS Utility Classes", cat: "Styling" },
    { title: "PostgreSQL Relational Database", cat: "Database" }
];

const searchInput = document.getElementById('liveSearchInput');
const clearBtn = document.getElementById('clearSearchBtn');
const resultsContainer = document.getElementById('resultsContainer');

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

function renderResults() {
    const query = searchInput.value.trim();
    clearBtn.classList.toggle('hidden', query.length === 0);

    if (!query) {
        resultsContainer.innerHTML = '<div class="empty-state">Start typing to see matching developer topics...</div>';
        return;
    }

    const filtered = topics.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = `<div class="empty-state">No matching topics found for "${query}"</div>`;
        return;
    }

    resultsContainer.innerHTML = filtered.map(item => `
        <div class="result-item" onclick="alert('Navigating to: ${item.title}')">
            <span class="item-title">${highlightMatch(item.title, query)}</span>
            <span class="item-category">${item.cat}</span>
        </div>
    `).join('');
}

searchInput.addEventListener('input', renderResults);

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    renderResults();
    searchInput.focus();
});