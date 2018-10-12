const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

const reservationRoutes = require("./api/events-controller");
mongoose.connect(
  "mongodb://user1:user1@orelcluster-shard-00-00-hhzij.mongodb.net:27017,orelcluster-shard-00-01-hhzij.mongodb.net:27017,orelcluster-shard-00-02-hhzij.mongodb.net:27017/test?ssl=true&replicaSet=OrelCluster-shard-0&authSource=admin&retryWrites=true",
  {
    useNewUrlParser: true
  }
);
mongoose.Promise = global.Promise;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/reservation", reservationRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
