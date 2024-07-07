import userRepository from "../repositories/userRepository";
import {
    Users,
    UserCondition,
    updateUserInput
} from '../../types';

export default new class UserService {
    async checkDuplicate(email: string): Promise<boolean> {
        return await userRepository.checkDuplicate(email);
    }

    async create(data: Users): Promise<Users> {
        return await userRepository.create(data);
    }

    async update(id: string | number, updateArgs: updateUserInput): Promise<Users> {
        const updatedUsers = await userRepository.update(id, updateArgs);
        return updatedUsers[0];
    }

    async delete(id: string | number, updateArgs: updateUserInput) {
        return userRepository.delete(id, updateArgs);
    }

    async findAll(conditionArgs: UserCondition): Promise<{ data: Users[], total: number }> {
        return userRepository.findAll(conditionArgs);
    }

    async findByEmail(email: string): Promise<Users> {
        return userRepository.findByEmail(email);
    }

    async findById(id: string | number): Promise<Users> {
        return userRepository.findById(id);
    }
}
