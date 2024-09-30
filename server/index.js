//ENV VARIABLES
const s3 = require("./utils/s3");
require("dotenv").config();

//Import Dependencies
const express = require("express");
const connectMongoDB = require("./config/database");
const cors = require("cors");
const path = require("path");

//Controllers
const UsersController = require("./controller/Users");
const TypesController = require("./controller/TypesController");
const SpeciesController = require("./controller/SpeciesController");
const MapsController = require("./controller/MapsController");
const AttachmentsController = require("./controller/AttachmentsController");
const upload = require("./utils/uploadService");

//Create Express App
const app = express();

//Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(express.static(path.join(__dirname, "../client/dist")));

//Connect to DB
connectMongoDB();

//User Routes
app.post("/user", UsersController.createUsersData);
app.get("/user", UsersController.getAllUsersData);
app.get("/user/:id", UsersController.getUsersDataById);
app.put("/user/:id", UsersController.updateUsersData);
app.delete("/user/:id", UsersController.deleteUsersData);

//Types Routes
app.post("/types", TypesController.createTypesData);
app.get("/types", TypesController.getAllTypesData);
app.get("/types/:id", TypesController.getTypesDataById);
app.put("/types/:id", TypesController.updateTypesData);
app.delete("/types/:id", TypesController.deleteTypesData);
app.post(
  "/types/resize-icon",
  upload.single("file"),
  TypesController.resizeImage
);
app.post(
  "/types/upload-icons",
  upload.single("image"),
  TypesController.uploadImage
);
app.post(
  "/types/file_upload",
  upload.single("imageType"),
  TypesController.fileUpload
);

//Species Routes
app.post("/species", SpeciesController.createSpeciesData);
app.get("/species", SpeciesController.getAllSpeciesData);
app.get("/species/:id", SpeciesController.getSpeciesDataById);
app.put("/species/:id", SpeciesController.updateSpeciesData);
app.delete("/species/:id", SpeciesController.deleteSpeciesData);

//Maps Routes
app.post("/maps", MapsController.createMapData);
app.get("/maps", MapsController.getAllMapsData);
app.get("/maps/:id", MapsController.getMapsDataById);
app.put("/maps/:id", MapsController.updateMapsData);
app.delete("/maps/:id", MapsController.deleteMapsData);

//Attachments routes
app.post("/attachments", AttachmentsController.createAttachmentsData);
app.get("/attachments", AttachmentsController.getAllAttachmentsData);
app.get("/attachments/:id", AttachmentsController.getAttachmentsDataById);
app.put("/attachments/:id", AttachmentsController.updateAttachmentsData);
app.delete("/attachments/:id", AttachmentsController.deleteAttachmentData);

app.get("/generate-presigned-url", (req, res) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `icon-${Date.now()}.png`,
    Expires: 60,
    ContentType: "image/png",
  };

  s3.getSignedUrl("putObject", params, (err, url) => {
    if (err) {
      return res.status(500).json({ error: "Error generating pre-signed URL" });
    }
    res.json({ url });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("SERVER RUNNING");
});
