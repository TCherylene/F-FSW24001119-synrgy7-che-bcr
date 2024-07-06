import { useOutletContext, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import PageTitle from '../../components/general/PageTitle';
import FormCreate from "../../components/general/FormCreate";

export default function CarCreate() {
    const URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const { setBreadcrumbs, setAlert, setAlertColor } = useOutletContext();
    // state for every formlabel
    const [driverType, setDriverType] = useState<string>("");
    const [manufacture, setManufacture] = useState<string>("");
    const [plate, setPlate] = useState<string>("");
    const [model, setModel] = useState<string>("");
    const [capacity, setCapacity] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [transmission, setTransmission] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [year, setYear] = useState<number>(0);
    const [options, setOptions] = useState<string[]>([]);
    const [specs, setSpecs] = useState<string[]>([]);
    const [rentPerDay, setRentPerDay] = useState<number>(0);
    const [availableAt, setAvailableAt] = useState<string>("");
    const [available, setAvailable] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        setBreadcrumbs([
            { label: "Cars", path: "/admin/cars", active: false },
            { label: "List Car", path: "/admin/cars", active: false },
            { label: "Create Car", path: "/admin/cars/create", active: true }
        ]);
    }, [setBreadcrumbs]);

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0]);
            const file = e.target.files[0];
            setImage(file);

            // Create a preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Mapping input names to state setters
    const setters = {
        driver_type: setDriverType,
        manufacture: setManufacture,
        plate: setPlate,
        model: setModel,
        capacity: setCapacity,
        description: setDescription,
        transmission: setTransmission,
        type: setType,
        year: setYear,
        options: setOptions,
        specs: setSpecs,
        rent_per_day: setRentPerDay,
        available_at: setAvailableAt,
        available: setAvailable,
        image: onImageChange,
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const setter = setters[name as keyof typeof setters];
        if (type === "switch") {
            setter && setter(checked ? "1" : "0");
        } else if (name === "options[]" || name === "specs[]") {
            const arrValue = value.split(',').map(item => item.trim());
            setter && setter(arrValue);
        } else if (type === 'datetime-local') {
            const date = new Date(value);
            setter && setter(date.toISOString());
        } else if (type === 'file') {
            setter && setter(e);
        } else {
            setter && setter(value);
        }
    };

    const formLabel = [
        { type: "text", name: "manufacture" },
        { type: "text", name: "plate" },
        { type: "text", name: "model" },
        { type: "number", name: "capacity" },
        { type: "text", name: "description" },
        { type: "text", name: "transmission" },
        { type: "text", name: "type" },
        { type: "number", name: "year" },
        { type: "text", name: "options[]" },
        { type: "text", name: "specs[]" },
        { type: "number", name: "rent_per_day" },
        { type: "datetime-local", name: "available_at" },
        { type: "number", name: "driver_type" },
        { type: "switch", name: "available" },
        { type: "file", name: "image" }
    ]

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const optionsData = options.join(','); // Convert array to comma-separated string
        const specsData = specs.join(','); // Convert array to comma-separated string

        const formData = new FormData();
        formData.append("driver_type", driverType);
        formData.append("manufacture", manufacture);
        formData.append("plate", plate);
        formData.append("model", model);
        formData.append("capacity", capacity.toString());
        formData.append("description", description);
        formData.append("transmission", transmission);
        formData.append("type", type);
        formData.append("year", year.toString());
        formData.append("options[]", optionsData); // Convert array to comma-separated string
        formData.append("specs[]", specsData); // Convert array to comma-separated string
        formData.append("rent_per_day", rentPerDay.toString());
        formData.append("available_at", availableAt);
        formData.append("available", available.toString());
        formData.append("photo", image as Blob);

        fetch(`${URL}/cars`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        }).then(res => {
            if(res.status == 201){
                navigate("/admin/cars", { replace: true })

                setAlert("Berhasil menambahkan data");
                setAlertColor("success");
            } else {
                setAlert("Gagal menambahkan data");
                setAlertColor("black");
            }

        }).catch(err => {
            setAlert("Gagal menambahkan data");
            setAlertColor("black");
        });
    };



    return (
        <>
            <PageTitle title="Add New Car" />
            <form action="" className="" encType="multipart/form-data">
                <div className="row bg-white p-4 m-0">
                    {formLabel.map((label, index) => (
                        <FormCreate key={index} type={label.type} name={label.name} onChange={handleChange} />
                    ))}

                    {
                        image && (
                            <div className="row">
                                <img src={imagePreview} alt="" className="offset-3" style={{ maxWidth: '300px' }} />
                            </div>
                        )
                    }
                </div>


                <div className="mt-4 d-flex flex-row gap-3">
                    <a href="admin/cars" className="btn btn-outline-primary">Cancel</a>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </>
    )
}