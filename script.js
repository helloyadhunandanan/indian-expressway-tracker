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
                card.dataset.status = expressway.status.toLowerCase();

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

            // Load Map Markers
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

// Filter by Status (All / Completed / Under Construction)
function filterStatus(statusFilter) {
    const cards = document.querySelectorAll('.expressway-card');

    cards.forEach(card => {
        const statusText = card.dataset.status;

        if (statusFilter.toLowerCase() === 'all') {
            card.style.display = 'block';
        } else if (statusText.includes(statusFilter.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
});

// Get Marker Color Based on Status
function getMarkerColor(status) {
    if (status.toLowerCase().includes('completed')) {
        return '00c853'; // Green
    } else if (status.toLowerCase().includes('under construction')) {
        return 'ff9800'; // Orange
    } else {
        return '2196f3'; // Blue (Default)
    }
}

// Initialize Leaflet Map and Add Color-Coded Markers
function loadMap(expressways) {
    const map = L.map('map').setView([22.9734, 78.6569], 5); // Center over India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    expressways.forEach(expressway => {
        if (expressway.latitude && expressway.longitude) {
            const markerIcon = L.icon({
                iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${getMarkerColor(expressway.status)}`,
                iconSize: [21, 34],
                iconAnchor: [10, 34],
                popupAnchor: [0, -34]
            });

            L.marker([expressway.latitude, expressway.longitude], { icon: markerIcon })
                .addTo(map)
                .bindPopup(`<strong>${expressway.name}</strong><br>${expressway.states}<br>Status: ${expressway.status}`);
        }
    });
}
