// export const deleteById = async (Model, id) => {
//   return await Model.findByIdAndDelete(id);
// };

function generalDeleteModelMethod(Model) {
  const deleteById = async (id) => {
    console.log(id);
    return Model.findByIdAndDelete(id);
  };

  return { deleteById };
}

export default generalDeleteModelMethod;
