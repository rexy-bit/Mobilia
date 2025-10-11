import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_SECRET } from "../config/env.js";
import User from "../models/user.model.js";


const authorize = async(req , res , next) => {

    try{

        let token;

        if(req.cookies && req.cookies.accessToken){
            token = req.cookies.accessToken;
        }


        console.log('Token extrait : ', token);

        if(!token){
            return res.status(401).json({
                 message : "Error token not provided"
            });
        }

        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(401).json({
                message : 'Unauthorized -User not found'
            });
        }

        req.user = user;
        next();
    }catch(err){
        res.status(401).json({
            message : 'Unauthorized -Invalid token'
        });
    }
}

export default authorize;