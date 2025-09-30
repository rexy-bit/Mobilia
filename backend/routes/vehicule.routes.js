import { Router } from "express";
import { addVehicule, deleteVehicule, getVehicule, getVehicules, rentedCars, updateVehicule } from "../controllers/vehicule.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";
import multer from "multer"


const vehiculeRouter = Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 Mo max
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // accepté
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."));
    }
  },
});

vehiculeRouter.post('/', getVehicules);

vehiculeRouter.get("/rented", authorize, isAdmin, rentedCars);

vehiculeRouter.get('/vehicule/:id', getVehicule);

vehiculeRouter.delete('/delete/:id', authorize, isAdmin, deleteVehicule);

vehiculeRouter.put('/update/:id', authorize, isAdmin, upload.array("images") , updateVehicule);

vehiculeRouter.post('/add', authorize, isAdmin,upload.array("images") ,  addVehicule);



export default vehiculeRouter;