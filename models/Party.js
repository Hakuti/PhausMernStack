const mongoose = require("mongoose");
const Schema = mongoose.Schema;



//Create Schema
const PartySchema = new Schema({
    partyName: {
        type: String,
        required: true
    },
    userHosting: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attendees: [new Schema({_id: Schema.Types.ObjectId, name: 'String', userId: "String", isAttending: Boolean}, { _id: false})]
});

module.exports = Party = mongoose.model("party", PartySchema);

/* 
When I send my username, and userID along with the partyID
I expect the following
to be added to an attendee list by using the partyID, 

partyID
partyName



*/