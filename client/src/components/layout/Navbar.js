import React, { Component } from "react";
import { Link } from "react-router-dom"
import { relative } from "path";

class Navbar extends Component {
    render(){
        return (
<div className="navbar-fixed ">
        <nav className="">
          <div className="nav-wrapper white">
            <Link
              to="/dashboard"
              style={{
                position: "relative",
                bottom: "30px"
              }}
              className="col s5 brand-logo center"
            >
              {/* <i className="material-icons">code</i> */}
              <h4 style={{color: "orange",  fontWeight: "400", fontFamily: "sans-serif"}}>
                <b>
              haus
              </b>
              </h4>
            </Link>
          </div>
        </nav>
      </div>
        );
    }
}

export default Navbar;