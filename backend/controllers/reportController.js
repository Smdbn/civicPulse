const Report = require("../models/Report");

exports.createReport = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    if (!title || !description || !location) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newReport = await Report.create(req.body);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReportsByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const reports = await Report.findAll({ where: { status } });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
