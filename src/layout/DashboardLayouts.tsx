import { Outlet } from "react-router-dom";
import DashboardNavbar from './components/DashboardNavbar';
import SidebarFixed from './components/SidebarFixed';
import SidebarCollapsable from './components/SidebarCollapsable';

export default function HomeLayouts() {
    return (
        <div className="d-flex position-relative bg-gray">
            <SidebarFixed />
            <div className="container-fluid p-0">
                <DashboardNavbar />
                <div className="d-flex h-sidebar">
                    <SidebarCollapsable />
                    <Outlet />
                </div>
            </div>
        </div>
    )
}