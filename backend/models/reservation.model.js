import mongoose from "mongoose";


const reservationSchema = new mongoose.Schema({
    vehiculeName : {
        type : String,
        required : [true, "vehiculeName is required"],

    },
    vehiculeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Vehicule",
        required : [true, "vehiculeId is required"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : [true, "userId is required"]
    },
    userName : {
        type : String,
        required : [true, "userName is required"]
    },
    startDate : {
        type : Date,
        required : [true, "stateDate is required"],
    },
    endDate : {
        type : Date,
        required : [true, "End Date is required"],
            validate: {
        validator: function(value) {
            return value > this.startDate;
        },
        message: "End date must be after start date"
    }
    },
    totalPrice : {
        type : Number,
        required : [true, "totalPrice is required"],
        min : 0
    },
    status : {
        type : String,
        required : [true, "status is required"],
        default : "pending",
        enum : ["pending", "confirmed", "cancelled"]
    }
}, {timestamps : true});


const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
