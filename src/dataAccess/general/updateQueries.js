function generalUpdateModelMethod(Model) {
  const updateOne = async ({ filter, update, options }) => {
    console.log(filter, update);
    return Model.findOneAndUpdate(filter, update, options);
  };

  const updateMany = async ({ filter, update, options }) => {
    return Model.updateMany(filter, update, options);
  };

  return {
    updateOne,
    updateMany,
  };
}


export default generalUpdateModelMethod;
