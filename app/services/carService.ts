import { MaybeCompositeId } from "objection";

import carRepository from "../repositories/carRepository";
import { cloudinary } from "../middleware/cloudinary";
import {
    CarCondition,
    CreateCarInput,
    updateCarInput,
    MulterFile,
    DeleteCarInput,
}
    from '../../types';

class CarService {
    async create(data: CreateCarInput): Promise<CreateCarInput> {
        return await carRepository.create(data);
    }

    async update(id: MaybeCompositeId, updateArgs: updateCarInput) {
        return carRepository.update(id, updateArgs);
    }

    async delete(id: MaybeCompositeId, updateArgs: DeleteCarInput) {
        return carRepository.delete(id, updateArgs);
    }

    async findAll(conditionArgs: CarCondition) {
        return carRepository.findAll(conditionArgs);
    }

    async findById(id: MaybeCompositeId) {
        return carRepository.findById(id);
    }

    async upload(file: MulterFile) {
        const fileBase64 = file?.buffer.toString("base64")
        const fileString = `data:${file?.mimetype};base64,${fileBase64}`
        const result = await cloudinary.uploader.upload(fileString)
        return result
    }
}

export default new CarService();