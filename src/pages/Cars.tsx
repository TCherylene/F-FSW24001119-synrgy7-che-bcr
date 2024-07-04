import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";

import Flatpickr from "react-flatpickr";

import Select, { StylesConfig } from 'react-select';
import { Hero } from '../components/home';
import CarResults from '../components/cars/CarResults';

export default function Cars() {
    const URL = import.meta.env.VITE_API_URL;
    const [searchParams, setSearchParams] = useSearchParams({});

    const [driver, setDriver] = useState(0); // [0, 1]
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(""); // [YYYY-MM-DD]
    const [time, setTime] = useState("");
    const [capacity, setCapacity] = useState(0); // Number
    const [disabled, setDisabled] = useState(true);
    const [carResult, setCarResult] = useState([]);

    useEffect(() => {
        const driverParam = searchParams.get("driver");
        const dateParam = searchParams.get("date");
        const timeParam = searchParams.get("time");
        const capacityParam = searchParams.get("capacity");

        if (driverParam && driver !== parseInt(driverParam, 10)) {
            setDriver(parseInt(driverParam, 10));
        }
        if (dateParam && formattedDate !== dateParam) {
            const dateObj = new Date(dateParam);
            setDate(dateObj);
            setFormattedDate(dateParam);
        } else {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const dateStr = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
            setFormattedDate(dateStr);
        }

        if (timeParam && time !== timeParam) {
            setTime(timeParam);
        }
        if (capacityParam && capacity !== parseInt(capacityParam, 10)) {
            setCapacity(parseInt(capacityParam, 10));
        }
    }, [searchParams]);


    useEffect(() => {
        setSearchParams({ driver, date: formattedDate, time, capacity });
    }, [driver, formattedDate, time, capacity]);

    useEffect(() => {
        handleDisabled();
        getData();
    }, []);

    const timeOptions = [];
    for (let i = 0; i < 24; i++) {
        const time = i < 10 ? `0${i}:00` : `${i}:00`;
        timeOptions.push({ value: `${time}:00`, label: time });
    }

    const driverOptions = [
        { value: 0, label: "Tanpa Sopir (Lepas Kunci)" },
        { value: 1, label: "Dengan Sopir" },
    ]

    const handleDriver = (driver: number) => {
        setDriver(driver);
        handleDisabled();
    }

    const handleDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const dateStr = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

        setDate(date);
        setFormattedDate(dateStr);
        handleDisabled();
    }

    const handleTime = (time: string) => {
        setTime(time);
        handleDisabled();
    }

    const handleCapacity = (capacity: number) => {
        setCapacity(capacity);
    }

    const handleDisabled = () => {
        if (driver !== -1 && formattedDate !== null && time !== "") {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await getData();
    }

    const getData = async () => {
        const params = { driver, date: formattedDate, time, capacity };
        const queryParams = new URLSearchParams(params).toString();

        try {
            const response = await fetch(`${URL}/cars?${queryParams}`);
            const data = await response.json();

            if (data.data) {
                setCarResult(data.data);
            } else {
                setCarResult([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setCarResult([]);
        }
    }


    const colourStyles: StylesConfig = {
        control: (styles, { isFocused, selectProps: { value } }) => {
            return {
                ...styles,
                borderColor: value ? 'black' : (isFocused ? 'var(--bs-lime-green)' : 'var(--bs-secondary-border-subtle)'),
                boxShadow: isFocused ? '0 0 0 0.25rem rgba(var(--bs-lime-green-rgb), 0.25)' : 'none',
                ':hover': {
                    borderColor: value ? 'black' : 'var(--bs-lime-green)',
                },
            };
        },
        option: (styles, { isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected || isFocused
                        ? 'var(--bs-light-green)'
                        : null,
                color: isDisabled
                    ? '#ccc'
                    : isSelected || isFocused
                        ? 'var(--bs-lime-green)'
                        : 'black',
                fontWeight: isSelected || isFocused ? '600' : 'normal',
            };
        },
    };

    return (
        <>
            <Hero withButton={false} />
            <section className="position-relative filter__container">
                <div className="position-absolute top-0 start-50 translate-middle rounded-3 shadow p-4 w-75 z-3"
                    style={{ backgroundColor: 'white' }}>

                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-12 col-lg-10">
                                <div className="row p-0 mb-3 mb-lg-0">
                                    <div className="col-12 col-lg-3  mb-3 mb-lg-0">
                                        <p className="mb-2 fw-lighter filter__font">Tipe Driver</p>
                                        <Select
                                            className={`basic-single filter__button ${driver !== null ? 'border-black' : ''}`}
                                            name="driver"
                                            options={driverOptions}
                                            styles={colourStyles}
                                            defaultValue={driverOptions.find((option) => option.value === driver)}
                                            onChange={(selected: any) => {
                                                handleDriver(selected?.value);
                                            }}
                                            isClearable={true}
                                        />
                                    </div>
                                    <div className="col-12 col-lg-3  mb-3 mb-lg-0">
                                        <p className="mb-2 fw-lighter filter__font">Tanggal</p>
                                        <Flatpickr
                                            name="driver"
                                            className={`w-100 form-control filter__button ${date !== null ? 'border-black' : ''}`}
                                            value={date}
                                            onChange={([date]) => {
                                                handleDate(date);
                                            }}
                                            options={{
                                                dateFormat: "d M Y",
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-lg-3  mb-3 mb-lg-0">
                                        <p className="mb-2 fw-lighter filter__font">Waktu Jemput/Ambil</p>
                                        <Select
                                            className={`basic-single filter__button ${time !== null ? 'border-black' : ''}`}
                                            name="time"
                                            options={timeOptions}
                                            styles={colourStyles}
                                            defaultValue={timeOptions.find((option) => option.value === decodeURIComponent(time))}
                                            onChange={(selected: any) => {
                                                handleTime(selected?.value);
                                            }}
                                            isClearable={true}
                                        />
                                    </div>
                                    <div className="col-12 col-lg-3  mb-3 mb-lg-0">
                                        <p className="mb-2 fw-lighter filter__font">Jumlah Penumpang (optional)</p>
                                        <div className="position-relative">
                                            <div className="position-absolute w-4 h-4 translate-middle-y top-50 end-0 me-3">
                                                <img src="./images/icons/fi_users.svg" width="100%" alt="" />
                                            </div>
                                            <input type="number" name="capacity"
                                                className={`form-control filter__button me-2 ${capacity ? 'border-black' : ''}`}
                                                defaultValue={capacity.toString()}
                                                onChange={(e) => handleCapacity(parseInt(e.target.value))}
                                                placeholder="Jumlah Penumpang" />
                                        </div>
                                    </div>


                                </div>
                            </div>

                            <div className="col-12 col-lg-2 align-self-end">
                                <button className="w-100 btn btn-secondary" disabled={disabled}>Cari Mobil</button>

                            </div>
                        </div>
                    </form>
                </div>
            </section >
            {
                carResult && <CarResults data={carResult} />
            }

        </>
    );
}
