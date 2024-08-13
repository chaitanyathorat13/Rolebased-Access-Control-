import * as authService from "../services/authService.js";
import AppError from "../utils/appError.js";
import ApiResponse from "../utils/apiRespnose.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  //basic validation need to change
  const { fname, lname, email, password, role } = req.body;

  if (!(fname && lname && email && password && role)) {
    throw new AppError(400, "All fields are required....");
  }
  console.log("inside register controller...");
  const user = await authService.registerUser(
    fname,
    lname,
    email,
    password,
    role
  );
  console.log(user);

  return res.send(new ApiResponse(200, user, "registration sucessful..."));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //basic validation need to change
  if (!(email && password)) {
    throw AppError(400, "all fields are required...");
  }

  const user = await authService.loginUser(email, password);
  req.session.user = {
    id: user._id,
    email: user.email,
    roleIds: user.roleIds,
  };
  console.log(req.session.user);
  res.send(new ApiResponse(200, user, "Login Sucessful..."));
});

export const logout = (req, res) => {
  res.clearCookie("connect.sid");
  const userEmail = req?.session.user.email;
  req.session.destroy((err) => {
    if (err) {
      throw new AppError(500, "Logout failed");
    }
    res.send(
      new ApiResponse(200, [], `${userEmail} is logged out sucessfully....`)
    );
  });
};
