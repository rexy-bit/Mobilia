
import User from "../models/user.model.js";
import mongoose from "mongoose";


export const getProfile = async(req , res , next) => {

    try{

        if(!req.user){
            return res.status(404).json({
                success : false,
                message : "Error user not found"
            });
        }

        const {password, ...userWithoutPassword} = req.user.toObject();

        res.status(200).json({
            success : true,
            data : userWithoutPassword
        });

    }catch(err){
        next(err);
    }
}

export const getAllUsers = async(req , res , next) => {

    try{

        const users = await User.find().select("-password");

        return res.status(200).json({
            success: true,
            message : "Users fetched successfully",
            data : users
        });
    }catch(err){
        next(err);
    }
    
}

export const deleteUser = async(req , res , next) => {

    try{

    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId).select("-password");

    if(!user){
        return res.status(404).json({
            success : false,
            message : "Error user not found",
            data : user
        });
    }

    res.status(200).json({
        success : true,
        message : "User deleted successfully",
    });

    }catch(err){
        next(err);
    }
}


export const searchUser = async(req , res , next) => {

    try{

         const {search} = req.body;

         if(!search || search.trim() === ""){
            return res.status(400).json({
                success : false,
                message : "Invalid search"
            });
         }

         const regex = new RegExp(search, "i");

       const query = [
            { name: regex },
            { email: regex },
            { role: regex }
          ];
      
       
          if (mongoose.Types.ObjectId.isValid(search)) {
            query.push({ _id: search });
          }

          const users = await User.find({ $or: query });

        res.status(200).json({
            success : true,
            message : "Search Data found",
            data : users
        });

        }catch(err){
            next(err);
        }
}


export const updateRole = async(req , res , next) => {

    try{

        const {role} = req.body;

        const userId = req.params.id;


        if(role !== "admin" && role !== "user"){
            return res.status(400).json({
                success : false,
                message : 'Invalid role'
            });
        }

                const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            });
        }
        
        user.role = role;

        await user.save({ validateModifiedOnly: true });

        res.status(200).json({
            success : true,
            message : "User role updated successfully",
            data : user
        });

    }catch(err){
        next(err);
    }
}

