import Notification from "../models/Notification.js";
import Student from "../models/Student.js";
import Libraryowner from "../models/Libraryowner.js";
import mongoose from "mongoose";
import asyncHandler from "../handlers/wrapAsyncHandler.js";

export const addNotificationtostudent = asyncHandler(async (req, res) => {
    const { user_id, title, body, scheduleTime } = req.body;

    if (!user_id || !title || !body || !scheduleTime) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields",
        });
    }

    const student = await Student.findById(user_id);
    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found",
        });
    }

    const newNotification = await Notification.create({
        user_id,
        title,
        body,
        scheduleTime,
    });

    res.status(201).json({
        success: true,
        message: "Notification created successfully",
        data: newNotification,
    });
});

export const getstudentAllNotifications = asyncHandler(async (req, res) => {
    const id = req.user.id;

    const data = await Notification.find({ user_id: id }).sort({
        createdAt: -1,
    });

    return res.status(200).json({
        success: true,
        message: "All notification data get successfully",
        data: data,
    });
});

export const addNotificationtolibraryowner = asyncHandler(async (req, res) => {
    const { owner_id, title, body } = req.body;

    if (!owner_id || !title || !body) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields",
        });
    }

    const student = await Libraryowner.findById(owner_id);
    if (!student) {
        return res.status(404).json({
            success: false,
            message: "owner not found",
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
        data: newNotification,
    });
});
