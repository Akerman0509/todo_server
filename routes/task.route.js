const express = require('express');
const taskRoutes = express.Router({ mergeParams: true });
const taskController = require('../controllers/task.controller');


taskRoutes.post("/", taskController.createTasks);
taskRoutes.get("/", taskController.getTasks);
taskRoutes.put("/:id", taskController.updateTask);
taskRoutes.delete("/:id", taskController.deleteTask); 

taskRoutes.get("/sudo", taskController.createSudoTask);

module.exports = taskRoutes;