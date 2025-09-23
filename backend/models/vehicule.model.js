import mongoose from "mongoose";

const vehiculeSchema = new mongoose.Schema({
    brand : {
        type : String,
        required : [true, "vehicule brand is required"],
        minLength : 1,
        maxLength : 100,
    },
    model : {
        type : String,
          required : [true, "vehicule model is required"],
        minLength : 1,
        maxLength : 100,
    },
    category:{
        type : String,
        required: [true, "categorie is required"],
        enum : ["Standard", "SUV", "Luxury", "Utility", "Electric"],

    },
    priceDay : {
        type : Number,
        min : 0,
        required : [true, "Price per day is required"],
        
    },
    available : {
        type : Boolean,
        default : true,
        required : [true, "available is required"],

    },
    images : {
          type : [String],
          default : []
    },
    fuelType : {
        type : String,
        required : [true, "fuel type is required"],
        enum : ["Petrol", "Diesel", "Electric", "Hybrid"]
    },
    seats : {
        type : Number,
        required : [true, "number of seats is required"],
        min : 0
    },
    transmission : {
        type : String,
        required : [true, "type of transmission is required"],
        enum : ["Auto", "Manual"]
    },
    year : {
           type : Number,
           required : [true, "year is required"],
           min : 1950,
           max : new Date().getFullYear() + 1

    },
    description: {
        type : String,
        required : [true, "Description is required"],
    }
}, {timestamps : true});

const Vehicule = mongoose.model('Vehicule', vehiculeSchema);

export default Vehicule;