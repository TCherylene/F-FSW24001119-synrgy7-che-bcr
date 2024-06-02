import express from 'express'
import controllers from '../app/controllers'
import { multerMemory } from '../app/middleware/multerMemory'
import { authorize } from '../app/middleware/authorization'
import { allowAccess } from '../app/middleware/allowAccess'

const authRouter = express.Router()
const userRouter = express.Router()
const carRouter = express.Router()

const superAdmin = 'superadmin'
const admin = 'admin'

// AUTH
authRouter.post("/login", controllers.api.auth.login);
authRouter.post("/register", controllers.api.auth.register);

// USER
userRouter.get("/whoami", authorize, controllers.api.users.whoAmI);
userRouter.get("/users", authorize, allowAccess([superAdmin]), controllers.api.users.getUsers);
userRouter.post("/create/admin", authorize, allowAccess([superAdmin]), controllers.api.users.createAdmin);

// CARS
carRouter.get("/", authorize, controllers.api.cars.getCars);
carRouter.get("/:id", authorize, controllers.api.cars.getCarsById);

carRouter.post("/", authorize, allowAccess([admin, superAdmin]), multerMemory.single("photo"), controllers.api.cars.addCar);
carRouter.put("/:id", authorize, allowAccess([admin, superAdmin]), multerMemory.single("photo"), controllers.api.cars.updateCar);
carRouter.delete("/:id", authorize, allowAccess([admin, superAdmin]), controllers.api.cars.deleteCar);


export default {
    authRouter,
    carRouter,
    userRouter
};