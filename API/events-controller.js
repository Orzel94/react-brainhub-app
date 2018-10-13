const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const EventReservation = require("../model/event-reservation");

router.post("/", (req, res, next) => {
  const reservation = new EventReservation({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    eventDate: req.body.eventDate
  });

  reservation
    .save()
    .then(result => {
      res.status(201).json({
        message: "Event reserved successfully",
        reservation: {
          _id: result._id,
          name: result.name,
          surname: result.surname,
          email: result.email,
          eventDate: result.eventDate,
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;