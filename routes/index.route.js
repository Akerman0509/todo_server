const express = require('express');
const taskRoutes = require('./task.route');

const router = express.Router();



router.use('/tasks', taskRoutes);


module.exports = router;