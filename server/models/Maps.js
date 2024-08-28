const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const PositionSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const MapSchema = new Schema(
  {
    position: { type: PositionSchema },
    data: {
      name: { type: String },
      sub_name: { type: String },
      type: { type: String },
      icon: { type: Object },
      species_id: { type: Number },
      scientific_name: { type: String },
      etymology: { type: String },
      cultural_maintenance: { type: String },
      fun_fact: { type: String },
      description: { type: String },
      attachments: { type: String },
    },
  },
  { timestamps: true }
);

const Map = mongoose.model("Map", MapSchema);

module.exports = Map;
