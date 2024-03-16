import { loginFailed, loginSuccess } from "../controllers/googleAuthController"
import express from "express"
import passport from "passport";

const CLIENT_URL = "http://localhost:3000"

const router = express.Router();

router.get("/login/failed", loginFailed)
router.get("/login/success", loginSuccess)

router.get("/google" , passport.authenticate("google" , {scope :["profile", "email"]}))

router.get("/google/callback",passport.authenticate("google",{
    successRedirect : CLIENT_URL,
    failureRedirect:"/login/failed",
}))



export default router