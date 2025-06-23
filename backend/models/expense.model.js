import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref: 'user'
    },
    category: {
        type: String,
        enum: [
            "Housing",
            "Food",
            "Transportation",
            "Bills & EMIs",
            "Shopping",
            "Entertainment",
            "Health",
            "Education",
            "Savings",
            "Others"
        ],
        required: [true, "please select a category"]
    },
    amount: {
        type: Number,
        min: 0,
        required: [true, "amount is required"]
    },
    date: {
        type: Date,
        required: [true, "please select a date"]
    },
    description: {
        type: String,
        maxlength: [200, "Description should not exceed 200 characters"],
        trim: true
    }
}, { timestamps: true })

export const Expense = mongoose.model("expense", expenseSchema)