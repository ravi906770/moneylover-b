import express from "express"
import { checkEmail, forgotPasswordController, loginController, refreshTokenGenerate, registerController } from "../controllers/authController";
import {validateUser}  from "../validator/schema";

// import { requireSignIn } from "../middleware/middleWare";

const router = express.Router();




router.post("/register" ,validateUser,registerController);
router.get("/check-email/:email" , checkEmail)

router.post("/login" , loginController)
router.get("/refresh" , refreshTokenGenerate)
router.post("/forgot-password" , forgotPasswordController)




// router.get("/logout" ,async(req :Request , res :Response)=>{
//    await req.logout(),

// })



// router.get('/protected', requireSignIn, (req : Request
//     , res :Response) => {
//     // Access user information from req.user
//     const user = req.user;
//     res.json({ user });
// });







export default router;