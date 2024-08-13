import Role from "../models/role.model.js";
import Permission from "../models/permission.model.js";

export const createRole = async (req, res, next) => {
  try {
    const { roleName, roleDescription } = req.body;
    let role = await Role.findOne({ roleName });

    if (role) {
      return res.status(400).json({ message: "Role already exists" });
    }

    role = new Role({ roleName, roleDescription });
    await role.save();
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    next(error);
  }
};

export const assignPermissionsToRole = async (req, res, next) => {
  try {
    const { roleName, permissions } = req.body;
    const role = await Role.findOne({ roleName });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const permissionDocs = await Permission.find({
      name: { $in: permissions },
    });

    if (permissionDocs.length !== permissions.length) {
      return res
        .status(400)
        .json({ message: "Some permissions were not found" });
    }

    role.permissions = permissionDocs.map((p) => p._id);
    await role.save();

    const roleWithMethods = {
      ...role.toObject(),
      methods: permissionDocs.reduce((acc, permission) => {
        return acc.concat(permission.methods);
      }, []),
    };

    res
      .status(200)
      .json({
        message: "Permissions assigned to role successfully",
        role: roleWithMethods,
      });
  } catch (error) {
    next(error);
  }
};

export const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find().populate("permissions");
    const rolesWithMethods = roles.map((role) => ({
      ...role.toObject(),
      methods: role.permissions.reduce((acc, permission) => {
        return acc.concat(permission.methods);
      }, []),
    }));

    res.status(200).json(rolesWithMethods);
  } catch (error) {
    next(error);
  }
};

export const getRoleWithMethods = async (req, res, next) => {
  try {
    const roleName = req.params.roleName;
    const role = await Role.findOne({ roleName }).populate("permissions");

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    const roleWithMethods = {
      ...role.toObject(),
      methods: role.permissions.reduce((acc, permission) => {
        return acc.concat(permission.methods);
      }, []),
    };

    res.status(200).json(roleWithMethods);
  } catch (error) {
    next(error);
  }
};
