import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
   
    methods: [
      {
        methodName: {
          type: String,
          required: true,
        },
        routes: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;

/*
 * Example:
 * Permission {
 *   name: "create_role",
 *   methods: [
 *     {
 *       methodName: "createRole",
 *       routes: ["/roles/create"]
 *     },
 *     {
 *       methodName: "assignPermissionsToRole",
 *       routes: ["/roles/assign-permissions"]
 *     }
 *   ]
 * }
 */
