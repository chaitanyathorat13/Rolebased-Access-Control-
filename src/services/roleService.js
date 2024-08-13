import * as roleDataAccess from "../dataAccess/roleDataAccess.js";
import AppError from "../utils/appError.js";

 export const createRole = async (roleName) => {
  const existingRole = await roleDataAccess.findUserByRoleName(roleName);
  if (existingRole) {
    throw new AppError(400, "RoleName already exist..");
  }
  const role = await roleDataAccess.createRole({
    roleName,
  });
  return role;
};
