import { allowAccess } from '../../app/middleware/allowAccess';
import { UserMiddlewareRequest } from '../../types';
import { Response, NextFunction } from 'express';

describe('allowAccess middleware', () => {
    let req: Partial<UserMiddlewareRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            user: {
                id: '',
                role: ''
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        next = jest.fn();
    });

    it('should call next if user role is allowed', () => {
        req.user!.role = 'admin';
        const middleware = allowAccess(['admin', 'user']);

        middleware(req as UserMiddlewareRequest, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should return 403 if user role is not allowed', () => {
        req.user!.role = 'guest';
        const middleware = allowAccess(['admin', 'user']);

        middleware(req as UserMiddlewareRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            message: "Forbidden: You don't have enough permissions"
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should call next if allowedRoles is empty', () => {
        req.user!.role = 'anyRole';
        const middleware = allowAccess([]);

        middleware(req as UserMiddlewareRequest, res as Response, next);

        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should return 403 if user role is undefined', () => {
        req.user!.role = undefined as any; // Simulating undefined role
        const middleware = allowAccess(['admin', 'user']);

        middleware(req as UserMiddlewareRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            message: "Forbidden: You don't have enough permissions"
        });
        expect(next).not.toHaveBeenCalled();
    });
});
