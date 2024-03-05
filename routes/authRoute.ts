import express from "express"
import { checkEmail, forgotPasswordController, loginController, loginFailed, loginSuccess, refreshTokenGenerate, registerController } from "../controllers/authController";
import {validateUser}  from "../validator/schema";
import passport from "passport";
// import { requireSignIn } from "../middleware/middleWare";

const router = express.Router();


router.post("/register" ,validateUser,registerController);
router.get("/check-email/:email" , checkEmail)

router.post("/login" , loginController)
router.get("/refresh" , refreshTokenGenerate)
router.post("/forgot-password" , forgotPasswordController)

router.get("/login/failed", loginFailed)
router.get("/login/success", loginSuccess)

router.get("/google/callback",passport.authenticate("google",{
    successRedirect : "http://localost:3000",
    failureRedirect:"/login/failed",
}))


// router.get("/logout" ,async(req :request , res :response):Promise<void> =>{
//     req.logout(),

// })



// router.get('/protected', requireSignIn, (req : Request
//     , res :Response) => {
//     // Access user information from req.user
//     const user = req.user;
//     res.json({ user });
// });







export default router;