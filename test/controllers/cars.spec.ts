import { Response } from 'express';
import controllers from '../../app/controllers';
import carService from '../../app/services/carService';
import { v4 as uuidv4 } from 'uuid';
import {
    AllCarRequest,
    CarByIdRequest,
    CarCondition,
    DataRequest, DeleteCarInput, updateCarInput
} from '../../types'

const carController = controllers.api.cars;

jest.mock('../../app/services/carService');
jest.mock('../../types');
jest.mock('uuid', () => {
    const originalUuid = jest.requireActual('uuid');
    return {
        ...originalUuid,
        v4: jest.fn(() => 'mockedId') // Mock the v4 function to return 'mockedId'
    };
});


describe('Car Controller', () => {
    let req: any; // Using `any` for req to allow flexible mocking
    let res: Partial<Response>;

    beforeEach(() => {
        req = {
            body: {},
            params: {},
            file: {}, // Mock req.file as needed for upload scenarios
            user: { id: 'userId', role: 'user' }, // Mock req.user as needed
            query: {},
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('getCars', () => {
        it('should get cars based on query parameters', async () => {
            req.query = {
                driver: '1',
                date: '2024-07-10',
                time: '10:00:00',
                capacity: '5',
            };

            // Mock carService.findAll
            (carService.findAll as jest.Mock).mockResolvedValue({
                data: [{ id: '1', plate: 'ABC123' }],
                total: 1,
                error: false,
            });

            await carController.getCars(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                data: [{ id: '1', plate: 'ABC123' }],
                total: 1,
                error: false,
            });
        });

        // Add more test cases to cover different scenarios
    });

    describe('getCarsById', () => {
        it('should get a car by ID', async () => {
            req.params.id = '1';

            // Mock carService.findById
            (carService.findById as jest.Mock).mockResolvedValue({ id: '1', plate: 'ABC123' });

            await carController.getCarsById(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ id: '1', plate: 'ABC123' });
        });

        // Add more test cases to cover different scenarios
    });

    describe('addCar', () => {
        it('should add a new car', async () => {
            req.body = {
                plate: 'ABC123',
                manufacture: 'Toyota',
                model: 'Camry',
                capacity: 5,
                transmission: 'Automatic',
                type: 'Sedan',
                year: '2022',
                options: ['GPS', 'Leather Seats'],
                driver_type: 1,
                rent_per_day: 50,
                available_at: '2024-07-10T10:00:00',
                specs: ['Engine 2.5L', '4-Cylinder'],
                description: 'Description of the car',
            };

            // Mock carService.upload
            (carService.upload as jest.Mock).mockResolvedValue({ url: 'mockedImageUrl' });
            await carController.addCar(req, res as Response);

            expect(uuidv4()).toBe('mockedId'); // Verify the mocked UUIDv4 is called

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Data berhasil ditambahkan',
                data: expect.objectContaining({
                    id: 'mockedId',
                    plate: 'ABC123',
                    manufacture: 'Toyota',
                    model: 'Camry',
                    capacity: 5,
                    transmission: 'Automatic',
                    type: 'Sedan',
                    year: '2022',
                    options: 'GPS,Leather Seats',
                    driver_type: 1,
                    rent_per_day: 50,
                    available_at: expect.any(String), // Adjust as per your date format expectation
                    specs: 'Engine 2.5L,4-Cylinder',
                    image: 'mockedImageUrl',
                    created_by: 'userId',
                    updated_by: 'userId',
                    available: true,
                    created_at: expect.any(String), // Adjust as per your date format expectation
                    updated_at: expect.any(String), // Adjust as per your date format expectation
                }),
            });

            // Add more test cases to cover different scenarios
        });
    });

    describe('updateCar', () => {
        it('should update a car', async () => {
            req.params.id = '1';
            req.body = {
                plate: 'DEF456',
                manufacture: 'Honda',
                model: 'Accord',
                capacity: 4,
                transmission: 'Manual',
                type: 'Sedan',
                year: '2023',
                options: ['Sunroof', 'Leather Seats'],
                driver_type: 0,
                rent_per_day: 60,
                available_at: '2024-07-11T09:00:00',
                specs: ['Engine 3.0L', 'V6'],
                description: 'Updated description',
            };

            // Mock carService.upload
            (carService.upload as jest.Mock).mockResolvedValue({ url: 'updatedMockedImageUrl' });

            // Mock carService.update
            (carService.update as jest.Mock).mockResolvedValue([
                {
                    id: '1',
                    plate: 'DEF456',
                    manufacture: 'Honda',
                    model: 'Accord',
                    capacity: 4,
                    transmission: 'Manual',
                    type: 'Sedan',
                    year: '2023',
                    options: 'Sunroof,Leather Seats',
                    driver_type: 0,
                    rent_per_day: 60,
                    available_at: new Date('2024-07-11T09:00:00'),
                    specs: 'Engine 3.0L,V6',
                    image: 'updatedMockedImageUrl',
                    created_by: 'userId',
                    updated_by: 'userId',
                    available: true,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ]);

            await carController.updateCar(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Data berhasil diupdate',
                data: {
                    id: '1',
                    plate: 'DEF456',
                    manufacture: 'Honda',
                    model: 'Accord',
                    capacity: 4,
                    transmission: 'Manual',
                    type: 'Sedan',
                    year: '2023',
                    options: 'Sunroof,Leather Seats',
                    driver_type: 0,
                    rent_per_day: 60,
                    available_at: expect.any(String), // Can check the date format if needed
                    specs: 'Engine 3.0L,V6',
                    image: 'updatedMockedImageUrl',
                    created_by: 'userId',
                    updated_by: 'userId',
                    available: true,
                    created_at: expect.any(String), // Can check the date format if needed
                    updated_at: expect.any(String), // Can check the date format if needed
                },
            });
        });

        // Add more test cases to cover different scenarios
    });

    describe('deleteCar', () => {
        it('should delete a car', async () => {
            req.params.id = '1';

            // Mock carService.delete
            (carService.delete as jest.Mock).mockResolvedValue(undefined);

            await carController.deleteCar(req, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Data telah dihapus',
            });
        });

        // Add more test cases to cover different scenarios
    });
});