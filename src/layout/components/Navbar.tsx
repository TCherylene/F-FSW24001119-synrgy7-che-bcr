import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="navbar navbar__background navbar-expand-lg mx-auto">
            <div className="container container-fluid">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    Binar Car Rental
                </Link>
                {/* Navbar Toggler Mobile  */}
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar */}
                <div className="navbar d-none d-lg-block">
                    <ul
                        className="w-100 h-100 d-flex gap-4 flex-column flex-lg-row justify-content-end align-items-center p-2 navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/#our-services">Our Services</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/#why-us">Why Us</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/#testimonial">Testimonial</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/#faq">FAQ</Link></li>
                        <li className="nav-item"><Link className="btn btn-secondary rounded-1" to="/login">Register</Link></li>
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
                            <li className="nav-item"><Link className="nav-link text-black" to="/#our-services">Our Services</Link></li>
                            <li className="nav-item"><Link className="nav-link text-black" to="/#why-us">Why Us</Link></li>
                            <li className="nav-item"><Link className="nav-link text-black" to="/#testimonial">Testimonial</Link></li>
                            <li className="nav-item"><Link className="nav-link text-black" to="/#faq">FAQ</Link></li>
                            <li className="nav-item"><Link className="btn btn-secondary rounded-1" to="/login">Register</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )

}