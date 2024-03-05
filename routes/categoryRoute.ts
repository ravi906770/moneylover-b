import express from "express"
import { createCategory, getBudgetBoundry, getCategory } from "../controllers/categoryConroller";



const router  = express.Router();


router.post("/category" ,createCategory);
router.get("/getCategory" , getCategory)

router.get("/categoryBudget" , getBudgetBoundry)



export default router;