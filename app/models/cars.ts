import { Model, ModelObject} from "objection";

export class CarsModel extends Model {
    id !: number;
    name !: string;
    price !: number;
    photo !: string;
    category !: string;
    start_rent !: Date;
    finish_rent !: Date;
    created_at !: Date;
    updated_at !: Date;
    created_by !: number;
    updated_by !: number;
    active !: boolean;
    static tableName = 'cars';
}

export type Cars = ModelObject<CarsModel>;