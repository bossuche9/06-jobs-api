const { required } = require("joi");
const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose");

const ExerciseSchema = new moongoose.Schema(
  {
    exerciseName: {
      type: String,
      requried: [true, "Please provide exercise name"],
      maxlength: 50,
    },
    bodyPart: {
      type: String,
      requried: [
        true,
        "Please provide what part of the body the exercise targets",
      ],
      maxlength: 50,
    },
    personalBeststatus: {
      type: String,
      enum: [
        "New persaonal record",
        "No personal Record",
        "bad sessions regressed",
      ],
      default: "No personal Record",
    },
    createdBy: {
      type: moongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Exercise", ExerciseSchema);
