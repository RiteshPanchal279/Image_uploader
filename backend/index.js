import express from 'express';
import dbConnect from './config/db.js';
import dotenv from 'dotenv'
import userRoute from "./routes/user_route.js"
import folderRoute from "./routes/folder_route.js"
import imageRoute from "./routes/images_route.js"
import { authMiddleware } from './middleware/authMiddleware.js';


dotenv.config()
const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
   res.send("Hello from home");
})

app.use("/user",userRoute);
app.use("/folder",authMiddleware,folderRoute);
app.use("/image",imageRoute);

dbConnect()
app.listen(3000,()=>{
   console.log("App listning at 3000 port")
})