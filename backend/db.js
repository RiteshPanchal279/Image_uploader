import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const dbConnect = async () => {
   try {
      const url = process.env.MONGO_URL;
      await mongoose.connect(url);
      console.log("DB connect succesfully")
   } catch (error) {
      console.log("Faild in database connection",error)
   }
};


export default dbConnect