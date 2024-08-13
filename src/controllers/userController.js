import * as userService from "../services/userService.js";
import ApiResponse from "../utils/apiRespnose.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";

// export const getUsers = async (req, res) => {
//   try {
//     const users = await userService.getUsers();
//     res.status(200).json({ users });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

export const getUserById = asyncHandler(async (req, res) => {
  const userId = req.params?.userId;
  if (!userId) {
    throw new AppError(400, "userid is required....");
  }

  const user = await userService.getUserById(userId);

  res.send(new ApiResponse(200, user));
});

export const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.session.user.id;
  const user = await userService.userDetails(userId);
  res.send(new ApiResponse(200, user));
});

export const getAllUser = asyncHandler(async (req, res) => {
  const allUsers = await userService.findAllUser();
  res.send(new ApiResponse(200, allUsers));
});
