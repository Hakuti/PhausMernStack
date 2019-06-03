import React, { Component } from 'react'
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./partypage.css";


 class Party extends Component {

  constructor(){
        super();
        this.state = {
          isAttending: false,
          partyData: []
        }
  }
  
  componentDidMount(){
    let regex = RegExp("([^\/]+$)");
    const { user } = this.props.auth
    //Regex of partyID found, select as [0] for first in the array.
    let partyID = regex.exec(this.props.location.pathname);

    //Find if one is currently attending event, then set the state accordingly.
    axios.get(`/api/party/checkIsAttending?partyID=${partyID[0]}&userID=${user.id}`)
    .then( data => {
        this.setState({
          isAttending: data.data
        })
    })
    //Find Data on Party to Display on UI
    axios.get(`/api/party/Findparties/${partyID[0]}`)
    .then( data => {
      console.log(data.data.partyName)
      this.setState({partyData: data.data})
    })

  }

  onJoinClick = e => {
    let regex = RegExp("([^\/]+$)");
    const { user } = this.props.auth;
    let partyId = regex.exec(this.props.location.pathname);
    e.preventDefault();
    //If a user is not attending
    if(!(this.state.isAttending)){
      //At the end of this process the state will end up as true
      axios.post('/api/party/joinparty', {userID: user.id, partyID: partyId[0]})
        .then( res => {
          console.log(res.data);
          console.log(res.data.isAttending);
          if(res.data.isAttending) {
            this.setState({
              isAttending: true
            })
          }
        })
        .catch( err => {
          console.log(err);
        })
      
      
    }else if(this.state.isAttending){
      axios.delete(`/api/party/deleteFromParty?partyID=${partyId[0]}&userID=${user.id}`)
        .then( res => {
          console.log(res.data);
          if(!res.data){
            this.setState({isAttending: res.data});
          }
        })
    }
   
  }

  render() {

    const { user } = this.props.auth;
    const { partyName, userHosting } = this.state.partyData
    //console.log(user);
    console.log(this.state.isAttending);
    console.log(this.state.partyData);
    return (
      <div className="background-gradient">
        <div className="row container-P-margins">
        
        <div className="row noPadding mobile-view-switch-1" style={{marginBottom: "0px"}}>
          <div className="col s12 m8 l8 red img-div-top noPadding">
          
             <div className="div-top-one">
              <img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></img>
             </div>

          </div>

          <div className="col s12 m4 l4  noPadding date-div-top">

              
              {/* I NEED TO REDO THE CSS HERE, NOT COMPLIANT WITH VIEW*/}
               <div className="date-div-top-inner">

                <div className="mobile-view-disappear">
                  <p>APR</p>
                  <p>30</p>
                </div> 
                
                <div>
                  <p>{partyName}</p>
                </div>

                <div>
                  <p>by {userHosting}</p>
                </div>

                <div>
                  <p>$15 - $25</p>
                </div>


               {/* <div className="mobile-view-disappear" style={{flex: "2", background: "", display: "flex", flexDirection: "column"}}>
                APR
                <p style={{marginTop: "0px", fontWeight: "100", display: "flex", textAlign: "center"}}>30</p>
                
                
              </div>

              <div className="mb-view-1" style={{flex: "3", background: "", display: "flex", alignItems: "flex-end", color: "black"}}>
                Jean's Grad Bash, With  TON OF STUFF, AND WHATEVER ELSE FITS ON HERE, ETC, SO FORTH AND MUCH MORE
              </div>

              <div className="mb-view-2" style={{flex: "1", background: "", display: "flex", alignItems: "flex-start", color: "#D81C9C"}}>
                @WildBoyJean
              </div>
              
              <div className="mobile-view-disappear" style={{flex: "4", background: "", display: "flex", alignItems: "flex-end"}}>
                <p>FREE</p>
              </div>  */}

              </div> 


          </div>

        </div>
        
          <div className="row" style={{marginBottom: "0px", marginTop: "0px"}}> 
          <div className="col s12 m12 l12 white noPadding">
          <div className="line-separator-1">
          </div>
          <div className="button-div-party">
                <button onClick={this.onJoinClick} style={{width: "330px", height: "50px"}} className={`hoverable ${this.state.isAttending ? "green btn" : "red btn"}`}> {this.state.isAttending ? "I'm going" : "Join"} </button>
          </div>
          <div id="mobile-margin-one" className="line-separator-1">
          </div>
          </div>

          </div>

        <div className="row mobile-view-switch noPadding" style={{marginTop: "0px !important"}}>
          <div className="col s12 m8 l8 white body-div-left noPadding" style={{}}>
            <div>
            <div className="party-title-div">
            <p>The Real Comedians tour comes BACK to Orlando</p>
            </div>
            <div className="party-about-div">
            <p>About this event</p>
            </div>

            <div className="party-desc-div">
              <p>The Real Comedians tour comes to Orlando . Hosted by Tahir Moore, with performances by Tony Baker and headlined by KevOnStage.</p>
              <p>VIP ticket holders get early access to the venue for priority seating at 5:45. VIP ticket holders also are first to take pictures with the comedians after the show.</p>
              <p>General ticket holders get access to the venue at 6:15. 30 minutes after VIP ticket holders. General admission ticket holders may have an opportunity to take pictures with comedians AFTER VIP ticket holders if possible.</p>
            </div>
            </div>
          </div>

          <div className="col s12 m4 l4 white date-loc-div-right noPadding">
          {/* <div className="line-separator"></div> */}
            <div className="HoldMyBeer">
              {/*Start of HoldMyBeer-Inner*/}
               <div className="HoldMyBeer-Inner">

                
                <i className="material-icons">date_range</i>
                <div>
                <p>
                  Date And Time
                </p>

                <p style={{marginBottom: "0px"}}>
                  Thu, May 30, 2019, 10:00AM -
                </p>

                <p>
                  Sat, Jun 1, 2019, 3:30 PM EDT
                </p>

               </div>
              


              </div>
            {/*EndOf HoldMyBeer-Inner*/}

                <div className="HoldMyBeer-Inner">
                   <i className="material-icons">room</i>
                   <div>
                   <p>Location</p>
                   <p style={{marginBottom: "0px"}}>Hyatt Regency Orlando | Convention Level</p>
                   <p style={{marginBottom: "0px"}}>9801 International Drive</p>
                   <p>Orlando, Fl 32819</p>
                   </div>

                </div>


                <div className="HoldMyBeer-Inner">
                  <i className="material-icons">style</i>
                  <div id="hide-on-desktop">
                  <p>Refund Policy</p>
                  <p>Refunds up to 30 days before event</p>
                  </div>
                </div>


            </div>
          </div>
        </div>
      
      {/* <div style={{display: "flex", justifyContent: "center", marginTop: "100px"}} className="">
        <button onClick={this.onJoinClick} className={`hoverable ${this.state.isAttending ? "green btn" : "red btn"}`}> {this.state.isAttending ? "I'm going" : "Join"} </button>
      </div> */}


      </div>



      </div>
    )
  }
}


Party.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps
)(Party);
