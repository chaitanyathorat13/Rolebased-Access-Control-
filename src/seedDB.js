// import mongoose from "mongoose";
// import Permission from "./models/permission.model.js";
// import Role from "./models/role.model.js";

// const permissions = [{ name: "manage_permissions" }];

// //as you seeing that we are explicitly giving permission names and we are assigning  to roles like admin , librarian and students explicitly , we want to add these permissions by admin and then admin will assign permissions roles like  student and librariand

// const roles = [
//   {
//     roleName: "Admin",
//     permissions: ["manage_permissions"],
//   },
//   {
//     roleName: "Librarian",
//     permissions: [ ],
//   },
//   {
//     roleName: "Student",
//     permissions: [], 
//   },
// ];

// const insertPermissions = async () => {
//   const insertedPermissions = [];
//   for (const permission of permissions) {
//     let permissionDoc = await Permission.findOne({ name: permission.name });
//     if (!permissionDoc) {
//       permissionDoc = new Permission(permission);
//       await permissionDoc.save();
//     }
//     insertedPermissions.push(permissionDoc);
//   }
//   return insertedPermissions;
// };

// const insertRoles = async (insertedPermissions) => {
//   for (const role of roles) {
//     // Find the role by its name
//     let roleDoc = await Role.findOne({ roleName: role.roleName });

//     // Get the list of permission names for the current role
//     const rolePermissionsNames = role.permissions;

//     // Filter the insertedPermissions to include only those that are in the role's permissions list
//     const rolePermissions = insertedPermissions.filter((p) =>
//       rolePermissionsNames.includes(p.name)
//     );

//     // Check if roleDoc exists
//     if (roleDoc) {
//       // Update the existing role with the new permissions
//       const newPermissionIds = rolePermissions.map((p) => p._id);
//       await Role.updateOne(
//         { roleName: role.roleName },
//         { $set: { permissions: newPermissionIds } }
//       );
//     } else {
//       // If role doesn't exist, create a new role with the permissions
//       roleDoc = new Role({
//         roleName: role.roleName,
//         permissions: rolePermissions.map((p) => p._id),
//       });
//       await roleDoc.save();
//     }
//   }
// };

// export const seedDatabase = async () => {
//   const insertedPermissions = await insertPermissions();
//   await insertRoles(insertedPermissions);
// };
