import User from "../models/user.models.js";

export function authorize(requiredPermissions) {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.session.user.id).populate({
        path: "roleIds",
        populate: {
          path: "permissions",
          populate: {
            path: "methods",
            model: "Permission",
          },
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userPermissions = user.roleIds.reduce((permissions, role) => {
        return permissions.concat(role.permissions.map((p) => p.name));
      }, []);

      const hasPermission = requiredPermissions.every((permission) =>
        userPermissions.includes(permission)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (err) {
      next(err);
    }
  };
}
