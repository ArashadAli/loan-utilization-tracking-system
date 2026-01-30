import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MongoDB_URI + '/Loan-Utilization-System')
        if(!response) return new Error({message:"database not connected"})
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Database connnection failed",error)
        process.exit(1);
    }
}

export default connectDB 