// Profile Page Scripts - Fixed Scrolling Issue
document.addEventListener('DOMContentLoaded', function() {
    // ========== CORE FUNCTIONALITY ==========
    
    // Tab Navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.lokasi-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(nav => {
                    nav.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll to section with smooth animation
                const headerOffset = 120;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight current section in nav on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200;
        
        document.querySelectorAll('.profile-section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ========== STRUKTUR ORGANISASI - FIXED SCROLLING SYSTEM ==========
    function setupStrukturOrganisasiScroll() {
        const strukturSection = document.querySelector('.profile-section.struktur');
        if (!strukturSection) return;

        let hasScrolled = false;
        let isDragging = false;
        let isMouseInside = false;
        
        // Function to hide scroll hint after first interaction
        function hideScrollHint() {
            if (!hasScrolled) {
                hasScrolled = true;
                strukturSection.classList.add('scrolled');
            }
        }
        
        // Detect if user is on mobile
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // ========== MOBILE SCROLL BEHAVIOR ==========
            let touchStartY = 0;
            let isTouchScrolling = false;
            let touchScrollTimeout;
            
            // Mouse enter/leave untuk mobile (touch devices)
            strukturSection.addEventListener('touchstart', function(e) {
                isMouseInside = true;
                touchStartY = e.touches[0].clientY;
                isTouchScrolling = false;
                hideScrollHint();
                
                // Clear any existing timeout
                if (touchScrollTimeout) {
                    clearTimeout(touchScrollTimeout);
                }
            }, { passive: true });
            
            strukturSection.addEventListener('touchmove', function(e) {
                if (!touchStartY || !isMouseInside) return;
                
                const touchY = e.touches[0].clientY;
                const deltaY = touchStartY - touchY;
                
                // If movement is significant, it's a scroll gesture
                if (Math.abs(deltaY) > 10) {
                    isTouchScrolling = true;
                    
                    // Scroll internal struktur
                    strukturSection.scrollTop += deltaY * 0.5;
                    
                    // Prevent page scroll sementara
                    e.preventDefault();
                }
            }, { passive: false });
            
            strukturSection.addEventListener('touchend', function() {
                touchStartY = 0;
                
                // Delay before allowing page scroll again
                touchScrollTimeout = setTimeout(() => {
                    isMouseInside = false;
                    isTouchScrolling = false;
                }, 300);
            }, { passive: true });
            
            // Regular scroll event untuk mobile
            strukturSection.addEventListener('scroll', function() {
                hideScrollHint();
                isMouseInside = true;
                
                // Reset timeout
                if (touchScrollTimeout) {
                    clearTimeout(touchScrollTimeout);
                }
                
                touchScrollTimeout = setTimeout(() => {
                    isMouseInside = false;
                }, 500);
            }, { passive: true });
            
        } else {
            // ========== DESKTOP SCROLL BEHAVIOR ==========
            
            // Mouse enter - start intercepting scroll
            strukturSection.addEventListener('mouseenter', function() {
                isMouseInside = true;
                this.style.cursor = 'grab';
                hideScrollHint();
            });
            
            // Mouse leave - stop intercepting scroll
            strukturSection.addEventListener('mouseleave', function() {
                isMouseInside = false;
                isDragging = false;
                this.style.cursor = 'default';
            });
            
            // Wheel event - handle mouse wheel scrolling
            strukturSection.addEventListener('wheel', function(e) {
                if (!isMouseInside) return;
                
                // Check if we can scroll internally
                const canScrollUp = strukturSection.scrollTop > 0;
                const canScrollDown = strukturSection.scrollTop < (strukturSection.scrollHeight - strukturSection.clientHeight);
                
                // If trying to scroll up and can't, allow page scroll
                if (e.deltaY < 0 && !canScrollUp) {
                    return; // Let page handle the scroll
                }
                
                // If trying to scroll down and can't, allow page scroll  
                if (e.deltaY > 0 && !canScrollDown) {
                    return; // Let page handle the scroll
                }
                
                // We can scroll internally, prevent page scroll
                e.preventDefault();
                strukturSection.scrollTop += e.deltaY;
                hideScrollHint();
            }, { passive: false });
            
            // Mouse drag scrolling for desktop
            let startY, scrollTop;
            let isDown = false;
            
            strukturSection.addEventListener('mousedown', function(e) {
                if (!isMouseInside) return;
                isDown = true;
                isDragging = false;
                this.style.cursor = 'grabbing';
                startY = e.pageY - strukturSection.offsetTop;
                scrollTop = strukturSection.scrollTop;
                hideScrollHint();
                e.preventDefault();
            });
            
            strukturSection.addEventListener('mousemove', function(e) {
                if (!isDown || !isMouseInside) return;
                e.preventDefault();
                isDragging = true;
                const y = e.pageY - strukturSection.offsetTop;
                const walk = (y - startY) * 1.5;
                strukturSection.scrollTop = scrollTop - walk;
            });
            
            strukturSection.addEventListener('mouseup', function() {
                isDown = false;
                this.style.cursor = 'grab';
                setTimeout(() => {
                    isDragging = false;
                }, 100);
            });
            
            // Keyboard navigation
            strukturSection.addEventListener('keydown', function(e) {
                if (!isMouseInside) return;
                
                switch(e.key) {
                    case 'ArrowUp':
                        e.preventDefault();
                        strukturSection.scrollTop -= 100;
                        hideScrollHint();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        strukturSection.scrollTop += 100;
                        hideScrollHint();
                        break;
                }
            });
            
            // Make section focusable for keyboard navigation
            strukturSection.setAttribute('tabindex', '0');
        }
        
        // Prevent click events during drag
        function preventClickDuringDrag(e) {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        
        // Add click prevention to all child elements
        const orgCards = strukturSection.querySelectorAll('.org-card');
        orgCards.forEach(card => {
            card.addEventListener('click', preventClickDuringDrag);
            
            if (!isMobile) {
                card.addEventListener('touchend', function(e) {
                    if (isDragging) {
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }
        });

        console.log(`Struktur Organisasi ${isMobile ? 'mobile' : 'desktop'} scroll initialized`);
    }

    // ========== PRESTASI SECTION - ENHANCED HORIZONTAL SCROLL ==========
    function setupPrestasiHorizontalScroll() {
        const prestasiItems = document.querySelector('.prestasi-items');
        if (!prestasiItems) return;

        // Disable slick if it's active
        if (typeof $ !== 'undefined' && $.fn.slick) {
            if ($(prestasiItems).hasClass('slick-initialized')) {
                $(prestasiItems).slick('unslick');
            }
        }

        let isDown = false;
        let startX;
        let scrollLeft;
        let hasScrolled = false;
        let isDragging = false;
        let isMouseInside = false;
        
        // Function to hide scroll hint after first interaction
        function hideScrollHint() {
            if (!hasScrolled) {
                hasScrolled = true;
                prestasiItems.classList.add('scrolled');
            }
        }
        
        // Mouse enter/leave tracking
        prestasiItems.addEventListener('mouseenter', () => {
            isMouseInside = true;
        });
        
        prestasiItems.addEventListener('mouseleave', () => {
            isMouseInside = false;
            isDown = false;
            prestasiItems.style.cursor = 'grab';
            setTimeout(() => {
                isDragging = false;
            }, 100);
        });
        
        // Function to prevent click events during drag
        function preventClickDuringDrag(e) {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        
        // Add click prevention to all child elements
        const prestasiCards = prestasiItems.querySelectorAll('.prestasi-item');
        prestasiCards.forEach(card => {
            card.addEventListener('click', preventClickDuringDrag);
        });
        
        // Mouse events for desktop horizontal scrolling
        prestasiItems.addEventListener('mousedown', (e) => {
            if (!isMouseInside) return;
            isDown = true;
            isDragging = false;
            prestasiItems.style.cursor = 'grabbing';
            startX = e.pageX - prestasiItems.offsetLeft;
            scrollLeft = prestasiItems.scrollLeft;
            hideScrollHint();
            e.preventDefault();
        });
        
        prestasiItems.addEventListener('mouseup', () => {
            isDown = false;
            prestasiItems.style.cursor = 'grab';
            setTimeout(() => {
                isDragging = false;
            }, 100);
        });
        
        prestasiItems.addEventListener('mousemove', (e) => {
            if (!isDown || !isMouseInside) return;
            e.preventDefault();
            isDragging = true;
            const x = e.pageX - prestasiItems.offsetLeft;
            const walk = (x - startX) * 2;
            prestasiItems.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile horizontal scrolling
        let touchStartX = 0;
        let touchScrollLeft = 0;
        let isTouchDragging = false;
        
        prestasiItems.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchScrollLeft = prestasiItems.scrollLeft;
            isTouchDragging = false;
            hideScrollHint();
        }, { passive: true });
        
        prestasiItems.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            const touchX = e.touches[0].clientX;
            const walk = (touchStartX - touchX) * 1.5;
            prestasiItems.scrollLeft = touchScrollLeft + walk;
            
            if (Math.abs(touchStartX - touchX) > 10) {
                isTouchDragging = true;
            }
        }, { passive: true });
        
        prestasiItems.addEventListener('touchend', () => {
            touchStartX = 0;
            if (isTouchDragging) {
                setTimeout(() => {
                    isTouchDragging = false;
                }, 100);
            }
        });
        
        // Add touch click prevention
        prestasiCards.forEach(card => {
            card.addEventListener('touchend', (e) => {
                if (isTouchDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });
        
        // Regular scroll event
        prestasiItems.addEventListener('scroll', hideScrollHint, { passive: true });
        
        // Wheel event for desktop scroll with mouse wheel - FIXED: Don't block page scroll
        prestasiItems.addEventListener('wheel', (e) => {
            if (!isMouseInside) return;
            
            // Check if we can scroll horizontally
            const canScrollLeft = prestasiItems.scrollLeft > 0;
            const canScrollRight = prestasiItems.scrollLeft < (prestasiItems.scrollWidth - prestasiItems.clientWidth);
            
            // If trying to scroll and can't, allow normal page scroll
            if ((e.deltaY < 0 && !canScrollLeft) || (e.deltaY > 0 && !canScrollRight)) {
                return; // Let page handle the scroll
            }
            
            // We can scroll horizontally, prevent page scroll
            e.preventDefault();
            prestasiItems.scrollLeft += e.deltaY;
            hideScrollHint();
        }, { passive: false });
        
        // Keyboard navigation
        prestasiItems.addEventListener('keydown', (e) => {
            if (!isMouseInside) return;
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    prestasiItems.scrollLeft -= 150;
                    hideScrollHint();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    prestasiItems.scrollLeft += 150;
                    hideScrollHint();
                    break;
            }
        });
        
        // Make carousel focusable for keyboard navigation
        prestasiItems.setAttribute('tabindex', '0');
        
        prestasiItems.addEventListener('focus', () => {
            hideScrollHint();
        });

        // Auto-scroll demonstration for prestasi
        let prestasiAutoScrollInterval;
        
        function startPrestasiAutoScroll() {
            prestasiAutoScrollInterval = setInterval(() => {
                if (hasScrolled) {
                    clearInterval(prestasiAutoScrollInterval);
                    return;
                }
                
                const maxScroll = prestasiItems.scrollWidth - prestasiItems.clientWidth;
                if (prestasiItems.scrollLeft >= maxScroll) {
                    prestasiItems.scrollLeft = 0;
                } else {
                    prestasiItems.scrollLeft += 1;
                }
            }, 30);
        }
        
        function stopPrestasiAutoScroll() {
            if (prestasiAutoScrollInterval) {
                clearInterval(prestasiAutoScrollInterval);
            }
        }
        
        // Start auto-scroll after 3 seconds
        setTimeout(startPrestasiAutoScroll, 3000);
        
        // Stop auto-scroll on any interaction
        ['mousedown', 'touchstart', 'wheel', 'scroll'].forEach(eventType => {
            prestasiItems.addEventListener(eventType, stopPrestasiAutoScroll, { passive: true });
        });

        console.log('Prestasi horizontal scroll initialized');
    }

    // ========== MITRA CAROUSEL - UNIVERSAL HORIZONTAL SCROLL ==========
    function setupUniversalHorizontalScroll() {
        const mitraCarousel = document.querySelector('.mitra-carousel');
        if (!mitraCarousel) return;

        // Disable slick if it's active
        if (typeof $ !== 'undefined' && $.fn.slick) {
            if ($(mitraCarousel).hasClass('slick-initialized')) {
                $(mitraCarousel).slick('unslick');
            }
        }

        let isDown = false;
        let startX;
        let scrollLeft;
        let hasScrolled = false;
        let isDragging = false;
        let isMouseInside = false;
        
        // Function to hide scroll hint after first interaction
        function hideScrollHint() {
            if (!hasScrolled) {
                hasScrolled = true;
                mitraCarousel.classList.add('scrolled');
            }
        }
        
        // Mouse enter/leave tracking
        mitraCarousel.addEventListener('mouseenter', () => {
            isMouseInside = true;
        });
        
        mitraCarousel.addEventListener('mouseleave', () => {
            isMouseInside = false;
            isDown = false;
            mitraCarousel.classList.remove('active');
            setTimeout(() => {
                isDragging = false;
            }, 100);
        });
        
        // Function to prevent click events during drag
        function preventClickDuringDrag(e) {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        
        // Add click prevention to all child elements
        const mitraItems = mitraCarousel.querySelectorAll('.mitra-item');
        mitraItems.forEach(item => {
            item.addEventListener('click', preventClickDuringDrag);
        });
        
        // Mouse events for desktop
        mitraCarousel.addEventListener('mousedown', (e) => {
            if (!isMouseInside) return;
            isDown = true;
            isDragging = false;
            mitraCarousel.classList.add('active');
            startX = e.pageX - mitraCarousel.offsetLeft;
            scrollLeft = mitraCarousel.scrollLeft;
            hideScrollHint();
            e.preventDefault();
        });
        
        mitraCarousel.addEventListener('mouseup', () => {
            isDown = false;
            mitraCarousel.classList.remove('active');
            setTimeout(() => {
                isDragging = false;
            }, 100);
        });
        
        mitraCarousel.addEventListener('mousemove', (e) => {
            if (!isDown || !isMouseInside) return;
            e.preventDefault();
            isDragging = true;
            const x = e.pageX - mitraCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            mitraCarousel.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchScrollLeft = 0;
        let isTouchDragging = false;
        
        mitraCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchScrollLeft = mitraCarousel.scrollLeft;
            isTouchDragging = false;
            hideScrollHint();
        }, { passive: true });
        
        mitraCarousel.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            const touchX = e.touches[0].clientX;
            const walk = (touchStartX - touchX) * 1.5;
            mitraCarousel.scrollLeft = touchScrollLeft + walk;
            
            if (Math.abs(touchStartX - touchX) > 10) {
                isTouchDragging = true;
            }
        }, { passive: true });
        
        mitraCarousel.addEventListener('touchend', () => {
            touchStartX = 0;
            if (isTouchDragging) {
                setTimeout(() => {
                    isTouchDragging = false;
                }, 100);
            }
        });
        
        // Add touch click prevention
        mitraItems.forEach(item => {
            item.addEventListener('touchend', (e) => {
                if (isTouchDragging) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });
        
        // Regular scroll event
        mitraCarousel.addEventListener('scroll', hideScrollHint, { passive: true });
        
        // Wheel event for desktop scroll with mouse wheel - FIXED: Don't block page scroll
        mitraCarousel.addEventListener('wheel', (e) => {
            if (!isMouseInside) return;
            
            // Check if we can scroll horizontally
            const canScrollLeft = mitraCarousel.scrollLeft > 0;
            const canScrollRight = mitraCarousel.scrollLeft < (mitraCarousel.scrollWidth - mitraCarousel.clientWidth);
            
            // If trying to scroll and can't, allow normal page scroll
            if ((e.deltaY < 0 && !canScrollLeft) || (e.deltaY > 0 && !canScrollRight)) {
                return; // Let page handle the scroll
            }
            
            // We can scroll horizontally, prevent page scroll
            e.preventDefault();
            mitraCarousel.scrollLeft += e.deltaY;
            hideScrollHint();
        }, { passive: false });
        
        // Keyboard navigation
        mitraCarousel.addEventListener('keydown', (e) => {
            if (!isMouseInside) return;
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    mitraCarousel.scrollLeft -= 150;
                    hideScrollHint();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    mitraCarousel.scrollLeft += 150;
                    hideScrollHint();
                    break;
            }
        });
        
        // Make carousel focusable for keyboard navigation
        mitraCarousel.setAttribute('tabindex', '0');
        
        mitraCarousel.addEventListener('focus', () => {
            hideScrollHint();
        });

        // Auto-scroll demonstration
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (hasScrolled) {
                    clearInterval(autoScrollInterval);
                    return;
                }
                
                const maxScroll = mitraCarousel.scrollWidth - mitraCarousel.clientWidth;
                if (mitraCarousel.scrollLeft >= maxScroll) {
                    mitraCarousel.scrollLeft = 0;
                } else {
                    mitraCarousel.scrollLeft += 1;
                }
            }, 30);
        }
        
        function stopAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
            }
        }
        
        // Start auto-scroll after 3 seconds
        setTimeout(startAutoScroll, 3000);
        
        // Stop auto-scroll on any interaction
        ['mousedown', 'touchstart', 'wheel', 'scroll'].forEach(eventType => {
            mitraCarousel.addEventListener(eventType, stopAutoScroll, { passive: true });
        });

        console.log('Mitra carousel horizontal scroll initialized');
    }
    
    // ========== PRESTASI SLIDER (FALLBACK) ==========
    if (typeof $ !== 'undefined' && $.fn.slick && document.querySelector('.prestasi-slider')) {
        $('.prestasi-slider').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 400,
            slidesToShow: 3,
            centerMode: true,
            centerPadding: '40px',
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        centerMode: true,
                        centerPadding: '30px'
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        centerMode: false,
                        centerPadding: '0px'
                    }
                }
            ]
        });
    }
    
    // Initialize all scroll functionalities
    setupStrukturOrganisasiScroll();
    setupPrestasiHorizontalScroll();
    setupUniversalHorizontalScroll();
    
    // Re-initialize on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setupStrukturOrganisasiScroll();
            setupPrestasiHorizontalScroll();
            setupUniversalHorizontalScroll();
        }, 250);
    });

    // ========== ENHANCED FEATURES ==========
    
    // Smooth reveal animations for sections
    function revealSections() {
        const sections = document.querySelectorAll('.profile-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
    
    // Timeline items animation
    function animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }
    
    // Prestasi items hover effect enhancement
    const prestasiItems = document.querySelectorAll('.prestasi-item');
    prestasiItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) scale(1)';
            this.style.zIndex = '1';
        });
    });

    // Organization chart connection lines
    function drawOrgConnections() {
        const orgLevels = document.querySelectorAll('.org-level');
        if (orgLevels.length < 2) return;

        orgLevels.forEach((level, index) => {
            if (index === 0) return;
            
            const cards = level.querySelectorAll('.org-card');
            cards.forEach(card => {
                if (!card.querySelector('.connection-indicator')) {
                    const indicator = document.createElement('div');
                    indicator.className = 'connection-indicator';
                    indicator.style.cssText = `
                        position: absolute;
                        top: -10px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 10px;
                        height: 10px;
                        background: var(--secondary);
                        border-radius: 50%;
                        border: 2px solid white;
                        z-index: 10;
                    `;
                    card.appendChild(indicator);
                }
            });
        });
    }

    // VM Cards animation
    function animateVMCards() {
        const vmCards = document.querySelectorAll('.vm-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });
        
        vmCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    // Gallery hover effects
    function enhanceGallery() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach(item => {
            const img = item.querySelector('img');
            
            item.addEventListener('mouseenter', function() {
                if (img) {
                    img.style.transform = 'scale(1.1)';
                    img.style.filter = 'brightness(1.1)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (img) {
                    img.style.transform = 'scale(1)';
                    img.style.filter = 'brightness(1)';
                }
            });
        });
    }

    // Map interaction enhancement
    function enhanceMapInteraction() {
        const mapContainers = document.querySelectorAll('.lokasi-map');
        
        mapContainers.forEach(container => {
            const iframe = container.querySelector('iframe');
            if (!iframe) return;
            
            // Add click overlay to enable map interaction
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: transparent;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            `;
            
            const clickText = document.createElement('div');
            clickText.innerHTML = `
                <div style="
                    background: rgba(76, 175, 80, 0.9);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 30px;
                    font-weight: 600;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                ">
                    <i class="fas fa-mouse-pointer"></i> Klik untuk berinteraksi dengan peta
                </div>
            `;
            
            overlay.appendChild(clickText);
            container.style.position = 'relative';
            container.appendChild(overlay);
            
            overlay.addEventListener('click', function() {
                this.style.display = 'none';
                iframe.style.pointerEvents = 'auto';
            });
            
            // Re-enable overlay when mouse leaves container
            container.addEventListener('mouseleave', function() {
                overlay.style.display = 'flex';
                iframe.style.pointerEvents = 'none';
            });
        });
    }

    // Copy contact information functionality
    function addCopyContactFeature() {
        const contactItems = document.querySelectorAll('.contact-item p, .lokasi-detail p');
        
        contactItems.forEach(item => {
            const text = item.textContent.trim();
            
            // Check if it's a phone number or email
            if (text.includes('@') || text.includes('+62') || text.includes('(061)')) {
                item.style.cursor = 'pointer';
                item.title = 'Klik untuk menyalin';
                
                item.addEventListener('click', function() {
                    navigator.clipboard.writeText(text).then(() => {
                        // Show success message
                        const successMsg = document.createElement('div');
                        successMsg.textContent = 'Tersalin!';
                        successMsg.style.cssText = `
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            background: var(--secondary);
                            color: white;
                            padding: 0.5rem 1rem;
                            border-radius: 5px;
                            z-index: 10000;
                            animation: fadeInOut 2s ease;
                        `;
                        
                        document.body.appendChild(successMsg);
                        
                        setTimeout(() => {
                            if (successMsg.parentNode) {
                                successMsg.remove();
                            }
                        }, 2000);
                    });
                });
            }
        });
    }

    // Scroll to top button
    function addScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--secondary);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
            opacity: 0;
            visibility: hidden;
            z-index: 1000;
        `;
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        document.body.appendChild(scrollBtn);
    }

    // Initialize all enhancements
    setTimeout(() => {
        revealSections();
        animateTimelineItems();
        animateVMCards();
        enhanceGallery();
        drawOrgConnections();
        enhanceMapInteraction();
        addCopyContactFeature();
        addScrollToTop();
    }, 100);

    // Add CSS for fadeInOut animation
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-20px); }
            20%, 80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-20px); }
        }
    `;
    document.head.appendChild(fadeStyle);

    console.log('Museum Profile JavaScript with fixed scroll behavior initialized successfully!');
});