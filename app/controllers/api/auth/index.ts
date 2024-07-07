import userService from '../../../services/userService';
import { Request, Response } from 'express';
import { encryptPassword, checkPassword, createToken }
    from '../../../utils/encrypt';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await userService.findByEmail(email);
        const isPasswordCorrect = await checkPassword(user.password, password)

        if (!isPasswordCorrect) {
            return res.status(404)
                .json({
                    message: "Email atau password salah"
                })
        }

        const token = await createToken({
            id: user.id,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at
        })

        res.status(200).json({
            message: "Berhasil Login",
            data: {
                id: user.id,
                email: user.email,
                nama: user.nama,
                token,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        })
    } catch (e) {
        console.error(e)
        res.status(404).json({
            message: "Email atau password salah"
        })
    }
}

async function register(req: Request, res: Response) {
    const { email, password, nama, avatar } = req.body;
    try {
        const userExist = await userService.checkDuplicate(email);
        if (userExist) {
            return res.status(409).json({
                message: "Email sudah terdaftar!"
            })
        }

        const id = uuidv4();
        const encryptedPassword = await encryptPassword(password)
        const user = await userService.create({
            id,
            email,
            password: encryptedPassword,
            nama,
            role: 'user',
            avatar,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            active: true,
            created_by: id,
            updated_by: id
        })

        res.status(201).json({
            message: "Berhasil Register",
            data: {
                id: user.id,
                email: user.email,
                nama: user.nama,
                createdAt: user.created_at,
                updatedAt: user.updated_at
            }
        })
    } catch (e) {
        console.error(e)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export default {
    login,
    register,
}