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