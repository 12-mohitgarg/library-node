import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../handlers/wrapAsyncHandler.js";

export const addAdmin =asyncHandler( async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }
        const admindata = await Admin.findOne({
            email: email
        })

        if (admindata) {
            return res.status(400).json({
                success: false,
                message: "Admin already exists"
            });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            email,
            password: encryptedPassword
        });


        res.status(201).json({
            success: true,
            message: "Admin created successfully",
            data: newAdmin
        });
    
});

export const loginAdmin = asyncHandler(async (req, res) => {
   
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }

        const adminData = await Admin.findOne({ email });

        if (!adminData) {
            return res.status(400).json({
                success: false,
                message: "Admin not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, adminData.password);

        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            {
                email: adminData.email,
                id: adminData._id,
                accountType: adminData.accountType
            },
            process.env.JWT_SECRET,

        );

        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: adminData,
            token: token
        });
   
});


