import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import { addReservation, cancelReservation, deleteReservation, getAllReservations, getUserReservations, searchReservation, unCheckedReservation, updateReservation } from "../controllers/reservation.controller.js";


const reservationRouter = Router();

reservationRouter.post('/add', authorize, addReservation);

reservationRouter.get("/user/:id", authorize, getUserReservations)

reservationRouter.put("/cancel/:id", authorize, cancelReservation);

reservationRouter.get('/all', authorize, isAdmin, getAllReservations);

reservationRouter.post('/search', authorize, isAdmin, searchReservation);

reservationRouter.get('/unChecked', authorize, isAdmin, unCheckedReservation);

reservationRouter.delete('/delete/:id', authorize, isAdmin, deleteReservation);

reservationRouter.put('/update/:id', authorize, isAdmin, updateReservation);


export default reservationRouter;