import Permission from "../models/permission.model.js";

export const addPermission = async (req, res, next) => {
  try {
    const { name, methods } = req.body;
    let permission = await Permission.findOne({ name });

    if (permission) {
      return res.status(400).json({ message: "Permission already exists" });
    }

    permission = new Permission({ name, methods });
    await permission.save();
    res
      .status(201)
      .json({ message: "Permission added successfully", permission });
  } catch (error) {
    next(error);
  }
};

export const getPermissions = async (req, res, next) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    next(error);
  }
};
