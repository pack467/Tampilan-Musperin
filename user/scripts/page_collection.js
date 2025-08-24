document.addEventListener('DOMContentLoaded', function() {
    console.log('page.js aktif (versi tanpa thumb)');

    // Ambil elemen gambar utama
    const mainImage = document.getElementById('mainImage');

    // --- 1. Fitur Zoom Modal ---
    const zoomButton = document.querySelector('.zoom-button');
    const zoomModal = document.getElementById('zoomModal');
    const zoomedImg = document.getElementById('zoomedImg');
    const closeZoom = document.getElementById('closeZoom');

    zoomButton.addEventListener('click', function() {
        zoomModal.style.display = "flex";
        zoomedImg.src = mainImage.src;
    });

    closeZoom.onclick = function() {
        zoomModal.style.display = "none";
        zoomedImg.src = "";
    };

    zoomModal.onclick = function(e) {
        if (e.target === zoomModal) {
            zoomModal.style.display = "none";
            zoomedImg.src = "";
        }
    };

    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && zoomModal.style.display === "flex") {
            zoomModal.style.display = "none";
            zoomedImg.src = "";
        }
    });

    // --- 2. Fitur Favorite Button (jika ada) ---
    const favBtn = document.querySelector('.favorite-button');
    if (favBtn) {
        favBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                this.style.borderColor = 'var(--accent)';
                this.style.color = 'var(--accent)';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.backgroundColor = '';
                this.style.borderColor = '';
                this.style.color = '';
            }
        });
    }

    const grid = document.querySelector('.collection-grid');
    let isDown = false;
    let startX;
    let scrollLeft;

    if(grid){
        grid.addEventListener('mousedown', (e) => {
            isDown = true;
            grid.classList.add('dragging');
            startX = e.pageX - grid.offsetLeft;
            scrollLeft = grid.scrollLeft;
        });
        grid.addEventListener('mouseleave', () => {
            isDown = false;
            grid.classList.remove('dragging');
        });
        grid.addEventListener('mouseup', () => {
            isDown = false;
            grid.classList.remove('dragging');
        });
        grid.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - grid.offsetLeft;
            const walk = (x - startX) * 1.2; // adjust scroll speed
            grid.scrollLeft = scrollLeft - walk;
        });
    }
});

