const Slot = require("../models/Slots");
const mongoose = require("mongoose");


exports.addSlot = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}


exports.getAllSlots = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

