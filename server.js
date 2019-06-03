const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
require('dotenv').config();
const users = require("./routes/api/users");
const party = require("./routes/api/party");
const path = require('path');
const app = express();



//Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.use(bodyParser.json());

//DB Config
// const db = require("./config/keys").mongoURI;
const db = process.env.mongoURI
//Connect to MongoDB
mongoose.connect(
    db, { useNewUrlParser: true}
).then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport config
require("./config/passport")(passport);

//Routes
app.use("/api/users", users);
app.use("/api/party", party)

//Serve static assets if in production
if(process.env.NODE_ENV == 'production'){
    console.log(process.env.mongoURI);
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
//process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
