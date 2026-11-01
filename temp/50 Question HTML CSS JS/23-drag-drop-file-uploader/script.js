const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const fileList = document.getElementById('fileList');

browseBtn.addEventListener('click', () => fileInput.click());

['dragenter', 'dragover'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
});

['dragleave', 'drop'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
    });
});

dropZone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    Array.from(files).forEach(file => {
        const item = document.createElement('div');
        item.className = 'file-item';
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);

        item.innerHTML = `
            <div class="file-info">
                <span>📄</span>
                <div>
                    <div class="file-name">${file.name}</div>
                    <div class="file-size">${sizeMb} MB</div>
                </div>
            </div>
            <button class="btn-remove">&times;</button>
        `;

        item.querySelector('.btn-remove').addEventListener('click', () => item.remove());
        fileList.appendChild(item);
    });
}