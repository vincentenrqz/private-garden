const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const SpeciesSchema = new Schema({
  name: String,
  sub_name: String,
  type_id: Number,
  species_id: Number,
  scientific_name: String,
  description: String,
  attachments: String,
});

const Species = mongoose.model("Species", SpeciesSchema);

module.exports = Species;
