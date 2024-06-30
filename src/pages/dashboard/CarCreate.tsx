import { useOutletContext } from "react-router-dom"
import { useEffect } from "react";
import PageTitle from '../../components/general/PageTitle';


export default function CarCreate() {
    const { setBreadcrumbs } = useOutletContext() as { setBreadcrumbs: (breadcrumbs: any[]) => void }

    useEffect(() => {
        setBreadcrumbs([
            { label: "Cars", path: "/admin/cars", active: false },
            { label: "List Car", path: "/admin/cars", active: false },
            { label: "Create Car", path: "/admin/cars/create", active: true }
        ]);
    }, [setBreadcrumbs]);

    return (
        <>
            <PageTitle title="Add New Car" />
            <form className="">
                <div className="row bg-white p-4 m-0">
                    <div className="row mb-3">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Nama</label>
                        <div className="col-sm-6">
                            <input type="name" name="name" className="form-control" id="name" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="price" className="col-sm-2 col-form-label">Harga</label>
                        <div className="col-sm-6">
                            <input type="number" name="price" className="form-control" id="price" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="photo" className="col-sm-2 col-form-label">Foto</label>
                        <div className="col-sm-6">
                            <input type="file" name="photo" className="form-control" id="photo" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="start-rent" className="col-sm-2 col-form-label">Start Rent</label>
                        <div className="col-sm-6">
                            <input type="date" name="start-rent" className="form-control" id="start-rent" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="finish-rent" className="col-sm-2 col-form-label">Finish Rent</label>
                        <div className="col-sm-6">
                            <input type="date" name="finish-rent" className="form-control" id="finish-rent" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="finish-rent" className="col-sm-2 col-form-label">Created At</label>
                        <div className="col-sm-6">
                            -
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="finish-rent" className="col-sm-2 col-form-label">Updated At</label>
                        <div className="col-sm-6">
                            -
                        </div>
                    </div>
                </div>

                <div className="mt-4 d-flex flex-row gap-3">
                    <a href="admin/cars" className="btn btn-outline-primary">Cancel</a>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </>
    )
}