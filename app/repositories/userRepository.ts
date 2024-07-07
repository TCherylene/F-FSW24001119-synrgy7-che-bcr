import { MaybeCompositeId } from "objection";
import { Users, UserCondition, UsersModel, updateUserInput } from '../../types';

class UserRepository {
    async checkDuplicate(email: string) {
        const user = await UsersModel.query().findOne({ email });
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    async create(data: Users): Promise<Users> {
        return await UsersModel.query().insert(data);
    }

    async update(id: MaybeCompositeId, updateArgs: updateUserInput) {
        return UsersModel.query().findById(id).patch(updateArgs).throwIfNotFound().returning("*");
    }

    async delete(id: MaybeCompositeId, updateArgs: updateUserInput) {
        return UsersModel.query().findById(id).patch(updateArgs).throwIfNotFound().returning("*");
    }

    async findAll(conditionArgs: UserCondition) {
        const query = UsersModel.query().where(conditionArgs);
        const [total, data] = await Promise.all([
            query.resultSize(),
            query.select(
                'id', 'nama', 'email', 'avatar', 'role', 'created_by', 'updated_by', 'created_at', 'updated_at', 'active'
            )
        ]);

        return {
            data,
            total
        }
    }

    async findById(id: MaybeCompositeId) {
        return UsersModel.query().findById(id).throwIfNotFound();
    }

    async findByEmail(email: string) {
        return UsersModel.query().findOne({ email }).throwIfNotFound();
    }
}

export default new UserRepository();