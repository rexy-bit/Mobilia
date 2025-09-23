import { Router } from "express";
import { getProfile } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";


const userRouter = Router();

userRouter.get('/me', authorize, getProfile);


export default userRouter;