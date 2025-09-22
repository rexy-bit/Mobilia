import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { ACCESS_TOKEN_EXPIRATION, ACCESS_TOKEN_SECRET , REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET, NODE_ENV} from "../config/env.js";



export const signUp = async(req , res , next) => {

      const session = await mongoose.startSession();
        session.startTransaction();

    try{

        const {name, email, password} = req.body;

        if(!name || name.trim() === ""){
            return res.status(400).json({
                success : false,
                message : "Enter name in correct and valid format"
            });
        }

         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!email || email.trim() === "" || !emailRegex.test(email)){
           return res.status(400).json({
            message : "Enter the email in correct and valid format"
           });
       }

       if(!password || password.length < 6){
        return res.status(400).json({
            success : false,
            message : "Enter correct and valid password"
        });
       }

       const existingUser = await User.findOne({email});

       if(existingUser){
          return res.status(409).json({
            message : 'Error user already registered'
          });
       }

       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);

       const newUsers = await User.create([{name, email, password : hashedPassword}], {session});

       const accessToken = jwt.sign({userId : newUsers[0]._id}, ACCESS_TOKEN_SECRET, {expiresIn : ACCESS_TOKEN_EXPIRATION});
 
       const refreshToken = jwt.sign({userId : newUsers[0]._id}, REFRESH_TOKEN_SECRET, {expiresIn : REFRESH_TOKEN_EXPIRATION});

           res.cookie("accessToken", accessToken, {
        httpOnly: true,           
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000    
    });

       res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict",
        maxAge : 7*24*60*60*1000
       });

       await session.commitTransaction();
       session.endSession();

       const userResponse = {
        _id : newUsers[0]._id,
        name : newUsers[0].name,
        email : newUsers[0].email,
        role : newUsers[0].role
       };

       res.status(201).json({
        success : true,
        user : userResponse,
        
       })


    }catch(err){
          await session.abortTransaction();
    session.endSession();
        next(err);
    }
}


export const signIn = async(req, res, next) => {

    try{

        const {email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!email || email.trim() === "" || !emailRegex.test(email)){
           return res.status(400).json({
            message : "Enter the email in correct and valid format"
           });
       }

       if(!password || password.length < 6){
        return res.status(400).json({
            message : "Error enter the password in correct format"
        });
       }

       const user = await User.findOne({email});

       if(!user){
        return res.status(404).json({
            success : false,
            message: "Error user not found"
        });
       }

       const isPasswordValid = await bcrypt.compare(password, user.password);

       if(!isPasswordValid){
          return res.status(401).json({
            message : 'Invalid password'
          });
       }

       const accessToken = jwt.sign({userId : user._id}, ACCESS_TOKEN_SECRET, {expiresIn : ACCESS_TOKEN_EXPIRATION});

       const refreshToken = jwt.sign({userId : user._id}, REFRESH_TOKEN_SECRET, {expiresIn : REFRESH_TOKEN_EXPIRATION});


       res.cookie("accessToken", accessToken, {
        httpOnly : true,
                secure : process.env.NODE_ENV === "production",
        sameSite : "strict",
        maxAge : 15*60*1000
       });

       res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure: process.env.NODE_ENV === "production",
        sameSite : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
       })

       const newUser = {
        _id : user._id,
        name : user.name,
        email : user.email,
        role : user.role
       }

       res.status(200).json({
        success: true,
        message : "User signed In successfully",
        data : newUser
       })

    }catch(err){
        next(err);
    }
}


export const signOut = async(req, res, next) => {

    try{

        res.cookie("accessToken", "", {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            expires : new Date(0)
        }
        );

        res.cookie("refreshToken", "", {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "strict",
            expires : new Date(0)
        });

        res.status(200).json({
            success : true,
            message : "User signed out successfully"
        });

    }catch(err){
        next(err);
    }
}


export const refreshTokenFunction = async(req , res , next) => {

    try{

        const token = req.cookies.refreshToken;

        if(!token) return res.status(401).json(
            {
                message : "No refresh token provided"
            }
        );

        const decoded = jwt.verify(token , REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(404).json({
                message : "Error user not found"
            });
        }

        const newAccessToken = jwt.sign({userId : user._id, role : user.role}, ACCESS_TOKEN_SECRET, {expiresIn :ACCESS_TOKEN_EXPIRATION});

        res.cookie("accessToken", newAccessToken, {
            httpOnly : true,
            secure: process.env.NODE_ENV === "production",
            sameSite : "strict",
            maxAge: 15 * 60 * 1000
        });

        res.status(200).json({
            success: true,
            message : 'Token refreshed'
        });


    }catch(err){
        res.status(403).json({
            message : "Invalid or expired refresh token"
        });
    }
}