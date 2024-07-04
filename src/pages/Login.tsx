import { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from '../hooks/useAuth'


export default function Login() {
    const URL = import.meta.env.VITE_API_URL;
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isError, setIsError] = useState(false)
    const { login } = useAuth()

    const emailHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const passwordHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const res = await fetch(`${URL}/auth/login`, {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await res;
        if (data.status === 404) {
            setIsError(true)
        }
        if (data.status === 200) {
            const dataJson = await data.json()
            login(dataJson.data)
        }
    }

    return (
        <>
            <main className="row p-0 m-0 align-items-center vh-100">
                <div className="col-8 overflow-hidden p-0 vh-100">
                    <img className="w-100 h-100 scale-up object-fit-cover" src="/images/login.png" alt="" />
                </div>
                <div className="col-4 px-5">
                    <img src="./images/logo.png" alt="" />
                    <h1 className="fw-bold fs-4 my-4">Welcome, Admin BCR</h1>

                    <div className={`alert alert-danger text-danger fs-12 ${isError ? '' : 'd-none'}`}
                        role="alert">
                        Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital.
                    </div>

                    <form action="" className="my-4" onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" name="email"
                                placeholder="Contoh: johndee@gmail.com" onChange={(e) => emailHandler(e)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password"
                                name="password" placeholder="6+ karakter" onChange={(e) => passwordHandler(e)} />
                        </div>

                        <button className="btn btn-primary w-100 fw-bold">
                            Sign In
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}