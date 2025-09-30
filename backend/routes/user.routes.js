import { Router } from "express";
import { deleteUser, getAllUsers, getProfile, searchUser, updateRole } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/admin.middleware.js";


const userRouter = Router();

userRouter.get('/me', authorize, getProfile);

userRouter.get('/all', authorize, isAdmin, getAllUsers);

userRouter.post('/search', authorize, isAdmin, searchUser);

userRouter.delete('/delete/:id', authorize, isAdmin, deleteUser);

userRouter.put("/update/:id", authorize, isAdmin, updateRole);


export default userRouter;