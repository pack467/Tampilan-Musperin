    // Script untuk toggle menu mobile
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navbar = document.getElementById('navbar');
        
        if (mobileMenuBtn && navbar) {
            mobileMenuBtn.addEventListener('click', function() {
                navbar.classList.toggle('show');
            });
        }
    });