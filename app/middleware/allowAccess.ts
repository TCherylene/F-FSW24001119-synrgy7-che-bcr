import { Request, Response, NextFunction } from 'express';

interface User{
    role: string;
    id: number;
}

interface CustomRequest extends Request {
    user?: User;
}

export function allowAccess(allowedRoles: string[]) {
    return (req: CustomRequest, res: Response, next: NextFunction) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Forbidden: You don't have enough permissions"
            });
        }
        next();
    };
}
