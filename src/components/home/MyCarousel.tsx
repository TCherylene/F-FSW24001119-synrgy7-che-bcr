import OwlCarousel from 'react-owl-carousel';

const MyCarousel = () => {
    const carouselItems = [
        {
            "photo": "./images/photo-profile.png",
            "text": "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod”",
            "active_stars": 2
        },
        {
            "photo": "./images/photo-profile.png",
            "text": "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod”",
            "active_stars": 5
        },
        {
            "photo": "./images/photo-profile.png",
            "text": "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod”",
            "active_stars": 4
        },
        {
            "photo": "./images/photo-profile.png",
            "text": "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod”",
            "active_stars": 1
        }

    ]

    const options = {
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
        },
    };

    return (
        <OwlCarousel className="owl-theme" {...options}>
            {carouselItems.map((item, index) => (
                <div key={index} className="item">
                    <div className="card testimonials__card border-0 shadow-sm py-3">
                        <div className="row g-2 justify-content-center my-auto">
                            {/* Foto Profil */}
                            <div className="col-lg-2 px-2 my-auto">
                                <img src={item.photo} className="w-100 mx-auto rounded-0 max-width-80" alt="..." />
                            </div>
                            {/* Teks */}
                            <div className="col-lg-8">
                                <div className="card-body">
                                    {/* Rating */}
                                    <h5 className="card-title text-center text-lg-start mb-3">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <i
                                                key={starIndex}
                                                className={`fa-solid fa-star testimonials__icons--star ${starIndex < item.active_stars ? 'active' : ''}`}
                                            ></i>
                                        ))}
                                    </h5>
                                    <p className="card-text">Testimonial {index + 1} - {item.text}
                                    </p>
                                    <p className="card-text fw-semibold">John Dee 32, Bromo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </OwlCarousel>
    );
};

export default MyCarousel;
