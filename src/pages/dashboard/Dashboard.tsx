import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import PageTitle from "../../components/general/PageTitle"

export default function Dashboard() {
    const { setBreadcrumbs } = useOutletContext()

    useEffect(() => {
        setBreadcrumbs([
            { label: "Dashboard", path: "/admin", active: true },
            { label: "Dashboard", path: "/admin", active: false }
        ])
    }, [setBreadcrumbs])

    return (
        <>
            <PageTitle title="Dashboard" />

            {/* <!-- List Order --> */}
            <div className="dashboard-subheading mt-3 fs-6">
                List Order
            </div>
            <table className="table mt-3 w-100">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">No</th>
                        <th scope="col">User Email</th>
                        <th scope="col">Car</th>
                        <th scope="col">Start Rent</th>
                        <th scope="col">Finish Rent</th>
                        <th scope="col">Price</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">1</td>
                        <td>user@gmail.com</td>
                        <td>Toyota Avanza</td>
                        <td>2021-12-01</td>
                        <td>2021-12-03</td>
                        <td>500000</td>
                        <td>Success</td>
                    </tr>
                    <tr>
                        <td scope="row">1</td>
                        <td>user@gmail.com</td>
                        <td>Toyota Avanza</td>
                        <td>2021-12-01</td>
                        <td>2021-12-03</td>
                        <td>500000</td>
                        <td>Success</td>
                    </tr>
                    <tr>
                        <td scope="row">1</td>
                        <td>user@gmail.com</td>
                        <td>Toyota Avanza</td>
                        <td>2021-12-01</td>
                        <td>2021-12-03</td>
                        <td>500000</td>
                        <td>Success</td>
                    </tr>
                    <tr>
                        <td scope="row">1</td>
                        <td>user@gmail.com</td>
                        <td>Toyota Avanza</td>
                        <td>2021-12-01</td>
                        <td>2021-12-03</td>
                        <td>500000</td>
                        <td>Success</td>
                    </tr>
                    <tr>
                        <td scope="row">1</td>
                        <td>user@gmail.com</td>
                        <td>Toyota Avanza</td>
                        <td>2021-12-01</td>
                        <td>2021-12-03</td>
                        <td>500000</td>
                        <td>Success</td>
                    </tr>
                </tbody>
            </table>

            {/* <!-- List Car --> */}
            <div className="dashboard-subheading mt-5 fs-6">
                List Car
            </div>
            <table className="table mt-3 w-100">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Start Rent</th>
                        <th scope="col">Finish Rent</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">1</td>
                        <td>Toyota Avanza</td>
                        <td>Car</td>
                        <td>500000</td>
                        <td>2021-12-01</td>
                        <td>2021-12-03</td>
                        <td>2021-11-20</td>
                        <td>2021-11-20</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}