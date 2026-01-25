const Exercise = require("../models/Exercises");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  res.send("get all jobs");
};

const getJob = async (req, res) => {
  res.send("get job");
};

const createExercise = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const exercise = await Exercise.create(req.body);
  res.status(StatusCodes.CREATED).json({ exercise });
};

const updateJob = async (req, res) => {
  res.send("update Job");
};

const deleteJob = async (req, res) => {
  res.send("delete job");
};

module.exports = { getAllJobs, getJob, createExercise, updateJob, deleteJob };
