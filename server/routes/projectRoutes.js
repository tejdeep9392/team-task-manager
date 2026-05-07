const router = require("express").Router();

const Project = require("../models/Project");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, async (req, res) => {

  try {

    const { name, description, teamMembers } = req.body;

    const project = await Project.create({
      name,
      description,
      teamMembers,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (err) {

    res.status(500).json(err);

  }

});

router.get("/", authMiddleware, async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("teamMembers", "name email");

    res.json(projects);

  } catch (err) {

    res.status(500).json(err);

  }

});

module.exports = router;