// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js"; //import for first approach
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config({
    path: './env'
})


connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`App listening on the port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed !!! ", err)
})














// first approch of the 2, connecting to the backend (better approach is making a new folder db, so we don't pollute index file.)
// import express from "express"
// const app = express();

// ( async ()=>{
//     try {
//         await mongoose.connect(`${pocess.env.MONGODB_URI}/${DB_NAME}`);
//         // handling error for express app for error in communicating with the DataBase
//         app.on("error", (error)=>{
//             console.log("Error", error);
//             throw error
            
//         //listnening to the app after successful connection with app
//         app.listen(process.env.PORT, ()=>{
//             console.log(`App listening on the Port : ${process.env.PORT}`);
//         })
//         })
//     } catch (error) {
//         console.error("ERROR: ",error)
//         throw err 
//     }
// })()


