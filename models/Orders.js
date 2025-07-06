const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {

        orderId: {
            type: String,
            required: true,
            unique: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true,
        },
        libraryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Library",
            required: true,
        },
      
        seatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Seat",
            required: true,
        },
       
        trasnsctionId: {
            type: String,
            
        },
        reciptId: {
            type: String,
            
        },
        amount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["Pending", "Completed", "Cancelled"],
            default: "Pending",
        },
        type:{
            type:String,
            enum:[ 'LibrarySeatBooking'],
            default: 'LibrarySeatBooking',
        }
        
    },

    { timestamps: true },
    );
    
    module.exports = mongoose.model("Order", orderSchema);