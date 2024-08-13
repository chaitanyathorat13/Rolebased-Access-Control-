import generalCreateModelMethod from "./general/createQueries.js";
import generalFindModelMethod from "./general/findQueries.js";

import Role from "../models/role.model.js";

const { addNew } = generalCreateModelMethod(Role);
const { findOne, findById, getAllRecords, getFilteredRecords } =
  generalFindModelMethod(Role);

const createRole = async (data) => addNew(data);

const findRoleById = async (id) =>
  findById({
    id,
  });

const findAllRoles = async () => getAllRecords();

const findUserByRoleName = async (roleName) =>
  findOne({
    filter: { roleName },
  });

const findRoles = async (filter, populateOptions = "") =>
  getFilteredRecords({
    filter,
    populateOptions,
  });

export {
  createRole,
  findRoleById,
  findAllRoles,
  findRoles,
  findUserByRoleName,
};
