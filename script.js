// Load Expressway Data from JSON and Display Cards
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

            // Load Expressway Locations on Map after Cards Load
            loadMap(data);
        });
});

// Search Filter for Expressway Cards
document.getElementById('searchInput').addEventListener('keyup', function () {
    const filter = this.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.expressway-card');

    cards.forEach(card => {
        const textData = card.innerText.toLowerCase();
        card.style.display = textData.includes(filter) ? 'block' : 'none';
    });
});

// Initialize Leaflet Map and Add Markers
function loadMap(expressways) {
    const map = L.map('map').setView([22.9734, 78.6569], 5); // Center over India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    expressways.forEach(expressway => {
        if (expressway.latitude && expressway.longitude) {
            L.marker([expressway.latitude, expressway.longitude])
                .addTo(map)
                .bindPopup(`<strong>${expressway.name}</strong><br>${expressway.states}`);
        }
    });
}
