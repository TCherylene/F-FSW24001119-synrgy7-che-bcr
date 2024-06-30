import { Link } from "react-router-dom"

export default function Hero({ withButton = true }: { withButton?: boolean }) {
    return (
        <>
            <section id="hero" className="hero__background position-relative overflow-hidden">
                <div className="container container-fluid pt-5">
                    <div className="row gy-3 align-items-center justify-content-between">
                        <div className="col-12 col-lg-6 my-auto pb-4">
                            <h1 className="fw-bolder">Sewa & Rental Mobil Terbaik di kawasan (Lokasimu)</h1>
                            <p>
                                Selamat datang di Binar Car Rental. Kami menyediakan mobil kualitas terbaik dengan harga
                                terjangkau. Selalu siap melayani kebutuhanmu untuk sewa mobil selama 24 jam.
                            </p>
                            {withButton && (
                                <Link to="cars" className="btn btn-secondary rounded-1">Mulai Sewa Mobil</Link>
                            )}
                        </div>

                        <div className="col-12 col-lg-6 z-1 container--car">
                            <img src="./images/car-nobg.png" alt="car" className="w-100" />
                        </div>
                    </div>
                </div>
                <span className="position-absolute end-0 bottom-0 z-0" id="car-background"></span>
            </section>
        </>
    )
}