// Fungsi toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggle-icon');

    sidebar.classList.toggle('collapsed');
    
    // Ganti icon berdasarkan state sidebar
    if (sidebar.classList.contains('collapsed')) {
        // Sidebar mengecil = panah kanan (untuk membuka)
        toggleIcon.className = 'fas fa-angle-right';
    } else {
        // Sidebar membesar = panah kiri (untuk menutup)
        toggleIcon.className = 'fas fa-angle-left';
    }
}

// Handle resize untuk reset state di mobile
window.addEventListener('resize', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggle-icon');
    
    if (window.innerWidth <= 768) {
        // Mobile: sidebar selalu collapsed
        sidebar.classList.add('collapsed');
        toggleIcon.className = 'fas fa-angle-right';
    } else {
        // Desktop: sidebar terbuka
        sidebar.classList.remove('collapsed');
        toggleIcon.className = 'fas fa-angle-left';
    }
});

// Inisialisasi awal berdasarkan lebar layar
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggle-icon');
    
    if (window.innerWidth <= 768) {
        // Mobile: mulai dengan collapsed
        sidebar.classList.add('collapsed');
        toggleIcon.className = 'fas fa-angle-right';
    } else {
        // Desktop: mulai dengan terbuka
        sidebar.classList.remove('collapsed');
        toggleIcon.className = 'fas fa-angle-left';
    }
});

// Optional: Tambahan untuk memastikan consistency
window.addEventListener('load', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleIcon = document.getElementById('toggle-icon');
    
    // Set icon sesuai dengan state sidebar saat ini
    if (sidebar.classList.contains('collapsed')) {
        toggleIcon.className = 'fas fa-angle-right';
    } else {
        toggleIcon.className = 'fas fa-angle-left';
    }
});