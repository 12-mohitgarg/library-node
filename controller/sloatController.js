import asyncHandler from "../handlers/wrapAsyncHandler.js";
import Slot from "../models/Slots.js";
import mongoose from "mongoose";

export const addSlot = asyncHandler(async (req, res) => {
   
        const { start, end } = req.body;

        if (!start || !end ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }

        const newSlot = await Slot.create({
            timeSlot: {
                start: new Date(start),
                end: new Date(end)
            },
            
        });

        res.status(201).json({
            success: true,
            message: "Slot created successfully",
            data: newSlot
        });
});


export const getAllSlots =asyncHandler( async (req, res) => {
        const slots = await Slot.find();

        if (!slots || slots.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No slots found"
            });
        }

        res.status(200).json({
            success: true,
            data: slots
        });
    
});

