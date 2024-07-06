const express = require("express");
const router = express.Router();
const Announcements = require("../models/announcements");

router.post("/", async (req, res) => {
  try {
    const newAnnouncement = new Announcements(req.body);
    await newAnnouncement.save();
    res.status(201).json(newAnnouncement); // Respond with the saved announcement
  } catch (err) {
    console.error('Error adding announcement:', err);
    res.status(500).json({ error: 'Error adding announcement' }); // Handle server error
  }
});

router.get("/", async (req, res) => {
  try {
    const announcements = await Announcements.find();
    res.json(announcements); // Respond with the list of announcements
  } catch (err) {
    console.error('Error fetching announcements:', err);
    res.status(500).json({ error: 'Error fetching announcements' }); // Handle server error
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Announcements.findByIdAndDelete(id);
    res.json({ message: "Announcement deleted" }); // Respond with success message
  } catch (err) {
    console.error('Error deleting announcement:', err);
    res.status(500).json({ error: 'Error deleting announcement' }); // Handle server error
  }
});

module.exports = router;