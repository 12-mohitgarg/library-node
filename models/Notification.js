
import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema(
  {

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      
    
    },
    library_owner_id: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "LibraryOwner",
      
    
    },
    title: {
      type: String,
   
    },
    body: {
      type: String,
    },

    scheduleTime: {
      type: Date,
    },
   
    status: {
       type: String,
      enum: ["0", "1"],
      default: "0",
    },


  },
  { timestamps: true }
)


const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
