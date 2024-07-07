/*
* Ekspektasi untuk utils encrypt
* 1. encryptPassword mengembalikan hasil berupa string
* 2. checkPassword mengembalikan true jika password yg tersimpan dan yang di input sesuai
* 3. checkPassword mengembalikan false jika password yg tersimpan dan yang di input tidak sesuai
* 
* Ekspektasi untuk utils checkPassword
* 1. checkPassword mengembalikan false jika password yg tersimpan dan yang di input tidak sesuai
* 2. checkPassword mengembalikan true jika password yg tersimpan dan yang di input sesuai
* 
* Ekspektasi untuk utils JWT
* 1. createToken mengembalikan token jwt
* 2. createToken mengembalikan token jwt dengan secret default
* 3. createToken mengembalikan token jwt dengan secret yang didefinisikan
*/

import jwt from 'jsonwebtoken'
import { checkPassword, encryptPassword, createToken } from "../../app/utils/encrypt";

describe("Encrypt", () => {
    let pass: string;
    it("encryptPassword should return string", async () => {
        pass = await encryptPassword('12345');
        expect(pass).toEqual(expect.stringMatching(/\$2a\$10\$.+/))
    })
    it("checkPassword should return false", async () => {
        const check = await checkPassword(pass, '1234')
        expect(check).toBe(false)
    })
    it("checkPassword should return true", async () => {
        const check = await checkPassword(pass, '12345')
        expect(check).toBe(true)
    })
})

describe("checkPassword", () => {
    let pass: string;
    it("checkPassword should return false", async () => {
        pass = await encryptPassword('12345');
        const check = await checkPassword(pass, '1234')
        expect(check).toBe(false)
    })
    it("checkPassword should return true", async () => {
        const check = await checkPassword(pass, '12345')
        expect(check).toBe(true)
    })
})

describe("JWT", () => {
    const userObject = {
        id: '1',
        name: 'user',
        email: 'user@email.com',
        role: 'user',
        created_at: '2021-08-09',
        updated_at: '2021-08-09'
    };

    it("createToken should return jwt token with defined secret", async () => {
        const token = await createToken(userObject);
        const secret: string = process.env.JWT_SECRET ?? "secret";
        const verify = jwt.verify(token, secret);
        expect(verify).toEqual(
            expect.objectContaining({
                name: 'user',
                email: 'user@email.com',
                iat: expect.any(Number),
                exp: expect.any(Number)
            })
        );
    });

    it("createToken should return jwt token with default secret", async () => {
        const originalSecret = process.env.JWT_SECRET;
        delete process.env.JWT_SECRET; // temporarily remove JWT_SECRET

        const token = await createToken(userObject);
        const secret = "secret";
        const verify = jwt.verify(token, secret);
        expect(verify).toEqual(
            expect.objectContaining({
                name: 'user',
                email: 'user@email.com',
                iat: expect.any(Number),
                exp: expect.any(Number)
            })
        );

        process.env.JWT_SECRET = originalSecret; // restore original JWT_SECRET
    });
});
