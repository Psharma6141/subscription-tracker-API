import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";
....

if(!DB_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env.<development/production>.local")
}

const connectdb = async ()=>{
     try{
       await mongoose.connect(DB_URI)
        console.log("Mongodb connected");
       
     }catch(err){
        console.log("Error connectiong to database: ", err);
        process.exit(1);  
     }
}

export default connectdb
