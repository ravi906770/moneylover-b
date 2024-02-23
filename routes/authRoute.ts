import express from "express"
import { login, registerController } from "../controllers/authController";
// import { requireSignIn } from "../middleware/middleWare";

const router = express.Router();


router.post("/register" , registerController);

router.post("/login" ,login )

// router.get('/protected', requireSignIn, (req : Request
//     , res :Response) => {
//     // Access user information from req.user
//     const user = req.user;
//     res.json({ user });
// });







export default router;