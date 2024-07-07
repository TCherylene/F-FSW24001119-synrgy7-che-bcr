import { Request, Response } from 'express';
import carService from '../../../services/carService';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';
import { DeleteCarInput } from '../../../models/cars';

const roleUser = 'user';

interface CarParams {
    id: string;
}
interface CarQuery {
    driver: string,
    date: string,
    time: string,
    capacity: number
}

interface Condition {
    driver_type?: number,
    available_at?: Date,
    capacity?: number,
    available?: boolean,
}

interface User {
    role?: string;
    id?: number;
}

interface CarsByIdRequest extends Request<CarParams> {
    user?: User;
}

interface CarBody {
    id ?: string;
    image?: string;
    plate: string;
    manufacture: string;
    model: string;
    capacity: number;
    description: string;
    transmission: string;
    type: string;
    year: string;
    options: string[];
    driver_type: boolean;
    rent_per_day: number;
    available_at: Date;
    specs: string[];
    photo?: string;
    available?: boolean;
    updated_by?: number;
    created_by?: number;
    created_at?: Date;
    updated_at?: Date;
}

interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
    stream: Readable;
}

interface DataRequest extends Request<CarParams> {
    body: CarBody;
    file?: MulterFile;
    user?: User;
}

type AllCarRequest = Request<Record<string, never>, Record<string, never>, Record<string, never>, CarQuery>;


async function getCars(req: AllCarRequest, res: Response): Promise<Response> {
    const { driver, date, time, capacity } = req.query;
    console.log(req.query);

    let condition: Condition = {};
    const driverNumber = parseInt(driver, 10);
    if (driver && date && time) {
        if (driverNumber !== 0 && driverNumber !== 1) {
            return res.status(400).json({
                "error": true,
                "message": "Data driver tidak lengkap"
            })
        }

        const dateTime = new Date(date + "T" + time)
        if (isNaN(dateTime.getTime())) {
            return res.status(400).json({
                "error": true,
                "message": "Data date time tidak lengkap"
            })
        }
        dateTime.setHours(dateTime.getHours() + 7);
        console.log("datetime: ", dateTime.toISOString());
        condition = {
            driver_type: driverNumber,
            available_at: dateTime,
        };
    }

    if (capacity) {
        condition.capacity = capacity;
    }

    const cars = await carService.findAll(condition);
    return res.status(200).json(cars);
}

async function getCarsById(req: CarsByIdRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
        const car = await carService.findById(id);
        if (req.user?.role === roleUser && !car.available) {
            return res.status(404).json({ message: "Car not found" });
        }

        return res.status(200).json(car);
    } catch (e) {
        return res.status(404).json({ message: "Car not found" });
    }
}

async function addCar(req: DataRequest, res: Response): Promise<Response> {
    const { plate, manufacture, model, capacity, description, transmission, type, year, options, driver_type, rent_per_day, available_at, specs } = req.body;

    // Check required fields
    if (!plate || !manufacture || !model || !capacity || !transmission || !type || !year) {
        return res.status(400).json({ message: "Data tidak lengkap" });
    }

    try {
        // Upload file and get URL
        const fileUpload = await carService.upload(req.file);

        // Generate UUID for car ID
        const id = uuidv4();

        // Create car record in the database
        const cars = await carService.create({
            id,
            plate,
            manufacture,
            model,
            capacity,
            description,
            transmission,
            type,
            year,
            options: options, // Convert array to comma-separated string
            driver_type,
            rent_per_day,
            available_at,
            specs: specs, // Convert array to comma-separated string
            image: fileUpload.url,
            created_by: req.user?.id ?? 1,
            updated_by: req.user?.id ?? 1,
            available: true
        });

        // Return success response
        return res.status(201).json({
            message: "Data berhasil ditambahkan",
            data: cars
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Gagal menambahkan data" });
    }
}

async function updateCar(req: DataRequest, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
        const updateData: CarBody = {
            ...req.body,
            updated_by: req.user?.id ?? 1,
        };

        if (req.file) {
            const fileUpload = await carService.upload(req.file);
            updateData.photo = fileUpload.url;
        }

        const cars = await carService.update(id, updateData);

        return res.status(200).json({
            message: "Data berhasil diupdate",
            data: cars[0]
        });
    } catch (e) {
        console.error(e)
        return res.status(500).json({ message: "Gagal mengupdate data" })
    }
}

async function deleteCar(req: CarsByIdRequest, res: Response): Promise<Response> {
    const { id } = req.params;
    const updateData: DeleteCarInput = {
        available: false,
        updated_by: req.user ? req.user?.id : 0
    }

    await carService.delete(id, updateData);

    return res.status(200).json({
        'message': 'Data telah dihapus'
    });
}

export default {
    getCars,
    getCarsById,
    addCar,
    updateCar,
    deleteCar
}