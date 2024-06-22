export default function SidebarFixed() {
    return (
        <>
            <aside className="side bg-primary min-vh-100 d-none d-md-flex flex-column align-items-center">
                <div className="sticky-top">
                    <div className="navbar justify-content-center">
                        <a href="#" className="navbar-brand me-0">
                            <img src="/images/logo-square.png" alt="" />
                        </a>
                    </div>

                    <a href="#" className="sidebar__icon w-100">
                        <div className="px-2 py-3 text-center">
                            <i className="fas fa-home"></i>
                            <span className="d-none d-md-block fs-12">Dashboard</span>
                        </div>
                    </a>
                    <a href="#" className="sidebar__icon w-100">
                        <div className="px-2 py-3 text-center">
                            <i className="fas fa-user"></i>
                            <span className="d-none d-md-block fs-12">Profile</span>
                        </div>
                    </a>
                </div>
            </aside>
        </>
    )
}