import { Router } from "express";
import { getVehicule, getVehicules } from "../controllers/vehicule.controller.js";



const vehiculeRouter = Router();

vehiculeRouter.post('/', getVehicules);

vehiculeRouter.get('/vehicule/:id', getVehicule);



export default vehiculeRouter;