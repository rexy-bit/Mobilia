import {config} from "dotenv"
import pkg from "cloudinary";
const { v2: cloudinary } = pkg;

config({path : `.env.${process.env.NODE_ENV || 'development'}.local`});


export const {
    PORT,
    NODE_ENV,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRATION,
    REFRESH_TOKEN_EXPIRATION,
    DB_URI,
    RECAPTCHA_SECRET_KEY,
        CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET
    
} = process.env;


cloudinary.config({
    cloud_name : CLOUDINARY_CLOUD_NAME,
    api_key : CLOUDINARY_API_KEY,
    api_secret : CLOUDINARY_API_SECRET
});

export { cloudinary };