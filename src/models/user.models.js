import { Schema, model, mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    borrowedBooks: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("rolesPermissions").get(function () {
  return this.roleIds.map((role) => ({
    roleName: role.roleName,
    permissions: role.permissions.map((permission) => permission.name),
  }));
});

const User = model("User", userSchema);
export default User;

/**
 * User Model
 * fname: The first name of the user
 * lname: The last name of the user
 * email: The email address of the user (must be unique)
 * password: The password for the user account
 * roleIds: Array of role references associated with this user
 * borrowedBooks: Number of books borrowed by the user
 * status: Status of the user (active or inactive)
 *
 * Example:
 * User {
 *   fname: "John",
 *   lname: "Doe",
 *   email: "john.doe@example.com",
 *   password: "hashedpassword",
 *   roleIds: [
 *     {
 *       "_id": "60f7f89b6e833c17c8b8d82b",
 *       "roleName": "Admin",
 *       "permissions": [
 *         {
 *           "_id": "60f7f89b6e833c17c8b8d829",
 *           "name": "manage_users"
 *         },
 *         {
 *           "_id": "60f7f89b6e833c17c8b8d82a",
 *           "name": "manage_books"
 *         }
 *       ],
 *       "roleTag": "ADMIN"
 *     }
 *   ],
 *   borrowedBooks: 0,
 *   status: "active",
 *   rolesPermissions: [
 *     {
 *       roleName: "Admin",
 *       permissions: ["manage_users", "manage_books"]
 *     }
 *   ]
 * }
 */
