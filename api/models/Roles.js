const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    role_name: { type: String, required: true, unique:true},
    is_active: { type: Boolean, default: true },
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
class Roles extends mongoose.Model {
  static async remove(query) {
    if (query._id) {
        // Belirtilen role_id'ye göre RolePrivileges belgelerini sil
        await RolePrivileges.deleteMany({ role_id: query._id });
    }

    // Ana modelden (örneğin, `Roles`) ilgili belgeyi sil
    await Roles.deleteOne(query);
}
}
schema.loadClass(Roles);
module.exports = mongoose.model("roles", schema);
