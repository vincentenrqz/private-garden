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
    family_name: String,
    eco_class: String,
    type_of_plant_growth: String,
    native_distribution: String,
    native_habitat: String,
    preferred_climate_zone: String,
    growth_form: String,
    trunk: String,
    foliage: String,
    flower: String,
    fruit: String,
    plant_rootzone_tolerance: String,
    light_preference: String,
    water_preference: String,
    pollination: String,
    propagation: String,
    ethnobotanical_uses: String,
    landscape_uses: String,
    thematic_landscaping: String,
  },
  { timestamps: true }
);

const Species = mongoose.model("Species", SpeciesSchema);

module.exports = Species;
