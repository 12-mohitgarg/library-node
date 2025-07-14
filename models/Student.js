import mongoose from "mongoose";
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    
    },
    active: {
      type: Boolean,
      default: true,
    },
  
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    seat: [
      {
        seatId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Seat",
         
        },
        expiresAt: {
          type: Date,
        
        },
      },
    ],
    token: {
      type: String,
    },
    fcm_token: {
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
      default: "Student",
    },
  },
  { timestamps: true }
)

const Student = mongoose.model("Student", studentSchema);
export default Student;
