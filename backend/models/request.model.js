import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "name is required"],
        minLength : 1,
        maxLength : 200
    },
    email : {
        type : String,
        required : [true, "email is required"],
         match : [/\S+@\S+\.\S+/, 'Please fill a valid mail address'],
         lowercase : true,
         minLength : 5,
         maxLength : 255
    },
    organization : {
        type : String,
        minLength : 2,
        maxLength : 200
    },
    phoneNumber : {
        type : String,
        required : [true, "phone number is required"]
    },
    description : {
        type : String,
        maxLength : 1000
    },
    status : {
        type : String,
        default : "new",
        enum: ["new", "pending", "confirmed"],

    }
},{timestamps : true});


const Request = mongoose.model('Request', requestSchema);

export default Request;