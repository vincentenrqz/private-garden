const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const TypeSchema = new Schema(
  {
    name: { type: String, required: true },
    icons: [
      {
        iconUrl: String,
        iconSize: [Number],
        iconAnchor: [Number],
        popupAnchor: [Number],
        tooltipAnchor: [Number],
        shadowUrl: String,
        shadowSize: [Number],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Types = mongoose.model("Types", TypeSchema);

module.exports = Types;
