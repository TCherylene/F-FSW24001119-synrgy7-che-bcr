import { NavLink, useLocation } from "react-router-dom"

export default function SidebarFixed() {
    const location = useLocation();
    const currentPath = location.pathname;

    const sidebarLinks = [
        {
            icon: "fa fa-home",
            title: "Dashboard",
            link: "/admin",
            active: currentPath == "/admin"
        },
        {
            icon: "fa fa-truck",
            title: "Cars",
            link: "/admin/cars",
            active: currentPath.startsWith("/admin/cars")
        }
    ]

    return (
        <>
            <aside className="side bg-primary min-vh-100 d-none d-md-flex flex-column align-items-center">
                <div className="sticky-top">
                    <div className="navbar justify-content-center">
                        <a href="#" className="navbar-brand me-0">
                            <img src="/images/logo-square.png" alt="" />
                        </a>
                    </div>

                    {sidebarLinks.map(link => (
                        <NavLink key={link.title} to={link.link} end className={`sidebar__icon w-100 ${link.active ? 'active' : ''}`}>
                            <div className="px-2 py-3 text-center">
                                <i className={link.icon}></i>
                                <span className="d-none d-md-block fs-12">{link.title}</span>
                            </div>
                        </NavLink>
                    ))}

                </div>
            </aside>
        </>
    )
}