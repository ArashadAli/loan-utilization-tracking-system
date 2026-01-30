import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/connectDB.js'
dotenv.config({
    path:'.env'
})
const server = express()

connectDB()
.then(() => {
    server.listen(process.env.PORT || 3000,() => {
    console.log(`server is running on PORT : http://localhost:${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log("database connection error : ", error.message)
})