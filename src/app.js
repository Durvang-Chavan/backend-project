import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"})); //data comes from various sources like after filling the form

app.use(express.urlencoded({extended: true, limit:"16kb"})); // to configure url data 
app.use(express.static("public")); // to store img,png,favicon etc in the public folder
app.use(cookieParser()) // used to access and set cookies on the browser of the user

export { app }