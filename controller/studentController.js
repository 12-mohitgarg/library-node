const Student = require("../models/Student");
exports.addStudent = async (req, res) => {
    try {
       
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
};
