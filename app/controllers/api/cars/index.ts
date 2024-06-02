import { Express, Request, Response, NextFunction } from 'express';
import { cloudinary } from '../../../middleware/cloudinary';
import { CarsModel } from "../../../models/cars";
import knex from 'knex';

interface Car {
    name: string;
    price: number;
    photo: string;
    category: number;
    start_rent: Date;
    finish_rent: Date;
    created_at: Date;
    updated_at: Date;
}

async function getCars(req: any, res: Response): Promise<Response> {
    let cars = await CarsModel.query();

    if(req.user.role === 'user'){
        cars = cars.filter((car: CarsModel) => car.active);
    };

    return res.status(200).json(cars);
}

async function getCarsById(req: any, res: Response): Promise<Response> {
    const { id } = req.params;
    const car = await CarsModel.query().findById(id);

    if (!car || (req.user.role === 'user' && !car.active )) {
        return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json(car);
}

async function addCar(req: any, res: Response): Promise<any> {
    const { name, price, category, start_rent, finish_rent } = req.body;

    if (req.file) {
        const fileBase64 = req.file?.buffer.toString("base64")
        const file = `data:${req.file?.mimetype};base64,${fileBase64}`

        await cloudinary.uploader.upload(file, async (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).send("Gagal upload gambar");
            }
            console.log(result);
            const cars = await CarsModel.query().insert({
                name: name,
                price: parseInt(price),
                category: category,
                start_rent: new Date(start_rent),
                finish_rent: new Date(finish_rent),
                photo: result?.url ?? '',
                created_at: new Date(),
                created_by: req.user.id,
            }).returning('*');

            return res.status(200).send(cars)
        });
    } else {
        return res.status(400).json({
            'message': 'Data tidak lengkap'
        });
    }
}

async function updateCar(req: any, res: Response): Promise<any> {
    const { id } = req.params;
    const car = await CarsModel.query().findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    const { name, price, category, start_rent, finish_rent } = req.body;

    if (req.file) {
        const fileBase64 = req.file?.buffer.toString("base64")
        const file = `data:${req.file?.mimetype};base64,${fileBase64}`

        await cloudinary.uploader.upload(file, async (error, result) => {
            if (error) {
                console.log(error)
                return res.status(500).send("Gagal upload gambar");
            }
            console.log(result);

            const updatedCar = await CarsModel.query().findById(id).patch({
                name: name ?? car.name,
                price: parseInt(price) ?? car.price,
                category: category ?? car.category,
                start_rent: new Date(start_rent) ?? car.start_rent,
                finish_rent: new Date(finish_rent) ?? car.finish_rent,
                photo: result?.url ?? '',
                updated_by: req.user.id,
                updated_at: new Date(),
            }).returning('*') ;
            return res.status(200).json({
                'message': 'Data telah diupdate',
                'data': updatedCar
            });
        });
    } else {
        const updatedCar = await CarsModel.query().findById(id).patch({
            name: name ?? car.name,
            price: parseInt(price) ?? car.price,
            category: category ?? car.category,
            start_rent: new Date(start_rent) ?? car.start_rent,
            finish_rent: new Date(finish_rent) ?? car.finish_rent,
            photo: car.photo,
            updated_at: new Date(),
            updated_by: req.user.id,
        }).returning('*');
        return res.status(200).json({
            'message': 'Data telah diupdate',
            'data': updatedCar
        });
    }
}

// delete
async function deleteCar(req: any, res: Response): Promise<Response> {
    const { id } = req.params;
    const car = await CarsModel.query().findById(id);
    if (!car) return res.status(404).json({ message: "Car not found" })
    await CarsModel.query().findById(id).patch({
        updated_at: new Date(),
        updated_by: req.user.id,
        active: false,
    });

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