import asyncHandler from "../handlers/wrapAsyncHandler.js";
import User from "../models/Libraryowner.js";

export const getUser = asyncHandler(async (req, res) => {
    const userData = await User.find({});
    res.json({ success: true, data: userData });
});
