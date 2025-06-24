import express from "express"
import { deleteExpense, expensePost, getExpenses, updateExpense } from "../controllers/expenses.controller.js"

const router = express.Router()

router.route("/expense").post(expensePost)
router.route("/expense").get(getExpenses)
router.route("/expense/:id").delete(deleteExpense)
router.route("/expense/:id").put(updateExpense)

export default router