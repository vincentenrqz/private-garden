const Users = require("../models/Users");
const bcrypt = require("bcrypt");

//create users data
const createUsersData = async (req, res) => {
  try {
    const { email, password } = req.body;

    //password should be redacted here
    const hashedPassword = await bcrypt.hash(password, 10);
    const users = await Users.create({ email, password: hashedPassword });

    return res.json({ users });
  } catch (error) {
    console.log("Error Creating Users Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all users data
const getAllUsersData = async (req, res) => {
  try {
    const users = await Users.find();
    return res.json({ users });
  } catch (error) {
    console.log("Error Fetching All Users Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get users data by id
const getUsersDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await Users.findById(id);
    return res.json({ users });
  } catch (error) {
    console.log("Error Fetching Users Data by Id", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update users data
const updateUsersData = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.findByIdAndUpdate(id, {
      email,
      password: hashedPassword,
    });
    const user = await Users.findById(id);
    return res.json({ user });
  } catch (error) {
    console.log("Error Updating Users Data: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete users data
const deleteUsersData = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.findByIdAndDelete(id);
    return res.json({ success: "Successfully Deleted User Data Id: ", id });
  } catch (error) {
    console.log("Error Deleting User Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createUsersData,
  getAllUsersData,
  getUsersDataById,
  updateUsersData,
  deleteUsersData,
};
