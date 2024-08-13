// export const addNew = async (Model , data) => {
//   return Model.create(data);
// };

function generalCreateModelMethod(Model) {
    const addNew = async (data) => {
        return Model.create(data);
    };
    return { addNew };
}

export default generalCreateModelMethod;
