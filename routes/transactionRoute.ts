import express from "express"
import { createTransaction, deleteTransaction, getAllTransaction } from "../controllers/transactionController";

const router = express.Router();



router.post("/transaction" , createTransaction);

router.get("/getAllTransaction" , getAllTransaction);

router.delete("/delete-transaction/:id" , deleteTransaction);


export default router