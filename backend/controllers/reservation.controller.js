import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";
import Vehicule from "../models/vehicule.model.js";
import mongoose from "mongoose";


export const addReservation = async(req , res , next) => {

    try{

        const {userId, userName, vehiculeId, vehiculeName, startDate, endDate, totalPrice, status, phoneNumber} = req.body;

        if(!userId || userId.trim() ==="" || !userName || userName.trim() ==="" || !vehiculeId || vehiculeId.trim() === "" || !vehiculeName || vehiculeName.trim() ==="" || !startDate || !endDate || !status || !phoneNumber || phoneNumber.trim() === ""){
            return res.status(400).json({
                success: false,
                message: "Please enter valid information"
            });
        }

        if(new Date(endDate) < new Date(startDate)){
            return res.status(400).json({
                success : false,
                message: "Error startDate must be before the endDate"
            });
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success : false,
                message : "error user not found"
            });
        }

        const vehicule = await Vehicule.findById(vehiculeId);

        if(!vehicule){
            return res.status(404).json({
                success : false,
                message : "Error vehicule not found"
            });
        }

        if(vehicule.available === false){
            return res.status(409).json({
                success : false,
                message : "Error vehicule not available"
            });
        }

            const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); // conversion ms → jours
    const realPrice = days * vehicule.priceDay;

         const newReservation = await Reservation.create({
            userId,
            userName,
            vehiculeId,
            vehiculeName,
            startDate,
            endDate,
            totalPrice : realPrice,
            phoneNumber,
            status
         });

         vehicule.available = false;
         await vehicule.save();

         return res.status(201).json({
            success : true,
            message : "Vehicule created successfully",
            data : newReservation
         });

    }catch(err){
        next(err);
    }
}


export const getUserReservations = async(req , res , next) => {

    try{

        const userId = req.user._id;

        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({
                success : false,
                message : "Error -User not found"
            });
        }

        const userReservations = await Reservation.find({userId, status: { $ne: "cancelled" }});

        res.status(200).json({
            success : true,
            message : "User reservations fetched with success",
            data : userReservations
        });

    }catch(err){
        next(err);
    }

}


export const cancelReservation = async(req , res , next) => {

    try{
        
        const reservationId = req.params.id;

        const reservation = await Reservation.findById(reservationId);

        if(!reservation){
            return res.status(404).json({
                success : false,
                message : "Error reservation not found"
            });
        }

        if(req.user._id.toString() !== reservation.userId.toString()){
            return res.status(401).json({
                success : false,
                message : "Error you are not allowed to cancel this order"
            });

        }

        const vehicule = await Vehicule.findById(reservation.vehiculeId);

        if(!vehicule){
            return res.status(404).json({
                success : false,
                message : "Error vehicule not found"
            });
        }

        reservation.status = "cancelled";
        vehicule.available = true;

        await reservation.save();

        await vehicule.save();

        res.status(200).json({
            success: true,
            message : "Reservation cancelled successfully",
            data : reservation
        });

    }catch(err){
        next(err);
    }
}


export const getAllReservations = async(req , res , next) => {

    try{
    const reservations = await Reservation.find().sort({ createdAt: -1 });;

    res.status(200).json({
        success: true,
        message : "All Reservations fetched successfully",
        data : reservations
    });

    }catch(err){
        next(err);
    }

}


export const deleteReservation = async(req , res , next) => {

    try{

    const reservationId = req.params.id;

    const reservation =  await Reservation.findByIdAndDelete(reservationId);

    if(!reservation){
        return res.status(404).json({
            success : false,
            message : "Error reservation not found",
            
        });
    }

    res.status(200).json({
        success : true,
        message : "Reservation deleted successfully",
        data : reservation
    });

   }catch(err){
    next(err);
   }
   
}


export const updateReservation = async(req , res , next) => {

    try{

        const reservationId = req.params.id;
        console.log("param Id : ", req.params.id);

        const {status} = req.body;

            if (!mongoose.Types.ObjectId.isValid(reservationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reservation ID",
      });
    }

        const reservation = await Reservation.findById(reservationId);

        if(!reservation){
            return res.status(404).json({
                success : false,
                message : "Error reservation not found"
            });
        }

        if(!status || status.trim() === ""){
            return res.status(400).json({
                success : false,
                message : "Error nvalid status",
            
            });
        }

        reservation.status = status;

        await reservation.save({ validateModifiedOnly: true })

        res.status(200).json({
            success : true,
            message : "Reservation updated successfully",
            data : reservation
        })
    }catch(err){
        next(err);
    }
}


export const searchReservation = async(req , res , next) => {

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
            {vehiculeName : regex},
            {userName : regex},
            {phoneNumber : regex},
            {phoneNumber : regex},
            {status : regex}
         ]

          if (mongoose.Types.ObjectId.isValid(search)) {
            query.push({ userId: search });
          }

           if (mongoose.Types.ObjectId.isValid(search)) {
            query.push({ vehiculeId: search });
          }



        const searchData = await Reservation.find({ $or: query });

        res.status(200).json({
            success : true,
            message : "Search Data found",
            data : searchData
        });

        }catch(err){
           next(err);
        }

}


export const unCheckedReservation = async(req , res , next) => {

    try{

        const unChecked = await Reservation.find({status : "pending"});

        return res.status(200).json({
            success: true,
            message : "Unchecked Reservations fetched",
            data : unChecked
        });
    }catch(err){
        next(err);
    }
}