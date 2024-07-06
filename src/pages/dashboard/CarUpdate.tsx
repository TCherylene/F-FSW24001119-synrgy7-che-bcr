import { useOutletContext, useParams, useNavigate  } from "react-router-dom"
import { useEffect, useState } from "react";
import PageTitle from '../../components/general/PageTitle';
import FormLabel from "../../components/general/FormLabel";

export default function CarUpdate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const URL = import.meta.env.VITE_API_URL;
    const { setBreadcrumbs, setAlert, setAlertColor } = useOutletContext() as { setBreadcrumbs: (breadcrumbs: any[]) => void }
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

    useEffect(() => {
        console.log(id);
        fetch(`${URL}/cars/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => res.json())
            .then(data => {
                setDriverType(data.driver_type);
                setManufacture(data.manufacture);
                setPlate(data.plate);
                setModel(data.model);
                setCapacity(data.capacity);
                setDescription(data.description);
                setTransmission(data.transmission);
                setType(data.type);
                setYear(data.year);
                setOptions(data.options);
                setSpecs(data.specs);
                setRentPerDay(data.rent_per_day);
                setAvailableAt(data.available_at);
                setAvailable(data.available);
                setImagePreview(data.image);
            });
    }, []); 


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
            setter && setter(checked);
        } else if (name === "options[]" || name === "specs[]") {
            const arrValue = value.split(',').map(item => item.trim());
            console.log(arrValue)
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

    const value = {
        driver_type: driverType,
        manufacture: manufacture,
        plate: plate,
        model: model,
        capacity: capacity,
        description: description,
        transmission: transmission,
        type: type,
        year: year,
        options: options,
        specs: specs,
        rent_per_day: rentPerDay,
        available_at: availableAt,
        available: available,
        image: ""
    }
    

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
        if(image){
            formData.append("photo", image as Blob);
        }
        
        fetch(`${URL}/cars/${id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        }).then(res => {
            if(res.status == 200){
                setAlertColor("success");
                setAlert("Car updated successfully");
                navigate("/admin/cars", { replace: true })
                
            } else {
                setAlertColor("black");
                setAlert("Failed to add car");
            }
        }).catch(err => {
            setAlert("Failed to add car");
            setAlertColor("black");
        });
    };
    


    return (
        <>
            <PageTitle title="Add New Car" />
            <form action="" className="" encType="multipart/form-data">
                <div className="row bg-white p-4 m-0">
                    {formLabel.map((label, index) => (
                        <FormLabel key={index} type={label.type} name={label.name} value={value} onChange={handleChange} />
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