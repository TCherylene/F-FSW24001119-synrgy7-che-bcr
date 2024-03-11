// Javascript owl carousel configuration reference:
// https://bbbootstrap.com/snippets/bootstrap-4-owl-carousel-for-user-testimonials-10735496

$(document).ready(function () {
    var slider = $(".owl-carousel");
    slider.owlCarousel({
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        items: 1,
        stagePadding: 20,
        center: true,
        nav: true,
        navText: ['<i class="fa-solid fa-chevron-left testimonials__icons--chevron-left"></i>', '<i class="fa-solid fa-chevron-right testimonials__icons--chevron-right"></i>'],
        margin: 50,
        dots: false,
        loop: true,
        responsive: {
            0: { items: 1 },
            480: { items: 1 },
            575: { items: 1 },
            768: { items: 1 },
            991: { items: 2 },
            1200: { items: 2 }
        }
    });
});