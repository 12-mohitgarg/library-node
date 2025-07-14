import mongoose from "mongoose";

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

const City = mongoose.model("City", citySchema);
export default City;