// const findOne = async ({ filter, populateOptions, selectFields }) => {
//   console.log(filter);
//   return Model.findOne(filter).select(selectFields).populate(populateOptions);
// };

// const findById = async ({ id, populateOptions, selectFields }) => {
//   return Model.findById(id).select(selectFields).populate(populateOptions);
// };

// const getFilteredRecords = async ({
//   filter,
//   populateOptions,
//   selectOptions,
// }) => {
//   console.log(filter);
//   return Model.find(filter).select(selectOptions).populate(populateOptions);
// };

// const getAllRecords = async ({ populateOptions } = { populateOptions: "" }) => {
//   return Model.find().populate(populateOptions);
// };

function generalFindModelMethod(Model) {
  const findOne = async ({
    filter,
    populateOptions = "",
    selectFields = "",
    sortOptions = {},
  }) => {
    console.log(filter);
    return Model.findOne(filter)
      .select(selectFields)
      .populate(populateOptions)
      .sort(sortOptions);
  };

  const findById = async ({ id, populateOptions, selectFields }) => {
    return Model.findById(id).select(selectFields).populate(populateOptions);
  };

  const getFilteredRecords = async ({
    filter,
    populateOptions = "",
    selectOptions = "",
    sortOptions = {},
  }) => {
    console.log(filter);
    return Model.find(filter)
      .select(selectOptions)
      .populate(populateOptions)
      .sort(sortOptions);
  };

  const getAllRecords = async (
    { populateOptions } = { populateOptions: "" }
  ) => {
    return Model.find().populate(populateOptions);
  };

  return {
    findOne,
    findById,
    getFilteredRecords,
    getAllRecords,
  };
}

export default generalFindModelMethod;
