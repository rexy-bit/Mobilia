
import mongoose from "mongoose";
import fetch from "node-fetch";
import Request from "../models/request.model.js";


export const addRequest = async(req , res , next) => {

    try{

        const {name, email, organization, phoneNumber,description, recaptchaToken} = req.body;

        if(!name || !email ||  !phoneNumber ) {
            return res.status(400).json({
                success : false,
                message : "Please enter valid information"
            });
        }


            if (!recaptchaToken) {
      return res.status(400).json({ success: false, message: "reCAPTCHA token is missing" });
    }

    // Vérification côté Google avec la SECRET KEY
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const response = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`
    });

    const data = await response.json();

    if (!data.success) {
      return res.status(400).json({ success: false, message: "Failed reCAPTCHA verification" });
    }

        const newRequest = await Request.create({
            name,
            email,
            organization,
            phoneNumber,
            description
        });

        res.status(201).json({
            success : true,
            message : "request created successfully",
            data : newRequest
        });

    }catch(err){
        next(err);
    }

}


export const getAllRequests = async(req , res , next) => {

    try{

        const requests = await Request.find().sort({ createdAt: -1 });;

        return res.status(200).json({
            success : true,
            message : "Requests fetched successfully",
            data : requests
        });

    }catch(err){
        next(err);
    }
}

export const updateStatus = async(req , res , next) => {

    try{

        const requestId = req.params.id;

        const {status} = req.body;

        const request = await Request.findById(requestId);

        if(!request) return res.status(404).json({
            success: false,
            message : "Request not found"
        });

        if(!status || status === ""){
            return res.status(400).json({
                success : false,
                message : "Status is not in correct format",
                
            });
        }

        request.status = status;

        await request.save({ validateModifiedOnly: true });

        res.status(200).json({
            success : false,
            message : "Request updated successfully",
            data : request
        });

    }catch(err){
        next(err);
    }
}


export const searchRequest = async(req , res , next) => {

    try{

        const {search} = req.body;

        if(!search || search.trim() === ""){
            return res.status(400).json({
                success :false,
                message : "Invalid search",
                
            });

        }


        const regex = new RegExp(search, "i");

        const searchData = await Request.find({
            $or : [
                {name : regex},
                {email : regex},
                {organization : regex},
                {phoneNumber : regex},
                {description : regex},
                {status : regex}
            ]
        });

           res.status(200).json({
            success : true,
            message : "Search Data found",
            data : searchData
        });
        
    }catch(err){
        next(err);
    }

}


export const unCheckedRequests = async(req , res , next) => {

    try{

       const unChecked = await Request.find({status: "new"});

        res.status(200).json({
            success : true,
            message : "Unchecked requests fetched",
            data : unChecked
        });
    }catch(err){
        next(err);
    }
}



