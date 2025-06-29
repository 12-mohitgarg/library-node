
const mongoose = require("mongoose")

const slotSchema = new mongoose.Schema(
  {

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
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
      required: true,
    },


  },
  { timestamps: true }
)

module.exports = mongoose.model("Slot", slotSchema)
