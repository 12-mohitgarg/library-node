const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LibraryOwner",
    required: true,
  },
  libraryName: {
    type: String,
    required: true,
  },
  numberOfStudents: {
    type: Number,
    default: 0,
  },
  seatingArrangement: {
    rows: {
      type: Number,
      required: true,
    },
    columns: {
      type: Number,
      required: true,
    },
  },
  address: {
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
}, { timestamps: true });

module.exports = mongoose.model("Library", librarySchema);
