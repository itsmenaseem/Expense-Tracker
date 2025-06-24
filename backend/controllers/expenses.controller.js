import { Expense } from "../models/expense.model.js";
import { AsyncHandler } from "../utils/asyncHandler.js";
import { CustomError } from "../utils/customError.js";
import mongoose from "mongoose";

export const expensePost = AsyncHandler(async(req,res,next)=>{
    if(!req.body)return next(new CustomError("All fields are required except description",400))
    const {category,amount,date,description} = req.body
    if(!category || !amount || !date)return next(new CustomError("All fields are required except description",401))
    if(amount <= 0)return next(new CustomError("amount must be positive",400))
    const parseDate = new Date(date)
    if(isNaN(parseDate))return next(new CustomError("data format should be YYYY-MM-DD",400))
    const id = req.user.id
    const expense = await Expense.create({user_id:req.user._id,amount,category,date:parseDate,description})
    return res.status(201).json({
        success:true,
        message:"new expense created",
        expense
    })
})

export const deleteExpense = AsyncHandler(async(req,res,next)=>{
    const id = req.params?.id
    if(!id)return next(new CustomError("expense id missing",400))
    if(!mongoose.Types.ObjectId.isValid(id))return  next(new CustomError("invalid expense id",400))
    const deletedExpense = await Expense.findOneAndDelete({_id:id,user_id:req.user._id})
    if(!deletedExpense)return  next(new CustomError("expense not found or unauthorized",404))
    return res.status(200).json({
        success:true,
        message:"expense deleted"
})
})


export const getExpenses = AsyncHandler(async(req,res,next)=>{
    if(!req.query)return next(new CustomError("select either id or category or dates",400))
    const {id,category,start,end} = req.query
    if(id){
        if(!mongoose.Types.ObjectId.isValid(id))return next(new CustomError("invalid expense id",400))
        const expense = await Expense.findOne({_id:id,user_id:req.user._id})
        if(!expense)return next(new CustomError("expense not found or unauthorized",404))
        return res.status(200).json({
            success:true,
            message:"expense retrieved successfully",
            expense
        })
    }
    else if((start || end) &&  category){
        if(!start || !end)return next(new CustomError("select start and end date",400))
        const parseDate1 = new Date(start)
        const parseDate2 = new Date(end)
        if(isNaN(parseDate1) || isNaN(parseDate2))return next(new CustomError("data format should be YYYY-MM-DD",400))
        const expenses = await Expense.find({
            date:{
                $gte:parseDate1,
                $lte:parseDate2
            },category,
            user_id:req.user._id
        })
        return res.status(200).json({
            success:true,
            message:"expense retrieved successfully",
            expenses
        })
    }
    else if(category){
        const expenses = await Expense.find({category,user_id:req.user._id})
        return res.status(200).json({
            success:true,
            message:"expense retrieved successfully",
            expenses
        })
    }
    else if(start || end){
        if(!start || !end)return next(new CustomError("select start and end date",400))
        const parseDate1 = new Date(start)
        const parseDate2 = new Date(end)
        if(isNaN(parseDate1) || isNaN(parseDate2))return next(new CustomError("data format should be YYYY-MM-DD",400))
        const expenses = await Expense.find({
            user_id:req.user._id,
            date:{
                $gte:parseDate1,
                $lte:parseDate2
            }})
        return res.status(200).json({
            success:true,
            message:"expense retrieved successfully",
            expenses
        })
    }
    return next(new CustomError("please provide a filter",400))
})

export const updateExpense = AsyncHandler(async (req, res, next) => {
    const id = req.params?.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return next(new CustomError("Provide a valid expense ID", 400));
    }
    if(!req.body)return next(new CustomError("At least one field is required to update", 400));
    const { category, amount, date, description } = req.body;

    if (!category && !amount && !date && !description) {
        return next(new CustomError("At least one field is required to update", 400));
    }

    const updateData = {};
    if (category) updateData.category = category;
    if (amount) {
        if (amount <= 0) return next(new CustomError("Amount must be positive", 400));
        updateData.amount = amount;
    }
    if (date) {
        const parsedDate = new Date(date);
        if (isNaN(parsedDate)) return next(new CustomError("Date must be in valid YYYY-MM-DD format", 400));
        updateData.date = parsedDate;
    }
    if (description) updateData.description = description;

    const updatedExpense = await Expense.findOneAndUpdate(
        { _id: id, user_id: req.user._id },
        { $set: updateData },
        { new: true }
    );

    if (!updatedExpense) {
        return next(new CustomError("Expense not found or unauthorized", 404));
    }

    return res.status(200).json({
        success: true,
        message: "Expense updated successfully",
        updatedExpense,
    });
});
