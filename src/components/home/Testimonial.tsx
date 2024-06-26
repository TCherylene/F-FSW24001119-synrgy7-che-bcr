import MyCarousel from './MyCarousel';

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

                <MyCarousel />
            </section>
        </>
    )
}