
const mongoose = require("mongoose")

const citySchema = new mongoose.Schema(
  {

    city_name: {
      type: String,
      required: true,
      trim: true,
    },
   
    status: {
       type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },


  },
  { timestamps: true }
)

module.exports = mongoose.model("City", citySchema)
