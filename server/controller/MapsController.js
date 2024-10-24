const Map = require("../models/Maps");

//create map data
const createMapData = async (req, res) => {
  const { species, position } = req.body;

  try {
    const maps = await Map.create({
      species,
      position,
    });

    return res.status(201).json({
      map: maps,
      status: true,
      message: "Successfully created Maps data!",
    });
  } catch (error) {
    console.log("Error ssaving maps data");
    return res.status(500).json({
      error: "Internal Server Error",
      status: false,
      message: "Error creating maps data",
    });
  }
};

//get all maps data
const getAllMapsData = async (req, res) => {
  try {
    const maps = await Map.find().populate("species");
    return res.json(maps);
  } catch (error) {
    console.log("Error fetching maps data");
    return res.status(500).json({
      error: "Internal Server Error",
      status: false,
      message: "Error fetching maps data",
    });
  }
};

//get maps data by id
const getMapsDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const map = await Map.findById(id);
    return res.json(map);
  } catch (error) {
    console.log("Error fetching maps data by id");
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//update maps data
const updateMapsData = async (req, res) => {
  try {
    const id = req.params.id;
    const { position, speciesId } = req.body.data || {};

    if (!id) {
      return res.status(400).json({ message: "Id is required!" });
    }

    const updatedMaps = await Map.findByIdAndUpdate(id, {
      position,
      speciesId,
    });

    if (!updatedMaps) {
      return res.status(404).json({ message: "Maps not found!" });
    }

    return res.json({
      map: updatedMaps,
      status: true,
      message: "Successfully updated maps data",
    });
  } catch (error) {
    console.log("Error Updating Maps Data", error);
    return res.status(500).json({
      error: "Internal Server Error",
      status: false,
      mmessage: "Error updating maps data",
    });
  }
};

//delete maps data
const deleteMapsData = async (req, res) => {
  try {
    const id = req.params.id;
    await Map.findByIdAndDelete(id);
    return res.json({
      id,
      status: true,
      message: "Successfully Deleted Maps Data",
    });
  } catch (error) {
    console.log("Error deleting Map Data", error);
    res.status(500).json({
      error: "Internal Server Error",
      status: false,
      message: "Error deleting map data",
    });
  }
};

module.exports = {
  createMapData,
  getAllMapsData,
  getMapsDataById,
  updateMapsData,
  deleteMapsData,
};
