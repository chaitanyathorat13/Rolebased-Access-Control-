// import User from "../models/user.models.js";

// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.session.user.id).populate("roleIds");
//     const isAdmin = user.roleIds.some(role => role.roleName === "Admin");

//     if (!isAdmin) {
//       return res.status(403).json({ message: "Access denied" });
//     }   

//     next();
//   } catch (err) {
//     next(err);
//   }
// };           
