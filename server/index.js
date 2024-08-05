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
app.get("/", UsersController.getUsersDataById);
app.put("/", UsersController.updateUsersData);
app.delete("/", UsersController.deleteUsersData);

//Types Routes
app.post("/", TypesController.createTypesData);
app.get("/", TypesController.getAllTypesData);
app.get("/", TypesController.getTypesDataById);
app.put("/", TypesController.updateTypesData);
app.delete("/", TypesController.deleteTypesData);

//Species Routes
app.post("/", SpeciesController.createSpeciesData);
app.get("/", SpeciesController.getAllSpeciesData);
app.get("/", SpeciesController.getSpeciesDataById);
app.put("/", SpeciesController.updateSpeciesData);
app.delete("/", SpeciesController.deleteSpeciesData);

//Attachments routes
app.post("/", AttachmentsController.createAttachmentsData);
app.get("/", AttachmentsController.getAllAttachmentsData);
app.get("/", AttachmentsController.getAttachmentsDataById);
app.put("/", AttachmentsController.updateAttachmentsData);
app.delete("/", AttachmentsController.deleteAttachmentData);

app.listen(process.env.PORT, () => {
  console.log("SERVER RUNNING");
});
