interface footerType {
    id: number;
    title: string;
    link: string;
}

export default function Footer() {
    const footerList: footerType[] = [
        {
            id: 1,
            title: "Our Services",
            link: "#our-services"
        },
        {
            id: 2,
            title: "Why Us",
            link: "#why-us"
        },
        {
            id: 3,
            title: "Testimonial",
            link: "#testimonial"
        },
        {
            id: 4,
            title: "FAQ",
            link: "#faq"
        },
    ]

    const socialMedia: Array<string> = [
        "fa-facebook",
        "fa-instagram",
        "fa-twitter",
        "fa-envelope",
        "fa-twitch",
    ]

    return (
        <>
            {/* Footer */}
            <footer className="mt-5 pb-3">
                <div className="container container-fluid">
                    <div className="row gy-1">
                        {/* Alamat / Contact */}
                        <div className="col-12 col-lg-3">
                            <p>Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
                            <p>binarcarrental@gmail.com</p>
                            <p>081-233-334-808</p>
                        </div>
                        {/* Links */}
                        <div className="col-12 col-lg-3">
                            <ul className="footer__list fw-semibold d-flex flex-column gap-1 p-0">
                                {footerList.map((item) => (
                                    <li key={item.id}>
                                        {item.title}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect with us */}
                        <div className="col-12 col-lg-3">
                            <p>Connect with us</p>
                            <div className="d-flex gap-2">
                                {socialMedia.map((item, key) => (
                                    <a key={key} href="#" className="">
                                        <i className={`fa-brands ${item} footer__icon`}></i>
                                    </a>
                                ))}
                            </div>

                        </div>

                        {/* Copyright */}
                        <div className="col-12 col-lg-3">
                            <p>Copyright Binar 2022</p>
                            <p className="fw-bolder">Binar Car Rental</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}