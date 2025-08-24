$(document).ready(function(){
    var $carousel = $('.carousel');
    var $slides = $carousel.find('img').length;

    $carousel.on('init', function() {
        $carousel.css('visibility', 'visible');
    });

    $carousel.slick({
        dots: $slides > 1,
        arrows: $slides > 1,
        infinite: $slides > 1,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: false,
        autoplay: $slides > 1,
        autoplaySpeed: 5000,
        responsive: [
            { breakpoint: 768, settings: { arrows: false } }
        ]
    });

    if ($slides <= 1) {
        $('.slick-dots, .slick-arrow').hide();
    }
});
