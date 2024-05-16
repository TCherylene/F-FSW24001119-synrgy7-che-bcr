import dotenv from "dotenv"
import knex, { Knex } from "knex"
import { Model } from "objection"
import express, { Express, Request, Response, NextFunction } from 'express';
import { config } from './knexfile';

import path from 'path';
// import { upload } from './server/middleware/multer';
import { uploadOnMemory } from './server/middleware/multerMemory';
import { cloudinary } from './server/middleware/cloudinary';

import {getCars, getCarsById, addCar, updateCar, deleteCar } from './server/api/cars/index';

dotenv.config();
const app: Express = express();
const PORT: Number = 5000;

//setup view engine
// app.use("/public", express.static(path.join(process.cwd(), '/public')))
// app.set('view engine', 'ejs');
// app.set('views', path.join(process.cwd(), '/server/views'));

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// knex
Model.knex(knex(config.development));

//routing
app.get("/", (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Hello World"
    })
})

app.get("/cars", getCars)
app.get("/cars/:id", getCarsById)
app.post("/cars", uploadOnMemory.single("photo"), addCar)
app.put("/cars/:id", uploadOnMemory.single("photo"), updateCar)
app.delete("/cars/:id", deleteCar)

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});