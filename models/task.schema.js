/*
  Table task {
    id serial [pk]
    description varchar(255) 
    state bollen
    password password
    createdAt 
    updatedAt

  }
*/

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema(
    {
        description: {
            type: String,
            required: true,
        },
        finish: {
            type: Boolean,
        },
    },
    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: true },
        collection: "Tasks",
    }
);

const Task = model("Task", taskSchema);
module.exports = Task;