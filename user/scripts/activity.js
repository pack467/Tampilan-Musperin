document.addEventListener('DOMContentLoaded', function() {
    // ===== TAB FUNCTIONALITY =====
    const tabButtons = document.querySelectorAll('.tab-button');
    const activityCards = document.querySelectorAll('.activity-card');
    
    // Tab button event listeners
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            
            // Show/hide cards based on tab selection
            activityCards.forEach(card => {
                if (tabType === 'all') {
                    card.style.display = 'flex';
                    card.classList.remove('hidden');
                } else if (card.classList.contains(tabType)) {
                    card.style.display = 'flex';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            activityCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('.excerpt-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'flex';
                    card.classList.remove('hidden');
                } else {
                    card.style.display = 'none';
                    card.classList.add('hidden');
                }
            });
            
            // Reset tab buttons when searching
            if (searchTerm) {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-tab="all"]').classList.add('active');
            }
        });
    }

    // ===== PHONE NUMBER COPY FUNCTIONALITY =====
    const contactNumbers = document.querySelectorAll('.contact-number');
    const notification = document.getElementById('copyNotification');
    
    contactNumbers.forEach(contactBtn => {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get phone number from data attribute
            const phoneNumber = this.getAttribute('data-phone');
            
            // Copy to clipboard
            if (navigator.clipboard && window.isSecureContext) {
                // Modern clipboard API
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    showNotification();
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    fallbackCopyTextToClipboard(phoneNumber);
                });
            } else {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(phoneNumber);
            }
        });
    });
    
    // Fallback copy function for older browsers
    function fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showNotification();
            }
        } catch (err) {
            console.error('Fallback: Could not copy text: ', err);
        }
        
        document.body.removeChild(textArea);
    }
    
    // Show copy notification
    function showNotification() {
        if (notification) {
            notification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }

    // ===== READ MORE MODAL FUNCTIONALITY =====
    const modal = document.getElementById('readMoreModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');
    const closeBtn = document.querySelector('.close');
    
    // Get all read more triggers
    const readMoreTriggers = document.querySelectorAll('.read-more-trigger');
    
    readMoreTriggers.forEach(trigger => {
        const readMoreText = trigger.querySelector('.read-more-text');
        
        readMoreText.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get the card content
            const card = this.closest('.activity-card');
            const title = card.querySelector('h3').textContent;
            const fullText = card.querySelector('.excerpt-text').textContent;
            
            // Set modal content
            modalTitle.textContent = title;
            modalText.textContent = fullText;
            
            // Show modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal when clicking the X button
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
    
    // ===== RESPONSIVE CARD HEIGHT ADJUSTMENT =====
    function adjustCardHeights() {
        const cards = document.querySelectorAll('.activity-card:not(.hidden)');
        
        // Reset heights
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Only adjust if desktop view
        if (window.innerWidth > 768) {
            const rows = [];
            let currentRow = [];
            let currentRowTop = null;
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                
                if (currentRowTop === null || Math.abs(rect.top - currentRowTop) < 10) {
                    currentRow.push(card);
                    currentRowTop = rect.top;
                } else {
                    if (currentRow.length > 0) {
                        rows.push(currentRow);
                    }
                    currentRow = [card];
                    currentRowTop = rect.top;
                }
            });
            
            if (currentRow.length > 0) {
                rows.push(currentRow);
            }
            
            // Set equal heights for each row
            rows.forEach(row => {
                let maxHeight = 0;
                row.forEach(card => {
                    const height = card.offsetHeight;
                    if (height > maxHeight) {
                        maxHeight = height;
                    }
                });
                
                row.forEach(card => {
                    card.style.height = maxHeight + 'px';
                });
            });
        }
    }
    
    // Adjust card heights on load and resize
    setTimeout(adjustCardHeights, 100);
    window.addEventListener('resize', adjustCardHeights);
    
    // Re-adjust heights when tab changes
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            setTimeout(adjustCardHeights, 100);
        });
    });
    
    // ===== ENHANCED HOVER EFFECTS =====
    // Add additional smooth transitions for better UX
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Optional: Add any additional hover effects here
            this.style.transform = 'translateY(-6px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== SMOOTH SCROLLING FOR ANCHORS =====
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('.card-image img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
    
    // ===== ACCESSIBILITY IMPROVEMENTS =====
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            const activeElement = document.activeElement;
            if (activeElement.classList.contains('contact-number')) {
                // Add visual indicator for keyboard focus
                activeElement.style.outline = '2px solid #2d8659';
            }
        }
        
        // Enter key support for contact numbers
        if (e.key === 'Enter' && document.activeElement.classList.contains('contact-number')) {
            e.preventDefault();
            document.activeElement.click();
        }
    });
    
    // Remove outline when clicking (keep for keyboard users only)
    contactNumbers.forEach(btn => {
        btn.addEventListener('mousedown', function() {
            this.style.outline = 'none';
        });
        
        btn.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
    
    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce scroll and resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to resize event
    const debouncedAdjustHeights = debounce(adjustCardHeights, 250);
    window.removeEventListener('resize', adjustCardHeights);
    window.addEventListener('resize', debouncedAdjustHeights);
    
    // ===== ERROR HANDLING =====
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
    });
    
    // ===== INITIALIZATION COMPLETE =====
    console.log('Museum Activity page initialized successfully');
});