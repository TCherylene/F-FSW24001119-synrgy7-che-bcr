import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UsersModel } from '../models/users';

export interface User {
    id: string;
    email: string;
    nama: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface CustomRequest extends Request {
    user?: User;
}

export async function authorize(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;
        
        if (!bearerToken) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const token = bearerToken.split("Bearer ")[1]; // Ensure bearerToken is defined
        const tokenPayload = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

        const userRecord = await UsersModel.query().findOne({ id: tokenPayload.id }).select('id', 'email', 'nama', 'role', 'created_at', 'updated_at');

        if (userRecord) {
            req.user = {
                id: userRecord.id.toString(),
                email: userRecord.email,
                nama: userRecord.nama,
                role: userRecord.role,
                created_at: userRecord.created_at.toString(),
                updated_at: userRecord.updated_at.toString()
            };
        } else {
            throw new Error("User not found");
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}
