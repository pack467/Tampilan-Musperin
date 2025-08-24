document.addEventListener('DOMContentLoaded', function() {
    // Elemen DOM
    const viewNewsBtn = document.getElementById('view-news-btn');
    const addNewsBtn = document.getElementById('add-news-btn');
    const newsListPage = document.getElementById('news-list-page');
    const addNewsPage = document.getElementById('add-news-page');
    const newsListContainer = document.querySelector('.news-list');
    const newsForm = document.getElementById('news-form');
    const newsSearch = document.getElementById('news-search');
    const refreshNewsBtn = document.getElementById('refresh-news-btn');
    const cancelFormBtn = document.getElementById('cancel-form-btn');
    const addImageBtn = document.getElementById('add-image-btn');
    const imageContainer = document.getElementById('image-container');
    const addSubsectionBtn = document.getElementById('add-subsection-btn');
    const subsectionContainer = document.getElementById('subsection-container');
    const successMessage = document.getElementById('success-message');
    const successText = document.getElementById('success-text');
    
    // Tags functionality
    const newsTagsInput = document.getElementById('news-tags');
    const addTagBtn = document.getElementById('add-tag-btn');
    const tagsDisplay = document.getElementById('tags-display');
    
    // Pagination elements
    const paginationContainer = document.getElementById('pagination');
    const showingStart = document.getElementById('showing-start');
    const showingEnd = document.getElementById('showing-end');
    const totalItems = document.getElementById('total-items');
    
    // Data dan state
    let newsData = [
        {
            id: 1,
            title: "Sejarah Panjang Perkebunan Kelapa Sawit di Indonesia",
            date: "15 Mei 2025",
            excerpt: "Perkebunan kelapa sawit di Indonesia memiliki sejarah panjang yang dimulai sejak masa kolonial Belanda...",
            tags: ["Sejarah", "Kelapa Sawit", "Ekonomi"],
            author: "Dr. Ahmad Setiawan",
            content: "Perkebunan kelapa sawit di Indonesia memiliki sejarah panjang yang dimulai sejak masa kolonial Belanda. Pada tahun 1911, perkebunan kelapa sawit pertama dibuka di Sumatera Utara...",
            images: []
        },
        {
            id: 2,
            title: "Pameran Sejarah Perkebunan Indonesia Dibuka untuk Umum",
            date: "15 Jun 2025",
            excerpt: "Museum Perkebunan Indonesia membuka pameran khusus yang menampilkan sejarah perkembangan perkebunan di Indonesia...",
            tags: ["Pameran", "Sejarah", "Museum"],
            author: "Budi Santoso",
            content: "Museum Perkebunan Indonesia membuka pameran khusus yang menampilkan sejarah perkembangan perkebunan di Indonesia...",
            images: []
        },
        {
            id: 3,
            title: "Workshop Pengolahan Kopi Tradisional Sukses Digelar",
            date: "10 Jun 2025",
            excerpt: "Lebih dari 100 peserta mengikuti workshop pengolahan kopi tradisional yang diadakan di Museum Perkebunan Indonesia...",
            tags: ["Workshop", "Kopi", "Edukasi"],
            author: "Siti Rahayu",
            content: "Lebih dari 100 peserta mengikuti workshop pengolahan kopi tradisional yang diadakan di Museum Perkebunan Indonesia...",
            images: []
        },
        {
            id: 4,
            title: "Inovasi Teknologi Perkebunan Modern di Era Digital",
            date: "8 Jun 2025",
            excerpt: "Teknologi drone dan IoT mulai diterapkan dalam perkebunan modern untuk meningkatkan efisiensi...",
            tags: ["Teknologi", "Inovasi", "Digital"],
            author: "Prof. Sari Indah",
            content: "Teknologi drone dan IoT mulai diterapkan dalam perkebunan modern untuk meningkatkan efisiensi...",
            images: []
        },
        {
            id: 5,
            title: "Pelestarian Varietas Unggul Tanaman Perkebunan Indonesia",
            date: "5 Jun 2025",
            excerpt: "Program pelestarian varietas unggul tanaman perkebunan mendapat dukungan penuh dari pemerintah...",
            tags: ["Pelestarian", "Varietas", "Konservasi"],
            author: "Dr. Bambang Wijaya",
            content: "Program pelestarian varietas unggul tanaman perkebunan mendapat dukungan penuh dari pemerintah...",
            images: []
        }
    ];
    
    let currentTags = [];
    let currentPage = 1;
    const itemsPerPage = 3;
    let filteredData = [...newsData];
    
    // Fungsi untuk menampilkan pesan sukses
    function showSuccessMessage(message) {
        successText.textContent = message;
        successMessage.classList.add('show');
        
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }
    
    // Fungsi untuk beralih halaman
    function switchPage(page) {
        newsListPage.classList.remove('active');
        addNewsPage.classList.remove('active');
        
        if (page === 'list') {
            newsListPage.classList.add('active');
            viewNewsBtn.classList.add('active');
            addNewsPage.classList.remove('active');
            addNewsBtn.classList.remove('active');
        } else {
            newsListPage.classList.remove('active');
            viewNewsBtn.classList.remove('active');
            addNewsPage.classList.add('active');
            addNewsBtn.classList.add('active');
        }
    }

    // Event listeners untuk switch halaman
    viewNewsBtn.addEventListener('click', () => switchPage('list'));
    addNewsBtn.addEventListener('click', () => {
        switchPage('add');
        resetForm();
    });
    
    // Fungsi reset form
    function resetForm() {
        newsForm.reset();
        imageContainer.innerHTML = '';
        subsectionContainer.innerHTML = '';
        currentTags = [];
        renderTags();
        updateAddImageButton();
        updateAddSubsectionButton();
    }
    
    // Tags Management
    function addTag() {
        const tagInput = newsTagsInput.value.trim();
        if (tagInput && !currentTags.includes(tagInput)) {
            currentTags.push(tagInput);
            newsTagsInput.value = '';
            renderTags();
        }
    }
    
    function removeTag(index) {
        currentTags.splice(index, 1);
        renderTags();
    }
    
    function renderTags() {
        tagsDisplay.innerHTML = '';
        currentTags.forEach((tag, index) => {
            const tagElement = document.createElement('div');
            tagElement.className = 'tag-item';
            tagElement.innerHTML = `
                <span>${tag}</span>
                <button type="button" class="tag-remove" onclick="removeTag(${index})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            tagsDisplay.appendChild(tagElement);
        });
    }
    
    // Make removeTag function global
    window.removeTag = removeTag;
    
    // Event listeners untuk tags
    addTagBtn.addEventListener('click', addTag);
    newsTagsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    });
    
    // Simplified Pagination functions
    function updatePagination() {
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage + 1;
        const end = Math.min(currentPage * itemsPerPage, filteredData.length);
        
        showingStart.textContent = filteredData.length === 0 ? 0 : start;
        showingEnd.textContent = end;
        totalItems.textContent = filteredData.length;
        
        // Generate pagination buttons
        paginationContainer.innerHTML = '';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderNewsList();
            }
        });
        paginationContainer.appendChild(prevBtn);
        
        // Current page number only
        const pageBtn = document.createElement('button');
        pageBtn.textContent = currentPage;
        pageBtn.classList.add('active');
        paginationContainer.appendChild(pageBtn);
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages || totalPages === 0;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderNewsList();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }
    
    // Render berita dengan pagination
    function renderNewsList(filter = '') {
        // Filter data
        filteredData = newsData.filter(news => 
            news.title.toLowerCase().includes(filter.toLowerCase()) ||
            news.tags.join(' ').toLowerCase().includes(filter.toLowerCase()) ||
            news.author.toLowerCase().includes(filter.toLowerCase())
        );
        
        // Reset ke halaman 1 jika filter berubah
        if (filter !== '') {
            currentPage = 1;
        }
        
        // Get data untuk halaman saat ini
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = filteredData.slice(startIndex, endIndex);
        
        newsListContainer.innerHTML = '';
        
        if (currentPageData.length === 0) {
            newsListContainer.innerHTML = `
                <div class="no-news">
                    <i class="fas fa-newspaper"></i><br>
                    ${filter ? 'Tidak ada berita yang sesuai dengan pencarian.' : 'Tidak ada berita ditemukan.'}
                </div>`;
        } else {
            currentPageData.forEach(news => {
                newsListContainer.innerHTML += `
                    <div class="news-item">
                        <div class="news-header">
                            <span class="news-title">${news.title}</span>
                            <span class="news-date">${news.date}</span>
                        </div>
                        <div class="news-tags">
                            ${news.tags.map(tag => `<span class="news-tag">${tag}</span>`).join(' ')}
                        </div>
                        <div class="news-excerpt">${news.excerpt || ''}</div>
                        <div class="news-actions">
                            <button class="action-btn edit-btn" onclick="editNews(${news.id})">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteNews(${news.id})">
                                <i class="fas fa-trash"></i> Hapus
                            </button>
                        </div>
                    </div>
                `;
            });
        }
        
        updatePagination();
    }
    
    // Edit berita function (placeholder)
    window.editNews = function(id) {
        alert('Fitur edit akan segera tersedia!');
    };
    
    // Hapus berita
    window.deleteNews = function(id) {
        if (confirm('Yakin ingin menghapus berita ini?')) {
            newsData = newsData.filter(news => news.id !== id);
            
            // Adjust current page if needed
            const totalPages = Math.ceil(newsData.length / itemsPerPage);
            if (currentPage > totalPages && totalPages > 0) {
                currentPage = totalPages;
            }
            
            renderNewsList(newsSearch.value);
            showSuccessMessage('Berita berhasil dihapus!');
        }
    };

    // Cari berita
    newsSearch.addEventListener('input', function() {
        renderNewsList(this.value);
    });

    // Refresh dengan animasi loading
    refreshNewsBtn.addEventListener('click', function() {
        refreshNewsBtn.classList.add('loading');
        newsSearch.value = '';
        
        setTimeout(() => {
            refreshNewsBtn.classList.remove('loading');
            renderNewsList();
            showSuccessMessage('Refresh Berita telah berhasil!');
        }, 1000);
    });

    // Cancel form
    cancelFormBtn.addEventListener('click', function() {
        if (confirm('Batalkan penambahan berita? Semua data yang belum disimpan akan hilang.')) {
            switchPage('list');
        }
    });
    
    // Update visibility tombol tambah gambar
    function updateAddImageButton() {
        const imageInputs = imageContainer.querySelectorAll('.image-upload-container');
        if (imageInputs.length >= 3) {
            addImageBtn.classList.add('hidden');
        } else {
            addImageBtn.classList.remove('hidden');
        }
    }
    
    // Update visibility tombol tambah sub bab
    function updateAddSubsectionButton() {
        const subsections = subsectionContainer.querySelectorAll('.sub-section');
        if (subsections.length >= 2) {
            addSubsectionBtn.classList.add('hidden');
        } else {
            addSubsectionBtn.classList.remove('hidden');
        }
    }

    // Gambar Berita Management
    addImageBtn.addEventListener('click', function() {
        const imageInputs = imageContainer.querySelectorAll('.image-upload-container');
        if (imageInputs.length >= 3) {
            return; // Sudah maksimal
        }
        
        const imageIndex = Date.now();
        const wrapper = document.createElement('div');
        wrapper.className = 'image-upload-container';
        wrapper.innerHTML = `
            <div class="image-upload-header">
                <span class="image-label">
                    <i class="fas fa-image"></i>
                    Gambar ${imageInputs.length + 1}
                </span>
                <button type="button" class="remove-image-btn" title="Hapus Gambar">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="image-preview image-preview-placeholder" data-index="${imageIndex}">
                <div>
                    <i class="fas fa-image"></i><br>
                    Belum ada gambar dipilih
                </div>
            </div>
            <input type="file" style="display:none" accept="image/*" name="news-image-${imageIndex}">
            <button type="button" class="btn add-btn upload-btn">
                <i class="fas fa-upload"></i> Pilih Gambar
            </button>
        `;
        imageContainer.appendChild(wrapper);

        // Event listeners untuk upload dan remove
        const uploadBtn = wrapper.querySelector('.upload-btn');
        const fileInput = wrapper.querySelector('input[type="file"]');
        const preview = wrapper.querySelector('.image-preview');
        const removeBtn = wrapper.querySelector('.remove-image-btn');
        
        uploadBtn.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                
                // Validasi ukuran file (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Ukuran file terlalu besar! Maksimal 5MB.');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = evt => {
                    preview.innerHTML = `<img src="${evt.target.result}" alt="preview">`;
                };
                reader.readAsDataURL(file);
            }
        });
        
        removeBtn.addEventListener('click', function() {
            if (confirm('Hapus gambar ini?')) {
                wrapper.remove();
                updateAddImageButton();
                // Update label gambar lainnya
                updateImageLabels();
            }
        });
        
        updateAddImageButton();
    });
    
    // Update label gambar setelah penghapusan
    function updateImageLabels() {
        const imageContainers = imageContainer.querySelectorAll('.image-upload-container');
        imageContainers.forEach((container, index) => {
            const label = container.querySelector('.image-label');
            label.innerHTML = `<i class="fas fa-image"></i> Gambar ${index + 1}`;
        });
    }

    // Sub Bab Management
    addSubsectionBtn.addEventListener('click', function() {
        const subsections = subsectionContainer.querySelectorAll('.sub-section');
        if (subsections.length >= 2) {
            return; // Sudah maksimal
        }
        
        const count = subsections.length + 1;
        const wrapper = document.createElement('div');
        wrapper.className = 'sub-section';
        wrapper.innerHTML = `
            <button type="button" class="remove-subsection-btn" title="Hapus Sub Bab">
                <i class="fas fa-times"></i>
            </button>
            <div class="sub-section-title">
                <i class="fas fa-paragraph"></i> Sub Bab ${count}
            </div>
            <div class="form-group">
                <label class="form-label">Judul Sub Bab</label>
                <input type="text" class="form-control" placeholder="Masukkan judul sub bab" required>
            </div>
            <div class="form-group">
                <label class="form-label">Isi Sub Bab</label>
                <textarea class="form-control" placeholder="Tulis isi sub bab di sini..." required rows="4"></textarea>
            </div>
        `;
        
        wrapper.querySelector('.remove-subsection-btn').addEventListener('click', function() {
            if (confirm('Hapus sub bab ini?')) {
                wrapper.remove();
                updateSubsectionTitles();
                updateAddSubsectionButton();
            }
        });
        
        subsectionContainer.appendChild(wrapper);
        updateAddSubsectionButton();
    });
    
    // Update title sub bab setelah penghapusan
    function updateSubsectionTitles() {
        const sections = subsectionContainer.querySelectorAll('.sub-section');
        sections.forEach((section, index) => {
            const title = section.querySelector('.sub-section-title');
            title.innerHTML = `<i class="fas fa-paragraph"></i> Sub Bab ${index + 1}`;
        });
    }

    // Form submission
    newsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validasi form
        const title = document.getElementById('news-title').value.trim();
        const author = document.getElementById('news-author').value.trim();
        const excerpt = document.getElementById('news-excerpt').value.trim();
        const content = document.getElementById('news-content').value.trim();
        
        if (!title || !author || !content) {
            alert('Mohon isi semua field yang wajib (bertanda *)!');
            return;
        }
        
        if (currentTags.length === 0) {
            alert('Mohon tambahkan minimal satu tag/kategori!');
            return;
        }
        
        // Collect images
        let images = [];
        imageContainer.querySelectorAll('input[type="file"]').forEach(input => {
            if (input.files && input.files[0]) {
                images.push(URL.createObjectURL(input.files[0]));
            }
        });
        
        // Collect subsections
        let subsections = [];
        subsectionContainer.querySelectorAll('.sub-section').forEach(section => {
            const subTitle = section.querySelector('input').value.trim();
            const subContent = section.querySelector('textarea').value.trim();
            if (subTitle && subContent) {
                subsections.push({ title: subTitle, content: subContent });
            }
        });
        
        // Create new news item
        const newNews = {
            id: Date.now(),
            title,
            author,
            date: new Date().toLocaleDateString('id-ID', { 
                day: '2-digit', 
                month: 'short', 
                year: 'numeric' 
            }),
            excerpt,
            content,
            tags: [...currentTags],
            images,
            subsections
        };
        
        // Add to data
        newsData.unshift(newNews);
        
        // Reset and switch page
        resetForm();
        switchPage('list');
        renderNewsList();
        
        showSuccessMessage('Berita berhasil ditambahkan!');
    });
    
    // Sidebar functionality
    window.toggleSidebar = function() {
        document.getElementById('sidebar').classList.toggle('collapsed');
    };
    
    window.logout = function() {
        if (confirm('Yakin ingin keluar?')) {
            alert('Logout berhasil!');
        }
    };

    // Initialize
    renderNewsList();
});