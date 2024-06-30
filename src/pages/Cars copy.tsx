import React, { useState, useEffect } from 'react';
import { Hero } from '../components/home';

export default function Cars() {
    const [driver, setDriver] = useState({ value: "-1", text: "Pilih Tipe Driver" });
    const [date, setDate] = useState("");
    const [time, setTime] = useState({ value: "-1", text: "Pilih Waktu" });
    const [passenger, setPassenger] = useState("");

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleDriverChange = (e) => {
        setDriver({ value: e.target.getAttribute('data-value'), text: e.target.innerText });
        changeBorder(e.target);
        updateButton();
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
        updateButton();
    };

    const handleTimeChange = (e) => {
        setTime({ value: e.target.getAttribute('data-value'), text: e.target.innerText });
        changeBorder(e.target);
        updateButton();
    };

    const handlePassengerChange = (e) => {
        setPassenger(e.target.value);
        changeBorder(e.target);
        updateButton();
    };

    const changeBorder = (element) => {
        const parent = element.closest('.filter__dropdown');
        let text = parent.querySelector('.filter__text');
        let button = parent.querySelector('.filter__button');

        if (text.getAttribute('data-value') !== "-1") {
            button.classList.add('filter__button--active');
        } else {
            button.classList.remove('filter__button--active');
        }
    };

    const updateButton = () => {
        const forms = document.querySelectorAll('.filter__container .required');
        let disabled = false;

        for (let i = 0; i < forms.length; i++) {
            if (forms[i].type === 'date') {
                var date = new Date(forms[i].value);
                if (isNaN(date.getTime())) {
                    disabled = true;
                    break;
                }
            } else {
                if (parseInt(forms[i].querySelector('.filter__text').getAttribute('data-value')) === -1) {
                    disabled = true;
                    break;
                }
            }
        }

        setIsButtonDisabled(disabled);
    };

    function TimeFilter() {
        const times = Array.from({ length: 24 }, (_, i) => {
            const value = i < 10 ? '0' + i : i;
            return (
                <li key={i} className="filter__dropdown-item dropdown-item filter__button" data-value={`${value}:00:00`} onClick={(e) => handleTimeChange(e)}>
                    <div>{`${value}:00`}</div>
                    <div className="filter__wib">WIB</div>
                </li>
            );
        });

        return times;
    }

    useEffect(() => {
        updateButton();
    }, []);

    return (
        <>
            <Hero withButton={false} />
            <section className="position-relative filter__container">
                <div className="position-absolute top-0 start-50 translate-middle rounded-3 shadow p-4 w-75 z-3"
                    style={{ backgroundColor: 'white' }}>

                    <div className="row">
                        <div className="col-12 col-lg-10">
                            <form method="GET" action="/cars" id="filter__form-container">
                                <div className="row p-0 mb-3 mb-lg-0">
                                    <div className="col-12 col-lg-3  mb-3 mb-lg-0">
                                        <p className="mb-2 fw-lighter filter__font">Tipe Driver</p>
                                        <div className="filter__dropdown dropdown w-100">
                                            <button type="button"
                                                className={`required btn btn-outline text-start w-100 filter__button rounded-2 ${driver.value !== "-1" ? 'filter__button--active' : ''}`}
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <input type="hidden" name="driver" className="filter__text" data-value={driver.value} />
                                                <div className="filter__text" data-value={driver.value}>
                                                    {driver.text}
                                                </div>
                                                <i className="fa-solid fa-chevron-down filter__icon"></i>
                                            </button>
                                            <ul className="filter__dropdown-menu dropdown-menu w-100">
                                                <li className="filter__dropdown-item dropdown-item" data-value="dengan-sopir" onClick={handleDriverChange}>
                                                    Dengan Sopir
                                                </li>
                                                <li className="filter__dropdown-item dropdown-item" data-value="tanpa-sopir" onClick={handleDriverChange}>
                                                    Tanpa Sopir (Lepas Kunci)
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-3  mb-3 mb-lg-0">
                                        <p className="mb-2 fw-lighter filter__font">Tanggal</p>
                                        <input className={`form-control filter__form required me-2 ${date ? 'filter__button--active' : ''}`} placeholder="Pilih Tanggal"
                                            type="date" name="date" value={date} onChange={handleDateChange} />
                                    </div>

                                    <div className="col-12 col-lg-3  mb-3 mb-lg-0">
                                        <p className="mb-2 fw-lighter filter__font">Waktu Jemput/Ambil</p>
                                        <div className="filter__dropdown dropdown w-100">
                                            <button type="button"
                                                className={`filter__form required btn btn-outline text-start w-100 filter__button rounded-2 ${time.value !== "-1" ? 'filter__button--active' : ''}`}
                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                <input type="hidden" name="time" className="filter__text" data-value={time.value} />
                                                <div className="filter__text" data-value={time.value}>
                                                    {time.text}
                                                </div>
                                                <i className="fa-regular fa-clock filter__icon"></i>
                                            </button>
                                            <ul className="filter__dropdown-menu dropdown-menu w-100 p-0">
                                                <TimeFilter />
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-12 col-lg-3  mb-3 mb-lg-0">
                                        <p className="mb-2 fw-lighter filter__font">Jumlah Penumpang (optional)</p>
                                        <div className="position-relative">
                                            <div className="position-absolute w-4 h-4 translate-middle-y top-50 end-0 me-3">
                                                <img src="./images/icons/fi_users.svg" width="100%" alt="" />
                                            </div>
                                            <input className={`form-control filter__form me-2 ${passenger ? 'filter__button--active' : ''}`} name="passenger"
                                                placeholder="Jumlah Penumpang" value={passenger} onChange={handlePassengerChange} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-12 col-lg-2 align-self-end">
                            <button className="w-100 btn btn-secondary" id="filter__button" disabled={isButtonDisabled}>Cari Mobil</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
