const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Student = require("../models/Student");
const Admin = require("../models/Admin");
const Libraryowner = require("../models/Libraryowner");
const Instructor = require("../models/Instructor");

dotenv.config();

exports.auth = async (req, res, next) => {
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


exports.isStudent = async (req, res, next) => {
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


exports.isAdmin = async (req, res, next) => {
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


exports.isInstructor = async (req, res, next) => {
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

exports.isLibraryowner = async (req, res, next) => {
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
