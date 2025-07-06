const Notification = require("../models/Notification");
const Student = require("../models/Student");
const Libraryowner = require("../models/Libraryowner");
const mongoose = require("mongoose");

exports.addNotificationtostudent = async (req, res) => {
    try {
        const { user_id, title, body, scheduleTime } = req.body;

        if (!user_id || !title || !body || !scheduleTime) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }

        const student = await Student.findById(user_id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const newNotification = await Notification.create({
            user_id,
            title,
            body,
            scheduleTime
        });

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: newNotification
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

exports.getstudentAllNotifications = async (req, res) => {
    try {

        const id = req.user.id

        const data = await Notification.find({ user_id: id }).sort({ createdAt: -1 });

        return res.status(200).json({
            success:true,
            message:'All notification data get suuccessfully',
            data:data
        })
        
    } catch (error) {
        
    }
}

exports.addNotificationtolibraryowner = async (req, res) => {
    try {
        const { owner_id, title, body } = req.body;

        if (!owner_id || !title || !body ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }

        const student = await Libraryowner.findById(owner_id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "owner not found"
            });
        }

        const newNotification = await Notification.create({
            library_owner_id: owner_id,
            title,
            body,
            
        });

        res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: newNotification
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

