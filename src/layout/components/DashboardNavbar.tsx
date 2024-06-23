import { Button } from "reactstrap"

export default function DashboardNavbar({ toggle }) {
    return (
        <>
            {/* <!-- Navbar Top --> */}
            <nav className="navbar bg-white sticky-top">
                <div className="container-fluid justify-content-start">
                    <a className="navbar-brand me-2 w-sidebar" href="#">
                        <img src="/images/logo.png" />
                    </a>

                    {/* <a href="#" data-bs-toggle="collapse" data-bs-target="#sidebar-collapse"
                        aria-controls="sidebar-collapse" aria-expanded="false" aria-label="Toggle navigation"> */}
                    <Button color="" onClick={toggle}>
                        <span className="navbar-toggler-icon"></span>
                    </Button>

                    <div className="ms-auto">
                        Search
                    </div>

                    <div className="ms-5">
                        Profil
                    </div>
                </div>
            </nav>
        </>
    )
}