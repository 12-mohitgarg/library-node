import mongoose from "mongoose";

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


const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
