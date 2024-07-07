import { MaybeCompositeId, QueryBuilder } from "objection";
import CarRepository from '../../app/repositories/carRepository';
import { CarsModel } from '../../types';

jest.mock('../../types');

const mockedCarsModel = CarsModel as jest.Mocked<typeof CarsModel>;
const carDataNew = {
    id: "abc",
    available: true,
    driver_type: true,
    plate: "plate",
    manufacture: "manufacture",
    model: "model",
    image: "image",
    rent_per_day: 100,
    capacity: 4,
    transmission: "transmission",
    type: "type",
    year: "year",
    options: ["options"],
    specs: ["specs"],
    description: "description",
    available_at: new Date(),
    created_by: "1",
    updated_by: "1",
    created_at: new Date(),
    updated_at: new Date(),
};

describe('CarRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('should create a new car', async () => {
            const carData = carDataNew;
            const insertMock = jest.fn().mockResolvedValueOnce(carData);
            mockedCarsModel.query = jest.fn().mockReturnValue({ insert: insertMock } as unknown as QueryBuilder<any, any>);

            const result = await CarRepository.create(carData);
            expect(result).toEqual(carData);
        });
    });

    describe('update', () => {
        it('should update a car', async () => {
            const { id, available, ...allData } = carDataNew;

            const updateArgs = { ...allData, available: false };

            const updatedCar = { id: id, ...updateArgs };
            const mockReturnThis = { where: jest.fn().mockReturnThis(), patch: jest.fn().mockReturnThis(), throwIfNotFound: jest.fn().mockReturnThis(), returning: jest.fn().mockResolvedValueOnce([updatedCar]) };
            mockedCarsModel.query = jest.fn().mockReturnValue(mockReturnThis as unknown as QueryBuilder<any, any>);

            const result = await CarRepository.update(1, updateArgs);
            expect(result).toEqual([updatedCar]);
        });
    });

    describe('delete', () => {
        it('should delete a car', async () => {
            const deleteArgument = {
                available: false,
                updated_by: "1",
                updated_at: new Date()
            }
            const deletedCar = { id: "abc" };
            const mockReturnThis = { where: jest.fn().mockReturnThis(), patch: jest.fn().mockReturnThis(), throwIfNotFound: jest.fn().mockReturnThis(), returning: jest.fn().mockResolvedValueOnce([deletedCar]) };
            mockedCarsModel.query = jest.fn().mockReturnValue(mockReturnThis as unknown as QueryBuilder<any, any>);

            const result = await CarRepository.delete(1, deleteArgument);
            expect(result).toEqual([deletedCar]);
        });
    });

    describe('findAll', () => {
        it('should return all cars matching driver_type', async () => {
            const conditionArgs = { driver_type: 1 };
            const cars = [{ id: "abc", model: 'model' }];
            const mockReturnThis = { where: jest.fn().mockReturnThis(), resultSize: jest.fn().mockResolvedValueOnce(cars.length), select: jest.fn().mockResolvedValueOnce(cars) };
            mockedCarsModel.query = jest.fn().mockReturnValue(mockReturnThis as unknown as QueryBuilder<any, any>);

            const result = await CarRepository.findAll(conditionArgs);
            expect(result).toEqual({
                data: cars,
                total: cars.length,
                error: false
            });
        });

        it('should return all cars matching available_at', async () => {
            const now = new Date();
            const conditionArgs = { available_at: new Date(now.getTime() - 60 * 60 * 1000) };
            const cars = [{ id: "abc", model: 'model' }];
            const mockReturnThis = { where: jest.fn().mockReturnThis(), resultSize: jest.fn().mockResolvedValueOnce(cars.length), select: jest.fn().mockResolvedValueOnce(cars) };
            mockedCarsModel.query = jest.fn().mockReturnValue(mockReturnThis as unknown as QueryBuilder<any, any>);

            const result = await CarRepository.findAll(conditionArgs);
            expect(result).toEqual({
                data: cars,
                total: cars.length,
                error: false
            });
        })
        it('should return all cars matching available', async () => {
            const conditionArgs = { available: true };
            const cars = [{ id: "abc", model: 'model' }];
            const mockReturnThis = { where: jest.fn().mockReturnThis(), resultSize: jest.fn().mockResolvedValueOnce(cars.length), select: jest.fn().mockResolvedValueOnce(cars) };
            mockedCarsModel.query = jest.fn().mockReturnValue(mockReturnThis as unknown as QueryBuilder<any, any>);

            const result = await CarRepository.findAll(conditionArgs);
            expect(result).toEqual({
                data: cars,
                total: cars.length,
                error: false
            });
        })
        it('should return all cars matching capacity', async () => {
            const conditionArgs = { capacity: 2 };
            const cars = [{ id: "abc", model: 'model' }];
            const mockReturnThis = { where: jest.fn().mockReturnThis(), resultSize: jest.fn().mockResolvedValueOnce(cars.length), select: jest.fn().mockResolvedValueOnce(cars) };
            mockedCarsModel.query = jest.fn().mockReturnValue(mockReturnThis as unknown as QueryBuilder<any, any>);

            const result = await CarRepository.findAll(conditionArgs);
            expect(result).toEqual({
                data: cars,
                total: cars.length,
                error: false
            });
        })
    });

    describe('findById', () => {
        it('should return car by id', async () => {
            const car = { id: "abc", model: 'model' };
            const mockReturnThis = { findById: jest.fn().mockReturnThis(), select: jest.fn().mockReturnThis(), throwIfNotFound: jest.fn().mockResolvedValueOnce(car) };
            mockedCarsModel.query = jest.fn().mockReturnValue(mockReturnThis as unknown as QueryBuilder<any, any>);

            const result = await CarRepository.findById(1);
            expect(result).toEqual(car);
        });
    });
});
