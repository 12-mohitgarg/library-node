import mongoose from "mongoose";
// import { DB_NAME } from "../constant.js";

export const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect("mongodb://localhost:27017/library-node");
        console.log(`Database connected successfully to ${connectionInstance.connection.name}`);
    } catch (error) {
        console.log("Error in connecting to database", error);
        process.exit(1);
    }
};
