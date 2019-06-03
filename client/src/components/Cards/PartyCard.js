import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import "../dashboard/dashboard.css"

//In this class I need to do the following things
//Step A create a party card with the props being fetched from the database
//Step B load those party cards with the props.data
/*Step C Create a Link that will bring to another component
    Options for this step are as follows
    A link to the party page that I'm going to make, which is also a protected route, "HOPEFULLY"
    <Link to="/Party/ID" component="PartyPage">
*/
/*Step D Once I enter the PartyPage Component
    Use the props.match.url in order to grab the ID
    //Commit to another fetch request in order for it be useable link for all to use.

*/
class PartyCard extends Component {
    
    constructor(){
        super();
    }

    render(){
        console.log(this.props.partyInfo.description);
        const title = this.props.partyInfo.partyName;
        const description = this.props.partyInfo.description;
        const id = this.props.partyInfo._id;
        return(
       <div className="col s12 m6 l3">
       <Link to={`/party/${id}`} style={{color: "black"}}>
       <div className="card hoverable card-height card-width center">
       
         <div className="card-image">
           <img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
           <span className="card-title card-title-21">21+</span>
         </div>
         
         <div className="card-content">
           <div className="card-content-head">
           <p className="party-title">
              {title}
              
             {/* {item.partyName ? item.partyName : "null"} */}
           </p>
           <p className="party-price">$10</p>
           </div>
           <p className="party-date">
             April 4/30
           </p>
           
           
           <p className="party-body">
            {description}
            {/* {item.description ? item.partyName : "null"} */}
           </p>

         </div>
        
       </div>
       </Link>
     </div>
        )
    }
}

export default PartyCard;