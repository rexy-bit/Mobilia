import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { ACCESS_TOKEN_EXPIRATION, ACCESS_TOKEN_SECRET , REFRESH_TOKEN_EXPIRATION, REFRESH_TOKEN_SECRET, NODE_ENV} from "../config/env.js";

// Helper pour générer les tokens de manière cohérente
const generateTokens = (userId, role) => {
    const accessToken = jwt.sign(
        { userId, role }, 
        ACCESS_TOKEN_SECRET, 
        { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );
    
    const refreshToken = jwt.sign(
        { userId }, 
        REFRESH_TOKEN_SECRET, 
        { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );
    
    return { accessToken, refreshToken };
};

// Helper pour définir les cookies de manière cohérente
const setCookies = (res, accessToken, refreshToken) => {
    const cookieOptions = {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    };
    
    res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    
    res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours
    });
};

export const signUp = async(req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = req.body;

        if(!name || name.trim() === ""){
            return res.status(400).json({
                success: false,
                message: "Enter name in correct and valid format"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email || email.trim() === "" || !emailRegex.test(email)){
            return res.status(400).json({
                success: false,
                message: "Enter the email in correct and valid format"
            });
        }

        if(!password || password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Enter correct and valid password"
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(409).json({
                success: false,
                message: 'Error user already registered'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{name, email, password: hashedPassword}], {session});

        // ✅ Génération cohérente des tokens
        const { accessToken, refreshToken } = generateTokens(newUsers[0]._id, newUsers[0].role);

        // ✅ Cookies cohérents
        setCookies(res, accessToken, refreshToken);

        await session.commitTransaction();
        session.endSession();

        const userResponse = {
            _id: newUsers[0]._id,
            name: newUsers[0].name,
            email: newUsers[0].email,
            role: newUsers[0].role
        };

        res.status(201).json({
            success: true,
            data: userResponse
        });

    } catch(err) {
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}

export const signIn = async(req, res, next) => {
    try {
        const {email, password} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email || email.trim() === "" || !emailRegex.test(email)){
            return res.status(400).json({
                success: false,
                message: "Enter the email in correct and valid format"
            });
        }

        if(!password || password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Error enter the password in correct format"
            });
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Error user not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // ✅ Génération cohérente des tokens
        const { accessToken, refreshToken } = generateTokens(user._id, user.role);

        // ✅ Cookies cohérents
        setCookies(res, accessToken, refreshToken);

        const newUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.status(200).json({
            success: true,
            message: "User signed In successfully",
            data: newUser
        });

    } catch(err) {
        next(err);
    }
}

export const signOut = async(req, res, next) => {
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: NODE_ENV === 'production',
            sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            expires: new Date(0)
        };

        res.cookie("accessToken", "", cookieOptions);
        res.cookie("refreshToken", "", cookieOptions);

        res.status(200).json({
            success: true,
            message: "User signed out successfully"
        });

    } catch(err) {
        next(err);
    }
}

export const refreshTokenFunction = async(req, res, next) => {
    try {
        const token = req.cookies.refreshToken;

        // ✅ Logging pour debugging
        console.log("Refresh token attempt:", { 
            hasToken: !!token, 
            tokenPreview: token ? token.substring(0, 10) + "..." : "undefined" 
        });

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "No refresh token provided"
            });
        }

        const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded.userId);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Error user not found"
            });
        }

        // ✅ Génération cohérente
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user._id, user.role);

        // ✅ Renouveler AUSSI le refresh token
        setCookies(res, accessToken, newRefreshToken);

        res.status(200).json({
            success: true,
            message: 'Token refreshed',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch(err) {
        console.error("Refresh token error:", err.message);
        
        // ✅ Nettoyer les cookies en cas d'erreur
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        
        res.status(403).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
}