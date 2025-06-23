import { CustomError } from "../utils/customError.js";


export function notFound(req,res,next){
    return next(new CustomError("resource not found",404))
}