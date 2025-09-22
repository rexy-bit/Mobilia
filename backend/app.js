import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import connectToDatabase from "./database/mongodb.js";
import authRouter from "./routes/auth.routes.js";


const app = express();

app.use(cors({
    origin : ["http://localhost:5173"],
    credentials : true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));


app.use('/api/v1/auth', authRouter);
app.get('/', (req, res)=>res.send("Welcome to mobilia"));


app.listen(PORT, async()=> {

    console.log(`App running on : http://localhost:${PORT}`);

    await connectToDatabase();
});
