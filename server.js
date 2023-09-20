const express = require("express");
const cors = require("cors");

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use("/", require("./routes/register"));

app.use("/", require("./routes/login"));
app.listen(3000);