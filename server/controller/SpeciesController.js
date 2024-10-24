const Species = require("../models/Species");

//create species data
const createSpeciesData = async (req, res) => {
  const { data } = req.body;

  try {
    const { name, type } = data;

    if (!type) {
      return res.status(400).json({
        status: false,
        message: "Type is required",
      });
    }

    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Name is required",
      });
    }

    const species = await Species.create({
      ...data,
    });

    return res.status(201).json({
      species: species,
      status: true,
      message: "Successfully created species",
    });
  } catch (error) {
    console.log("Error saving species data", error);
    return res.status(500).json({
      error: "Internal Server Error",
      status: false,
      message: "Error creating species",
    });
  }
};

//get all species data
const getAllSpeciesData = async (req, res) => {
  try {
    const species = await Species.find().sort({ createdAt: -1 });
    return res.json(species);
  } catch (error) {
    console.log("Error fetching species data", error);
    return res.status(500).json({
      error: "Internal Server Error",
      status: false,
      message: "Error fetching species",
    });
  }
};

//get species data by id
const getSpeciesDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const species = await Species.findById(id);

    return res.json(species);
  } catch (error) {
    console.log("Error Fetching Species Data By Id", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update species data
const updateSpeciesData = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body.data;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const updatedSpecies = await Species.findByIdAndUpdate(
      id,
      {
        ...data,
      },
      { new: true }
    );

    if (!updatedSpecies) {
      return res.status(404).json({ message: "Species not found" });
    }

    return res.json({
      species: updatedSpecies,
      status: true,
      message: "Successfully updated species",
    });
  } catch (error) {
    console.log("Error Update Species Data", error);
    return res.status(500).json({
      error: "Internal Server Error",
      status: false,
      message: "Error updating species",
    });
  }
};

//delete species data
const deleteSpeciesData = async (req, res) => {
  try {
    const id = req.params.id;
    await Species.findByIdAndDelete({ _id: id });
    return res.json({
      message: "Successfully Deleted Species",
      id,
      status: true,
    });
  } catch (error) {
    console.log("Error Deleting Species Data", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "Error deleting species",
      status: false,
    });
  }
};

module.exports = {
  createSpeciesData,
  getAllSpeciesData,
  getSpeciesDataById,
  updateSpeciesData,
  deleteSpeciesData,
};
