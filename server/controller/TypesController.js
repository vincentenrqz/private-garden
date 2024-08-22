const Types = require("../models/Types");
const upload = require("../utils/uploadService");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

//create types data
const createTypesData = async (req, res) => {
  const { data } = req.body;
  const { name, icons } = data;

  if (!data || !name || !icons) {
    return res.status(400).json({ message: "No content/data is sent!" });
  }

  try {
    const types = await Types.create({
      name,
      icons,
    });

    return res.status(201).json({
      types,
      status: true,
      message: "Successfully created Types data",
    });
  } catch (error) {
    console.error("Error saving types data");
    return res.status(500).json({
      error: "Internal Server Error",
      status: false,
      message: "Error creating types data",
    });
  }
};

//get all types data
const getAllTypesData = async (req, res) => {
  try {
    const types = await Types.find().sort({ createdAt: -1 });
    return res.json({ types });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get types data by id
const getTypesDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const types = await Types.findById(id);

    return res.json({ types });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update types data
const updateTypesData = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, icons } = req.body.data;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    if (!name || !icons) {
      return res.status(400).json({ message: "No content/data is sent!" });
    }

    const updateTypesData = await Types.findByIdAndUpdate(
      id,
      {
        name,
        icons,
      },
      { new: true }
    );

    if (!updateTypesData) {
      return res.status(404).json({ message: "Types not found" });
    }

    const types = await Types.findById(id);

    return res.json({
      species: updateTypesData,
      status: true,
      message: "Successfully updated types",
    });
  } catch (error) {
    console.error("Error Update Types Data", error);
    return res.status(500).json({
      message: "Internal Server error",
      status: false,
      message: "Error updating types",
    });
  }
};

const resizeImage = async (req, res) => {
  console.log("req", req);
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }

  const { width, height } = req.body;
  const filePath = req.file.path;
  const outputFilename = `resized_${req.file.filename}`;
  const outputPath = path.join("uploads", outputFilename);

  const resizeWidth = parseInt(width, 10);
  const resizeHeight = parseInt(height, 10);

  if (isNaN(resizeWidth) || isNaN(resizeHeight)) {
    return res.status(400).send("Invalid width or height");
  }

  try {
    if (!fs.existsSync(path.dirname(outputPath))) {
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    }

    await sharp(filePath)
      .resize(resizeWidth, resizeHeight, {
        fit: "cover",
        withoutEnlargement: false,
      })
      .toFile(outputPath);

    const { width: resizedWidth, height: resizedHeight } = await sharp(
      outputPath
    ).metadata();

    const fileUrl = outputFilename;
    res.json({ resizedImage: fileUrl });

    fs.unlink(filePath, (err) => {
      if (err) console.error("Error deleting original file:", err);
    });
  } catch (error) {
    console.error("Error resizing image:", error);
    res.status(500).send("Error resizing image");
  }
};

//delete types data
const deleteTypesData = async (req, res) => {
  try {
    const id = req.params.id;
    await Types.findByIdAndDelete(id);
    return res.json({ success: "Successfully Deleted Types Data Id: ", id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filename = req.file.filename;

    return res.status(201).json({
      message: "File uploaded successfully",
      filename: filename,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({
      message: "Error uploading file",
      error: error.message,
    });
  }
};

module.exports = {
  createTypesData,
  getAllTypesData,
  getTypesDataById,
  updateTypesData,
  deleteTypesData,
  resizeImage,
  uploadImage,
};
