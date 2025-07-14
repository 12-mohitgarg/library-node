import mongoose from "mongoose";
// Define the RatingAndReview schema
const ratingAndReviewSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "user",
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
	library: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Library",
	},
});

const RatingAndReview = mongoose.model("RatingAndReview", ratingAndReviewSchema);
export default RatingAndReview;
