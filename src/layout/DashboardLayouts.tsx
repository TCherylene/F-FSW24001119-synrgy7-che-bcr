import { useState } from 'react';
import { Outlet } from "react-router-dom";
import DashboardNavbar from './components/DashboardNavbar';
import SidebarFixed from './components/SidebarFixed';
import SidebarCollapsable from './components/SidebarCollapsable';
import Breadcrumb from './components/Breadcrumb';

export default function DashboardLayouts() {
    const [isOpen, setIsOpen] = useState(true);
    const [alert, setAlert] = useState(null);
    const [alertColor, setAlertColor] = useState(null);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    
    const toggle = () => setIsOpen(!isOpen);
    const contextValue = {
        setAlert,
        setAlertColor,
        setBreadcrumbs,
    };

    return (
        <div className="d-flex position-relative bg-gray">
            {alert &&
                <div className={`alert alert-${alertColor} position-absolute start-50 translate-middle w-50 text-center fw-bold`} role="alert" style={{ top: "calc(var(--navbar-height) + 50px)" }}>
                    {alert}
                </div>
            }

            <SidebarFixed />
            <div className="container-fluid p-0">
                <DashboardNavbar toggle={toggle} />
                <div className="d-flex h-sidebar">
                    <SidebarCollapsable isOpen={isOpen} />
                    <main className='col pt-3 container-fluid'>
                        <Breadcrumb crumbs={breadcrumbs} />
                        <Outlet context={contextValue} />
                    </main>
                </div>
            </div>
        </div>
    )
}