const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const PositionSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const MapSchema = new Schema(
  {
    position: { type: PositionSchema },
    name: String,
    sub_name: String,
    type: String,
    icon: Object,
    species_id: Number,
    scientific_name: String,
    etymology: String,
    description: String,
  },
  { timestamps: true }
);

const Map = mongoose.model("Map", MapSchema);

module.exports = Map;
