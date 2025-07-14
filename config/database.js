import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGODB_URL } = process.env;

export const connect = () => {
	mongoose
		.connect(MONGODB_URL || "mongodb://localhost:27017/library-node", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("✅ DB Connection Success");
		})
		.catch((err) => {
			console.log("❌ DB Connection Failed");
			console.error(err);
			process.exit(1);
		});
};
