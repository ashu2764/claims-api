require('dotenv').config();
const mongoose = require("mongoose");


/**
 * Connects to MongoDb using Mongoose.
 * @async
 * @function connectDB
 * @returns {Promise<void>} Resolves when connected , exists on failure.
 */


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is connected");
    } catch (error) {
        console.log("MongoDB connection Failed", error.message);
        process.exit(1);
    }
}

module.exports = connectDB;