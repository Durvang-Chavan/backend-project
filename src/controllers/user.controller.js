import { asyncHandler } from "../utils/asyncHandler.js";
const registUser = asyncHandler(  async (req, res)=>{
    res.status(200).json({
        message: "WELL DONE DURVANG"
    })
});

export { registUser }