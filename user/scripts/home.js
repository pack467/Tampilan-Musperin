document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      document.querySelector('.custom-content').classList.add('fade-in-up');
    }, 280);
});

// Responsive Slick Carousel untuk news-container
function setMobileNewsCarousel() {
    var $news = $('.news-container');
    if (window.innerWidth <= 768) {
        if (!$news.hasClass('slick-initialized')) {
            $news.slick({
                slidesToShow: 1.1,
                slidesToScroll: 1,
                infinite: false,
                arrows: false,
                dots: true,
                variableWidth: true,
                swipeToSlide: true,
                touchMove: true
            });
        }
    } else {
        if ($news.hasClass('slick-initialized')) {
            $news.slick('unslick');
        }
    }
}

$(document).ready(function() {
    setMobileNewsCarousel();
    $(window).on('resize orientationchange', function() {
        setMobileNewsCarousel();
    });
});
