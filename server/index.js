//ENV VARIABLES
require("dotenv").config();

//Import Dependencies
const express = require("express");
const connectMongoDB = require("./config/database");
const cors = require("cors");

//Controllers
const UsersController = require("./controller/Users");
const TypesController = require("./controller/TypesController");
const SpeciesController = require("./controller/SpeciesController");
const AttachmentsController = require("./controller/AttachmentsController");

//Create Express App
const app = express();

//Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

//Connect to DB
connectMongoDB();

//User Routes
app.post("/", UsersController.createUsersData);
app.get("/", UsersController.getAllUsersData);
app.get("/:id", UsersController.getUsersDataById);
app.put("/:id", UsersController.updateUsersData);
app.delete("/:id", UsersController.deleteUsersData);

//Types Routes
app.post("/", TypesController.createTypesData);
app.get("/", TypesController.getAllTypesData);
app.get("/:od", TypesController.getTypesDataById);
app.put("/:id", TypesController.updateTypesData);
app.delete("/:id", TypesController.deleteTypesData);

//Species Routes
app.post("/", SpeciesController.createSpeciesData);
app.get("/", SpeciesController.getAllSpeciesData);
app.get("/:id", SpeciesController.getSpeciesDataById);
app.put("/:id", SpeciesController.updateSpeciesData);
app.delete("/:id", SpeciesController.deleteSpeciesData);

//Attachments routes
app.post("/", AttachmentsController.createAttachmentsData);
app.get("/", AttachmentsController.getAllAttachmentsData);
app.get("/:id", AttachmentsController.getAttachmentsDataById);
app.put("/:id", AttachmentsController.updateAttachmentsData);
app.delete("/:id", AttachmentsController.deleteAttachmentData);

app.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING");
});
