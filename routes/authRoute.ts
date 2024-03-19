import express from "express"
import { checkEmail, deleteController, forgotPasswordController, getSingleUserController, loginController, refreshTokenGenerate, registerController, updateProfileController } from "../controllers/authController";
import {validateUser}  from "../validator/schema";
import { verifyToken } from "../middleware/middleWare";

// import { requireSignIn } from "../middleware/middleWare";

const router = express.Router();




router.post("/register" ,validateUser,registerController);
router.get("/check-email/:email" , checkEmail)

router.post("/login" , loginController)
router.get("/refresh" , refreshTokenGenerate)
router.post("/forgot-password" ,verifyToken, forgotPasswordController)
router.put("/update" ,verifyToken, updateProfileController)

router.delete("/delete" ,verifyToken, deleteController)

router.get("/profile" , verifyToken , getSingleUserController)




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