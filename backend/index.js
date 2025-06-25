import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import "dotenv/config"
import cors from "cors"
import { notFound } from "./middlewares/notFound.middleware.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"
import { connectToDB } from "./config/db.config.js"
import { mainRateLimiter } from "./middlewares/rateLimit.middleware.js"
import authRoutes from "./routes/auth.route.js"
import expensesRoutes from "./routes/expenses.route.js"
import { authMiddleware } from "./middlewares/auth.middleware.js"
const app = express()

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use(mainRateLimiter)
const base = "/api/v1"
app.use(`${base}/auth`,authRoutes)
app.use(`${base}/expense`,authMiddleware,expensesRoutes)
app.use(notFound)
app.use(errorMiddleware)
const PORT = process.env.PORT || 5000

async function startServer(){
    try {
        await connectToDB()
        app.listen(PORT,()=>{
            console.log(`server is listen of on port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
startServer();
