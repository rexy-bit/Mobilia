import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import vehiculeRouter from "./routes/vehicule.routes.js";
import reservationRouter from "./routes/reservation.routes.js";
import requestRouter from "./routes/request.routes.js";


const app = express();


app.use(cors({
    origin : ["http://localhost:5173",
         "https://mobilia-5358.vercel.app/"
        ],
    credentials : true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/vehicules', vehiculeRouter);
app.use('/api/v1/reservations', reservationRouter);
app.use('/api/v1/requests', requestRouter);


app.get('/', (req, res)=>res.send("Welcome to mobilia"));


app.listen(PORT, async()=> {

    console.log(`App running on : http://localhost:${PORT}`);

    await connectToDatabase();
});
