const mongoose = require('mongoose');
var mongooseTypes = require("mongoose-types");
mongooseTypes.loadTypes(mongoose, "email");

const eventReservationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: mongoose.SchemaTypes.Email, required: true },
    eventDate: { type: Date, required: true },
});

module.exports = mongoose.model('EventReservation', eventReservationSchema);