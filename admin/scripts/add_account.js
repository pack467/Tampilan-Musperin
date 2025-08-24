// DOM Elements
const listTab = document.getElementById('list-tab');
const addTab = document.getElementById('add-tab');
const accountListContainer = document.getElementById('account-list-container');
const accountFormContainer = document.getElementById('account-form-container');
const cancelBtn = document.getElementById('cancel-btn');
const accountForm = document.getElementById('account-form');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');

// Toggle password visibility
togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);

        // Toggle eye icon
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });
});

// Switch to add account form
addTab.addEventListener('click', function() {
    if (!this.classList.contains('active')) {
        listTab.classList.remove('active');
        this.classList.add('active');
        accountListContainer.style.display = 'none';
        accountFormContainer.style.display = 'block';
        accountFormContainer.classList.add('fade-in');
        document.querySelector('.form-title').textContent = 'Tambah Akun Baru';
        accountForm.reset();
    }
});

// Switch to account list
listTab.addEventListener('click', function() {
    if (!this.classList.contains('active')) {
        addTab.classList.remove('active');
        this.classList.add('active');
        accountFormContainer.style.display = 'none';
        accountListContainer.style.display = 'block';
        accountListContainer.classList.add('fade-in');
        document.querySelector('.form-title').textContent = 'Tambah Akun Baru';
        accountForm.reset();
    }
});

// Cancel button
cancelBtn.addEventListener('click', function() {
    listTab.click();
});

// Form submission
accountForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const role = document.getElementById('role').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Simple validation
    if (password !== confirmPassword) {
        alert('Password dan konfirmasi password tidak cocok!');
        return;
    }
    if (!role) {
        alert('Role wajib dipilih!');
        return;
    }

    // Simulate successful account creation
    alert(`Akun ${username} berhasil dibuat!`);

    // Reset form and switch to account list
    accountForm.reset();
    listTab.click();
});

// Edit button functionality
document.querySelectorAll('.btn-edit').forEach(button => {
    button.addEventListener('click', function() {
        const row = this.closest('tr');
        const name = row.cells[0].textContent;
        const username = row.cells[1].textContent;
        const role = row.cells[2].querySelector('.role-badge').textContent.trim();

        // Switch to form
        addTab.click();

        // Pre-fill form
        document.getElementById('fullname').value = name;
        document.getElementById('username').value = username;
        document.getElementById('role').value = role.toLowerCase();

        // Change form title
        document.querySelector('.form-title').textContent = 'Edit Akun';
    });
});

// Delete button functionality
document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', function() {
        const row = this.closest('tr');
        const username = row.cells[1].textContent;

        if (confirm(`Apakah Anda yakin ingin menghapus akun ${username}?`)) {
            row.remove();
            // In a real app, you would send a delete request to the server
            alert(`Akun ${username} berhasil dihapus!`);
        }
    });
});

// Sidebar toggle logic (optional, jika sidebar ada tombol collapse)
const sidebarToggle = document.querySelector('.toggle-button');
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function() {
        document.body.classList.toggle('sidebar-collapsed');
    });
}
