/* Ekspektasi untuk authorization
* 1. Authorization headers missing (401)
* 2. Token is invalid (401)
* 3. User not found (404)
* 4. User not authorized (404)
* 5. Got authorization but doesn't have "Bearer" (401)
* 6. Got authorization but doesn't have token after "Bearer" (401)
*/

import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authorize } from '../../app/middleware/authorization';
import { UsersModel, UserAuthorizationRequest } from '../../types';

jest.mock('jsonwebtoken');
jest.mock('../../types'); // Mock UsersModel

describe('authorize middleware', () => {
    let req: Partial<UserAuthorizationRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            headers: {
                authorization: 'Bearer valid.token.here'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    it('should call next if token is valid and user is found', async () => {
        (jwt.verify as jest.Mock).mockReturnValue({ id: '1' });
        (UsersModel.query as jest.Mock).mockReturnValue({
            findOne: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue({
                    id: '1',
                    email: 'user@email.com',
                    nama: 'user',
                    role: 'user',
                    created_at: new Date(),
                    updated_at: new Date()
                })
            })
        });

        await authorize(req as UserAuthorizationRequest, res as Response, next);

        expect(jwt.verify).toHaveBeenCalledWith('valid.token.here', 'secret');
        expect(req.user).toEqual({
            id: '1',
            email: 'user@email.com',
            nama: 'user',
            role: 'user',
            created_at: expect.any(String),
            updated_at: expect.any(String)
        });
        expect(next).toHaveBeenCalled();
    });

    it('should return 401 if authorization header is missing', async () => {
        req.headers = {};

        await authorize(req as UserAuthorizationRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if token is invalid', async () => {
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        });

        await authorize(req as UserAuthorizationRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });

    it('should return 401 if user is not found', async () => {
        (jwt.verify as jest.Mock).mockReturnValue({ id: '1' });
        (UsersModel.query as jest.Mock).mockReturnValue({
            findOne: jest.fn().mockReturnValue({
                select: jest.fn().mockResolvedValue(null)
            })
        });

        await authorize(req as UserAuthorizationRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });
    
    it('should return 401 if authorization header is in different format', async () => {
        req.headers!.authorization = 'InvalidTokenFormat';

        await authorize(req as UserAuthorizationRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    })

});
