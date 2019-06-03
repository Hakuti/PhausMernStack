const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const mongoose = require('mongoose');

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load user model
const User = require("../../models/User");
const Party = require("../../models/Party");


//route GET api/party/FindParties
//@desc Grab All Parties
//@access Private
router.get("/Findparties", (req, res) => {
    Party.find({}).then( dataFound => {
        res.json(dataFound);
    })
})


//Route get api/party/Findparties/:id
//@desc Grab Specific Party
//@access Private
router.get("/Findparties/:id", (req, res) => {
    
    Party.findById(req.params.id).then( party => {
        res.json(party);
    })
})


//route POST /api/party/CreateParty
//@desc Create a Party
//@access Private
router.post("/Createparty", (req, res) => {
    const newParty = new Party({
        
        partyName: req.body.partyName,
        userHosting: req.body.userHosting,
        description: req.body.description
    });

    newParty.save().then( newparty => res.json(newparty));

})

//route Post /api/party/joinparty
//@desc Join a party
//@access Private
router.post("/joinparty", (req, res) => {
    /* Here I want to receive the user's user.id and user.body
    */
   userID = req.body.userID;
   partyID = req.body.partyID;
   
   //Look to see if the user is already attending, then return the result
function findUserCurrentlyAttending(userID, partyID){
  return Party.findById(partyID)
   .then( party => {
        
       const result = party.attendees.some( person =>  { 
           //console.log(person.userId);
           return person.userId === userID
       
       });

       return result;
    
   })
   .catch( err=> {
       res.json(err)
   })
}

findUserCurrentlyAttending(userID, partyID).then( isAttending => {
       
    
    //If the user is not attending
    if(!isAttending){
        //Find the ID by party and then add the user to the attendee list
        
     Party.findById(req.body.partyID)
     .then( party => {
         console.log(party);
         party.attendees.push({_id: userID, name: req.body.name, userId: req.body.userID, isAttending: true})
         party.save();

         //Return isAttending as True
         res.json({isAttending: true});
     })
     .catch(err => { console.log("nested error")})
    }else {
         //If he is attending then just return True back
        res.json(isAttending);
    }
    
})
.catch(err => {
    console.log(err);
})

  

})

/*
Potential glitch, updating an attendee state if there is a multiple login going on.
     only Q&A would do this, but this is a test app so....
*/

//Next I need a route for joining

//Then a route for unjoining
router.delete("/deleteFromParty", (req, res) => {
    
   const userID = req.query.userID;
   const partyID = req.query.partyID;


   findAndPullUser(userID, partyID).then( value =>  { Party.findById(partyID)
   .then( party => {
       //console.log(party);
       const result = party.attendees.some( person =>  { 
           //console.log(person.userId);
           return person.userId === userID
       
       });
      
       console.log(`result on line: ${result}`);
       if(!result){
           res.json(result);
       }
    
   })
   .catch( err=> {
       res.json(err)
   })});
})




router.get("/checkIsAttending/", (req, res) => {
    
    const partyID = req.query.partyID;
    const userID = req.query.userID.toString();
    
    Party.findById(partyID)
        .then( party => {
            const result = party.attendees.some( person =>  { 
                return person.userId === userID
            
            });
            

            if(result){
                res.json(result);
            }else {
                res.json(result);
            }
        })
        .catch( err=> {
            res.json(err)
        })


    
})



function findAndPullUser(userID, partyID){
   return Party.findByIdAndUpdate(partyID, {$pull: {"attendees": {_id: userID}}})
    .then(party => {
        party.save();
       
    })
    .catch(err => console.log(err))
}



module.exports = router;

