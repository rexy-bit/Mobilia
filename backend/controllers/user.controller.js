
import User from "../models/user.model.js";


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