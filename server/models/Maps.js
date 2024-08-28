const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const PositionSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const MapSchema = new Schema(
  {
    position: { type: PositionSchema },
    species: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Species",
      required: true,
    },
  },
  { timestamps: true }
);

const Map = mongoose.model("Map", MapSchema);

module.exports = Map;
