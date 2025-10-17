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


const allowedOrigins = [
  "http://localhost:5173",
  "https://mobilia-5358.vercel.app"
];

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", allowedOrigins.includes(req.headers.origin) ? req.headers.origin : "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(cors({
  origin: allowedOrigins,
  credentials: true
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
