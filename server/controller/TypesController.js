const Types = require("../models/Types");
const upload = require("../utils/uploadService");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

//create types data
const createTypesData = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files selected!" });
  }

  try {
    const icons = req.files.map((file) => ({
      iconUrl: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      iconSize: req.body.iconSize ? JSON.parse(req.body.iconSize) : null,
      iconAnchor: req.body.iconAnchor ? JSON.parse(req.body.iconAnchor) : null,
      popupAnchor: req.body.popupAnchor
        ? JSON.parse(req.body.popupAnchor)
        : null,
      tooltipAnchor: req.body.tooltipAnchor
        ? JSON.parse(req.body.tooltipAnchor)
        : null,
      shadowUrl: req.body.shadowUrl ?? null,
      shadowSize: req.body.shadowSize ? JSON.parse(req.body.shadowSize) : null,
    }));

    console.log("icons", icons);
    const typeData = {
      name: req.body.name,
      icons: icons,
    };

    const newType = new Types(typeData);
    await newType.save();

    console.log("newType", newType);
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all types data
const getAllTypesData = async (req, res) => {
  try {
    const types = await Types.find().sort({ createdAt: -1 });
    return res.json({ types });
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

    return res.json({ types });
  } catch (error) {
    console.log("Error Fetching Types Data By Id", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//update types data
const updateTypesData = async (req, res) => {
  try {
    const newIcons = req.files.map((file) => ({
      iconUrl: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
      iconSize: req.body.iconSize ? JSON.parse(req.body.iconSize) : null,
      iconAnchor: req.body.iconAnchor ? JSON.parse(req.body.iconAnchor) : null,
      popupAnchor: req.body.popupAnchor
        ? JSON.parse(req.body.popupAnchor)
        : null,
      tooltipAnchor: req.body.tooltipAnchor
        ? JSON.parse(req.body.tooltipAnchor)
        : null,
      shadowUrl: req.body.shadowUrl ?? null,
      shadowSize: req.body.shadowSize ? JSON.parse(req.body.shadowSize) : null,
    }));

    if (req.body.id) {
      const existingType = await Types.findById(req.body.id);
      if (!existingType) {
        return res.status(404).json({ message: "Type not found" });
      }

      existingType.icons = [...existingType.icons, ...newIcons];
      const updatedType = await existingType.save();

      console.log("updatedType", updatedType);
      res.status(200).json(updatedType);
    } else {
      const typeData = {
        name: req.body.name,
        icons: newIcons,
      };
      const newType = new Types(typeData);
      await newType.save();

      console.log("newType", newType);
      res.status(201).json(newType);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getImageDimensions = async (imagePath) => {
  const metadata = await sharp(imagePath).metadata();
  return { width: metadata.width, height: metadata.height };
};

const resizeImage = async (req, res) => {
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
    console.log(`Resized image dimensions: ${resizedWidth}x${resizedHeight}`);

    const fileUrl = `/uploads/${outputFilename}`;
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
  resizeImage,
};
