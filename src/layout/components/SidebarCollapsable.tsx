import { Collapse } from 'reactstrap';
import { useLocation, NavLink } from 'react-router-dom';

interface sidebarItemsType {
    label: string,
    path: string,
    active: boolean
}

export default function SidebarCollapsable({ isOpen }) {
    const location = useLocation();
    const currentPath = location.pathname;

    let heading = '';
    let sidebarItems: sidebarItemsType[] = [];

    // Determine the heading and sidebar items based on the current route
    if (currentPath === '/admin') {
        heading = 'Dashboard';
        sidebarItems = [{
            label: 'Dashboard',
            path: '/admin',
            active: true,
        }];
    } else if (currentPath.startsWith('/admin/cars')) {
        heading = 'Cars';
        sidebarItems = [{
            label: 'List Car',
            path: '/admin/cars',
            active: true,
        }];
    }

    return (
        <>
            <Collapse horizontal isOpen={isOpen} className="col-auto bg-white h-100" id="sidebar-collapse">
                <div className="pt-3 w-sidebar sticky-top" style={{ top: "var(--navbar-height)" }}>
                    <a href="#" className="sidebar_heading w-100">
                        <div className="ps-3 py-2 text-uppercase">
                            {heading}
                        </div>
                    </a>
                    {sidebarItems.map((item, index) => (
                        <NavLink key={index} to={item.path} className="sidebar_item w-100">
                            <div className={`sidebar_item ps-3 py-2 ${item.active ? 'active' : ''}`}>
                                {item.label}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </Collapse >
        </>
    )
}