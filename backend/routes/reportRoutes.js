const express = require("express");
const {
  createReport,
  getReports,
  getReportsByStatus,
} = require("../controllers/reportController");
const router = express.Router();

router.post("/", createReport);
router.get("/", getReports);
router.get("/status/:status", getReportsByStatus);

module.exports = router;
