import { Model, ModelObject } from "objection";

export class UsersModel extends Model {
    id!: string;
    nama!: string;
    email!: string;
    password!: string;
    avatar!: string;
    role!: string;
    created_by!: string;
    updated_by!: string;
    created_at!: string;
    updated_at!: string;
    active !: boolean;

    static get tableName(){
        return "users"
    }
}

export type Users = ModelObject<UsersModel>;