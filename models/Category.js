import mongoose from "mongoose";
// Define the Tags schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	courses: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Course",
		},
	],
});


const Category = mongoose.model("Category", categorySchema);
export default Category;
