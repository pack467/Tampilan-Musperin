// Simulasi database menggunakan variabel global (menggantikan localStorage)
let activitiesDatabase = [];

// Fungsi untuk mendapatkan data kegiatan
function getActivities() {
    return activitiesDatabase;
}

// Fungsi untuk menyimpan data kegiatan
function saveActivities(activities) {
    activitiesDatabase = activities;
}

// Inisialisasi halaman
document.addEventListener('DOMContentLoaded', function() {
    // Referensi elemen
    const listBtn = document.getElementById('listBtn');
    const addBtn = document.getElementById('addBtn');
    const listPage = document.getElementById('listPage');
    const addPage = document.getElementById('addPage');
    const activityForm = document.getElementById('activityForm');
    const activityTableBody = document.getElementById('activityTableBody');
    const searchInput = document.getElementById('searchInput');
    const refreshBtn = document.getElementById('refreshBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPageEl = document.getElementById('currentPage');
    const currentCountEl = document.getElementById('currentCount');
    const totalCountEl = document.getElementById('totalCount');
    const imagePreview = document.getElementById('imagePreview');
    const activityImage = document.getElementById('activityImage');
    const featureList = document.getElementById('featureList');
    const addFeatureBtn = document.querySelector('.add-feature-btn');
    const featureField = document.querySelector('.feature-field');
    
    // Variabel global
    let currentPage = 1;
    const itemsPerPage = 5;
    let currentActivities = [];
    let features = [];
    let editMode = false;
    let editId = null;
    
    // Inisialisasi data sample
    function initializeSampleData() {
        const sampleData = [
            {
                id: '1',
                type: 'permanent',
                title: 'Pameran Sejarah Perkebunan',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzRDQUY1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCII+UGFtZXJhbiBTZWphcmFoPC90ZXh0Pjwvc3ZnPg==',
                startDate: '2025-01-01',
                endDate: '2025-12-31',
                time: '09:00 - 17:00',
                price: '50000',
                description: 'Pameran tentang sejarah perkebunan di Indonesia dengan koleksi artefak dan dokumentasi lengkap.',
                features: ['Tur interaktif', 'Guide profesional', 'Museum virtual'],
                contact: '+62 822-8723-3036',
                status: 'active',
                createdAt: new Date().toISOString()
            },
            {
                id: '2',
                type: 'temporary',
                title: 'Workshop Pengolahan Teh',
                image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzJlN2QzMiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCII+V29ya3Nob3AgVGVoPC90ZXh0Pjwvc3ZnPg==',
                startDate: '2025-02-15',
                endDate: '2025-02-16',
                time: '10:00 - 15:00',
                price: '150000',
                description: 'Workshop praktis mengolah daun teh segar menjadi teh berkualitas tinggi dengan teknik tradisional.',
                features: ['Praktik langsung', 'Sertifikat', 'Kit teh gratis'],
                contact: '+62 822-8723-3036',
                status: 'active',
                createdAt: new Date().toISOString()
            }
        ];
        
        // Hanya inisialisasi jika database kosong
        if (activitiesDatabase.length === 0) {
            saveActivities(sampleData);
        }
    }
    
    // Fungsi untuk berpindah halaman
    function switchPage(page) {
        listPage.classList.remove('active');
        addPage.classList.remove('active');
        
        if (page === 'list') {
            listPage.classList.add('active');
            listBtn.classList.add('active');
            addBtn.classList.remove('active');
            loadActivities();
        } else {
            addPage.classList.add('active');
            addBtn.classList.add('active');
            listBtn.classList.remove('active');
            resetForm();
        }
    }
    
    // Event listener untuk tombol navigasi
    listBtn.addEventListener('click', () => switchPage('list'));
    addBtn.addEventListener('click', () => switchPage('add'));
    
    // Fungsi untuk memuat kegiatan
    function loadActivities() {
        const activities = getActivities();
        currentActivities = activities;
        renderActivities(currentActivities);
        updatePagination();
    }
    
    // Fungsi untuk format tanggal Indonesia
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    // Fungsi untuk menampilkan kegiatan di tabel
    function renderActivities(activities) {
        activityTableBody.innerHTML = '';
        
        if (activities.length === 0) {
            activityTableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 40px; color: #888;">
                        <i class="fas fa-calendar-times" style="font-size: 3rem; margin-bottom: 15px; display: block;"></i>
                        <p style="font-size: 1.1rem; margin: 0;">Tidak ada kegiatan ditemukan</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        // Pagination
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedActivities = activities.slice(startIndex, startIndex + itemsPerPage);
        
        paginatedActivities.forEach((activity, index) => {
            const row = document.createElement('tr');
            const rowNumber = startIndex + index + 1;
            
            // Format harga
            const price = activity.price === 'Gratis' || activity.price === '' || !activity.price
                ? 'Gratis' 
                : `Rp ${parseInt(activity.price).toLocaleString('id-ID')}`;
            
            // Format tanggal dengan "s.d."
            let dateRange = formatDate(activity.startDate);
            if (activity.endDate) {
                dateRange += ` s.d. ${formatDate(activity.endDate)}`;
            }
            
            row.innerHTML = `
                <td>${rowNumber}.</td>
                <td>${activity.title}</td>
                <td>${activity.type === 'temporary' ? 'Acara Khusus' : 'Pameran Tetap'}</td>
                <td>${dateRange}</td>
                <td>${activity.time}</td>
                <td>${price}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" data-id="${activity.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${activity.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            
            activityTableBody.appendChild(row);
        });
        
        // Menambahkan event listener untuk tombol edit dan delete
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                editActivity(id);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                deleteActivity(id);
            });
        });
        
        // Update counter
        currentCountEl.textContent = paginatedActivities.length;
        totalCountEl.textContent = activities.length;
    }
    
    // Fungsi untuk mengedit kegiatan
    function editActivity(id) {
        const activities = getActivities();
        const activity = activities.find(a => a.id === id);
        
        if (activity) {
            editMode = true;
            editId = id;
            
            // Isi form dengan data kegiatan
            document.getElementById('activityType').value = activity.type;
            document.getElementById('activityTitle').value = activity.title;
            
            // Tampilkan preview gambar
            if (activity.image) {
                imagePreview.innerHTML = `<img src="${activity.image}" alt="Preview">`;
            }
            
            document.getElementById('activityStartDate').value = activity.startDate;
            document.getElementById('activityEndDate').value = activity.endDate || '';
            document.getElementById('activityTime').value = activity.time;
            document.getElementById('activityPrice').value = activity.price;
            document.getElementById('activityDescription').value = activity.description;
            document.getElementById('activityContact').value = activity.contact;
            
            // Isi fitur
            features = [...(activity.features || [])];
            renderFeatures();
            
            // Set status
            document.querySelector(`input[name="activityStatus"][value="${activity.status}"]`).checked = true;
            
            // Ubah teks tombol submit
            document.querySelector('.submit-btn').innerHTML = '<i class="fas fa-save"></i> Update Kegiatan';
            
            // Beralih ke halaman tambah
            switchPage('add');
        }
    }
    
    // Fungsi untuk menghapus kegiatan
    function deleteActivity(id) {
        const activities = getActivities();
        const activity = activities.find(a => a.id === id);
        const activityName = activity ? activity.title : 'kegiatan ini';
        
        if (confirm(`Apakah Anda yakin ingin menghapus "${activityName}"?`)) {
            const updatedActivities = activities.filter(a => a.id !== id);
            saveActivities(updatedActivities);
            loadActivities();
            showNotification('Kegiatan berhasil dihapus!', 'success');
        }
    }
    
    // Fungsi untuk validasi form
    function validateForm() {
        const requiredFields = [
            { id: 'activityType', name: 'Jenis Kegiatan' },
            { id: 'activityTitle', name: 'Judul Kegiatan' },
            { id: 'activityStartDate', name: 'Tanggal Mulai' },
            { id: 'activityTime', name: 'Jam Operasional' },
            { id: 'activityDescription', name: 'Deskripsi' },
            { id: 'activityContact', name: 'Kontak' }
        ];
        
        for (let field of requiredFields) {
            const element = document.getElementById(field.id);
            if (!element.value.trim()) {
                showNotification(`${field.name} harus diisi!`, 'error');
                element.focus();
                return false;
            }
        }
        
        // Validasi gambar untuk kegiatan baru
        const imageFile = activityImage.files[0];
        if (!editMode && !imageFile) {
            showNotification('Silakan pilih gambar untuk kegiatan!', 'error');
            return false;
        }
        
        // Validasi tanggal
        const startDate = new Date(document.getElementById('activityStartDate').value);
        const endDate = document.getElementById('activityEndDate').value ? 
                       new Date(document.getElementById('activityEndDate').value) : null;
        
        if (endDate && endDate < startDate) {
            showNotification('Tanggal berakhir tidak boleh lebih awal dari tanggal mulai!', 'error');
            document.getElementById('activityEndDate').focus();
            return false;
        }
        
        return true;
    }
    
    // Fungsi untuk menambahkan/mengedit kegiatan
    activityForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const activity = {
            type: document.getElementById('activityType').value,
            title: document.getElementById('activityTitle').value,
            image: '', // Akan diisi nanti
            startDate: document.getElementById('activityStartDate').value,
            endDate: document.getElementById('activityEndDate').value || null,
            time: document.getElementById('activityTime').value,
            price: document.getElementById('activityPrice').value || 'Gratis',
            description: document.getElementById('activityDescription').value,
            features: [...features],
            contact: document.getElementById('activityContact').value,
            status: document.querySelector('input[name="activityStatus"]:checked').value,
            createdAt: editMode ? getActivities().find(a => a.id === editId)?.createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // Handle gambar
        const imageFile = activityImage.files[0];
        
        if (editMode && !imageFile) {
            // Gunakan gambar yang sudah ada
            const activities = getActivities();
            const existingActivity = activities.find(a => a.id === editId);
            if (existingActivity) {
                activity.image = existingActivity.image;
            }
            saveActivity(activity);
        } else if (imageFile) {
            // Upload gambar baru
            const reader = new FileReader();
            reader.onload = function(e) {
                activity.image = e.target.result;
                saveActivity(activity);
            };
            reader.readAsDataURL(imageFile);
        } else {
            saveActivity(activity);
        }
    });
    
    function saveActivity(activity) {
        const activities = getActivities();
        
        if (editMode) {
            // Update kegiatan yang ada
            const index = activities.findIndex(a => a.id === editId);
            if (index !== -1) {
                activity.id = editId;
                activities[index] = activity;
            }
        } else {
            // Tambahkan kegiatan baru
            activity.id = Date.now().toString();
            activities.push(activity);
        }
        
        saveActivities(activities);
        showNotification(
            editMode ? 'Kegiatan berhasil diperbarui!' : 'Kegiatan berhasil ditambahkan!', 
            'success'
        );
        
        // Reset form dan kembali ke halaman daftar
        resetForm();
        switchPage('list');
        loadActivities();
    }
    
    // Fungsi untuk reset form
    function resetForm() {
        activityForm.reset();
        imagePreview.innerHTML = '<p>Belum ada gambar dipilih</p>';
        features = [];
        renderFeatures();
        editMode = false;
        editId = null;
        document.querySelector('.submit-btn').innerHTML = '<i class="fas fa-save"></i> Simpan Kegiatan';
    }
    
    // Preview gambar
    activityImage.addEventListener('change', function() {
        const file = this.files[0];
        
        if (file) {
            // Validasi ukuran file (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showNotification('Ukuran gambar tidak boleh lebih dari 5MB!', 'error');
                this.value = '';
                imagePreview.innerHTML = '<p>Belum ada gambar dipilih</p>';
                return;
            }
            
            // Validasi tipe file
            if (!file.type.startsWith('image/')) {
                showNotification('File harus berupa gambar!', 'error');
                this.value = '';
                imagePreview.innerHTML = '<p>Belum ada gambar dipilih</p>';
                return;
            }
            
            const reader = new FileReader();
            
            reader.addEventListener('load', function() {
                imagePreview.innerHTML = `<img src="${this.result}" alt="Preview">`;
            });
            
            reader.readAsDataURL(file);
        } else {
            imagePreview.innerHTML = '<p>Belum ada gambar dipilih</p>';
        }
    });
    
    // Menambahkan fitur
    addFeatureBtn.addEventListener('click', function() {
        const featureText = featureField.value.trim();
        
        if (featureText) {
            if (features.includes(featureText)) {
                showNotification('Fitur sudah ada dalam daftar!', 'error');
                return;
            }
            
            features.push(featureText);
            renderFeatures();
            featureField.value = '';
        }
    });
    
    // Event listener untuk enter key pada feature field
    featureField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addFeatureBtn.click();
        }
    });
    
    // Fungsi untuk menghapus fitur (global untuk akses dari HTML)
    window.removeFeature = function(index) {
        features.splice(index, 1);
        renderFeatures();
    };
    
    // Render daftar fitur
    function renderFeatures() {
        featureList.innerHTML = '';
        
        features.forEach((feature, index) => {
            const featureItem = document.createElement('div');
            featureItem.className = 'feature-item';
            featureItem.innerHTML = `
                ${feature}
                <button type="button" class="remove-feature" onclick="removeFeature(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            featureList.appendChild(featureItem);
        });
    }
    
    // Fungsi untuk mencari kegiatan
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activities = getActivities();
        
        if (searchTerm) {
            const filtered = activities.filter(activity => 
                activity.title.toLowerCase().includes(searchTerm) ||
                activity.description.toLowerCase().includes(searchTerm) ||
                (activity.type === 'temporary' ? 'acara khusus' : 'pameran tetap').includes(searchTerm) ||
                activity.contact.toLowerCase().includes(searchTerm) ||
                (activity.features && activity.features.some(feature => 
                    feature.toLowerCase().includes(searchTerm)
                ))
            );
            
            currentActivities = filtered;
        } else {
            currentActivities = activities;
        }
        
        currentPage = 1;
        renderActivities(currentActivities);
        updatePagination();
    });
    
    // Refresh data
    refreshBtn.addEventListener('click', function() {
        searchInput.value = '';
        loadActivities();
        showNotification('Data berhasil dimuat ulang!', 'success');
        
        // Animasi refresh
        const icon = refreshBtn.querySelector('i');
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            icon.style.transform = 'rotate(0deg)';
        }, 500);
    });
    
    // Pagination
    prevBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            renderActivities(currentActivities);
            updatePagination();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(currentActivities.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderActivities(currentActivities);
            updatePagination();
        }
    });
    
    function updatePagination() {
        const totalPages = Math.ceil(currentActivities.length / itemsPerPage);
        currentPageEl.textContent = currentPage;
        
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        
        // Update styling untuk disabled buttons
        if (prevBtn.disabled) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }
        
        if (nextBtn.disabled) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }
    
    // Notifikasi
    function showNotification(message, type) {
        // Hapus notifikasi sebelumnya jika ada
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 400px;
        `;
        
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Format input harga
    const priceInput = document.getElementById('activityPrice');
    priceInput.addEventListener('input', function() {
        let value = this.value.replace(/[^0-9]/g, '');
        if (value) {
            this.value = parseInt(value).toLocaleString('id-ID');
        }
    });
    
    // Format untuk submit (hapus pemisah ribuan)
    activityForm.addEventListener('submit', function() {
        const priceValue = priceInput.value.replace(/[^0-9]/g, '');
        priceInput.value = priceValue;
    });
    
    // Inisialisasi aplikasi
    initializeSampleData();
    loadActivities();
    
    // Set default ke halaman list
    switchPage('list');
});