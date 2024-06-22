export default function SidebarCollapsable() {
    return (
        <>
            <aside className="col-auto collapse collapse-horizontal bg-white h-100" id="sidebar-collapse">
                <div className="pt-3 w-sidebar sticky-top" style={{ top: "var(--navbar-height)" }}>
                    <a href="#" className="sidebar_heading w-100">
                        <div className="ps-3 py-2">
                            DASHBOARD
                        </div>
                    </a>
                    <a href="#" className="sidebar_item w-100">
                        <div className="sidebar_item ps-3 py-2">
                            Dashboard
                        </div>
                    </a>
                </div>
            </aside >
        </>

    )
}