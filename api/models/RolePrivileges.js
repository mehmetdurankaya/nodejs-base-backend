const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    role_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    permission: {
      type: String,required: true,
    },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);
class RolePrivileges extends mongoose.Model {
  /**
   * Remove documents matching the query.
   * @param {Object} query - The query to find documents to delete.
   */
  static async remove(query) {
    // Correctly call deleteMany on the model itself
    await this.deleteMany({ role_id: query._id });
  }
}
schema.loadClass(RolePrivileges);
module.exports = mongoose.model("role_privileges", schema);
