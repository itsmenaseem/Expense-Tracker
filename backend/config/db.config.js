import mongoose from "mongoose"
import "dotenv/config"

export async function connectToDB(){
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected at host ${connect.connection.host}`);
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}