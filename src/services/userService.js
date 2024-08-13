// import { create } from "../dataAccess/general/createQueries.js";
import * as userDataAccess from "../dataAccess/userDataAccess.js";

export const getUsers = async () => {
  return await userDataAccess.findAllUsers();
};

export const getUserById = async (userId) => {
  const user = await userDataAccess.findUserById(userId);
  console.log(user);
  return user;
};

export const userDetails = async (userId) => {
  return await userDataAccess.findUserById(userId);
};

export const findAllUser = async () => {
  return await userDataAccess.findAllUsers();
};
