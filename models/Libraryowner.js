const mongoose = require("mongoose");

const libraryOwnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  uniqueCode: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive", "Pending", "Suspended", "Deleted"],
    default: "Pending",
  },
  paymentDetails: {
    accountHolderName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },
    upiId: { type: String },
  },
  kycDetails: {
    panNumber: {
      type: String,
      uppercase: true,
      match: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
    },
    aadhaarNumber: {
      type: String,
      match: /^[2-9]{1}[0-9]{11}$/,
    },
  },
   accountType: {
      type: String,
      default: "LibraryOwner",
    },
  expiresAt: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("LibraryOwner", libraryOwnerSchema);
