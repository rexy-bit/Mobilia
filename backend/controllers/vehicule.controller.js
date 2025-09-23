import Vehicule from "../models/vehicule.model.js"

/*
export const getAllVehicules = async(req , res , next) => {

    try{

        const vehicules = await Vehicule.find();


        return res.status(200).json({
            success : true,
            message : "Vehicules fetched",
            data : vehicules
        });

    }catch(err){
        next(err);
    }
}
    */


export const getVehicules = async(req , res, next) => {

    try{
       
        const {seats, category, transmission, fuelType} = req.body;

        const filter = {
           
        };

        if(seats && Number(seats) > 0) filter.seats = Number(seats);
        if(category && category !== "") filter.category = category;
        if(transmission && transmission !== "") filter.transmission = transmission;
        if(fuelType && fuelType !== "") filter.fuelType = fuelType;

        const vehicules = await Vehicule.find(filter);

        res.status(200).json({
            success : true,
            data: vehicules
        });


    }catch(err){
        next(err);
    }
}