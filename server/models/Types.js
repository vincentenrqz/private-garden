const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const IconSchema = new Schema({
  iconUrl: String,
  iconSize: [Number],
  iconAnchor: [Number],
  popupAnchor: [Number],
  tooltipAnchor: [Number],
  shadowUrl: String,
  shadowSize: [Number],
});

const TypeSchema = new Schema(
  {
    name: { type: String, required: true },
    icons: [IconSchema],
  },
  {
    timestamps: true,
  }
);

const Types = mongoose.model("Types", TypeSchema);

module.exports = Types;
