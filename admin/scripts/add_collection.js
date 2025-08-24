// Switch panel (Daftar Koleksi <-> Tambah Koleksi)
document.getElementById('btnShowForm').onclick = function() {
    document.getElementById('formPanel').style.display = '';
    document.getElementById('tablePanel').style.display = 'none';
    this.classList.add('active');
    document.getElementById('btnShowTable').classList.remove('active');
};
document.getElementById('btnShowTable').onclick = function() {
    document.getElementById('formPanel').style.display = 'none';
    document.getElementById('tablePanel').style.display = '';
    this.classList.add('active');
    document.getElementById('btnShowForm').classList.remove('active');
};

// Batal form kembali ke tabel
document.getElementById('cancelBtn').onclick = function() {
    document.getElementById('btnShowTable').click();
};

// =====================
// === UPLOAD GAMBAR === (VERSI DIPERBAIKI)
// =====================

// Ambil elemen
const imageInput      = document.getElementById('imageInput');
const imagePreview    = document.getElementById('imagePreview');
const previewImage    = document.getElementById('previewImage');
const imageUpload     = document.getElementById('imageUpload');
const removeImageBtn  = document.getElementById('removeImageBtn');

// Setelah gambar dipilih, tampilkan preview
imageInput.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
        let reader = new FileReader();
        reader.onload = function(evt) {
            previewImage.src = evt.target.result;
            imagePreview.style.display = 'flex';
            imageUpload.style.display = 'none';
        }
        reader.readAsDataURL(e.target.files[0]);
    }
});

// Klik gambar preview = upload gambar baru
previewImage.addEventListener('click', function() {
    imageInput.click();
});

// Klik tombol hapus gambar
removeImageBtn.addEventListener('click', function(e) {
    e.stopPropagation(); // Mencegah event bubbling
    previewImage.src = '';
    imagePreview.style.display = 'none';
    imageUpload.style.display = 'block';
    imageInput.value = '';
});

// (Optional) Drag & drop support untuk upload gambar
imageUpload.addEventListener('dragover', function(e) {
    e.preventDefault();
    imageUpload.style.background = "#e0f7fa";
});
imageUpload.addEventListener('dragleave', function(e) {
    imageUpload.style.background = "#f1f8e9";
});
imageUpload.addEventListener('drop', function(e) {
    e.preventDefault();
    imageUpload.style.background = "#f1f8e9";
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        imageInput.files = e.dataTransfer.files;
        let event = new Event('change');
        imageInput.dispatchEvent(event);
    }
});