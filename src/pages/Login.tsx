export default function Login() {
    return (
        <>
            <main className="row p-0 m-0 align-items-center vh-100">
                <div className="col-8 overflow-hidden p-0 vh-100">
                    <img className="w-100 h-100 scale-up object-fit-cover" src="/images/login.png" alt="" />
                </div>
                <div className="col-4 px-5">
                    <img src="./images/logo.png" alt="" />
                    <h1 className="fw-bold fs-4 my-4">Welcome, Admin BCR</h1>

                    <div className="alert alert-danger text-danger fs-12" role="alert">
                        Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital.
                    </div>

                    <form action="" className="my-4">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="text" className="form-control" id="email" name="email"
                                placeholder="Contoh: johndee@gmail.com" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="6+ karakter" />
                        </div>

                    </form>
                    <a href="#" className="btn btn-primary w-100 fw-bold">
                        Sign In
                    </a>
                </div>
            </main>
        </>
    )
}