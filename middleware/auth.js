import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Student from "../models/Student.js";
import Admin from "../models/Admin.js";
import Libraryowner from "../models/Libraryowner.js";
import Instructor from "../models/Instructor.js";


dotenv.config();

 export const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: `Token Missing` });
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = decode;
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "token is invalid" });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `Something Went Wrong While Validating the Token`,
    });
  }
};


export const isStudent = async (req, res, next) => {
  try {
    const userDetails = await Student.findOne({ phoneNumber: req.user.phoneNumber });

    if (userDetails.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Students",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};


export const isAdmin = async (req, res, next) => {
  try {
    const userDetails = await Admin.findOne({ email: req.user.email });

    if (userDetails.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Admin",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};


export const isInstructor = async (req, res, next) => {
  try {
    const userDetails = await Instructor.findOne({ email: req.user.email });
    console.log(userDetails);

    console.log(userDetails.accountType);

    if (userDetails.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Instructor",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};

export const isLibraryowner = async (req, res, next) => {
  try {
    const userDetails = await Libraryowner.findOne({ email: req.user.email });
    console.log(userDetails);

    console.log(userDetails.accountType);

    if (userDetails.accountType !== "LibraryOwner") {
      return res.status(401).json({
        success: false,
        message: "This is a Protected Route for Library Owner",
      });
    }
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `User Role Can't be Verified` });
  }
};
