// Pagination functionality
document.addEventListener('DOMContentLoaded', function() {
    const paginationButtons = document.querySelectorAll('.pagination-button:not(.prev-next)');
    const prevButton = document.querySelector('.prev-next:first-child');
    const nextButton = document.querySelector('.prev-next:last-child');
    let currentPage = 1;
    
    // Update active state
    function updatePagination() {
        paginationButtons.forEach(button => {
            button.classList.remove('active');
            if(parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            }
        });
        
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === 12; // Disable when on last page
    }
    
    // Number buttons click
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if(!isNaN(this.textContent)) {
                currentPage = parseInt(this.textContent);
                updatePagination();
                // Here you would typically load the page content via AJAX
                console.log('Loading page', currentPage);
            }
        });
    });
    
    // Previous button
    prevButton.addEventListener('click', function() {
        if(currentPage > 1) {
            currentPage--;
            updatePagination();
            console.log('Loading page', currentPage);
        }
    });
    
    // Next button
    nextButton.addEventListener('click', function() {
        if(currentPage < 12) { // Change 12 to total pages
            currentPage++;
            updatePagination();
            console.log('Loading page', currentPage);
        }
    });
    
    // Initialize pagination
    updatePagination();
});
