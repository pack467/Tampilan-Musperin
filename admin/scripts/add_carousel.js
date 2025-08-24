document.addEventListener('DOMContentLoaded', function() {
    const carouselFlex = document.getElementById('carouselFlex');
    const carouselInput = document.getElementById('carouselInput');
    let currentSlot = null;
    let uploadedImages = {1: null, 2: null, 3: null};

    function renderSlots() {
        carouselFlex.innerHTML = '';
        for (let i = 1; i <= 3; i++) {
            if (i > 1 && !uploadedImages[i-1]) break;
            
            const slotDiv = document.createElement('div');
            slotDiv.className = uploadedImages[i] ? 'carousel-slot filled' : 'carousel-slot empty';
            slotDiv.dataset.slot = i;
            
            if (uploadedImages[i]) {
                slotDiv.innerHTML = `
                    <div class="image-container">
                        <img src="${uploadedImages[i].preview}" alt="Carousel Image">
                    </div>
                    <div class="file-name">${uploadedImages[i].name}</div>
                    <div class="slot-btn-group">
                        <button class="slot-btn slot-btn-change" title="Ganti Gambar" data-slot="${i}"><i class="fas fa-sync-alt"></i> Ganti</button>
                        <button class="slot-btn slot-btn-delete" title="Hapus Gambar" data-slot="${i}"><i class="fas fa-trash"></i> Hapus</button>
                    </div>
                `;
            } else {
                slotDiv.innerHTML = `
                    <div class="placeholder">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <span>Upload Gambar ${i}</span>
                    </div>
                `;
            }
            carouselFlex.appendChild(slotDiv);
        }

        document.querySelectorAll('.carousel-slot').forEach(slot => {
            slot.addEventListener('click', function(e) {
                if (e.target.closest('.slot-btn')) return;
                currentSlot = this.dataset.slot;
                carouselInput.value = '';
                carouselInput.click();
            });
        });

        document.querySelectorAll('.slot-btn-change').forEach(btn => {
            btn.onclick = function(e) {
                e.stopPropagation();
                currentSlot = this.dataset.slot;
                carouselInput.value = '';
                carouselInput.click();
            };
        });

        document.querySelectorAll('.slot-btn-delete').forEach(btn => {
            btn.onclick = function(e) {
                e.stopPropagation();
                if (confirm('Hapus gambar ini?')) {
                    uploadedImages[this.dataset.slot] = null;
                    renderSlots();
                }
            };
        });
    }

    carouselInput.addEventListener('change', function(e) {
        if (!currentSlot) return;
        const file = e.target.files[0];
        if (!file) return;
        
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Format gambar harus JPG, PNG, atau WEBP.');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert('Ukuran gambar maksimal 5MB.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedImages[currentSlot] = {
                file: file,
                preview: e.target.result,
                name: file.name
            };
            renderSlots();
            currentSlot = null;
        };
        reader.readAsDataURL(file);
    });

    document.querySelector('.btn-cancel').addEventListener('click', function() {
        if(confirm('Batalkan perubahan?')) {
            uploadedImages = {1: null, 2: null, 3: null};
            renderSlots();
        }
    });

    document.querySelector('.btn-save').addEventListener('click', function() {
        const hasImage = Object.values(uploadedImages).some(img => img !== null);
        const btn = this;
        if(!hasImage) {
            alert('Harap unggah minimal 1 gambar!');
            return;
        }
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menyimpan...';
        btn.disabled = true;
        
        setTimeout(() => {
            alert('Carousel berhasil disimpan!');
            // Kembalikan isi tombol dengan icon simpan + teks
            btn.innerHTML = '<i class="fas fa-save"></i> Simpan';
            btn.disabled = false;
        }, 1500);
    });

    // Pastikan tombol simpan dari awal sudah ada icon-nya juga
    document.querySelector('.btn-save').innerHTML = '<i class="fas fa-save"></i> Simpan';

    renderSlots();
});
