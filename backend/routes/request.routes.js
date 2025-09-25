import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { addRequest, getAllRequests, updateStatus } from "../controllers/request.controller.js";
import isAdmin from "../middlewares/admin.middleware.js";

const requestRouter = Router();

requestRouter.post('/add', addRequest);

requestRouter.get('/', authorize, isAdmin, getAllRequests);

requestRouter.put('/:id', authorize, isAdmin, updateStatus);


export default requestRouter;