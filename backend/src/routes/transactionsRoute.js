import express from "express";
import {getTransactions} from "../controllers/transactionsController.js";
import {createTransaction} from "../controllers/transactionsController.js";
import {deleteTransaction} from "../controllers/transactionsController.js";
import {getSummaryByUserId} from "../controllers/transactionsController.js";

const router= express.Router();

router.get("/:userId",getTransactions);

router.post("/",createTransaction);

router.delete("/:Id",deleteTransaction);

router.get("/summary/:userId",getSummaryByUserId);

export default router;