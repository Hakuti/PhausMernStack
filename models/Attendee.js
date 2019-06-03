const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AttendeeSchema = new Schema({
    partyID: { type: Schema.Types.ObjectId, ref: 'party'},
    userID: {
        type: String,
        required: true
    },
    isAttending: {
        type: Boolean,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = Attendee = mongoose.model("attendee", AttendeeSchema);