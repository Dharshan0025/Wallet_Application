import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/db.js";
import rateLimiterMiddleware from "./src/middleware/rateLimiter.js";
import transactionsRoute from "./src/routes/transactionsRoute.js";

dotenv.config();

const app=express();
const PORT= process.env.PORT

//middleware

app.use(rateLimiterMiddleware);
app.use(express.json());

app.use("/api/transactions",transactionsRoute);


initDB().then(()=>{
app.listen(PORT, () => {
    console.log("server is up and running in an port:",PORT);
});
});