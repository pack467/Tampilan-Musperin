        let currentPage = 1;
        let filteredRows = [];
        const rowsPerPage = 5;

        // Initialize when DOM loaded
        document.addEventListener('DOMContentLoaded', function() {
            initializeFilters();
            initializePagination();
            updatePagination();
        });

        // Initialize filters
        function initializeFilters() {
            const objectFilter = document.getElementById('object-filter');
            const actionFilter = document.getElementById('action-filter');
            const userFilter = document.getElementById('user-filter');
            const dateFilter = document.getElementById('date-filter');
            const searchInput = document.getElementById('search-input');
            const resetButton = document.getElementById('reset-filters');

            // Add event listeners
            objectFilter.addEventListener('change', applyFilters);
            actionFilter.addEventListener('change', applyFilters);
            userFilter.addEventListener('change', applyFilters);
            dateFilter.addEventListener('change', applyFilters);
            searchInput.addEventListener('input', applyFilters);
            resetButton.addEventListener('click', resetFilters);
        }

        // Initialize pagination
        function initializePagination() {
            const prevButton = document.getElementById('prev-page');
            const nextButton = document.getElementById('next-page');
            const pageNumbers = document.querySelectorAll('.page-number');

            prevButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    updatePagination();
                    displayPage(currentPage);
                }
            });

            nextButton.addEventListener('click', () => {
                const maxPage = Math.ceil(filteredRows.length / rowsPerPage);
                if (currentPage < maxPage) {
                    currentPage++;
                    updatePagination();
                    displayPage(currentPage);
                }
            });

            pageNumbers.forEach(pageNum => {
                pageNum.addEventListener('click', () => {
                    const page = parseInt(pageNum.getAttribute('data-page'));
                    currentPage = page;
                    updatePagination();
                    displayPage(currentPage);
                });
            });
        }

        // Apply filters
        function applyFilters() {
            const objectFilter = document.getElementById('object-filter').value;
            const actionFilter = document.getElementById('action-filter').value;
            const userFilter = document.getElementById('user-filter').value;
            const dateFilter = document.getElementById('date-filter').value;
            const searchText = document.getElementById('search-input').value.toLowerCase();

            const allRows = document.querySelectorAll('#history-table-body tr');
            filteredRows = [];

            allRows.forEach(row => {
                let show = true;

                // Filter by object
                if (objectFilter !== 'all' && row.getAttribute('data-object') !== objectFilter) {
                    show = false;
                }

                // Filter by action
                if (actionFilter !== 'all' && row.getAttribute('data-action') !== actionFilter) {
                    show = false;
                }

                // Filter by user role
                if (userFilter !== 'all' && row.getAttribute('data-user') !== userFilter) {
                    show = false;
                }

                // Filter by date
                if (dateFilter && row.getAttribute('data-date') !== dateFilter) {
                    show = false;
                }

                // Filter by search text
                if (searchText && !row.textContent.toLowerCase().includes(searchText)) {
                    show = false;
                }

                if (show) {
                    filteredRows.push(row);
                }
            });

            currentPage = 1;
            updatePagination();
            displayPage(currentPage);
        }

        // Display specific page
        function displayPage(page) {
            const allRows = document.querySelectorAll('#history-table-body tr');
            
            // Hide all rows first
            allRows.forEach(row => {
                row.style.display = 'none';
            });

            // Calculate start and end indices
            const startIndex = (page - 1) * rowsPerPage;
            const endIndex = Math.min(startIndex + rowsPerPage, filteredRows.length);

            // Show rows for current page
            for (let i = startIndex; i < endIndex; i++) {
                if (filteredRows[i]) {
                    filteredRows[i].style.display = 'table-row';
                }
            }
        }

        // Update pagination controls
        function updatePagination() {
            if (filteredRows.length === 0) {
                // Get all rows if no filter applied
                filteredRows = Array.from(document.querySelectorAll('#history-table-body tr'));
            }

            const maxPage = Math.ceil(filteredRows.length / rowsPerPage);
            const prevButton = document.getElementById('prev-page');
            const nextButton = document.getElementById('next-page');
            const pageNumbers = document.querySelectorAll('.page-number');

            // Update button states
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === maxPage || maxPage === 0;

            // Update page number active states
            pageNumbers.forEach(pageNum => {
                const pageNumber = parseInt(pageNum.getAttribute('data-page'));
                pageNum.classList.toggle('active', pageNumber === currentPage);
                
                // Hide/show page numbers based on total pages
                if (pageNumber <= maxPage) {
                    pageNum.style.display = 'flex';
                } else {
                    pageNum.style.display = 'none';
                }
            });
        }

        // Reset all filters
        function resetFilters() {
            document.getElementById('object-filter').value = 'all';
            document.getElementById('action-filter').value = 'all';
            document.getElementById('user-filter').value = 'all';
            document.getElementById('date-filter').value = '';
            document.getElementById('search-input').value = '';

            // Show notification
            showNotification('Reset filter berhasil!', 'success');

            currentPage = 1;
            filteredRows = Array.from(document.querySelectorAll('#history-table-body tr'));
            updatePagination();
            displayPage(currentPage);
        }

        // Show notification
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notification-text');
            const icon = notification.querySelector('i');

            notificationText.textContent = message;
            
            // Update icon and class based on type
            if (type === 'success') {
                notification.className = 'notification success';
                icon.className = 'fas fa-check-circle';
            } else {
                notification.className = 'notification error';
                icon.className = 'fas fa-exclamation-circle';
            }

            // Show notification
            notification.classList.add('show');

            // Hide after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Sidebar functions
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const toggleIcon = document.getElementById('toggle-icon');
            
            sidebar.classList.toggle('collapsed');
            
            if (sidebar.classList.contains('collapsed')) {
                toggleIcon.className = 'fas fa-angle-right';
            } else {
                toggleIcon.className = 'fas fa-angle-left';
            }
        }

        function logout() {
            if (confirm('Apakah Anda yakin ingin keluar?')) {
                showNotification('Logout berhasil! Mengarahkan...', 'success');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            }
        }

        // Initialize page on load
        window.addEventListener('load', function() {
            filteredRows = Array.from(document.querySelectorAll('#history-table-body tr'));
            displayPage(1);
            
            // Auto-collapse sidebar on mobile
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.add('collapsed');
                document.getElementById('toggle-icon').className = 'fas fa-angle-right';
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.add('collapsed');
                document.getElementById('toggle-icon').className = 'fas fa-angle-right';
            }
        });