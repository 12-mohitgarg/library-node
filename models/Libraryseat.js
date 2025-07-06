const mongoose = require("mongoose");

const libraryseatSchema = new mongoose.Schema(
  {
    seatNumber: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    libraryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Library", 
      required: true,
    },
    timeSlot: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    status:{
      type:String,
       enum: ["Active", "Inactive", "Blocked", "Maintenance", "Reserved", "Unavailable"],
      default: "Active",
    },
    subscribedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", 
      default: null,
    },
    subscriptionEnd: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seat", libraryseatSchema);
