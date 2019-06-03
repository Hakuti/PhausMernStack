import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from "axios";
import "./dashboard.css"
import PartyCards from "../PartyCards/PartyCards";
// import CreatePartyCards from "./PartyContent/PartyCards";
// const CreatePartyCards = (props) => {
//     console.log(props.partyInfo);
//     // let emptyData = []
    
//     let arrayOfInfo = ["One", "Two", "Three"];
//     let party = props.partyInfo.map( (item, index) => {
//        return(<div className="col s12 m6 l3">
//        <div className="card hoverable card-height card-width center">
//          <div className="card-image">
//            <img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
//            <span className="card-title card-title-21">21+</span>
//          </div>
         
//          <div className="card-content">
//            <div className="card-content-head">
//            <p className="party-title">
//              {item.partyName}
//            </p>
//            <p className="party-price">$10</p>
//            </div>
//            <p className="party-date">
//              April 4/30
//            </p>
           
           
//            <p className="party-body">
//             {item.description}
//            </p>

//          </div>
         
//        </div>
//      </div>)
//    })

//    return(
//     <div> {party} </div>
//    )
//     console.log(props.partyInfo.map((item) => {
//         console.log(item.partyName);
//     }));
//     return(
//     <div>information</div>
//     )
// }

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
          partyData: []
          
        
        };
      }
    
    componentDidMount(){
        axios
        .get("/api/party/Findparties")
        .then(data => {
            console.log(data.data);
            this.setState({
                partyData: data.data
            })
            console.log(data);
        })
        .catch( err => console.log(err))
        
    }


    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }

    


  



    render(){
        const { user } = this.props.auth;
        return(
            
            // <div style={{ height: "75vh" }} className="container valign-wrapper">
            // <div className="row">
            //   <div className="col s12 center-align">
            //     <h4>
            //       <b>Hey there,</b> {user.name.split(" ")[0]}
            //       <p className="flow-text grey-text text-darken-1">
            //         You are logged into a full-stack{" "}
            //         <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
            //       </p>
            //     </h4>
            
            
            <div className="row">
            
            <div className="row">
            <PartyCards partyInfo={this.state.partyData}></PartyCards>
            {/* <CreatePartyCards partyInfo={this.state.partyData}></CreatePartyCards> */}

            {/* <div className="col s12 m6 l3">
              <div className="card hoverable card-height card-width center">
                <div className="card-image">
                  <img src="https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"/>
                  <span className="card-title card-title-21">21+</span>
                </div>
                
                <div className="card-content">
                  <div className="card-content-head">
                  <p className="party-title">
                    Jean's Grad Bash
                  </p>
                  <p className="party-price">$10</p>
                  </div>
                  <p className="party-date">
                    April 4/30
                  </p>
                  
                  
                  <p className="party-body">
                   Join us for drinks, fun and games, on a big boat!
                  Bring your own beers, and a big rubber ducky!
                  I love it!
                  </p>

                </div>
                
              </div>
            </div> */}

            

          </div>


        <div className="row">
        {/* <CreatePartyCards partyInfo={this.state.partyData}></CreatePartyCards> */}
        <div className="col s12 m12 l12 center">
            <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                   
                    
                  }}
                  onClick={this.onLogoutClick}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Logout
                </button>
        </div>
        </div>

        </div>
              
        









        //       </div>
        //     </div>
        //   </div>
        );
    }

}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);