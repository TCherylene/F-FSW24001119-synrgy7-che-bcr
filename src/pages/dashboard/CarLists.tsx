import { useOutletContext } from "react-router-dom"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageTitle from '../../components/general/PageTitle';

export default function CarLists() {
    const { setAlert, setAlertColor, setBreadcrumbs } = useOutletContext()

    useEffect(() => {
        setBreadcrumbs([
            { label: "Cars", path: "/admin/cars", active: false },
            { label: "List Car", path: "/admin/cars", active: true }
        ]);
    }, [setBreadcrumbs]);

    const handleAlert = () => {
        setAlertColor('success');
        setAlert('This is an alert from SomeChildComponent!');
        setTimeout(() => setAlert(null), 5 * 1000);
    };

    const buttonElement = {
        "link": "/admin/cars/create",
        "icon": "fa-solid fa-plus",
        "title": "Add New Car",
    }

    return (
        <>
            {/* <button onClick={handleAlert}>Testing</button> */}
            <PageTitle title="List Car" buttonElement={buttonElement} />

            <div className="row">
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="card p-4 shadow-sm h-100">
                        <div className="card-image-top text-center">
                            <img src="/images/car01.min.jpg" alt="" className="card__image--car" />
                        </div>
                        <div className="card-body px-0 pb-0">
                            <h6 className="card-text">Nama/Tipe Mobil</h6>
                            <h5 className="card-title fw-bold">Rp 430.000 / hari</h5>
                            <ul className="m-0 p-0">
                                <li className="mb-2 d-flex align-items-center gap-3">
                                    <img src="/images/icons/fi_key.svg" alt="" />
                                    Start rent - Finish rent
                                </li>
                                <li className="mb-2 d-flex align-items-center gap-3">
                                    <img src="/images/icons/fi_clock_gray.svg" alt="" />
                                    Updated at 4 Apr 2022, 09.00
                                </li>
                            </ul>
                            <div className="d-flex flex-row w-100 gap-2">
                                <button type="button" className="col-6 btn btn-outline-danger" data-bs-toggle="modal"
                                    data-bs-target="#modalDelete">
                                    <div className="py-1 fw-bold">
                                        <i className="fa fa-trash me-2"></i> Delete
                                    </div>
                                </button>
                                <a href="#" className="col-6 btn btn-secondary">
                                    <div className="py-1 fw-bold">
                                        <i className="fa-regular fa-pen-to-square me-2"></i> Edit
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
