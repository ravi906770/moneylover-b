import express from "express"
import { verifyToken } from "../middleware/middleWare";
import { addLimitController, getLimitController, updateLimitController } from "../controllers/limitController";


const router = express.Router();

router.post("/addLimit" , verifyToken , addLimitController)

router.get("/getLimit" , verifyToken , getLimitController)

router.put("/updateLimit" , verifyToken , updateLimitController)


export default router