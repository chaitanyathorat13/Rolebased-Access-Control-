import bcrypt from "bcryptjs";
import User from "./models/user.models.js";
import Role from "./models/role.model.js";
import Permission from "./models/permission.model.js";

const createAdminUser = async () => {
  const email = "chaitanyarameshthorat2@gmail.com";
  const adminRoleName = "Admin";
  const adminDescription = "Admin user has all rights to handle";
  const adminPermissions = [
    {
      name: "manage_roles",
      methods: [
        {
          methodName: "createRole",
          routes: ["/roles/create"],
        },
        {
          methodName: "assignPermissionsToRole",
          routes: ["/roles/assign-permissions"],
        },
      ],
    },
    {
      name: "view_roles",
      methods: [
        {
          methodName: "getRoles",
          routes: ["/roles"],
        },
        {
          methodName: "getRoleWithMethods",
          routes: ["/roles/:roleName/methods"],
        },
      ],
    },
    {
      name: "manage_permissions",
      methods: [
        {
          methodName: "addPermission",
          routes: ["/permissions/add"],
        },
      ],
    },
    {
      name: "view_permissions",
      methods: [
        {
          methodName: "getPermissions",
          routes: ["/permissions"],
        },
      ],
    },
  ];

  let user = await User.findOne({ email });
  console.log("In Create Admin user, Already user Present:", user);

  // Check if the Admin role is present, if not create it with permissions and methods
  let adminRole = await Role.findOne({ roleName: adminRoleName });

  if (!adminRole) {
    // Create permissions and associate methods
    const permissionDocs = await Promise.all(
      adminPermissions.map(async (permissionData) => {
        let permission = await Permission.findOne({
          name: permissionData.name,
        });
        if (!permission) {
          permission = new Permission({
            name: permissionData.name,
            methods: permissionData.methods,
          });
          await permission.save();
        }
        return permission;
      })
    );

    adminRole = new Role({
      roleName: adminRoleName,
      roleDescription: adminDescription,
      permissions: permissionDocs.map((p) => p._id),
    });
    await adminRole.save();
    console.log("Admin role created");
  }
  console.log("Admin Role is", adminRole);

  // If admin user is not present then create admin user and assign admin role
  if (!user) {
    const password = await bcrypt.hash("adminPassword", 10);
    user = new User({
      fname: "CRT",
      lname: "KING",
      email,
      password,
      status: "active",
      roleIds: [adminRole._id],
    });
    await user.save();
    console.log(user);
    console.log("Admin user created");
  } else {
    // If the Admin user exists, ensure it has the Admin role
    if (!user.roleIds.includes(adminRole._id)) {
      user.roleIds.push(adminRole._id);
      await user.save();
      console.log("Admin role assigned to existing admin user");
    } else {
      console.log("Admin user already exists with Admin role");
    }
  }
};

export { createAdminUser };
