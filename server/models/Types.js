const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const TypeSchema = new Schema(
  {
    name: String,
    type_id: Number,
    icon: String,
  },
  {
    timestamps: true,
  }
);

const Types = mongoose.model("Types", TypeSchema);

module.exports = Types;
