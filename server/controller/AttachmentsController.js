const Attachments = require("../models/Attachments");

//create attachment data
const createAttachmentsData = async (req, res) => {
  try {
    const { file_name, species_id } = req.body;
    const attachments = await Attachments.create({ file_name, species_id });
    return res.json({ attachments });
  } catch (error) {
    console.log("Error Creating Attachments Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all attachment data
const getAllAttachmentsData = async (req, res) => {
  try {
    const attachments = await Attachments.find().sort({ createdAt: -1 });
    return res.json({ attachments });
  } catch (error) {
    console.log("Error Fetching All Attachments Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get attachment data by id
const getAttachmentsDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const attachments = await Attachments.findByIdAndDelete(id);
    return res.json({ attachments });
  } catch (error) {
    console.log("Error Fetching Attachments Data by Id", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update attachment data
const updateAttachmentsData = async (req, res) => {
  try {
    const id = req.params.id;
    const { file_name, species_id } = req.body;
    await Attachments.findByIdAndUpdate(id, { file_name, species_id });

    const attachment = await Attachments.findById(id);
    return res.json({ attachment });
  } catch (error) {
    console.log("Error Updating Attachment Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//delete attachment data
const deleteAttachmentData = async (req, res) => {
  try {
    const id = req.params.id;
    await Attachments.findByIdAndDelete(id);
    return res.json({
      success: "Succesfully Deleted Attachment Data Id: ",
      id,
    });
  } catch (error) {
    console.log("Error Deleting Attachment Data", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createAttachmentsData,
  getAllAttachmentsData,
  getAttachmentsDataById,
  updateAttachmentsData,
  deleteAttachmentData,
};
