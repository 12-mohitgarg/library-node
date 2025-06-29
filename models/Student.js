const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
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
    seat: [
      {
        seatId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Seat",
          required: true,
        },
        expiresAt: {
          type: Date,
          required: true,
        },
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
  },
  { timestamps: true }
)

module.exports = mongoose.model("Student", studentSchema)
