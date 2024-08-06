const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const AttachmentsSchema = new Schema(
  {
    file_name: String,
    species_id: Number,
  },
  { timestamps: true }
);

const Attachments = mongoose.model("Attachments", AttachmentsSchema);

module.exports = Attachments;
