const express = require("express");
const cors = require("cors");
const studentRoutes = require("./src/students/routes");

const app = express();
const port = 4002;

app.use(express.json());

// Add the CORS middleware
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use("/api/v1/students", studentRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
