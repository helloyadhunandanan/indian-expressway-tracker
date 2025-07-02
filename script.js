// Enable search by expressway name, state, and scheme
document.getElementById('searchInput').addEventListener('keyup', function () {
    const filter = this.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.expressway-card');

    cards.forEach(card => {
        const textData = [
            card.querySelector('h2').textContent.toLowerCase(),
            card.dataset.state,
            card.dataset.scheme
        ].join(' ');

        card.style.display = textData.includes(filter) ? 'block' : 'none';
    });
});
