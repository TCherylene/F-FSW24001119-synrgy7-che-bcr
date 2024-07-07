import carRepository, { carType, carInput, carDelete } from "../repositories/carRepository";
import { Readable } from 'stream';
import { cloudinary } from "../middleware/cloudinary";

interface Condition {
    driver_type?: number,
    available_at?: Date,
    capacity?: number,
    available?: boolean,
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


export default new class CarService {
    async create(data: carInput): Promise<carInput> {
        return await carRepository.create(data);
    }

    async update(id: string, updateArgs: carType) {
        return carRepository.update(id, updateArgs);
    }

    async delete(id: string, updateArgs: carDelete) {
        return carRepository.delete(id, updateArgs);
    }

    async findAll(conditionArgs: Condition) {
        return carRepository.findAll(conditionArgs);
    }

    async findById(id: string) {
        return carRepository.findById(id);
    }

    async upload(file: MulterFile) {
        const fileBase64 = file?.buffer.toString("base64")
        const fileString = `data:${file?.mimetype};base64,${fileBase64}`
        const result = await cloudinary.uploader.upload(fileString)
        return result
    }
}