import express from 'express';
import dbConnect from './db.js';
import dotenv from 'dotenv'
import userRoute from "./routes/user_route.js"


dotenv.config()
const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
   res.send("Hello from home");
})

app.use("/user",userRoute);

dbConnect()
app.listen(3000,()=>{
   console.log("App listning at 3000 port")
})