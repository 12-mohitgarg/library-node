
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
  {

    email: {
      type: String,
      required: true,
      trim: true,
    },
   
    password: {
      type: String,
      required: true,
    },

    accountType: {
      type: String,
      default: "Admin",
    },


  },
  { timestamps: true }
)

module.exports = mongoose.model("Admin", adminSchema)
