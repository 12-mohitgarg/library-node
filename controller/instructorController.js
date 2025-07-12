const Instructor = require("../models/Instructor.js");
exports.addInstructor = async (req, res) => {
    try {
       
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
