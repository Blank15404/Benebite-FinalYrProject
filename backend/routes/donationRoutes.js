const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");

// Create a new donation
router.post("/donations", async (req, res) => {
  try {
    const { name, contact, foodName, foodType, foodQuantity, date, time, location, landmark } = req.body;
    const donation = new Donation({
      name,
      contact,
      foodName,
      foodType,
      foodQuantity,
      date,
      time,
      location,
      landmark,
    });
    await donation.save();
    res.status(201).json({ message: "Donation created", donation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all donations
router.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Claim a donation (decrease quantity by 1)
router.put("/donations/:id/claim", async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // Decrease the quantity by 1
    donation.foodQuantity -= 1;

    if (donation.foodQuantity === 0) {
      // If quantity reaches 0, delete the donation
      await Donation.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Donation claimed and removed", donation });
    } else {
      // Otherwise, save the updated donation
      await donation.save();
      res.status(200).json({ message: "Donation claimed", donation });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;