export default function OurServices() {
    const content: Array<string> = [
        "Sewa Mobil Dengan Supir di Bali 12 Jam",
        "Mobil Lepas Kunci di Bali 24 Jam",
        "Mobil Jangka Panjang Bulanan",
        "Antar - Jemput Mobil di Bandara",
        "Transfer / Drop In Out",
    ]

    return (
        <>
            <section id="our-services" className="mt-5">
                <div className="container container-fluid">
                    <div className="row p-0 m-0 d-flex align-items-center justify-content-between">
                        {/* Image */}
                        <div className="col-12 col-lg-6 p-5">
                            <img src="./images/service.png" alt="service" className="our-services__image w-100" />
                        </div>

                        <div className="col-12 col-lg-6">
                            <h2 className="fs-3 fw-bolder">
                                Best Car Rental for any kind of trip in (Lokasimu)!
                            </h2>
                            <p>
                                Sewa mobil di (Lokasimu) bersama Binar Car Rental jaminan harga lebih murah dibandingkan
                                yang
                                lain, kondisi mobil baru, serta kualitas pelayanan terbaik untuk perjalanan wisata, bisnis,
                                wedding, meeting, dll.
                            </p>
                            <ul className="our-services__list m-0 p-0">
                                {content.map((item, index) => (
                                    <li key={index} className="mb-2 d-flex gap-3">
                                        <i className="fa-solid fa-check our-services__list--icon rounded-5"></i>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}