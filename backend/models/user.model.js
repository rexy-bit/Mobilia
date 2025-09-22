import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "name is required"],
        trim : true,
        minLength : 1,
        maxLength : 100,
    },email : {
        type : String,
        required : [true, "email is required"],
        unique : true,
         match : [/\S+@\S+\.\S+/, 'Please fill a valid mail address'],
         lowercase : true,
         minLength : 5,
         maxLength : 255
    },
    role : {
        type : String,
        required : [true, "role is required"],
        default : 'user',
        enum : ['user', 'admin']
    },
    password : {
        type : String,
        required : [true, "password is required"],
        minLength : 6
    }
}, {timestamps : true});

const User = mongoose.model('user', userSchema);


export default User;

