const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/test", require("./routes/testRoutes"));

app.use("/api/projects", require("./routes/projectRoutes"));

app.use("/api/tasks", require("./routes/taskRoutes"));
app.get("/", (req, res) => {
  res.send("API Running");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});