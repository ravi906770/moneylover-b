import express from "express"
import { createCategory, getCategory } from "../controllers/categoryConroller";



const router  = express.Router();


router.post("/category" ,createCategory);
router.get("/getCategory" , getCategory)



export default router;