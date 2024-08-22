//ENV VARIABLES
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
const AttachmentsController = require("./controller/AttachmentsController");
const upload = require("./utils/uploadService");

//Create Express App
const app = express();

//Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

//Species Routes
app.post("/species", SpeciesController.createSpeciesData);
app.get("/species", SpeciesController.getAllSpeciesData);
app.get("/species/:id", SpeciesController.getSpeciesDataById);
app.put("/species/:id", SpeciesController.updateSpeciesData);
app.delete("/species/:id", SpeciesController.deleteSpeciesData);

//Attachments routes
app.post("/attachments", AttachmentsController.createAttachmentsData);
app.get("/attachments", AttachmentsController.getAllAttachmentsData);
app.get("/attachments/:id", AttachmentsController.getAttachmentsDataById);
app.put("/attachments/:id", AttachmentsController.updateAttachmentsData);
app.delete("/attachments/:id", AttachmentsController.deleteAttachmentData);

app.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING");
});
