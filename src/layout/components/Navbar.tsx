export default function Navbar() {
    return (
        <nav className="navbar navbar__background navbar-expand-lg mx-auto">
            <div className="container container-fluid">
                {/* Logo */}
                <a className="navbar-brand" href="/index">
                    Binar Car Rental
                </a>
                {/* Navbar Toggler Mobile  */}
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar */}
                <div className="navbar d-none d-lg-block">
                    <ul
                        className="w-100 h-100 d-flex gap-4 flex-column flex-lg-row justify-content-end align-items-center p-2 navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link" href="/index#our-services">Our Services</a></li>
                        <li className="nav-item"><a className="nav-link" href="/index#why-us">Why Us</a></li>
                        <li className="nav-item"><a className="nav-link" href="/index#testimonial">Testimonial</a></li>
                        <li className="nav-item"><a className="nav-link" href="/index#faq">FAQ</a></li>
                        <li className="nav-item"><a className="btn btn-secondary rounded-1" href="/dashboard">Register</a></li>
                    </ul>
                </div>

                {/* Navbar */}
                <div className="d-block d-lg-none offcanvas offcanvas-end" id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">BCR</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item"><a className="nav-link text-black" href="#our-services">Our Services</a></li>
                            <li className="nav-item"><a className="nav-link text-black" href="#why-us">Why Us</a></li>
                            <li className="nav-item"><a className="nav-link text-black" href="#testimonial">Testimonial</a></li>
                            <li className="nav-item"><a className="nav-link text-black" href="#faq">FAQ</a></li>
                            <li className="nav-item"><a className="btn btn-secondary rounded-1" href="#">Register</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )

}