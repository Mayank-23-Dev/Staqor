document.getElementById('entryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = document.getElementById('descInput').value;
    const amt = parseFloat(document.getElementById('amtInput').value);
    const type = document.getElementById('typeInput').value;

    const item = document.createElement('div');
    item.className = `tx-item ${type}`;
    item.innerHTML = `
        <span>${desc}</span>
        <strong>${type === 'income' ? '+' : '-'}$${amt.toFixed(2)}</strong>
    `;

    document.getElementById('txList').prepend(item);
    e.target.reset();
});