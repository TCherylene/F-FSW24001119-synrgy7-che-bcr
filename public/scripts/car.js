class Car {
    static list = [];

    static init(cars) {
        this.list = cars.map((i) => new this(i));
    }

    constructor({
        id,
        plate,
        manufacture,
        model,
        image,
        rentPerDay,
        capacity,
        description,
        transmission,
        available,
        type,
        year,
        options,
        specs,
        availableAt,
        driver_type
    }) {
        this.id = id;
        this.plate = plate;
        this.manufacture = manufacture;
        this.model = model;
        this.image = image;
        this.rentPerDay = rentPerDay.toLocaleString("id-ID");
        this.capacity = capacity;
        this.description = description;
        this.transmission = transmission;
        this.available = available;
        this.type = type;
        this.year = year;
        this.options = options;
        this.specs = specs;
        this.availableAt = new Date(availableAt);
        this.driver_type = driver_type;
    }

    render() {
        return `
            <div class="card p-4 shadow-sm" style="height: 100%">
                <div class="card-image-top text-center">
                    <img src="${this.image}" alt="" class="card__image--car">
                </div>
                <div class="card-body px-0 pb-0">
                    <h6 class="card-text">${this.model}</h6>
                    <h5 class="card-title fw-bold">Rp ${this.rentPerDay} / hari</h5>
                    <p class="card-text">${this.description}</p>
                    <ul class="m-0 p-0">
                        <li class="mb-2 d-flex align-items-center gap-3">
                            <img src="./images/icons/fi_users.svg" alt="">
                            ${this.capacity} Orang
                        </li>
                        <li class="mb-2 d-flex align-items-center gap-3">
                            <img src="./images/icons/fi_settings.svg" alt="">
                            ${this.transmission}
                        </li>
                        <li class="mb-2 d-flex align-items-center gap-3">
                            <img src="./images/icons/fi_calendar.svg" alt="">
                            Tahun ${this.year}
                        </li>
                    </ul>
                    <a href="#" class="btn btn-secondary w-100">Pilih Mobil</a>
                </div>
            </div>
        `
    }
}

/*
examples:
return `
<p>id: <b>${this.id}</b></p>
<p>plate: <b>${this.plate}</b></p>
<p>manufacture: <b>${this.manufacture}</b></p>
<p>model: <b>${this.model}</b></p>
<p>available at: <b>${this.availableAt}</b></p>
<img src="${this.image}" alt="${this.manufacture}" width="64px">
`;


my html:
 <div class="col-12 col-md-6 col-lg-4">
    <div class="card p-4 shadow-sm">
        <div class="card-image-top">
            <img src="./images/car01.min.jpg" alt="" class="w-100">
        </div>
        <div class="card-body px-0 pb-0">
            <h6 class="card-text">Nama Tipe/Mobil</h6>
            <h5 class="card-title fw-bold">Rp 430.000 / hari</h5>
            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. </p>
            <ul class="m-0 p-0">
                <li class="mb-2 d-flex align-items-center gap-3">
                    <img src="./images/icons/fi_users.svg" alt="">
                    4 Orang
                </li>
                <li class="mb-2 d-flex align-items-center gap-3">
                    <img src="./images/icons/fi_settings.svg" alt="">
                    Manual
                </li>
                <li class="mb-2 d-flex align-items-center gap-3">
                    <img src="./images/icons/fi_calendar.svg" alt="">
                    Tahun 2020
                </li>
            </ul>
            <a href="#" class="btn btn-secondary w-100">Pilih Mobil</a>
        </div>
    </div>
</div>
*/