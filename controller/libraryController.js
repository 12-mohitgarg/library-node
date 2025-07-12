const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import {User as LibraryOwner} from "../models/Libraryowner";


exports.addlibraryowner = async (req, res) => {
    try {
        const {id , name, email, phoneNumber, password , image, panNumber , aadhaarNumber  } = req.body;

        if(!email || !name || !phoneNumber  || !password ){
           return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }


        if(id){
            const existingAdmin = await LibraryOwner.findById(id);
            if(!existingAdmin){
                return res.status(404).json({
                    success: false,
                    message: "library not found"
                });
            }
            
            existingAdmin.name = name || existingAdmin.name;
            existingAdmin.email = email || existingAdmin.email;
            existingAdmin.phoneNumber = phoneNumber || existingAdmin.phoneNumber;
            existingAdmin.image = image || existingAdmin.image;
            existingAdmin.kycDetails.panNumber = panNumber || existingAdmin.kycDetails.panNumber;
            existingAdmin.kycDetails.aadhaarNumber = aadhaarNumber || existingAdmin.kycDetails.aadhaarNumber;

            const updatedAdmin = await existingAdmin.save();
            return res.status(200).json({
                success: true,
                message: "Library owner updated successfully",
                data: updatedAdmin
            });
        }

        
        const admindata = await LibraryOwner.findOne({
            email: email
        })
        const admindata1 = await LibraryOwner.findOne({
            phoneNumber: phoneNumber
        })

        if(admindata || admindata1){
            return res.status(400).json({
                success: false,
                message: "library owner already exists"
            });
        }


        const encryptedPassword = await bcrypt.hash(password, 10);
        const newLibrary = await LibraryOwner.create({
            name,
            email,
            phoneNumber,
            password:encryptedPassword,
            image :image || null,
            kycDetails:{
                panNumber: panNumber || null,
            aadhaarNumber : aadhaarNumber || null
            }
        });

    

        res.status(201).json({
            success: true,
            message: "library created successfully",
            data: newAdmin
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};


exports.getlibraryowner = async (req, res) => {
    try {
        const libraryOwners = await LibraryOwner.find({ accountType: "LibraryOwner" });

        if(libraryOwners.length === 0){
            return res.status(404).json({
                success: false,
                message: "No library owners found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Library owners fetched successfully",
            data: libraryOwners
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};



exports.getlibraryownerbyid = async (req, res) => {
    try {
        const id  = req.user.id;

        const libraryOwner = await LibraryOwner.findById(id);

        if(!libraryOwner){
            return res.status(404).json({
                success: false,
                message: "Library owner not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Library owner fetched successfully",
            data: libraryOwner
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};


exports.deletelibraryowner = async (req, res) => {
    try {
        const { id } = req.user.id;

        const libraryOwner = await LibraryOwner.findById(id);

        if(!libraryOwner){
            return res.status(404).json({
                success: false,
                message: "Library owner not found"
            });
        }

        await LibraryOwner.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Library owner deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};


exports.addpaymentdetails = async (req, res) => {
    try {


        const { id, accountHolderName, accountNumber, ifscCode, bankName, upiId } = req.body;

       if (
  !id || 
  ( 
    !upiId && 
    (!accountHolderName || !accountNumber || !ifscCode || !bankName)
  )
) {
  return res.status(400).json({
    success: false,
    message: "Please provide either complete bank details or a UPI ID",
  });
}


        const libraryOwner = await LibraryOwner.findById(id);

        if(!libraryOwner){
            return res.status(404).json({
                success: false,
                message: "Library owner not found"
            });
        }

        libraryOwner.paymentDetails = {
            accountHolderName : accountHolderName || libraryOwner.paymentDetails.accountHolderName,
            accountNumber : accountNumber || libraryOwner.paymentDetails.accountNumber,
            ifscCode : ifscCode || libraryOwner.paymentDetails.ifscCode,
            bankName : bankName || libraryOwner.paymentDetails.bankName,
            upiId : upiId || libraryOwner.paymentDetails.upiId
        };

        const updatedLibraryOwner = await libraryOwner.save();

        res.status(200).json({
            success: true,
            message: "Payment details added successfully",
            data: updatedLibraryOwner
        });

    }catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};



exports.addlibraryseats = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.loginlibrary = async (req, res) => {
    try {

        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            });
        }

        const adminData = await LibraryOwner.findOne({ email });

        if(!adminData){
            return res.status(400).json({
                success: false,
                message: "Admin not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, adminData.password);

        if(!isPasswordValid){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token =  jwt.sign(
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

    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
