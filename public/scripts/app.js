class App {
    constructor() {
        // this.clearButton = document.getElementById("clear-btn");
        // this.loadButton = document.getElementById("load-btn");
        this.carContainerElement = document.getElementById("cars-container");
    }

    async init(params) {
        await this.load(params);

        // Register click listener
        // this.clearButton.onclick = this.clear;
        // this.loadButton.onclick = this.load;
    }

    run = () => {
        Car.list.forEach((car) => {
            const node = document.createElement("div");
            node.classList.add("col-12", "col-md-6", "col-lg-4");
            node.innerHTML = car.render();
            this.carContainerElement.appendChild(node);
        });
    };

    async load(params) {
        const { driver, date, time, passenger } = params;
        const cars = await Binar.listCars((car) => {
            return car.availableAt >= new Date(date + "T" + time) &&
                (passenger == undefined ? true : car.capacity >= passenger);
        });

        // initiate car class
        Car.init(cars);
    }

    clear = () => {
        // bersihkan filter
        let child = this.carContainerElement.firstElementChild;

        while (child) {
            child.remove();
            child = this.carContainerElement.firstElementChild;
        }
    };
}
