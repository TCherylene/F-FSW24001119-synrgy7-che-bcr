import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from '../../components/general/PageTitle';
import Modal from '../../components/general/Modal';

export default function CarLists() {
    const URL = import.meta.env.VITE_API_URL;
    const formatter = new Intl.NumberFormat('id-ID');

    const [carResult, setCarResult] = useState(null)
    const { setAlert, setAlertColor, setBreadcrumbs } = useOutletContext()

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        setBreadcrumbs([
            { label: "Cars", path: "/admin/cars", active: false },
            { label: "List Car", path: "/admin/cars", active: true }
        ]);
        getData();
    }, [setBreadcrumbs]);


    const buttonElement = {
        "link": "/admin/cars/create",
        "icon": "fa-solid fa-plus",
        "title": "Add New Car",
    }

    const handleAlert = (color, message) => {
        setAlertColor(color);
        setAlert(message);
        setTimeout(() => setAlert(null), 5 * 1000);
    };

    const handleDelete = async () => {
        const id = selectedCar;

        try {
            const response = await fetch(`${URL}/cars/${id}`, {
                method: 'DELETE',
            });

            if (response.status != 200) {
                throw new Error(response.message);
            } else {
                handleAlert('black', 'Berhasil dihapus');
                toggleModal();
                getData();
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            handleAlert('danger', 'Gagal menghapus data');
            toggleModal();
        }
    }

    const handleDeleteModal = (id) => {
        setSelectedCar(id)
        toggleModal()
    }

    const formatDate = (date) => {
        const date_format = new Date(date);
        const formattedDate = date_format.toLocaleString();

        return formattedDate
    }

    const getData = async () => {
        try {
            const response = await fetch(`${URL}/cars?available=true`);
            const data = await response.json();
            if (data.data) {
                console.log(data.data);
                setCarResult(data.data);
            } else {
                setCarResult(null);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setCarResult(null);
        }
    }

    return (
        <>
            {/* <button onClick={handleAlert}>Testing</button> */}
            <PageTitle title="List Car" buttonElement={buttonElement} />
            <Modal modal={modal} toggle={toggleModal} handleDelete={handleDelete} setSelectedCar={setSelectedCar} />
            <div className="row row-gap-3">
                {carResult && carResult.map((car, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="card p-4 shadow-sm h-100">
                            <div className="card-image-top text-center">
                                <img src={car.image} alt="" className="card__image--car" />
                            </div>
                            <div className="card-body px-0 pb-0">
                                <h6 className="card-text">{car.manufacture} - {car.model}</h6>
                                <h5 className="card-title fw-bold">Rp {formatter.format(car.rent_per_day)} / hari</h5>
                                <ul className="m-0 p-0">
                                    <li className="mb-2 d-flex align-items-center gap-3">
                                        <img src="/images/icons/fi_key.svg" alt="" />
                                        {formatDate(car.available_at)}
                                    </li>
                                    <li className="mb-2 d-flex align-items-center gap-3">
                                        <img src="/images/icons/fi_clock_gray.svg" alt="" />
                                        Updated at {formatDate(car.updated_at)}
                                    </li>
                                </ul>
                                <div className="d-flex flex-row w-100 gap-2">
                                    <button type="button" className="col-6 btn btn-outline-danger" onClick={() => handleDeleteModal(car.id)}>
                                        <div className="py-1 fw-bold">
                                            <i className="fa fa-trash me-2"></i> Delete
                                        </div>
                                    </button>
                                    <Link to={`/admin/cars/update/${car.id}`} className="col-6 btn btn-secondary">
                                        <div className="py-1 fw-bold">
                                            <i className="fa-regular fa-pen-to-square me-2"></i> Edit
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </>
    )
}
