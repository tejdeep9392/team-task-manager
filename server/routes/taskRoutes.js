const router = require("express").Router();

const Task = require("../models/Task");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, async (req, res) => {

  try {

    const {
      title,
      description,
      project,
      assignedTo,
      dueDate
    } = req.body;

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (err) {

    res.status(500).json(err);

  }

});

router.get("/", authMiddleware, async (req, res) => {

  try {

    const tasks = await Task.find()
      .populate("project", "name")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name");

    res.json(tasks);

  } catch (err) {

    res.status(500).json(err);

  }

});

router.put("/:id/status", authMiddleware, async (req, res) => {

  try {

    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      message: "Task status updated",
      updatedTask
    });

  } catch (err) {

    res.status(500).json(err);

  }

});

module.exports = router;