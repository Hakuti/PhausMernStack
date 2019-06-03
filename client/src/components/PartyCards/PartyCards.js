import React, { Component } from "react";
import PartyCard from "../Cards/PartyCard"

const PartyCards = (props) => {
    console.log(props);
    //This sends info
    const party = props.partyInfo.map(item => {
        return(
        <PartyCard partyInfo={item}></PartyCard>
        )
    })

    return(party);
}
export default PartyCards;