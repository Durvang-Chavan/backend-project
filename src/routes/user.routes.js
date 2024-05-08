import { Router } from "express"
import { registUser } from "../controllers/user.controller.js";


const router = Router()
router.route("/register").post(registUser);
export default router