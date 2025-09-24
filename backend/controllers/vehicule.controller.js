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


export const getVehicule = async(req , res , next) => {

    try{

        const vehiculeId = req.params.id;

        const vehicule = await Vehicule.findById(vehiculeId);

        if(!vehicule){
            return res.status(404).json({
                success : false,
                message : "Error vehicule not found"
            });
        }

        res.status(200).json({
            success : true,
            data : vehicule
        })

    }catch(err){
        next(err);
    }
}
