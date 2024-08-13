import User from "../models/user.models.js";

import generalCreateModelMethod from "./general/createQueries.js";
import generalFindModelMethod from "./general/findQueries.js";
import generalUpdateModelMethod from "./general/updateQueries.js";
import generalDeleteModelMethod from "./general/deleteQueries.js";

const { addNew } = generalCreateModelMethod(User);
const { findOne, findById, getAllRecords, getFilteredRecords } =
  generalFindModelMethod(User);
const { updateOne } = generalUpdateModelMethod(User);
const { deleteById } = generalDeleteModelMethod(User);

const createUser = async (data) => addNew(data);

const findUserByUsername = async (username) =>
  findOne({
    filter: { username },
  });

const findUserByEmail = async (email) =>
  findOne({
    filter: { email },
  });

const findUserById = async (id) => findById({ id });

const findAllUsers = async () => getAllRecords();

const updateUserById = async (id, data) =>
  updateOne({
    filter: { _id: id },
    update: data,
    options: { new: true },
  });

const deleteUserById = async (id) =>
  deleteById({
    id,
  });

const findUsers = async (filter, populateOptions = "") =>
  getFilteredRecords({
    filter,
    populateOptions,
  });

// const getFilteredRecords = async ({
//     filter,
//     populateOptions,
//     selectOptions,
//   }) => {
//     console.log(filter);
//     return User.find(filter).select(selectOptions).populate(populateOptions);
//   };

export {
  createUser,
  findUserByUsername,
  findUserByEmail,
  findUserById,
  findAllUsers,
  updateUserById,
  deleteUserById,
  findUsers,
};

// export const createUser = async (data) => create(User, data);

// export const findUserByUsername = async (username) =>
//     findOne(User, { username });

// export const findUserByEmail = async (email) => findOne(User, { email });

// export const findUserById = async (id) => findById(User, id);

// export const findAllUsers = async () => findAll(User);

// export const updateUserById = async (id, data) => updateById(User, id, data);

// export const deleteUserById = async (id) => deleteById(User, id);
