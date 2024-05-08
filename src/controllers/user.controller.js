import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js"
import { User } from "../models/user.model.js";
const registUser = asyncHandler(  async (req, res)=>{
    //getting data from frontend
    const {fullname, email, username, password } = req.body 
    // validation 
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    //checking if user exists in database
    const existedUser = User.findOne({
        $or: [{username},{email}]
    })

    if (existedUser) {
        throw new ApiError(409, "the user with same username and email already exists")
    }

    })
    


export { registUser }