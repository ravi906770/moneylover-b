import express from "express"
import { createCategory, getBudgetBoundry, getCategory, updateCategoryController } from "../controllers/categoryConroller";
import { verifyToken } from "../middleware/middleWare";



const router  = express.Router();


router.post("/category", verifyToken ,createCategory);
router.get("/getCategory" ,verifyToken, getCategory)

router.get("/categoryBudget" ,verifyToken, getBudgetBoundry)

router.put("/updatecategory" ,verifyToken, updateCategoryController)



export default router;