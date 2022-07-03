import express, {json} from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import extractsRouter from "./routes/extractsRouter.js";
const app= express();
//middleware
app.use(json());
app.use(cors());
dotenv.config();

app.use(authRouter);
app.use(extractsRouter);

/*Porta dada por ambiente */
const port= process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running: ${port} `);
})

