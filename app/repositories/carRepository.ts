import { MaybeCompositeId } from "objection";
import { CarsModel, Cars, CreateCarInput, DeleteCarInput } from '../models/cars';

export type carType = Cars;
export type carInput = CreateCarInput;
export type carDelete = DeleteCarInput;

export default new class CarRepository {
    async create(data: carInput): Promise<carInput> {
        return await CarsModel.query().insert(data);
    }

    async update(id: MaybeCompositeId, updateArgs: carType){
        return CarsModel.query()
            .where({ id })
            .patch(updateArgs)
            .throwIfNotFound()
            .returning("*");
    }

    async delete(id: MaybeCompositeId, updateArgs: carDelete ){
        return CarsModel.query()
            .where({ id })
            .patch(updateArgs)
            .throwIfNotFound()
            .returning("*");
    }
    
    async findAll(conditionArgs: any){
        const query = CarsModel.query().where(conditionArgs);
        const [total, data] = await Promise.all([
            query.resultSize(),
            query.select('id', 'name', 'price', 'photo', 'category', 'start_rent', 'finish_rent', 'active')
        ]);

        return {
            data,
            total
        }
    }

    async findById(id: MaybeCompositeId){
        return CarsModel.query().findById(id).select('id', 'name', 'price', 'photo', 'category', 'start_rent', 'finish_rent', 'active') 
        .throwIfNotFound();
    }
}