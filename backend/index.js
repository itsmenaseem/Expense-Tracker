import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import "dotenv/config"
const app = express()

app.use(urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())

const PORT = process.env.PORT || 5000

async function startServer(){
    try {
        app.listen(PORT,()=>{
            console.log(`server is listen of on port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
startServer();
