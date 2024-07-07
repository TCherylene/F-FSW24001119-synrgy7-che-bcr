import { MaybeCompositeId } from "objection";
import UserRepository from '../../app/repositories/userRepository';
import { UsersModel } from '../../types';

jest.mock('../../types');

const mockedUsersModel = UsersModel as jest.Mocked<typeof UsersModel>;

describe('UserRepository', () => {
    const idExample = 'abc';
    const emailExample = 'example@gmail.com'

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('checkDuplicate', () => {
        it('should return true if user exists', async () => {
            const findOneMock = jest.fn().mockResolvedValueOnce({ id: idExample });
            mockedUsersModel.query.mockReturnValue({ findOne: findOneMock } as any);

            const result = await UserRepository.checkDuplicate(emailExample);
            expect(result).toBe(true);
        });

        it('should return false if user does not exist', async () => {
            const findOneMock = jest.fn().mockResolvedValueOnce(null);
            mockedUsersModel.query.mockReturnValue({ findOne: findOneMock } as any);

            const result = await UserRepository.checkDuplicate(emailExample);
            expect(result).toBe(false);
        });
    });

    describe('create', () => {
        it('should create a new user', async () => {
            const userData = { id: idExample, nama: 'user', email: emailExample, password: 'password', role: 'user', avatar: 'avatar', created_by: "1", updated_by: "1", updated_at: '2021-01-01', created_at: '2021-01-01', active: true };
            const insertMock = jest.fn().mockResolvedValueOnce(userData);
            mockedUsersModel.query.mockReturnValue({ insert: insertMock } as any);

            const result = await UserRepository.create(userData);
            expect(result).toEqual(userData);
        });
    });

    /*
    describe('update', () => {
        it('should update a user', async () => {
            const updateArgs = { nama: 'user', email: 'newemail@example.com', password: 'password', role: 'user', avatar: 'avatar', created_by: "1", updated_by: "1", updated_at: '2021-01-01', created_at: '2021-01-01', active: true };
            const updatedUser = { id: idExample, ...updateArgs };
            const mockReturnThis = { patch: jest.fn().mockReturnThis(), throwIfNotFound: jest.fn().mockResolvedValueOnce(updatedUser), returning: jest.fn().mockResolvedValueOnce([updatedUser]) };
            mockedUsersModel.query.mockReturnValue(mockReturnThis as any);

            const result = await UserRepository.update(idExample, updateArgs);
            expect(result).toEqual([updatedUser]);
        });
    });
    */

    /*
    describe('delete', () => {
        it('should delete a user', async () => {
            const deleteArgs = { active: false };
            const userToDelete = { id: idExample, email: emailExample };
            const mockReturnThis = { findById: jest.fn().mockReturnThis(), throwIfNotFound: jest.fn().mockResolvedValueOnce(userToDelete), deleteById: jest.fn().mockResolvedValueOnce(1) };
            mockedUsersModel.query.mockReturnValue(mockReturnThis as any);

            const result = await UserRepository.delete(idExample, deleteArgs);
            expect(result).toEqual(userToDelete);
        });
    });
    */

    describe('findAll', () => {
        it('should return all users matching the condition', async () => {
            const conditionArgs = { email: emailExample };
            const users = [{ id: idExample, email: emailExample }];
            const mockReturnThis = { where: jest.fn().mockReturnThis(), resultSize: jest.fn().mockResolvedValueOnce(users.length), select: jest.fn().mockResolvedValueOnce(users) };
            mockedUsersModel.query.mockReturnValue(mockReturnThis as any);

            const result = await UserRepository.findAll(conditionArgs);
            expect(result).toEqual({
                data: users,
                total: users.length
            });
        });
    });

    describe('findById', () => {
        it('should return user by id', async () => {
            const user = { id: idExample, email: emailExample };
            const mockReturnThis = { findById: jest.fn().mockReturnThis(), throwIfNotFound: jest.fn().mockResolvedValueOnce(user) };
            mockedUsersModel.query.mockReturnValue(mockReturnThis as any);

            const result = await UserRepository.findById(idExample);
            expect(result).toEqual(user);
        });
    });

    describe('findByEmail', () => {
        it('should return user by email', async () => {
            const user = { id: idExample, email: emailExample };
            const mockReturnThis = { findOne: jest.fn().mockReturnThis(), throwIfNotFound: jest.fn().mockResolvedValueOnce(user) };
            mockedUsersModel.query.mockReturnValue(mockReturnThis as any);

            const result = await UserRepository.findByEmail(emailExample);
            expect(result).toEqual(user);
        });
    });
});
