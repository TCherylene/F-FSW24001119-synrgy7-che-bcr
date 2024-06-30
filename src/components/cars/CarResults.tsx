export default function CarResults({ data }) {
    const formatter = new Intl.NumberFormat('id-ID');

    return (
        <section className="container container-fluid">
            <div className="row row-gap-3" id="cars-container">
                {data.map((item, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="card p-4 shadow-sm h-100">
                            <div className="card-image-top text-center">
                                <img src={`${item.image}`} alt="" className="card__image--car" />
                            </div>
                            <div className="card-body px-0 pb-0 d-flex flex-column justify-content-between">
                                <h6 className="card-text">{item.model}</h6>
                                {/* Format number */}
                                <h5 className="card-title fw-bold">Rp {formatter.format(item.rent_per_day)} / hari</h5>
                                <p className="card-text">{item.description}</p>
                                <ul className="m-0 p-0">
                                    <li className="mb-2 d-flex align-items-center gap-3">
                                        <img src="./images/icons/fi_users.svg" alt="" />
                                        {item.capacity} Orang
                                    </li>
                                    <li className="mb-2 d-flex align-items-center gap-3">
                                        <img src="./images/icons/fi_settings.svg" alt="" />
                                        {item.transmission}
                                    </li>
                                    <li className="mb-2 d-flex align-items-center gap-3">
                                        <img src="./images/icons/fi_calendar.svg" alt="" />
                                        Tahun {item.year}
                                    </li>
                                </ul>
                                <a href="#" className="btn btn-secondary w-100">Pilih Mobil</a>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    )
}