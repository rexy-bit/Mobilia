import { Router } from "express";
import { getVehicules } from "../controllers/vehicule.controller.js";



const vehiculeRouter = Router();

vehiculeRouter.post('/', getVehicules);




export default vehiculeRouter;