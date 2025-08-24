// Image gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const thumbs = document.querySelectorAll('.thumb');
    const mainImage = document.getElementById('mainImage');
    
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumb
            this.classList.add('active');
            
            // Change main image
            const newImage = this.getAttribute('data-image');
            mainImage.src = newImage;
        });
    });
    
    // Zoom button functionality
    const zoomButton = document.querySelector('.zoom-button');
    zoomButton.addEventListener('click', function() {
        alert('Fitur zoom akan membuka gambar dalam mode layar penuh');
        // In actual implementation, this would open a lightbox
    });
});