const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
console.log("URI = ", uri);

mongoose // connection to the mongoDB
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.log("CONNECTION ERROR = ", e);
  });

const dbConnection = mongoose.connection;

dbConnection.on("error", (e) => {
  console.error("MongoDB connection error = " + e);
});

dbConnection.once("open", () => {
  console.log("MongoDB database connection SUCCESSFUL");
});

const wordsRouter = require("./routes/words");
app.use("/api/words", wordsRouter);

app.listen(PORT, () => {
  console.log(`MongoDB sever running on ${PORT}`);
});
