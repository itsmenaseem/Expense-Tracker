import express from "express"
import { deleteExpense, expensePost, getExpenses, updateExpense } from "../controllers/expenses.controller.js"

const router = express.Router()

router.route("/").post(expensePost)
router.route("/").get(getExpenses)
router.route("/:id").delete(deleteExpense)
router.route("/:id").put(updateExpense)

export default router