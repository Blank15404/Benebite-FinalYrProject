const mongoose = require("mongoose");

const DonationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  foodName: {
    type: String,
    required: true,
  },
  foodType: {
    type: String,
    enum: ["veg", "non-veg"],
    required: true,
  },
  foodQuantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    default: "", // Optional field, default to empty string
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donation", DonationSchema);