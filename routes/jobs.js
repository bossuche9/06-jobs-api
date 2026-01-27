const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getJob,
  createExercise,
  updateJob,
  deleteJob,
} = require("../controllers/jobs");
//
router.route("/").post(createExercise).get(getAllJobs);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);

module.exports = router;
