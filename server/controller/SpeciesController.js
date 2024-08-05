const Species = require("../models/Species");

//create species data
const createSpeciesData = async (req, res) => {
  try {
    const {
      name,
      sub_name,
      type_id,
      scientific_name,
      description,
      attachments,
    } = req.body;

    const species = await Species.create({
      name,
      sub_name,
      type_id,
      scientific_name,
      description,
      attachments,
    });
    res.json({ species });
  } catch (error) {}
};

//get all species data
const getAllSpeciesData = async (req, res) => {
  try {
    const species = await Species.find();
    res.json(species);
  } catch (error) {
    console.log("Error fetching species data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get species data by id
const getSpeciesDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const species = await Species.findById(id);

    res.json(species);
  } catch (error) {
    console.log("Error Fetching Species Data By Id", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update species data
const updateSpeciesData = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      sub_name,
      type_id,
      species_id,
      scientific_name,
      description,
      attachments,
    } = req.body;
    const data = await Species.findByIdAndUpdate(id, {
      name,
      sub_name,
      scientific_name,
      type_id,
      species_id,
      description,
      attachments,
    });

    console.log("Updated Data", data);
    //Fetch the updated data automatically
    const species = await Species.findById(id);
    res.json({ species });
  } catch (error) {
    console.log("Error Update Species Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete species data
const deleteSpeciesData = async (req, res) => {
  try {
    const id = req.params.id;
    await Species.findByIdAndDelete({ _id: id });

    res.json({ success: "Successfully Deleted Specie Data Id: ", id });
  } catch (error) {
    console.log("Error Deleting Species Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createSpeciesData,
  getAllSpeciesData,
  getSpeciesDataById,
  updateSpeciesData,
  deleteSpeciesData,
};
