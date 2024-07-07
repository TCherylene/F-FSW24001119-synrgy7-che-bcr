import { Request, Response } from 'express';
import controllers from '../../app/controllers';
import userService from '../../app/services/userService';
import { encryptPassword, checkPassword, createToken } from '../../app/utils/encrypt';

const authController = controllers.api.auth;

jest.mock('../../app/services/userService');
jest.mock('../../app/utils/encrypt');

describe('Auth Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('login', () => {
        it('should log in successfully with correct credentials', async () => {
            const user = {
                id: '1',
                email: 'test@example.com',
                password: 'hashedPassword',
                nama: 'Test User',
                role: 'user',
                created_at: new Date(),
                updated_at: new Date(),
            };

            req.body = {
                email: 'test@example.com',
                password: 'password123',
            };

            // Mock userService.findByEmail
            (userService.findByEmail as jest.Mock).mockResolvedValue(user);

            // Mock checkPassword
            (checkPassword as jest.Mock).mockResolvedValue(true);

            // Mock createToken
            (createToken as jest.Mock).mockResolvedValue('mockedToken');

            await authController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Berhasil Login',
                data: {
                    id: '1',
                    email: 'test@example.com',
                    nama: 'Test User',
                    token: 'mockedToken',
                    createdAt: user.created_at,
                    updatedAt: user.updated_at,
                },
            });
        });

        it('should return error when password is incorrect', async () => {
            req.body = {
                email: 'test@example.com',
                password: 'wrongPassword',
            };

            // Mock userService.findByEmail
            (userService.findByEmail as jest.Mock).mockResolvedValue({
                password: 'hashedPassword', // mock user with hashed password
            });

            // Mock checkPassword
            (checkPassword as jest.Mock).mockResolvedValue(false);

            await authController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Email atau password salah',
            });
        });

        it('should return error when user is not found', async () => {
            req.body = {
                email: 'nonexistent@example.com',
                password: 'password123',
            };

            // Mock userService.findByEmail
            (userService.findByEmail as jest.Mock).mockResolvedValue(null);

            await authController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Email atau password salah',
            });
        });

        it('should handle internal server error', async () => {
            req.body = {
                email: 'test@example.com',
                password: 'password123',
            };

            // Mock userService.findByEmail to throw an error
            (userService.findByEmail as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

            await authController.login(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Email atau password salah',
            });
        });
    });

    describe('register', () => {
        it('should register a new user', async () => {
            req.body = {
                email: 'newuser@example.com',
                password: 'password123',
                nama: 'New User',
                avatar: 'avatar-url',
            };

            const user = {
                id: '2',
                email: 'newuser@example.com',
                nama: 'New User',
                created_at: new Date(),
                updated_at: new Date(),
            };

            // Mock userService.checkDuplicate
            (userService.checkDuplicate as jest.Mock).mockResolvedValue(false);

            // Mock encryptPassword
            (encryptPassword as jest.Mock).mockResolvedValue('hashedPassword');

            // Mock userService.create
            (userService.create as jest.Mock).mockResolvedValue(user);

            await authController.register(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Berhasil Register',
                data: {
                    id: '2',
                    email: 'newuser@example.com',
                    nama: 'New User',
                    createdAt: user.created_at,
                    updatedAt: user.updated_at,
                },
            });
        });

        it('should return error when email already exists', async () => {
            req.body = {
                email: 'existing@example.com',
                password: 'password123',
                nama: 'Existing User',
                avatar: 'avatar-url',
            };

            // Mock userService.checkDuplicate
            (userService.checkDuplicate as jest.Mock).mockResolvedValue(true);

            await authController.register(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Email sudah terdaftar!',
            });
        });

        it('should handle internal server error during registration', async () => {
            req.body = {
                email: 'newuser@example.com',
                password: 'password123',
                nama: 'New User',
                avatar: 'avatar-url',
            };

            // Mock userService.checkDuplicate to throw an error
            (userService.checkDuplicate as jest.Mock).mockRejectedValue(new Error('Internal Server Error'));

            await authController.register(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Internal Server Error',
            });
        });
    });
});
