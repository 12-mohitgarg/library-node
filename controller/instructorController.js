const Instructor = require("../models/Instructor");
exports.addInstructor = async (req, res) => {
    try {
       
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
