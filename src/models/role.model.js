import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
    },
    roleDescription: {
      type: String,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],
    roleTag: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware to automatically generate a role tag
roleSchema.pre("save", function (next) {
  const roleTag = this.roleName.split(" ").join("_").toUpperCase();
  this.roleTag = roleTag;
  next();
});

const Role = mongoose.model("Role", roleSchema);
export default Role;

/*
 * Example:
 * Role {
 *   roleName: "Admin",
 *   permissions: [
 *     ObjectId("permissionId1"),
 *     ObjectId("permissionId2")
 *   ],
 *   roleTag: "ADMIN"
 * }
 */
