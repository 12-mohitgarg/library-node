
const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema(
  {

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      required: true,
    
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
      default: "0", // 0 for send, 1 for not send
    },


  },
  { timestamps: true }
)

module.exports = mongoose.model("Notification", notificationSchema)
