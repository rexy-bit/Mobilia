import { ACCESS_TOKEN_EXPIRATION } from "../config/env.js";
import Vehicule from "../models/vehicule.model.js"
import { cloudinary } from "../config/env.js";

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


export const deleteVehicule = async(req , res , next) => {

    try{

        const vehiculeId = req.params.id;

        const vehicule = await Vehicule.findByIdAndDelete(vehiculeId);

        if(!vehicule){

            return res.status(404).json({
                success : false,
                message: "Error vehicule not found",
                
            });
        }


        res.status(200).json({
            success : true,
            message : "Vehicule deleted successfully",
            data: vehicule
        });

    }catch(err){
        next(err);
    }
}


export const updateVehicule = async(req , res, next)  => {


    try{

    const vehiculeId = req.params.id;

    const vehicule = await Vehicule.findById(vehiculeId);

    if(!vehicule){
        return res.status(404).json({
            success : false,
            message : "Vehicule not found"
        });
    }

    const {brand, model, category, priceDay, available, fuelType, seats, transmission, year, description} = req.body;

    const updates = {};

    if(brand !== undefined) updates.brand = brand.trim();
    if(model !== undefined) updates.model = model.trim();
    if(category !== undefined) updates.category = category.trim();
    if(priceDay !== undefined){
        if(isNaN(priceDay) || priceDay < 0){
            return res.status(400).json({
                success : false,
                message : "Invalid price day"
            });
        }else{
            updates.priceDay = priceDay;
        }
    }
    if(available !== undefined) available === "true" ? updates.available = true : updates.available = false;
    if(fuelType !== undefined) updates.fuelType = fuelType.trim();
    if(seats !== undefined){
        if(isNaN(seats) || seats < 0){
            return res.status(400).json({
                success : false,
                message : "Invalid seats"
            });
        }else{
            updates.seats = seats;
        }
    }

    if(transmission !== undefined) updates.transmission = transmission.trim();
    if(year !== undefined){
       if(isNaN(year) || year < 1900){
        return res.status(400).json({
            success : false,
            message : "Invalid year"
        });
       }else{
        updates.year = year
       }
    }

    if(description !== undefined) updates.description = description.trim();



   let finalImages = [];

// Anciennes images si envoyées depuis le front
if (req.body.oldImages) {
  try {
    finalImages = JSON.parse(req.body.oldImages);
  } catch (e) {
    console.error("oldImages parsing error:", e);
  }
}

// Nouvelles images uploadées
if (req.files && Array.isArray(req.files) && req.files.length > 0) {
  const uploadPromises = req.files.map((file) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "mobilia" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      stream.end(file.buffer);
    });
  });

  const results = await Promise.all(uploadPromises);
  finalImages = [...finalImages, ...results]; // ✅ concat anciennes + nouvelles
}

if (finalImages.length > 0) {
  updates.images = finalImages;
}


     const updatedVehicule = await Vehicule.findByIdAndUpdate(vehiculeId, updates, {
      new: true,
      runValidators: true,
    });

    if(!updatedVehicule){
        return res.status(404).json({
            success : false,
            message : "Error updated vehicule not found"
        });
    }


    res.status(200).json({
        success : true,
        message : "Vehicule updated successfully",
        data : updatedVehicule
    })

    }catch(err){
        next(err);
    }
}


export const addVehicule = async(req , res , next) => {

    try{

    const {brand, model, category, priceDay, available, fuelType, seats, transmission, year, description} = req.body;

    const addedVehicule = {};

    if(brand !== undefined) addedVehicule.brand = brand.trim();
    if(model !== undefined) addedVehicule.model = model.trim();
    if(category !== undefined) addedVehicule.category = category.trim();
    if(priceDay !== undefined){
        if(isNaN(priceDay) || priceDay < 0){
            return res.status(400).json({
                success : false,
                message : "Invalid price day"
            });
        }else{
            addedVehicule.priceDay = priceDay;
        }
    }
    if(available !== undefined) addedVehicule.available = available;
    if(fuelType !== undefined) addedVehicule.fuelType = fuelType.trim();
    if(seats !== undefined){
        if(isNaN(seats) || seats < 0){
            return res.status(400).json({
                success : false,
                message : "Invalid seats"
            });
        }else{
            addedVehicule.seats = seats;
        }
    }

    if(transmission !== undefined) addedVehicule.transmission = transmission.trim();
    if(year !== undefined){
       if(isNaN(year) || year < 1900){
        return res.status(400).json({
            success : false,
            message : "Invalid year"
        });
       }else{
        addedVehicule.year = year
       }
    }

    if(description !== undefined) addedVehicule.description = description.trim();

      let imageUrls = [];

    // ⚡ plusieurs fichiers => req.files (multer doit être configuré avec .array("images"))
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "mobilia" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            );
            stream.end(file.buffer);
          })
      );

      imageUrls = await Promise.all(uploadPromises);
    }

     
        const vehicule = new Vehicule({
            brand : addedVehicule.brand,
            model : addedVehicule.model,
            category : addedVehicule.category,
            available : addedVehicule.available === "true" ? true : false,
            priceDay : Number(addedVehicule.priceDay),
            seats : Number(addedVehicule.seats),
            fuelType : addedVehicule.fuelType,
            transmission : addedVehicule.transmission,
            year : Number(addedVehicule.year),
            description : addedVehicule.description,
            images : imageUrls
        });

      await vehicule.save();
          
     return res.status(200).json({
        success : true,
        message : "Vehicule created successfully",
        data : vehicule
     });

    }catch(err){
        next(err);
    }
}


export const rentedCars = async(req , res , next) => {

    try{

        const vehicules = await Vehicule.find({available : false});

        return res.status(200).json({
            success : true,
            message : "Rented vehicules fetched successfully",
            data : vehicules
        });
    }catch(err){
        next(err);
    }
}