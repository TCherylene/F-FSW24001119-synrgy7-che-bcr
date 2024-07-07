import userService from '../../../services/userService';
import { Request, Response } from 'express';
import { encryptPassword }
    from '../../../utils/encrypt';
import { UserMiddlewareRequest } from '../../../../types';
import { v4 as uuidv4 } from 'uuid';

async function whoAmI(req: UserMiddlewareRequest, res: Response) {
    res.json({
        message: "Berhasil",
        data: req.user
    })
}

async function createAdmin(req: Request, res: Response) {
    const { email, password, nama, avatar, role } = req.body;
    if (!email || !password || !nama) {
        return res.status(400).json({
            message: "Data tidak lengkap"
        })
    }

    try {
        const userExist = await userService.checkDuplicate(email);
        if (userExist) {
            return res.status(409).json({
                message: "Email sudah terdaftar!"
            })
        }

        const hashPassword = await encryptPassword(password);
        const id = uuidv4();
        const user = await userService.create({
            id,
            email,
            password: hashPassword,
            nama,
            avatar,
            role: role || 'admin',
            created_by: 'admin',
            updated_by: 'admin',
            active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        });

        res.json({
            message: "Berhasil",
            data: {
                id: user.id,
                email: user.email,
                nama: user.nama,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        })
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function getUsers(req: Request, res: Response) {
    const users = await userService.findAll({});
    res.status(200).json(users);
}

export default {
    whoAmI,
    createAdmin,
    getUsers
}