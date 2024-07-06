import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const salt = 10;

// register
export async function encryptPassword(password: string) {
    const result = await bcrypt.hash(password, salt)
    return result;

}

// login
export async function checkPassword(encryptedPassword: string, password: string) {
    const result = await bcrypt.compare(password, encryptedPassword)
    return result
}

export async function createToken(payload: any) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1800s'
    })
}