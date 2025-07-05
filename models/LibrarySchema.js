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
    trim: true,
  },
   images: [{
    type: String,
    
  }],

  sloats:[{
     type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",
    required: true,
  }],

  fasalitys: [{
    type: String,
  }],
  description: {
    type: String,
   
    trim: true,
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    
  },
  
   uniqueCode: {
    type: String,
    required: true,
    unique: true,
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

    expiresAt: {
    type: Date,
    required: true,
    default:Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("Library", librarySchema);
