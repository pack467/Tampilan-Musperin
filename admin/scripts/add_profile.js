// Fungsi untuk mengatur tab navigasi dan form management (UI effects only)
document.addEventListener('DOMContentLoaded', function() {
    
    // Mengatur tab navigasi
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas active dari semua tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Tambahkan kelas active ke button yang diklik
            button.classList.add('active');
            
            // Sembunyikan semua konten tab
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Tampilkan konten tab yang sesuai
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ===== TAB SEJARAH - PERBAIKAN EVENT LISTENERS =====
    const historyListButton = document.querySelector('#history .list-button');
    const historyAddEventButton = document.querySelector('#history .add-event-button');
    const historyAddImageButton = document.querySelector('#history .add-image-button');
    const historyEventForm = document.querySelector('#history .event-form');
    const historyImageForm = document.querySelector('#history .image-form');
    const historyListContainer = document.querySelector('#history .list-container');
    
    // Event listener untuk tombol daftar sejarah
    if (historyListButton) {
        historyListButton.addEventListener('click', function() {
            showHistoryList();
        });
    }
    
    // Event listener untuk tombol tambah peristiwa
    if (historyAddEventButton) {
        historyAddEventButton.addEventListener('click', function() {
            showHistoryEventForm();
        });
    }
    
    // Event listener untuk tombol tambah gambar
    if (historyAddImageButton) {
        historyAddImageButton.addEventListener('click', function() {
            showHistoryImageForm();
        });
    }
    
    // Fungsi untuk menampilkan daftar sejarah
    function showHistoryList() {
        if (historyEventForm) historyEventForm.classList.add('hidden');
        if (historyImageForm) historyImageForm.classList.add('hidden');
        if (historyListContainer) historyListContainer.classList.remove('hidden');
        
        // Update button states
        if (historyListButton) historyListButton.classList.add('active');
        if (historyAddEventButton) historyAddEventButton.classList.remove('active');
        if (historyAddImageButton) historyAddImageButton.classList.remove('active');
        
        // Reset forms
        resetForm('history-event-form');
        resetForm('history-image-form');
    }
    
    // Fungsi untuk menampilkan form peristiwa
    function showHistoryEventForm() {
        if (historyEventForm) historyEventForm.classList.remove('hidden');
        if (historyImageForm) historyImageForm.classList.add('hidden');
        if (historyListContainer) historyListContainer.classList.add('hidden');
        
        // Update button states
        if (historyListButton) historyListButton.classList.remove('active');
        if (historyAddEventButton) historyAddEventButton.classList.add('active');
        if (historyAddImageButton) historyAddImageButton.classList.remove('active');
    }
    
    // Fungsi untuk menampilkan form gambar
    function showHistoryImageForm() {
        if (historyEventForm) historyEventForm.classList.add('hidden');
        if (historyImageForm) historyImageForm.classList.remove('hidden');
        if (historyListContainer) historyListContainer.classList.add('hidden');
        
        // Update button states
        if (historyListButton) historyListButton.classList.remove('active');
        if (historyAddEventButton) historyAddEventButton.classList.remove('active');
        if (historyAddImageButton) historyAddImageButton.classList.add('active');
    }
    
    // Event listener untuk tombol batal di form sejarah
    document.querySelectorAll('#history .cancel-button').forEach(button => {
        button.addEventListener('click', function() {
            showHistoryList();
        });
    });
    
    // ===== TAB STRUKTUR ORGANISASI - PERBAIKAN UTAMA =====
    const structureListButton = document.querySelector('#structure .list-button');
    const structureAddMemberButton = document.querySelector('#structure .add-member-button');
    const structureAddStaffButton = document.querySelector('#structure .add-staff-button');
    const structureMemberFormContainer = document.querySelector('#structure #member-form-container');
    const structureStaffFormContainer = document.querySelector('#structure #staff-form-container');
    const structureListContainer = document.querySelector('#structure .list-container');
    
    // Event listener untuk tombol daftar staf
    if (structureListButton) {
        structureListButton.addEventListener('click', function() {
            showStructureList();
        });
    }
    
    // Event listener untuk tombol tambah anggota - PERBAIKAN
    if (structureAddMemberButton) {
        structureAddMemberButton.addEventListener('click', function() {
            showStructureMemberForm();
        });
    }
    
    // Event listener untuk tombol tambah staff - PERBAIKAN  
    if (structureAddStaffButton) {
        structureAddStaffButton.addEventListener('click', function() {
            showStructureStaffForm();
        });
    }
    
    // Fungsi untuk menampilkan daftar struktur organisasi
    function showStructureList() {
        if (structureMemberFormContainer) structureMemberFormContainer.classList.add('hidden');
        if (structureStaffFormContainer) structureStaffFormContainer.classList.add('hidden');
        if (structureListContainer) structureListContainer.classList.remove('hidden');
        
        // Update button states
        if (structureListButton) structureListButton.classList.add('active');
        if (structureAddMemberButton) structureAddMemberButton.classList.remove('active');
        if (structureAddStaffButton) structureAddStaffButton.classList.remove('active');
        
        // Reset forms
        resetForm('member-form');
        resetForm('staff-form');
    }
    
    // Fungsi untuk menampilkan form tambah anggota - BARU
    function showStructureMemberForm() {
        if (structureMemberFormContainer) structureMemberFormContainer.classList.remove('hidden');
        if (structureStaffFormContainer) structureStaffFormContainer.classList.add('hidden');
        if (structureListContainer) structureListContainer.classList.add('hidden');
        
        // Update button states
        if (structureListButton) structureListButton.classList.remove('active');
        if (structureAddMemberButton) structureAddMemberButton.classList.add('active');
        if (structureAddStaffButton) structureAddStaffButton.classList.remove('active');
    }
    
    // Fungsi untuk menampilkan form tambah staff - BARU
    function showStructureStaffForm() {
        if (structureMemberFormContainer) structureMemberFormContainer.classList.add('hidden');
        if (structureStaffFormContainer) structureStaffFormContainer.classList.remove('hidden');
        if (structureListContainer) structureListContainer.classList.add('hidden');
        
        // Update button states
        if (structureListButton) structureListButton.classList.remove('active');
        if (structureAddMemberButton) structureAddMemberButton.classList.remove('active');
        if (structureAddStaffButton) structureAddStaffButton.classList.add('active');
    }
    
    // Event listener untuk tombol batal di form struktur organisasi - PERBAIKAN
    document.querySelectorAll('#structure .cancel-button').forEach(button => {
        button.addEventListener('click', function() {
            showStructureList();
        });
    });
    
    // ===== TAB LAINNYA - MENGGUNAKAN LOGIKA UMUM =====
    const listButtons = document.querySelectorAll('.list-button');
    const addButtons = document.querySelectorAll('.add-button');
    const cancelButtons = document.querySelectorAll('.cancel-button');
    
    // Fungsi untuk menampilkan form dan menyembunyikan daftar (untuk tab selain sejarah dan struktur)
    function showForm(event) {
        const tabContent = event.target.closest('.tab-content');
        
        // Skip jika ini adalah tab sejarah atau struktur (sudah ditangani secara terpisah)
        if (tabContent && (tabContent.id === 'history' || tabContent.id === 'structure')) return;
        
        const formContainer = tabContent.querySelector('.form-container');
        const listContainer = tabContent.querySelector('.list-container');
        const listButton = tabContent.querySelector('.list-button');
        const addButton = tabContent.querySelector('.add-button');
        
        if (formContainer) formContainer.classList.remove('hidden');
        if (listContainer) listContainer.classList.add('hidden');
        if (listButton) listButton.classList.remove('active');
        if (addButton) addButton.classList.add('active');
    }
    
    // Fungsi untuk menampilkan daftar dan menyembunyikan form (untuk tab selain sejarah dan struktur)
    function showList(event) {
        const tabContent = event.target.closest('.tab-content');
        
        // Skip jika ini adalah tab sejarah atau struktur (sudah ditangani secara terpisah)
        if (tabContent && (tabContent.id === 'history' || tabContent.id === 'structure')) return;
        
        const formContainer = tabContent.querySelector('.form-container');
        const listContainer = tabContent.querySelector('.list-container');
        const listButton = tabContent.querySelector('.list-button');
        const addButton = tabContent.querySelector('.add-button');
        
        if (formContainer) formContainer.classList.add('hidden');
        if (listContainer) listContainer.classList.remove('hidden');
        if (listButton) listButton.classList.add('active');
        if (addButton) addButton.classList.remove('active');
        
        // Reset form
        const form = formContainer ? formContainer.querySelector('form') : null;
        if (form) {
            resetForm(form.id);
        }
    }
    
    // Event listener untuk tombol tambah (untuk tab selain sejarah dan struktur)
    addButtons.forEach(button => {
        if (button.closest('#history') || button.closest('#structure')) return; // Skip history and structure tabs
        button.addEventListener('click', showForm);
    });
    
    // Event listener untuk tombol daftar (untuk tab selain sejarah dan struktur)
    listButtons.forEach(button => {
        if (button.closest('#history') || button.closest('#structure')) return; // Skip history and structure tabs
        button.addEventListener('click', showList);
    });
    
    // Event listener untuk tombol batal (untuk tab selain sejarah dan struktur)
    cancelButtons.forEach(button => {
        if (button.closest('#history') || button.closest('#structure')) return; // Skip history and structure tabs
        button.addEventListener('click', showList);
    });
    
    // ===== UTILITY FUNCTIONS =====
    
    // Fungsi untuk reset form
    function resetForm(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
            // Reset preview images
            const previews = form.querySelectorAll('.image-preview');
            previews.forEach(preview => {
                resetImagePreview(preview);
            });
            
            // Clear error states
            const errorElements = form.querySelectorAll('.error');
            errorElements.forEach(el => {
                el.classList.remove('error');
                el.style.borderColor = '#e1e1e1';
            });
            
            const errorMessages = form.querySelectorAll('.error-message');
            errorMessages.forEach(msg => msg.remove());
        }
    }
    
    // Fungsi untuk reset preview gambar
    function resetImagePreview(preview) {
        const originalIcon = preview.getAttribute('data-original-icon') || 'fas fa-image';
        preview.innerHTML = `
            <i class="${originalIcon}"></i>
            <p>Pratinjau gambar akan muncul di sini</p>
        `;
        preview.classList.remove('has-image');
    }
    
    // ===== DYNAMIC LISTS MANAGEMENT =====
    
    // Menambahkan misi baru
    const addMissionButtons = document.querySelectorAll('.add-mission-button');
    addMissionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const missionList = button.previousElementSibling;
            const newMission = document.createElement('div');
            newMission.className = 'mission-item';
            newMission.innerHTML = `
                <input type="text" placeholder="Misi baru">
                <button type="button" class="remove-mission"><i class="fas fa-times"></i></button>
            `;
            missionList.appendChild(newMission);
            
            // Menambahkan event listener untuk tombol hapus
            newMission.querySelector('.remove-mission').addEventListener('click', function() {
                if (confirm('Apakah Anda yakin ingin menghapus misi ini?')) {
                    this.closest('.mission-item').remove();
                }
            });
        });
    });
    
    // Menambahkan fasilitas baru
    const addFacilityButtons = document.querySelectorAll('.add-facility-button');
    addFacilityButtons.forEach(button => {
        button.addEventListener('click', () => {
            const facilityList = button.previousElementSibling;
            const newFacility = document.createElement('div');
            newFacility.className = 'facility-item';
            newFacility.innerHTML = `
                <input type="text" placeholder="Fasilitas baru">
                <button type="button" class="remove-facility"><i class="fas fa-times"></i></button>
            `;
            facilityList.appendChild(newFacility);
            
            // Menambahkan event listener untuk tombol hapus
            newFacility.querySelector('.remove-facility').addEventListener('click', function() {
                if (confirm('Apakah Anda yakin ingin menghapus fasilitas ini?')) {
                    this.closest('.facility-item').remove();
                }
            });
        });
    });
    
    // Menambahkan divisi baru
    const addDivisionButtons = document.querySelectorAll('#add-division');
    addDivisionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const divisionName = document.getElementById('division-name');
            const divisionStaff = document.getElementById('division-staff');
            const divisionList = document.querySelector('.division-list');
            
            if (divisionName && divisionStaff && divisionName.value.trim() && divisionStaff.value.trim()) {
                const newDivision = document.createElement('div');
                newDivision.className = 'division-item';
                newDivision.innerHTML = `
                    <span>${divisionName.value} - ${divisionStaff.value} staff</span>
                    <button type="button" class="remove-division"><i class="fas fa-times"></i></button>
                `;
                divisionList.appendChild(newDivision);
                
                // Menambahkan event listener untuk tombol hapus
                newDivision.querySelector('.remove-division').addEventListener('click', function() {
                    if (confirm('Apakah Anda yakin ingin menghapus divisi ini?')) {
                        this.closest('.division-item').remove();
                    }
                });
                
                // Reset input
                divisionName.value = '';
                divisionStaff.value = '';
            } else {
                alert('Mohon isi nama divisi dan jumlah staff');
            }
        });
    });
    
    // Event listener untuk tombol hapus divisi yang sudah ada
    document.querySelectorAll('.remove-division').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus divisi ini?')) {
                this.closest('.division-item').remove();
            }
        });
    });
    
    // Event listener untuk tombol hapus misi yang sudah ada
    document.querySelectorAll('.remove-mission').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus misi ini?')) {
                this.closest('.mission-item').remove();
            }
        });
    });
    
    // Event listener untuk tombol hapus fasilitas yang sudah ada
    document.querySelectorAll('.remove-facility').forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus fasilitas ini?')) {
                this.closest('.facility-item').remove();
            }
        });
    });
    
    // ===== FILE UPLOAD HANDLING =====
    
    // Preview gambar untuk semua input gambar dengan validasi ukuran
    const imageInputs = document.querySelectorAll('input[type="file"]');
    imageInputs.forEach(input => {
        // Buat area clickable untuk upload gambar
        const previewId = input.id + '-preview';
        const preview = document.getElementById(previewId);
        
        // Tambahkan event listener ke preview area agar bisa diklik
        if (preview) {
            preview.style.cursor = 'pointer';
            preview.addEventListener('click', function() {
                input.click();
            });
            
            // Tambahkan delete button ke preview
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-image-btn';
            deleteButton.type = 'button';
            deleteButton.style.display = 'none';
            preview.appendChild(deleteButton);
            
            // Event listener untuk delete button
            deleteButton.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent triggering file input
                if (confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
                    input.value = '';
                    resetImagePreview(preview);
                }
            });
        }
        
        input.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                const maxSize = 2 * 1024 * 1024; // 2MB
                
                // Validasi ukuran file
                if (file.size > maxSize) {
                    alert('Ukuran file terlalu besar. Maksimal 2MB.');
                    this.value = '';
                    return;
                }
                
                // Validasi tipe file
                const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Format file tidak didukung. Gunakan JPG, PNG, atau GIF.');
                    this.value = '';
                    return;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    preview.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="delete-image-btn"></button>
                    `;
                    preview.classList.add('has-image');
                    
                    // Re-attach delete button event listener
                    const deleteBtn = preview.querySelector('.delete-image-btn');
                    if (deleteBtn) {
                        deleteBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            if (confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
                                input.value = '';
                                resetImagePreview(preview);
                            }
                        });
                    }
                }
                
                reader.readAsDataURL(this.files[0]);
            }
        });
    });
    
    // ===== RESPONSIVE LAYOUT MANAGEMENT =====
    
    // Responsif untuk sidebar - PERBAIKAN UTAMA
    function adjustMainContentMargin() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.main-content');
        
        if (sidebar && mainContent) {
            if (window.innerWidth <= 768) {
                // Mobile: selalu margin 0
                mainContent.style.marginLeft = '0';
            } else {
                // Desktop: sesuaikan dengan status sidebar
                if (sidebar.classList.contains('collapsed')) {
                    mainContent.style.marginLeft = '70px';
                } else {
                    mainContent.style.marginLeft = '250px';
                }
            }
        }
    }
    
    // Panggil fungsi saat resize dan load
    window.addEventListener('resize', adjustMainContentMargin);
    adjustMainContentMargin();
    
    // Observer untuk perubahan class pada sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    adjustMainContentMargin();
                }
            });
        });
        
        observer.observe(sidebar, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    // ===== UI ENHANCEMENTS =====
    
    // Animasi smooth untuk scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy loading untuk gambar
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Performance optimization - debounce resize events
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(adjustMainContentMargin, 250);
    });
    
    // ===== FORM VALIDATION =====
    
    // Form validation dengan feedback
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        const fieldType = field.type;
        
        // Reset error state
        field.classList.remove('error');
        field.style.borderColor = '#e1e1e1';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        let errorMessage = '';
        
        // Required field validation
        if (isRequired && !value) {
            errorMessage = 'Field ini wajib diisi';
        }
        // Email validation
        else if (fieldType === 'email' && value && !isValidEmail(value)) {
            errorMessage = 'Format email tidak valid';
        }
        // Number validation
        else if (fieldType === 'number' && value) {
            const min = field.getAttribute('min');
            const max = field.getAttribute('max');
            const numValue = parseFloat(value);
            
            if (min && numValue < parseFloat(min)) {
                errorMessage = `Nilai minimum adalah ${min}`;
            } else if (max && numValue > parseFloat(max)) {
                errorMessage = `Nilai maksimum adalah ${max}`;
            }
        }
        // Tel validation
        else if (fieldType === 'tel' && value && !isValidPhone(value)) {
            errorMessage = 'Format nomor telepon tidak valid';
        }
        // Text length validation
        else if (field.tagName === 'TEXTAREA' && value.length > 1000) {
            errorMessage = 'Maksimal 1000 karakter';
        }
        
        if (errorMessage) {
            field.classList.add('error');
            field.style.borderColor = '#f44336';
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.cssText = `
                color: #f44336;
                font-size: 12px;
                margin-top: 4px;
                display: flex;
                align-items: center;
                gap: 4px;
            `;
            errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessage}`;
            
            field.parentNode.appendChild(errorDiv);
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // ===== AUTO-SAVE AND NOTIFICATIONS =====
    
    // Auto-save draft functionality (simulasi)
    let autoSaveTimer;
    const autoSaveInputs = document.querySelectorAll('input:not([type="file"]), textarea');
    
    autoSaveInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(() => {
                // Simulasi auto-save
                console.log('Auto-saving draft...');
            }, 2000);
        });
    });
    
    // Confirm before leaving page with unsaved changes
    let hasUnsavedChanges = false;
    
    autoSaveInputs.forEach(input => {
        input.addEventListener('input', function() {
            hasUnsavedChanges = true;
        });
    });
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            hasUnsavedChanges = false;
        });
    });
    
    window.addEventListener('beforeunload', function(e) {
        if (hasUnsavedChanges) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
    
    // ===== KEYBOARD SHORTCUTS =====
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S untuk save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            const activeForm = document.querySelector('.tab-content.active form:not(.hidden)');
            if (activeForm) {
                const saveButton = activeForm.querySelector('.save-button');
                if (saveButton) {
                    saveButton.click();
                }
            }
        }
        
        // Escape untuk cancel/close
        if (e.key === 'Escape') {
            const activeTabContent = document.querySelector('.tab-content.active');
            const formContainer = activeTabContent ? activeTabContent.querySelector('.form-container:not(.hidden)') : null;
            
            if (formContainer) {
                const cancelButton = formContainer.querySelector('.cancel-button');
                if (cancelButton) {
                    cancelButton.click();
                }
            }
            
            // Untuk tab sejarah, kembali ke list
            if (activeTabContent && activeTabContent.id === 'history') {
                if (historyEventForm && !historyEventForm.classList.contains('hidden') || 
                    historyImageForm && !historyImageForm.classList.contains('hidden')) {
                    showHistoryList();
                }
            }
            
            // Untuk tab struktur, kembali ke list
            if (activeTabContent && activeTabContent.id === 'structure') {
                if (structureMemberFormContainer && !structureMemberFormContainer.classList.contains('hidden') || 
                    structureStaffFormContainer && !structureStaffFormContainer.classList.contains('hidden')) {
                    showStructureList();
                }
            }
        }
    });
    
    // ===== TOOLTIP FUNCTIONALITY =====
    
    // Tooltip functionality
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.getAttribute('data-tooltip'));
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });
    
    let tooltipElement = null;
    
    function showTooltip(target, text) {
        hideTooltip();
        
        tooltipElement = document.createElement('div');
        tooltipElement.className = 'custom-tooltip';
        tooltipElement.textContent = text;
        tooltipElement.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            max-width: 200px;
            text-align: center;
            line-height: 1.4;
        `;
        
        document.body.appendChild(tooltipElement);
        
        // Position tooltip
        const rect = target.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 8;
        
        // Adjust if tooltip goes outside viewport
        if (left < 0) left = 8;
        if (left + tooltipRect.width > window.innerWidth) {
            left = window.innerWidth - tooltipRect.width - 8;
        }
        if (top < 0) {
            top = rect.bottom + 8;
        }
        
        tooltipElement.style.left = left + 'px';
        tooltipElement.style.top = top + 'px';
        
        // Animate in
        requestAnimationFrame(() => {
            tooltipElement.style.opacity = '1';
            tooltipElement.style.transform = 'translateY(0)';
        });
    }
    
    function hideTooltip() {
        if (tooltipElement) {
            tooltipElement.style.opacity = '0';
            tooltipElement.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (tooltipElement && tooltipElement.parentNode) {
                    tooltipElement.remove();
                }
                tooltipElement = null;
            }, 300);
        }
    }
    
    // ===== SEARCH/FILTER FUNCTIONALITY =====
    
    // Search/filter functionality untuk tabel
    const searchInputs = document.querySelectorAll('.table-search');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.tab-content').querySelector('.data-table');
            const rows = table ? table.querySelectorAll('tbody tr') : [];
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
    
    // ===== ANIMATION OBSERVERS =====
    
    // Animation observer untuk smooth animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    });
    
    // Observe elements for animation
    document.querySelectorAll('.gallery-item, .vision-card, .mission-card, .location-card').forEach(el => {
        animationObserver.observe(el);
    });
    
    // ===== NOTIFICATION SYSTEM =====
    
    // Function to show notifications
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: '#4CAF50',
            error: '#f44336',
            warning: '#ff9800',
            info: '#2196F3'
        };
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            background: ${colors[type]};
            color: white;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.4s ease;
            font-family: inherit;
        `;
        
        notification.innerHTML = `
            <div class="notification-content" style="display: flex; align-items: center; padding: 16px 20px; gap: 12px;">
                <i class="${icons[type]}" style="font-size: 20px; flex-shrink: 0;"></i>
                <span style="flex: 1; font-weight: 500; font-size: 14px;">${message}</span>
                <button class="notification-close" style="background: none; border: none; color: inherit; cursor: pointer; padding: 4px; border-radius: 4px; transition: background-color 0.3s ease; flex-shrink: 0;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'fadeOutRight 0.4s ease forwards';
                setTimeout(() => notification.remove(), 400);
            }
        }, 5000);
        
        return notification;
    }
    
    // ===== FORM PROGRESS INDICATOR =====
    
    // Progress indicator untuk multi-step forms
    function updateFormProgress(currentStep, totalSteps) {
        const progressBar = document.querySelector('.form-progress');
        if (progressBar) {
            const percentage = (currentStep / totalSteps) * 100;
            progressBar.style.width = percentage + '%';
        }
    }
    
    // ===== UTILITY FUNCTIONS =====
    
    // Function to format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    // Function to validate image dimensions
    function validateImageDimensions(file, maxWidth = 2048, maxHeight = 2048) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                if (this.width > maxWidth || this.height > maxHeight) {
                    resolve({
                        valid: false,
                        message: `Resolusi gambar terlalu besar. Maksimal ${maxWidth}x${maxHeight}px`
                    });
                } else {
                    resolve({ valid: true });
                }
            };
            img.src = URL.createObjectURL(file);
        });
    }
    
    // Function to compress image (basic implementation)
    function compressImage(file, quality = 0.8) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = function() {
                canvas.width = this.width;
                canvas.height = this.height;
                
                ctx.drawImage(this, 0, 0);
                
                canvas.toBlob(resolve, file.type, quality);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }
    
    // Function to handle drag and drop for file inputs
    function enableDragDrop(inputElement, previewElement) {
        let dragCounter = 0;
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            previewElement.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            previewElement.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            previewElement.addEventListener(eventName, unhighlight, false);
        });
        
        previewElement.addEventListener('drop', handleDrop, false);
        
        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        function highlight(e) {
            dragCounter++;
            previewElement.classList.add('drag-over');
        }
        
        function unhighlight(e) {
            dragCounter--;
            if (dragCounter === 0) {
                previewElement.classList.remove('drag-over');
            }
        }
        
        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            
            if (files.length > 0) {
                inputElement.files = files;
                const event = new Event('change', { bubbles: true });
                inputElement.dispatchEvent(event);
            }
        }
    }
    
    // Enable drag and drop for all file inputs
    imageInputs.forEach(input => {
        const previewId = input.id + '-preview';
        const preview = document.getElementById(previewId);
        if (preview) {
            enableDragDrop(input, preview);
        }
    });
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // Improved focus management for keyboard users
    document.addEventListener('keydown', function(e) {
        // Tab navigation improvements
        if (e.key === 'Tab') {
            // Add visual focus indicators
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        // Remove keyboard navigation class when using mouse
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Screen reader announcements
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // ===== ERROR HANDLING =====
    
    // Global error handler
    window.addEventListener('error', function(e) {
        console.error('Global error:', e.error);
        showNotification('Terjadi kesalahan sistem. Silakan refresh halaman.', 'error');
    });
    
    // Promise rejection handler
    window.addEventListener('unhandledrejection', function(e) {
        console.error('Unhandled promise rejection:', e.reason);
        showNotification('Terjadi kesalahan dalam memproses data.', 'error');
    });
    
    // ===== PERFORMANCE MONITORING =====
    
    // Simple performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
            if (entry.entryType === 'navigation') {
                console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
            }
        });
    });
    
    if (typeof PerformanceObserver !== 'undefined') {
        performanceObserver.observe({ entryTypes: ['navigation'] });
    }
    
    // ===== INITIALIZATION COMPLETE =====
    
    console.log('Museum Profile Management System initialized successfully!');
    
    // Show initialization success notification (optional)
    // showNotification('Sistem manajemen profil museum berhasil dimuat', 'success');
    
    // ===== CLEANUP ON PAGE UNLOAD =====
    
    window.addEventListener('beforeunload', function() {
        // Cleanup observers
        if (animationObserver) {
            animationObserver.disconnect();
        }
        
        if (typeof performanceObserver !== 'undefined') {
            performanceObserver.disconnect();
        }
        
        // Clear timers
        if (autoSaveTimer) {
            clearTimeout(autoSaveTimer);
        }
        
        if (resizeTimer) {
            clearTimeout(resizeTimer);
        }
    });
});