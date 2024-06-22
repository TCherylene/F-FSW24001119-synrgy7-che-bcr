interface contentType {
    images: string;
    bg: string;
    title: string;
    description: string;
}

export default function WhyUs() {
    const content: contentType[] = [{
        "images": "fi_thumbs-up.svg",
        "bg": "bg-warning",
        "title": "Mobil Lengkap",
        "description": "Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat",
    },
    {
        "images": "fi_tag.svg",
        "bg": "bg-danger",
        "title": "Harga Murah",
        "description": "Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain",
    },
    {
        "images": "fi_clock.svg",
        "bg": "bg-primary",
        "title": "Layanan 24 Jam",
        "description": "Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu",
    },
    {
        "images": "fi_award.svg",
        "bg": "bg-secondary",
        "title": "Sopir Profesional",
        "description": "Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu",
    }


    ]

    return (
        <>
            <section id="why-us" className="mt-5">
                <div className="container container-fluid">
                    <div className="d-flex flex-column align-items-start justify-content-center">
                        <h2 className="fs-4 fw-bolder align-self-center align-self-lg-start">
                            Why Us?
                        </h2>
                        <p className="align-self-center align-self-lg-start">
                            Mengapa harus pilih Binar Car Rental?
                        </p>

                        {/* Kotak Why Us */}
                        <div className="row gy-3">
                            {content.map((item, index) => (
                                <div key={index} className="col-12 col-md-6 col-lg-3">
                                    <div className="card w-100 py-3 px-2 h-100">
                                        <div className="card-body d-flex flex-column row-gap-3">
                                            <img className={`why-us__icon p-2 ${item.bg}`} src={`./images/icons/${item.images}`}
                                                alt="" />
                                            <h5 className="card-title fw-bold fs-6 p-0 m-0">{item.title}</h5>
                                            <p className="card-text">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}