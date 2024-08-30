const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const SpeciesSchema = new Schema(
  {
    name: String,
    sub_name: String,
    type: String,
    icon: Object,
    species_id: Number,
    scientific_name: String,
    etymology: String,
    cultural_maintenance: String,
    fun_fact: String,
    description: String,
    attachments: String,
    video: String,
    info: String,
  },
  { timestamps: true }
);

const Species = mongoose.model("Species", SpeciesSchema);

module.exports = Species;
