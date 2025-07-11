const { HTTP_STATUS } = require("../constants/httpStatus");
const { ApiError } = require("../handlers/apiErrorHandler");
const { ApiResponse } = require("../handlers/apiResponseHandler");
const { asyncHandler } = require("../handlers/wrapAsyncHandler");
const User = require("../models/Libraryowner");

exports.createUser = asyncHandler(async (req, res) => {
  const { name, email, title, department, role } = req.body;

  if ([name, email, title, department, role].some((field) => field.trim() === "")) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json(
        new ApiError(
          HTTP_STATUS.BAD_REQUEST,
          "Please fill all fields"
        ));
  }

  const user = await User.create({
    name,
    email,
    title,
    department,
    role,
    image: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
  });

  return res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse(HTTP_STATUS.CREATED, 'User created successfully', user));
});
