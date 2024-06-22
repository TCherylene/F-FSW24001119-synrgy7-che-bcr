export default function Testimonial() {
    return (
        <>
            <section id="testimonial" className="mt-5 px-3 d-flex flex-column align-items-center justify-content-center">
                <h2 className="fs-4 fw-bolder  mb-4">
                    Testimonial
                </h2>
                <p className="text-center mb-4">
                    Berbagai review positif dari para pelanggan kami
                </p>

                {/* Owl Carousels */}
                <div className="owl-carousel  owl-theme">
                    {/* Testimonials 1 */}
                    <div className="item">
                        <div className="card testimonials__card border-0 shadow-sm py-3">
                            <div className="row g-2 justify-content-center my-auto">
                                {/* Foto Profil */}
                                <div className="col-lg-2 px-2 my-auto">
                                    <img src="./images/photo-profile.png" className="w-100 mx-auto rounded-0 max-width-80" alt="..." />
                                </div>
                                {/* Teks */}
                                <div className="col-lg-8">
                                    <div className="card-body">
                                        {/* Rating */}
                                        <h5 className="card-title text-center text-lg-start mb-3">
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                        </h5>
                                        <p className="card-text">Testimonial 1 - “Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed
                                            do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod”
                                        </p>
                                        <p className="card-text fw-semibold">John Dee 32, Bromo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Testimonials 2 */}
                    <div className="item">
                        <div className="card testimonials__card border-0 shadow-sm py-3">
                            <div className="row g-2 justify-content-center my-auto">
                                {/* Foto Profil */}
                                <div className="col-lg-2 px-2 my-auto">
                                    <img src="./images/photo-profile.png" className="w-100 mx-auto rounded-0 max-width-80" alt="..." />
                                </div>
                                {/* Teks */}
                                <div className="col-lg-8">
                                    <div className="card-body">
                                        {/* Rating */}
                                        <h5 className="card-title text-center text-lg-start mb-3">
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                        </h5>
                                        <p className="card-text">Testimonial 2 - “Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed
                                            do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod”
                                        </p>
                                        <p className="card-text fw-semibold">John Dee 32, Bromo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Testimonials 3 */}
                    <div className="item">
                        <div className="card testimonials__card border-0 shadow-sm py-3">
                            <div className="row g-2 justify-content-center my-auto">
                                {/* Foto Profil */}
                                <div className="col-lg-2 px-2 my-auto">
                                    <img src="./images/photo-profile.png" className="w-100 mx-auto rounded-0 max-width-80" alt="..." />
                                </div>
                                {/* Teks */}
                                <div className="col-lg-8">
                                    <div className="card-body">
                                        {/* Rating */}
                                        <h5 className="card-title text-center text-lg-start mb-3">
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                            <i className="fa-solid fa-star testimonials__icons--star active"></i>
                                        </h5>
                                        <p className="card-text">Testimonial 1 - “Lorem ipsum dolor sit amet, consectetur
                                            adipiscing elit, sed
                                            do eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                            eiusmod”
                                        </p>
                                        <p className="card-text fw-semibold">John Dee 32, Bromo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}