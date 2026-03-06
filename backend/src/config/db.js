const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected successfully !!!"  )
    }
    catch(error){
        console.error("MongoDB connection error: " , error.message)
        process.exit(1) // 1 means exit with failure
    }
}

module.exports = connectDB;
