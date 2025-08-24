// Page News Script
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Image gallery modal functionality
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach(image => {
        image.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <img src="${this.src}" alt="${this.alt}">
                    <div class="modal-caption">${this.nextElementSibling.textContent}</div>
                    <button class="modal-close">&times;</button>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Close modal on close button
            modal.querySelector('.modal-close').addEventListener('click', function() {
                modal.remove();
            });
            
            // Close modal on outside click
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    });

    // Mobile Drag Scroll for Related News Cards
    const newsGrid = document.querySelector('.related-news-grid');
    
    if (!newsGrid) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let momentum = 0;
    let frame;
    
    // Mouse events
    newsGrid.addEventListener('mousedown', handleStart);
    newsGrid.addEventListener('mouseleave', handleEnd);
    newsGrid.addEventListener('mouseup', handleEnd);
    newsGrid.addEventListener('mousemove', handleMove);
    
    // Touch events for mobile
    newsGrid.addEventListener('touchstart', handleTouchStart, { passive: false });
    newsGrid.addEventListener('touchend', handleTouchEnd);
    newsGrid.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Prevent default click behavior during drag
    newsGrid.addEventListener('click', handleClick, true);
    
    function handleStart(e) {
        isDown = true;
        newsGrid.style.cursor = 'grabbing';
        startX = e.pageX - newsGrid.offsetLeft;
        scrollLeft = newsGrid.scrollLeft;
        velocity = 0;
        cancelAnimationFrame(frame);
    }
    
    function handleTouchStart(e) {
        isDown = true;
        const touch = e.touches[0];
        startX = touch.pageX - newsGrid.offsetLeft;
        scrollLeft = newsGrid.scrollLeft;
        velocity = 0;
        cancelAnimationFrame(frame);
    }
    
    function handleMove(e) {
        if (!isDown) return;
        e.preventDefault();
        
        const x = e.pageX - newsGrid.offsetLeft;
        const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
        const newScrollLeft = scrollLeft - walk;
        
        velocity = newsGrid.scrollLeft - newScrollLeft;
        newsGrid.scrollLeft = newScrollLeft;
    }
    
    function handleTouchMove(e) {
        if (!isDown) return;
        e.preventDefault();
        
        const touch = e.touches[0];
        const x = touch.pageX - newsGrid.offsetLeft;
        const walk = (x - startX) * 2;
        const newScrollLeft = scrollLeft - walk;
        
        velocity = newsGrid.scrollLeft - newScrollLeft;
        newsGrid.scrollLeft = newScrollLeft;
    }
    
    function handleEnd() {
        if (!isDown) return;
        
        isDown = false;
        newsGrid.style.cursor = 'grab';
        
        // Add momentum scrolling
        momentum = velocity * 0.95;
        if (Math.abs(momentum) > 0.5) {
            momentumScroll();
        }
    }
    
    function handleTouchEnd() {
        handleEnd();
    }
    
    function momentumScroll() {
        if (Math.abs(momentum) < 0.5) {
            cancelAnimationFrame(frame);
            return;
        }
        
        newsGrid.scrollLeft -= momentum;
        momentum *= 0.92; // Friction
        frame = requestAnimationFrame(momentumScroll);
    }
    
    function handleClick(e) {
        // Prevent click if we were dragging
        if (Math.abs(velocity) > 2) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
    
    // Add smooth scroll behavior
    newsGrid.style.scrollBehavior = 'auto';
    
    // Enhance scroll indicators on mobile
    if (window.innerWidth <= 576) {
        let scrollTimeout;
        
        newsGrid.addEventListener('scroll', function() {
            // Show scroll position indicator
            const scrollPercentage = (newsGrid.scrollLeft / (newsGrid.scrollWidth - newsGrid.clientWidth)) * 100;
            
            // Add visual feedback for scroll position
            clearTimeout(scrollTimeout);
            newsGrid.style.borderBottom = `3px solid #4a7c59`;
            newsGrid.style.borderImage = `linear-gradient(90deg, #4a7c59 ${scrollPercentage}%, #e0e0e0 ${scrollPercentage}%) 1`;
            
            scrollTimeout = setTimeout(() => {
                newsGrid.style.borderBottom = 'none';
                newsGrid.style.borderImage = 'none';
            }, 1000);
        });
        
        // Add touch feedback for cards
        const cards = newsGrid.querySelectorAll('.news-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98) translateY(-2px)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
});