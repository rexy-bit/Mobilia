import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { addRequest, getAllRequests, searchRequest, unCheckedRequests, updateStatus } from "../controllers/request.controller.js";
import isAdmin from "../middlewares/admin.middleware.js";

const requestRouter = Router();

requestRouter.post('/add', addRequest);

requestRouter.get('/', authorize, isAdmin, getAllRequests);

requestRouter.post('/search', authorize, isAdmin, searchRequest);

requestRouter.get('/unChecked', authorize, isAdmin, unCheckedRequests);

requestRouter.put('/:id', authorize, isAdmin, updateStatus);




export default requestRouter;