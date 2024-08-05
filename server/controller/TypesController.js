const Types = require("../models/Types");

//create types data
const createTypesData = async (req, res) => {
  try {
    const { name, type_id, icon } = req.body;
    const types = await Types.create({ name, type_id, icon });
    res.json({ types });
  } catch (error) {
    console.log("Error Creating Types Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all types data
const getAllTypesData = async (req, res) => {
  try {
    const types = await Types.find();
    res.json({ types });
  } catch (error) {
    console.log("Error Fetching All Types Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get types data by id
const getTypesDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const types = await Types.findById(id);

    res.json({ types });
  } catch (error) {
    console.log("Error Fetching Types Data By Id", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update types data
const updateTypesData = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Types.findByIdAndUpdate(id, { name, type_id, icon });
    console.log("updated types data", data);

    const types = await Types.findById(id);
    res.json({ types });
  } catch (error) {
    console.log("Error Updating Types Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
//delete types data
const deleteTypesData = async (req, res) => {
  try {
    const id = req.params.id;
    await Types.findByIdAndDelete(id);
    res.json({ success: "Successfully Deleted Types Data Id: ", id });
  } catch (error) {
    console.log("Error Deleting Types Data: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTypesData,
  getAllTypesData,
  getTypesDataById,
  updateTypesData,
  deleteTypesData,
};
