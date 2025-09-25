import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { addReservation, cancelReservation, getUserReservations } from "../controllers/reservation.controller.js";


const reservationRouter = Router();

reservationRouter.post('/add', authorize, addReservation);

reservationRouter.get("/user/:id", authorize, getUserReservations)

reservationRouter.put("/cancel/:id", authorize, cancelReservation)


export default reservationRouter;