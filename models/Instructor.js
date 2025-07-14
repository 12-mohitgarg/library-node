import mongoose from "mongoose";

// Define the user schema using the Mongoose Schema constructor
const instructorSchema = new mongoose.Schema(
  {
    // Define the name field with type String, required, and trimmed
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    // Define the email field with type String, required, and trimmed
    email: {
      type: String,
      required: true,
      trim: true,
    },

    // Define the password field with type String and required
    password: {
      type: String,
      required: true,
    },
  
    active: {
      type: Boolean,
      default: true,
    },
    approved: {
      type: Boolean,
      default: true,
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    token: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    image: {
      type: String,
    },
     accountType: {
      type: String,
      default: "Instructor",
    },

  },
  { timestamps: true }
)


const Instructor = mongoose.model("Instructor", instructorSchema);
export default Instructor;
