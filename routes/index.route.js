const express = require('express');
const taskRoutes = require('./task.route');

const router = express.Router();

router.use('/tasks', taskRoutes);
router.get("/", (req, res) => {
    res.send("ee: Main Router is working!");
  });

module.exports = router;