const mongoose = require("mongoose");

const Task = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: false,
    },
    estimatedCompletionTime: {
      type: String,
      required: false,
    },
    estimatedTime: {
      type: Date,
      required: false,
    },
    updationTime: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task", Task);
