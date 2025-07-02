document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const expresswayList = document.getElementById('expresswayList');

            data.forEach(expressway => {
                const card = document.createElement('div');
                card.className = 'expressway-card';
                card.dataset.state = expressway.states.toLowerCase();
                card.dataset.scheme = expressway.scheme.toLowerCase();

                card.innerHTML = `
                    <h2>${expressway.name}</h2>
                    <p><strong>Length:</strong> ${expressway.length}</p>
                    <p><strong>Status:</strong> ${expressway.status}</p>
                    <p><strong>States Covered:</strong> ${expressway.states}</p>
                    <p><strong>Inauguration:</strong> ${expressway.inauguration}</p>
                    <p><strong>Scheme:</strong> ${expressway.scheme}</p>
                `;
                expresswayList.appendChild(card);
            });
        });
});

// Search Functionality
document.getElementById('searchInput').addEventListener('keyup', function () {
    const filter = this.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.expressway-card');

    cards.forEach(card => {
        const textData = card.innerText.toLowerCase();
        card.style.display = textData.includes(filter) ? 'block' : 'none';
    });
});
