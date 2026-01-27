const Exercise = require("../models/Exercises");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllExercises = async (req, res) => {
  const exercises = await Exercise.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ exercises, count: exercises.length });
};

const getExercise = async (req, res) => {
  res.send("get job");
};

const createExercise = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const exercise = await Exercise.create(req.body);
  res.status(StatusCodes.CREATED).json({ exercise });
};

const updateExercise = async (req, res) => {
  res.send("update Job");
};

const deleteExercise = async (req, res) => {
  res.send("delete job");
};

module.exports = {
  getAllExercises,
  getExercise,
  createExercise,
  updateExercise,
  deleteExercise,
};
