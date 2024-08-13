import { comparePayload, hashPayload } from "../thirdparty/bcrypt.js";
import * as userDataAccess from "../dataAccess/userDataAccess.js";
import AppError from "../utils/appError.js";
import { userController } from "../controllers/index.js";
import Role from "../models/role.model.js";

export const registerUser = async (fname, lname, email, password, role) => {
  const existingUser = await userDataAccess.findUserByEmail(email);
  if (existingUser) {
    throw new AppError(400, "Email is already exists....");
  }
  const roleTag = role.split(" ").join("_").toUpperCase();

  const roleObject = await Role.find({ roleTag: roleTag });
  if (!roleObject) {
    throw new AppError(400, "Role is not exists...");
  }
  const roleIds = roleObject[0]._id;

  const hashedPassword = await hashPayload(password);
  console.log("inside register service");
  const user = await userDataAccess.createUser({
    fname,
    lname,
    email,
    password: hashedPassword,
    roleIds: [roleIds],
  });
  console.log(user);
  return user;
};

export const loginUser = async (email, password) => {
  const user = await userDataAccess.findUserByEmail(email);
  if (!user) {
    throw new AppError(400, "Invalid email or password");
  }

  const isPasswordValid = comparePayload(password, user.password);
  if (!isPasswordValid) {
    throw new AppError(400, "Invalid username or password");
  }

  return user;
};
