import { Router } from "express";
import { deleteUser, getAllUsers, getProfile } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";


const userRouter = Router();

userRouter.get('/me', authorize, getProfile);

userRouter.get('/all', authorize, isAdmin, getAllUsers);

userRouter.delete('/delete/:id', authorize, isAdmin, deleteUser);


export default userRouter;