import Student from "../models/Student.js";
import Seat from "../models/Seat.js";
import Order from "../models/Order.js";
import bcrypt from "bcryptjs";
import Razorpay from "razorpay";
import crypto from "crypto";
import asyncHandler from "../handlers/wrapAsyncHandler.js";

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

export const signupStudent = asyncHandler(async (req, res) => {
    const { name, phoneNumber, password, confirmPassword } = req.body;

    if (!name || !phoneNumber || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields",
        });
    }

    const data = await Student.findOne({
        phoneNumber: phoneNumber,
    });

    if (data) {
        return res.status(401).json({
            success: false,
            message: "number is already exist",
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Passwords do not match",
        });
    }

    const hashpass = await bcrypt.hash(password, 10);

    const student = await Student.create({
        name,
        phoneNumber,
        password: hashpass,
    });

    return res.status(200).json({
        success: true,
        message: "student add successfully",
    });
});

export const loginstudent = asyncHandler(async (req, res) => {
    const { phoneNumber, password, fcm_token } = req.body;

    if (!phoneNumber || !password || !fcm_token) {
        return res.status(400).json({
            success: false,
            message: "please fill all details",
        });
    }

    const user = await Student.findOne({
        phoneNumber: phoneNumber,
    });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Please sign up first",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials",
        });
    }

    const token = jwt.sign(
        {
            phoneNumber: user.phoneNumber,
            id: user._id,
            accountType: user.accountType,
        },
        process.env.JWT_SECRET
    );

    user.token = token;
    user.fcm_token = fcm_token;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Login successfully",
        data: user,
        token: token,
    });
});

export const getSubscribedSeats = asyncHandler(async (req, res) => {
    const studentId = req.user.id;

    if (!studentId) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid student ID",
        });
    }

    const student = await Student.findById(studentId).populate({
        path: "seat.seatId",
        model: "Seat",
    });

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found",
        });
    }

    const activeSeats = student.seat.filter((seatObj) => {
        return seatObj.expiresAt && new Date(seatObj.expiresAt) > new Date();
    });

    res.status(200).json({
        success: true,
        data: activeSeats,
    });
});

export const paynow = asyncHandler(async (req, res) => {
    const { seatId, expiresAt } = req.body;
    const studentId = req.user.id;

    if (!seatId || !expiresAt) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields",
        });
    }

    const seat = await Seat.findById(seatId);

    if (!seat) {
        return res.status(404).json({
            success: false,
            message: "seat not found",
        });
    }

    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found",
        });
    }

    order;

    const options = {
        amount: seat.amount * 100, // Razorpay uses paise
        currency: "INR",
        receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    const orderrecipt = options.receipt;
    const order = await razorpayInstance.orders.create(options);

    const orderdata = await Order.create({
        orderId: order.id,
        studentId: studentId,
        libraryId: seat.libraryId,
        seatId: seatId,
        receipt: orderrecipt,
        amount: seat.amount,
    });

    return res.status(200).json({
        success: true,
        message: "Order created successfully",
        data: order,
        orderId: order.id,
    });
});

export const addseatsubscription = asyncHandler(async (req, res) => {
    const { seatId, expiresAt, trasnsctionId, orderId } = req.body;
    const studentId = req.user.id;

    if (!seatId || !expiresAt || !trasnsctionId || !orderId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required fields",
        });
    }

    const seat = await Seat.findById(seatId);

    if (!seat) {
        return res.status(404).json({
            success: false,
            message: "seat not found",
        });
    }

    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found",
        });
    }

    if (seat.status !== "Active" || seat.isBooked) {
        return res.status(400).json({
            success: false,
            message: "Seat is not available for subscription",
        });
    }

    const order = await Order.findOne(orderId);

    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found",
        });
    }

    student.seat.push({ seatId, expiresAt });
    await student.save();

    seat.isBooked = true;
    seat.subscribedBy = studentId;
    seat.subscriptionEnd = expiresAt;
    seat.status = "Reserved";
    await seat.save();

    order.trasnsctionId = trasnsctionId;
    order.status = "Completed";
    await order.save();

    res.status(200).json({
        success: true,
        message: "Seat subscription added successfully",
        data: student.seat,
    });
});

export const getStudentorderdata = asyncHandler(async (req, res) => {
    const studentId = req.user.id;

    if (!studentId) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid student ID",
        });
    }

    const orders = await Order.find({ studentId: studentId })
        .populate("seatId")
        .populate("Student")
        .populate("Library");

    if (!orders || orders.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No orders found for this student",
        });
    }

    res.status(200).json({
        success: true,
        data: orders,
    });
});
