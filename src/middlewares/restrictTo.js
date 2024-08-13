import AppError from "../utils/appError.js";
import Role from "../models/role.model.js";

export function restrictTo(...roles) {
  return async (req, res, next) => {
    const user = req.session?.user;
    if (!user) {
      throw AppError(400, "Please Login...");
    }
  
    let sessionRoles = [];
    for (let i = 0; i < user.roleIds.length; i++) {
      sessionRoles[i] = await Role.findById(user.roleIds[i]).select("roleTag");
    }

    const roleTags = sessionRoles.map((roleObject) => roleObject.roleTag);

    for (let i = 0; i < roles.length; i++) {
      if (roleTags.includes(roles[i])) {
        return next();
      }
    }
    return next(new AppError(403, "Unauthorized to access this route"));
  };
}
