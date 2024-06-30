import { Link } from "react-router-dom"

export default function CallToAction() {
    return (
        <>
            <section id="cta" className="mt-5 d-flex justify-content-center align-items-center px-3">
                <div className="container container-fluid">
                    <div
                        className="cta__background w-100 d-flex flex-column justify-content-center align-items-center gap-3 p-5 rounded-3 text-white">
                        <h2 className="text-center">Sewa Mobil di (Lokasimu) Sekarang</h2>
                        <p className="fw-light text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                        <Link to="/cars" className="btn btn-secondary">Mulai Sewa Mobil</Link>
                    </div>
                </div>
            </section>
        </>
    )
}